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

const addPoster = ({ author, offer}) => {
  const posterOptions = [
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

  const renderPosterOptions = (condition, querySelector, targetProp, targetValue) => {
    const targetElement = posterElement.querySelector(querySelector);
    if (condition) {
      targetElement[targetProp] = targetValue;
    } else {
      targetElement.remove();
    }
  };

  posterOptions.forEach((item) => Object.values(item).map((value) => renderPosterOptions(value.condition, value.querySelector, value.targetProp, value.targetValue)));

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

  return posterElement;
};

export {addPoster};
