const advertisementForm = document.querySelector('.ad-form');
const advertisementInputs = advertisementForm.querySelectorAll('input, select, textarea');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersInputs = mapFiltersForm.querySelectorAll('input, select');

const addNotActiveState = (formName , formInputs) => {
  formName.classList.add(`${formName.classList[0] }--disabled`);
  formInputs.forEach((input) => {
    input.setAttribute('disabled','');
  });
};

const setDisableAdvertisementForm = () => addNotActiveState(advertisementForm, advertisementInputs);

const setDisableMapFiltersForm = () => addNotActiveState(mapFiltersForm, mapFiltersInputs);

const addActiveState = (formName , formInputs) => {
  formName.classList.remove(`${formName.classList[0] }--disabled`);
  formInputs.forEach((input) => {
    input.removeAttribute('disabled');
  });
};

const setEnableAdvertisementForm = () => addActiveState(advertisementForm, advertisementInputs);

const setEnableMapFiltersForm = () => addActiveState(mapFiltersForm, mapFiltersInputs);

export {
  setDisableAdvertisementForm,
  setDisableMapFiltersForm,
  setEnableAdvertisementForm,
  setEnableMapFiltersForm,
};
