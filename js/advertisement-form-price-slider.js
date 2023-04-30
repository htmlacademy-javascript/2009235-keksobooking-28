import {MAX_PRICE_VALUE, pristine} from './advertisement-form-check.js';

const START_VALUE = 5000;

const advertisementForm = document.querySelector('.ad-form');
const sliderElement = advertisementForm.querySelector('.ad-form__slider');
const valueElement = advertisementForm.querySelector('input[id="price"]');
const resetButton = advertisementForm.querySelector('button[type="reset"]');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE_VALUE,
  },
  start: START_VALUE,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  pristine.validate(valueElement);
});

const onChangeValueElement = (evt) => sliderElement.noUiSlider.set(evt.target.value);

const setDisablePriceFilter = () => {
  sliderElement.setAttribute('disabled', true);
  valueElement.removeEventListener('input', onChangeValueElement);
};

const setEnablePriceFilter = () => {
  sliderElement.removeAttribute('disabled');
  valueElement.addEventListener('input', onChangeValueElement);
};

setDisablePriceFilter();

const resetAdvertisementForm = (evt) => {
  evt.preventDefault();
  advertisementForm.reset();
  sliderElement.noUiSlider.updateOptions({
    start: START_VALUE,
  });
  valueElement.value = START_VALUE;
  pristine.reset();
};

resetButton.addEventListener('click', resetAdvertisementForm);

export {setEnablePriceFilter, resetAdvertisementForm};
