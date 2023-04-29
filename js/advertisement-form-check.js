import {showAlert} from './utils.js';
import {sendData} from './api.js';
//import {openLoadPictureMessageSuccess, openLoadPictureMessageError} from './user-picture-post-result-messages.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовывается...'
};

const MinPriceByType = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
  'hotel': 3000
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 100000;

const advertisementForm = document.querySelector('.ad-form');
const avatarFileInput = advertisementForm.querySelector('input[id="avatar"]');
const photosInput = advertisementForm.querySelector('input[id="images"]');
const titleInput = advertisementForm.querySelector('input[id="title"]');
const typeInput = advertisementForm.querySelector('select[id="type"]');
const priceInput = advertisementForm.querySelector('input[id="price"]');
const roomsInput = advertisementForm.querySelector('select[id="room_number"]');
const guestsInput = advertisementForm.querySelector('select[id="capacity"]');
const checkinInput = advertisementForm.querySelector('select[id="timein"]');
const checkoutInput = advertisementForm.querySelector('select[id="timeout"]');
const inputsRequired = advertisementForm.querySelectorAll('[required]');

const submitButton = advertisementForm.querySelector('button[type="submit"]');

inputsRequired.forEach((inputRequired) => {
  inputRequired.dataset.pristineRequiredMessage = 'Обязательное для заполнения поле.';
});

const pristine = new Pristine(advertisementForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
});


const validateFile = (value) => /.jpg$/i.test(value) || /.png$/i.test(value) || /.jpeg$/i.test(value) || value.length === 0;

pristine.addValidator(
  avatarFileInput,
  validateFile,
);

pristine.addValidator(
  photosInput,
  validateFile,
);

/*----------*/

let titleErrorMessage = '';

const validateTitle = (value) => {
  let errors = 0;

  if (value.length <= MIN_TITLE_LENGTH || value.length >= MAX_TITLE_LENGTH) {
    titleErrorMessage = `От ${ MIN_TITLE_LENGTH } до ${ MAX_TITLE_LENGTH } символов. (введено: ${ value.length })`;
    errors++;
  }

  if (value.trim() === ''){
    titleErrorMessage = 'Введены только пробелы.';
    errors++;
  }

  return errors === 0;
};

const getTitleErrorMessage = () => titleErrorMessage;

pristine.addValidator(
  titleInput,
  validateTitle,
  getTitleErrorMessage,
);

/*----------*/

let minPriceValue;

const priceErrorMessage = () => `От ${ minPriceValue.toLocaleString() } до ${ MAX_PRICE_VALUE.toLocaleString()}`;

const validatePrice = (value) => {
  minPriceValue = MinPriceByType[typeInput.value];
  return value >= minPriceValue && value <= MAX_PRICE_VALUE;
};

pristine.addValidator(
  priceInput,
  validatePrice,
  priceErrorMessage,
);

typeInput.addEventListener('change', () => pristine.validate(priceInput));

/*----------*/

let guestsAndRoomsErrorMessage = '';

const getNumber = (string) => parseInt(string, 10);

const validateGuestsAndRooms = () => {
  const roomsCount = getNumber(roomsInput.value);
  const guestsCount = getNumber(guestsInput.value);

  if (roomsCount < guestsCount) {
    guestsAndRoomsErrorMessage = 'Гостей не может быть больше чем комнат.';
    return false;
  }

  if ((roomsCount < 100 && guestsCount === 0) || (roomsCount >= 100 && guestsCount !== 0)) {
    guestsAndRoomsErrorMessage = 'От 100 комнат — «не для гостей».';
    return false;
  }

  return true;
};

const getGuestsAndRoomsErrorMessage = () => guestsAndRoomsErrorMessage;

pristine.addValidator(
  guestsInput,
  validateGuestsAndRooms,
  getGuestsAndRoomsErrorMessage,
);

roomsInput.addEventListener('change', () => pristine.validate(guestsInput));

/*----------*/

const onTimeinChange = (evt) => {
  checkoutInput.value = evt.target.value;
};

checkinInput.addEventListener('change', onTimeinChange);

const onTimeoutChange = (evt) => {
  checkinInput.value = evt.target.value;
};

checkoutInput.addEventListener('change', onTimeoutChange);

/*----------*/

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

/*----------*/

advertisementForm.addEventListener('submit', (evt) => {
  //evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    //blockSubmitButton();
    //postAdvertisementData(new FormData(evt.target));
  }
});

/*
async function postAdvertisementData (formData) {
  try {
    await sendData(formData);
    advertisementForm.reset();
    pristine.reset();
    //openLoadPictureMessageSuccess();
  } catch (err) {
    showAlert(err.message);
    //openLoadPictureMessageError();
  } finally {
    unblockSubmitButton();
  }
}*/

export {
  MAX_PRICE_VALUE,
  pristine,
};
