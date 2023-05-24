import {isEscapeKey} from './utils.js';

const newLoadAdvertisementErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const newLoadAdvertisementSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeLoadAdvertisementMessage();
  }
};

const onCloseButton = (evt) => {
  evt.preventDefault();
  closeLoadAdvertisementMessage();
};

const onOutsideModalWindow = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeLoadAdvertisementMessage();
  }
};


function openLoadAdvertisementMessageError () {
  document.body.appendChild(newLoadAdvertisementErrorTemplate);
  const errorModalWindow = document.querySelector('.error');
  const errorCloseButton = errorModalWindow.querySelector('.error__button');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  errorCloseButton.addEventListener('click', onCloseButton);
  errorModalWindow.addEventListener('click', onOutsideModalWindow);
}


function openLoadAdvertisementMessageSuccess () {
  document.body.appendChild(newLoadAdvertisementSuccessTemplate);
  const successModalWindow = document.querySelector('.success');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  successModalWindow.addEventListener('click', onOutsideModalWindow);
}


function closeLoadAdvertisementMessage () {
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  const errorModalWindow = document.querySelector('.error');
  const successModalWindow = document.querySelector('.success');

  if (errorModalWindow) {
    const errorCloseButton = errorModalWindow.querySelector('.error__button');
    errorCloseButton.removeEventListener('click', onCloseButton);
    errorModalWindow.removeEventListener('click', onOutsideModalWindow);
    errorModalWindow.remove();
  } else if (successModalWindow) {
    successModalWindow.removeEventListener('click', onOutsideModalWindow);
    successModalWindow.remove();
  }
}

export {openLoadAdvertisementMessageSuccess, openLoadAdvertisementMessageError};
