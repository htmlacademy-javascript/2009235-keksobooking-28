import './active-disable-state-forms.js';
import {simularPosters} from './simular-posters-data.js';
import {addPosters} from './add-posters.js';
import './advertisement-form-check.js';

const postersData = simularPosters(10);
addPosters(postersData[0]);

// дописать неактивное состояние для слайдера и карты
