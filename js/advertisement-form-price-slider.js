import {MAX_PRICE_VALUE, pristine} from './advertisement-form-check.js';

const advertisementForm = document.querySelector('.ad-form');
const sliderElement = advertisementForm.querySelector('.ad-form__slider');
const valueElement = advertisementForm.querySelector('input[id="price"]');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE_VALUE,
  },
  start: 0,
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

const setPriceFilterDisable = () => {
  sliderElement.setAttribute('disabled', true);
  valueElement.removeEventListener('input', onChangeValueElement);
};

const setPriceFilterEnable = () => {
  sliderElement.removeAttribute('disabled');
  valueElement.addEventListener('input', onChangeValueElement);
};

export {setPriceFilterDisable, setPriceFilterEnable};
