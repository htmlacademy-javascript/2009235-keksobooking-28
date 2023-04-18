import {
  createRandomIdFromRangeGenerator,
  createdIdGenerator,
  getRandomInteger,
} from './utils.js';

const offerTitles = [
  'Спешите!ТОП РАЙОНЧИК И ЦЕНА!ЛЮКС!',
  'Сдается холостятская конура',
  'Кодицирнер,ПММ+Супер ЛОКАЦИЯ!',
  'Жилой квартал Prime Park',
  '1-комн. кв., 43,6 м², 8/36 этаж',
  'Premium bungalow 60,5 m²',
];

const offerType = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const offerCheckInOut = [
  '12:00',
  '13:00',
  '14:00',
];

const offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const offerDescription = [
  'it is description qqqqq',
  'it is description wwwww',
  'it is description eeeee',
  'it is description rrrrr',
  'it is description ttttt',
  'it is description yyyyy',
];

const offerPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const generateID = createdIdGenerator();
const generateRandomAvatarURL = createRandomIdFromRangeGenerator(1, 10);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createLocation = () => ({
  lat: getRandomInteger((35.65000 * 10000), (35.70000 * 10000)) / 10000,
  lng: getRandomInteger((139.70000 * 10000), 139.80000 * 10000) / 10000,
  getAddress,
});

const createAutor = () => ({
  avatar: `img/avatars/user${ generateRandomAvatarURL().toString().padStart(2, '0') }.png`,
});

//const getAddress = (location) => `${ location.lat } , ${ location.lng }`;
function getAddress () {
  return `${ this.lat } , ${ this.lng }`;
}

const createOffer = (location) => ({
  title: getRandomArrayElement(offerTitles),
  address: location,
  price: getRandomInteger(1000, 30000),
  type: getRandomArrayElement(offerType),
  rooms: getRandomInteger(1, 10),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(offerCheckInOut),
  checkout: getRandomArrayElement(offerCheckInOut),
  features: getRandomArrayElement(offerFeatures),
  description: getRandomArrayElement(offerDescription),
  photos: getRandomArrayElement(offerPhotos),
});

const createPoster = () => {
  const poster = {
    id: generateID(),
    author: createAutor(),
    location: createLocation(),
  };

  poster.offer = createOffer(poster.location.getAddress());

  return poster;
};


const simularPosters = (count) => Array.from({length: count}, createPoster);

console.log(simularPosters(10));

export {simularPosters};
