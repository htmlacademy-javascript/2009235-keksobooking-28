import {setEnableAdvertisementForm} from './active-disable-state-forms.js';
import {setEnablePriceFilter} from './advertisement-form-price-slider.js';
import {addPoster} from './add-posters.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 13;
const MAX_PINTS_COUNT = 10;

const iconConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const iconMainConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const startCoordinate = {
  lat: 35.681728,
  lng: 139.753905,
};

const advertisementForm = document.querySelector('.ad-form');
const addressInput = advertisementForm.querySelector('#address');
const map = L.map('map-canvas');

addressInput.setAttribute('readonly', true);

const getIconConfiguration = (iconConfiguration) => ({
  iconUrl: iconConfiguration.url,
  iconSize: L.point(iconConfiguration.width, iconConfiguration.height),
  iconAnchor: L.point(iconConfiguration.anchorX, iconConfiguration.anchorY),
});

const initMap = () => {
  map.on('load', () => {
    setEnableAdvertisementForm();
    setEnablePriceFilter();
  });
  map.setView(startCoordinate, ZOOM);
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const icon = L.icon(getIconConfiguration(iconConfig));

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(addPoster(point));
};

const createPoints = (points) => {
  markerGroup.clearLayers();
  if (points.length >= MAX_PINTS_COUNT) {
    points.slice(0, MAX_PINTS_COUNT).forEach((point) => {
      createMarker(point);
    });
  } else {
    points.forEach((point) => {
      createMarker(point);
    });
  }
};

/*----------*/

const mainPinIcon = L.icon(getIconConfiguration(iconMainConfig));

const mainPinMarker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

const setAddressInputValue = ({ lat, lng }) => {
  addressInput.value = `${ lat.toFixed(5) } , ${ lng.toFixed(5) }`;
};
setAddressInputValue(startCoordinate);

mainPinMarker.on('move', (evt) => {
  const mainPinLatLng = evt.target.getLatLng();
  setAddressInputValue(mainPinLatLng);
});

const resetSettingsForMainPin = () => {
  mainPinMarker.setLatLng(startCoordinate);
  map.setView(startCoordinate, ZOOM);
  setAddressInputValue(startCoordinate);
  map.closePopup();
};

export {createPoints, resetSettingsForMainPin, initMap};
