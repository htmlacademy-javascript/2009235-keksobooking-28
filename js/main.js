import {setDisableAdvertisementForm, setDisableMapFiltersForm} from './active-disable-state-forms.js';
import {initMap} from './add-map.js';
import {fetchPosters} from './get-posters.js';
import {onSubmitAdvertisementForm} from './post-advertisement-form.js';

setDisableAdvertisementForm();
setDisableMapFiltersForm();
initMap();
fetchPosters();
onSubmitAdvertisementForm();
