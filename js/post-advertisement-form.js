import {showAlert} from './utils.js';
import {sendData} from './api.js';
import {pristine} from './advertisement-form-check.js';
import {resetSettingsForMainPin} from './add-map.js';
import {resetPriceSlider} from './advertisement-form-price-slider.js';
import {openLoadAdvertisementMessageSuccess, openLoadAdvertisementMessageError} from './advertisement-post-result-messages.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовывается...'
};

const advertisementForm = document.querySelector('.ad-form');
const submitButton = advertisementForm.querySelector('button[type="submit"]');
const resetButton = advertisementForm.querySelector('button[type="reset"]');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

/*----------*/
/*
const resetAdvertisementForm = (evt) => {
  evt.preventDefault();
  advertisementForm.reset();
  resetPriceSlider();
  resetSettingsForMainPin();
  pristine.reset();
};

resetButton.addEventListener('click', resetAdvertisementForm);

//resetButton.click();
*/

const resetAdvertisementForm = () => {
  advertisementForm.reset();
  resetPriceSlider();
  resetSettingsForMainPin();
  pristine.reset();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdvertisementForm();
});

/*----------*/

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    postAdvertisementData(new FormData(evt.target));
  }
});


async function postAdvertisementData (formData) {
  try {
    await sendData(formData);
    resetAdvertisementForm();
    openLoadAdvertisementMessageSuccess();
  } catch (err) {
    showAlert(err.message);
    openLoadAdvertisementMessageError();
  } finally {
    unblockSubmitButton();
  }
}
