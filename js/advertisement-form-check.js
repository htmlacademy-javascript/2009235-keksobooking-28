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
const avatarFileInput = advertisementForm.querySelector('#avatar');
const photosInput = advertisementForm.querySelector('#images');
const titleInput = advertisementForm.querySelector('#title');
const typeInput = advertisementForm.querySelector('#type');
const priceInput = advertisementForm.querySelector('#price');
const roomsInput = advertisementForm.querySelector('#room_number');
const guestsInput = advertisementForm.querySelector('#capacity');
const checkinInput = advertisementForm.querySelector('#timein');
const checkoutInput = advertisementForm.querySelector('#timeout');
const inputsRequired = advertisementForm.querySelectorAll('[required]');


inputsRequired.forEach((inputRequired) => {
  inputRequired.dataset.pristineRequiredMessage = 'Обязательное для заполнения поле.';
});

const pristine = new Pristine(advertisementForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
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

export {
  MAX_PRICE_VALUE,
  pristine,
};
