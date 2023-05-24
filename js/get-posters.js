import {getData} from './api.js';
import {showAlert} from './utils.js';
import {createPoints} from './add-map.js';
import {setEnableMapFiltersForm} from './active-disable-state-forms.js';
import {getPointsDataSort} from './map-points-sort.js';

try {
  const response = await getData();
  createPoints(response);
  setEnableMapFiltersForm();
  getPointsDataSort(response);
} catch (err) {
  showAlert(err.message);
}
