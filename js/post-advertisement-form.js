import {showAlert} from './utils.js';
import {sendData} from './api.js';
import {pristine, chagePriceInputPlaceholder} from './advertisement-form-check.js';
import {resetSettingsForMainPin} from './add-map.js';
import {resetPriceSlider} from './advertisement-form-price-slider.js';
import {openLoadAdvertisementMessageSuccess, openLoadAdvertisementMessageError} from './advertisement-post-result-messages.js';
import {resetMapFiltersForm} from './map-points-sort.js';
import {resetPreviews} from './advertisement-form-change-picture-preview.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовывается...'
};

const advertisementForm = document.querySelector('.ad-form');
const submitButton = advertisementForm.querySelector('button[type="submit"]');
const resetButton = advertisementForm.querySelector('button[type="reset"]');

const toggleSubmitBtn = (state) => {
  if (state === 'blocked') {
    submitButton.disabled = true;
    submitButton.textContent = SubmitButtonText.SENDING;
  } else {
    submitButton.disabled = false;
    submitButton.textContent = SubmitButtonText.IDLE;
  }
};

/*----------*/

const resetAdvertisementForm = () => {
  advertisementForm.reset();
  resetPriceSlider();
  resetSettingsForMainPin();
  pristine.reset();
  chagePriceInputPlaceholder();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdvertisementForm();
  resetPreviews();
});

/*----------*/

const onSubmitAdvertisementForm = () => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitBtn('blocked');
      postAdvertisementData(new FormData(evt.target));
    }
  });
};

async function postAdvertisementData (formData) {
  try {
    await sendData(formData);
    resetAdvertisementForm();
    resetPreviews();
    resetMapFiltersForm();
    openLoadAdvertisementMessageSuccess();
  } catch (err) {
    showAlert(err.message);
    openLoadAdvertisementMessageError();
  } finally {
    toggleSubmitBtn('unblocked');
  }
}

export {onSubmitAdvertisementForm};
