import {getData} from './api.js';
import {showAlert} from './utils.js';
import {createPoints} from './add-map.js';
import {setEnableMapFiltersForm} from './active-disable-state-forms.js';

try {
  const response = await getData();
  createPoints(response);
  setEnableMapFiltersForm();
} catch (err) {
  showAlert(err.message);
}
