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

/*let pointsData = [];

const getPointsDataSort = (data) => {
  pointsData = data;
  console.log(pointsData);
};*/

const getAdvertisementRank = (advertisement) => {
  const featuresFilterElements = mapFiltersForm.querySelectorAll('#housing-features input');

  let rank = 0;

  const advertisementFeatures = advertisement.offer.features;
  if (!advertisementFeatures) {
    return 0;
  }


  featuresFilterElements.forEach((featureFilter) => {
    if (featureFilter.checked && advertisementFeatures.includes(featureFilter.value)) {
      rank++;
    }
  });

  return rank;
};

const compareAdvertisement = (advertisementA, advertisementB) => {
  const rankA = getAdvertisementRank(advertisementA);
  const rankB = getAdvertisementRank(advertisementB);

  return rankB - rankA;
};

const startSort = (pointsData) => {
  const typeFilterElement = mapFiltersForm.querySelector('#housing-type');
  const priceFilterElement = mapFiltersForm.querySelector('#housing-price');
  const roomsFilterElement = mapFiltersForm.querySelector('#housing-rooms');
  const guestsFilterElement = mapFiltersForm.querySelector('#housing-guests');

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

  accordanceType = accordanceType.slice().sort(compareAdvertisement);

  createPoints(accordanceType);
};

const debounceSort = debounce((pointsData) => startSort(pointsData), RENDER_DELAY);

const getPointsDataSort = (responseData) => {
  const pointsData = responseData;
  mapFiltersForm.addEventListener('change', () => {
    debounceSort(pointsData);
  });
};


export {getPointsDataSort};
