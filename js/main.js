import './active-disable-state-forms.js';
import {simularPosters} from './simular-posters-data.js';
import {addPosters} from './add-posters.js';
import './advertisement-form-check.js';
import {setPriceFilterDisable, setPriceFilterEnable} from './advertisement-form-price-slider.js';

const postersData = simularPosters(10);
addPosters(postersData[0]);
setPriceFilterEnable();

// дописать неактивное состояние для слайдера и карты
