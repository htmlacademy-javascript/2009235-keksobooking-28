import {MAX_PRICE_VALUE, pristine} from './advertisement-form-check.js';

const START_VALUE = 0;

const advertisementForm = document.querySelector('.ad-form');
const sliderElement = advertisementForm.querySelector('.ad-form__slider');
const valueElement = advertisementForm.querySelector('#price');

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

const resetPriceSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: START_VALUE,
  });
  valueElement.value = null;
};

valueElement.value = null;
pristine.reset();

export {setEnablePriceFilter, resetPriceSlider};
