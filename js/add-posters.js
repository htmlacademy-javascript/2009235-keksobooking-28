const mapСanvas = document.querySelector('#map-canvas');
const newPosterTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const getOfferType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return `Неизвестный тип жилья: ${ type }`;
  }
};

const addPosters = (postersData) => {
  console.log(postersData[0].offer.photos);
  const simularListFragment = document.createDocumentFragment();

  const addPoster = ({ author, offer, id}) => {
    const posterElement = newPosterTemplate.cloneNode(true);
    posterElement.querySelector('.popup__avatar').src = author.avatar;
    posterElement.querySelector('.popup__title').textContent = offer.title;
    posterElement.querySelector('.popup__text--address').textContent = offer.address;
    posterElement.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
    posterElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
    posterElement.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
    posterElement.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
    posterElement.querySelector('.popup__description').textContent = offer.description;

    const featuresList = posterElement.querySelector('.popup__features');
    const featuresItems = featuresList.querySelectorAll('.popup__feature');
    
    if (offer.features.length === 0) {
      featuresList.remove();
    } else {
      featuresList.innerHTML = '';
      featuresItems.forEach((item) => {
        const classesArray = item.classList.value.split(' ');
        for (let i = 0; i < offer.features.length; i++) {
          const coincidenceClass = classesArray.find((itemClass) => itemClass.includes(offer.features[i]));
          if (coincidenceClass) {
            featuresList.appendChild(item);
          }
        }
      })
    }

    const photosList = posterElement.querySelector('.popup__photos');
    const photosItem = photosList.querySelector('.popup__photo');

    if (offer.photos.length === 0) {
      photosList.remove();
    } else {
      photosList.innerHTML = '';
      const photosItemFragment = document.createDocumentFragment();
      for (let i = 0; i < offer.photos.length; i++) {
        const photosElement = photosItem.cloneNode(true);
        photosElement.src = offer.photos[i];
        photosItemFragment.appendChild(photosElement);
      }
      photosList.appendChild(photosItemFragment)
    }

       
    posterElement.dataset.pictureId = id;
    simularListFragment.appendChild(posterElement);
  };

  addPoster(postersData[0])

  mapСanvas.appendChild(simularListFragment);
};


export {addPosters};
