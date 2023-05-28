import {createPoints} from './add-map.js';
import {debounce} from './utils.js';

const DEFAULT_FILTER = 'any';
const RENDER_DELAY = 500;
const PricesRange = {
  low: {min: 0, max: 9999},
  middle: {min: 10000, max: 50000},
  high: {min: 50001, max: Infinity},
};


const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterElement = mapFiltersForm.querySelector('#housing-type');
const priceFilterElement = mapFiltersForm.querySelector('#housing-price');
const roomsFilterElement = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersForm.querySelector('#housing-guests');
const featuresFilterElements = mapFiltersForm.querySelectorAll('#housing-features input');

let pointsData = [];

const getPointsDataSort = (data) => {
  pointsData = data;
};


const startSort = () => {
  let accordanceType = pointsData;

  if (typeFilterElement.value !== DEFAULT_FILTER) {
    accordanceType = accordanceType.filter((element) => element.offer.type === typeFilterElement.value);
  }

  if (priceFilterElement.value !== DEFAULT_FILTER) {
    const minPrice = PricesRange[priceFilterElement.value].min;
    const maxPrice = PricesRange[priceFilterElement.value].max;
    accordanceType = accordanceType.filter((element) => minPrice <= element.offer.price && element.offer.price <= maxPrice);
  }

  if (roomsFilterElement.value !== DEFAULT_FILTER) {
    const roomsCount = +roomsFilterElement.value;
    accordanceType = accordanceType.filter((element) => element.offer.rooms === roomsCount);
  }

  if (guestsFilterElement.value !== DEFAULT_FILTER) {
    const guestsCount = +guestsFilterElement.value;
    accordanceType = accordanceType.filter((element) => element.offer.guests === guestsCount);
  }

  featuresFilterElements.forEach((featureFilter) => {
    if (featureFilter.checked) {
      accordanceType = accordanceType.filter((element) => {
        const advertisementFeatures = element.offer.features;
        if (advertisementFeatures) {
          return advertisementFeatures.includes(featureFilter.value);
        }
        return false;
      });
    }
  });

  createPoints(accordanceType);
};

const debounceSort = debounce(startSort, RENDER_DELAY);


mapFiltersForm.addEventListener('change', () => {
  debounceSort();
});

const resetMapFiltersForm = () => {
  mapFiltersForm.reset();
  startSort();
};

export {getPointsDataSort, resetMapFiltersForm};
