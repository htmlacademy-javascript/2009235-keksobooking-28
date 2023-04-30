import './active-disable-state-forms.js';
import {simularPosters} from './simular-posters-data.js';
import './advertisement-form-check.js';
import './advertisement-form-price-slider.js';
import {createPoints} from './add-map.js';


const postersData = simularPosters(10);
//console.log(postersData);
createPoints(postersData);
