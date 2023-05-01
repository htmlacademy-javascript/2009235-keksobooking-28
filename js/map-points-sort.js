import {createPoints} from './add-map.js';
import {debounce} from './utils.js';

//const RENDER_DELAY = 500;
//const debounceSort = debounce((filterId) => startSort(filterId), RENDER_DELAY);
//debounceSort(evt.target.id);

const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterElement = mapFiltersForm.querySelector('#housing-type');
const priceFilterElement = mapFiltersForm.querySelector('#housing-price');
const roomsFilterElement = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersForm.querySelector('#housing-guests');
const featuresFilterElement = mapFiltersForm.querySelectorAll('#housing-features input');

let pointsData = [];

const getPointsDataSort = (data) => {
  pointsData = data;
  console.log(pointsData);
};



export {getPointsDataSort};
