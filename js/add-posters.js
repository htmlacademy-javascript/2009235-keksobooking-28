const mapСanvas = document.querySelector('#map-canvas');
const newPosterTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const OfferType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const getOfferType = (type) => OfferType[type.toUpperCase()];

const addPosters = (postersData) => {
  const simularListFragment = document.createDocumentFragment();

  const addPoster = ({ author, offer}) => {
    const posterProps = [
      {
        avatar: {
          condition: author.avatar,
          querySelector: '.popup__avatar',
          targetProp: 'src',
          targetValue: author.avatar,
        }
      }, {
        title: {
          condition: offer.title,
          querySelector: '.popup__title',
          targetProp: 'textContent',
          targetValue: offer.title,
        }
      }, {
        address: {
          condition: offer.address,
          querySelector: '.popup__text--address',
          targetProp: 'textContent',
          targetValue: offer.address,
        }
      }, {
        price: {
          condition: offer.price,
          querySelector: '.popup__text--price',
          targetProp: 'textContent',
          targetValue: `${ offer.price } ₽/ночь`,
        }
      }, {
        type: {
          condition: offer.type,
          querySelector: '.popup__type',
          targetProp: 'textContent',
          targetValue: getOfferType(offer.type),
        }
      }, {
        roomsAndGuests: {
          condition: offer.rooms && offer.guests,
          querySelector: '.popup__text--capacity',
          targetProp: 'textContent',
          targetValue: `${ offer.rooms } комнаты для ${ offer.guests } гостей`,
        }
      }, {
        checkiInOut: {
          condition: offer.checkin && offer.checkout,
          querySelector: '.popup__text--time',
          targetProp: 'textContent',
          targetValue: `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`,
        }
      }, {
        description: {
          condition: offer.description,
          querySelector: '.popup__description',
          targetProp: 'textContent',
          targetValue: offer.description,
        }
      }
    ];

    const posterElement = newPosterTemplate.cloneNode(true);


    const renderPosterProp = (condition, querySelector, targetProp, targetValue) => {
      const targetElement = posterElement.querySelector(querySelector);
      if (condition) {
        targetElement[targetProp] = targetValue;
      } else {
        targetElement.remove();
      }
    };

    posterProps.forEach((item) => Object.values(item).map((value) => renderPosterProp(value.condition, value.querySelector, value.targetProp, value.targetValue)));

    /*if (author.avatar) {
      posterElement.querySelector('.popup__avatar').src = author.avatar;
    } else {
      posterElement.querySelector('.popup__avatar').remove();
    }

    if (offer.title) {
      posterElement.querySelector('.popup__title').textContent = offer.title;
    } else {
      posterElement.querySelector('.popup__title').remove();
    }

    if (offer.address) {
      posterElement.querySelector('.popup__text--address').textContent = offer.address;
    } else {
      posterElement.querySelector('.popup__text--address').remove();
    }

    if (offer.price) {
      posterElement.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
    } else {
      posterElement.querySelector('.popup__text--price').remove();
    }

    if (offer.type) {
      posterElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
    } else {
      posterElement.querySelector('.popup__type').remove();
    }

    if (offer.rooms && offer.guests) {
      posterElement.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
    } else {
      posterElement.querySelector('.popup__text--capacity').remove();
    }

    if (offer.checkin && offer.checkout) {
      posterElement.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
    } else {
      posterElement.querySelector('.popup__text--time').remove();
    }

    if (offer.description) {
      posterElement.querySelector('.popup__description').textContent = offer.description;
    } else {
      posterElement.querySelector('.popup__description').remove();
    }*/

    if (offer.features) {
      const featuresList = posterElement.querySelector('.popup__features');
      const featuresItems = featuresList.querySelectorAll('.popup__feature');

      featuresList.innerHTML = '';
      featuresItems.forEach((item) => {
        const classesArray = item.classList.value.split(' ');
        for (let i = 0; i < offer.features.length; i++) {
          const coincidenceClass = classesArray.find((itemClass) => itemClass.includes(offer.features[i]));
          if (coincidenceClass) {
            featuresList.appendChild(item);
          }
        }
      });
    } else {
      posterElement.querySelector('.popup__features').remove();
    }


    if (offer.photos) {
      const photosList = posterElement.querySelector('.popup__photos');
      const photosItem = photosList.querySelector('.popup__photo');

      photosList.innerHTML = '';
      const photosItemFragment = document.createDocumentFragment();
      for (let i = 0; i < offer.photos.length; i++) {
        const photosElement = photosItem.cloneNode(true);
        photosElement.src = offer.photos[i];
        photosItemFragment.appendChild(photosElement);
      }
      photosList.appendChild(photosItemFragment);
    } else {
      posterElement.querySelector('.popup__photos').remove();
    }


    simularListFragment.appendChild(posterElement);
  };

  addPoster(postersData);

  mapСanvas.appendChild(simularListFragment);
};


export {addPosters};
