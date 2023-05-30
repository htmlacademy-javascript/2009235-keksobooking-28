const MAIN_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const advertisementForm = document.querySelector('.ad-form');
const avatarFileInput = advertisementForm.querySelector('.ad-form__field');
const photosInput = advertisementForm.querySelector('.ad-form__upload');
const avatarPreview = advertisementForm.querySelector('.ad-form-header__preview');
const photosPreview = advertisementForm.querySelector('.ad-form__photo');

const changePicturePreview = (evt, preview, allowedFilesType = MAIN_FILE_TYPES) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = allowedFilesType.some((it) => fileName.endsWith(it));

  if (matches) {
    const previewFile = URL.createObjectURL(file);
    const previewIcon = preview.querySelector('img');
    if (previewIcon) {
      previewIcon.style.zIndex = '-1';
    }

    preview.style.backgroundImage = `url("${ previewFile }")`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  }
};

const cleanPicturePreview = (preview) => {
  const previewIcon = preview.querySelector('img');
  if (previewIcon) {
    previewIcon.removeAttribute('style');
  }
  preview.removeAttribute('style');
};

const resetPreviews = () => {
  cleanPicturePreview(avatarPreview);
  cleanPicturePreview(photosPreview);
};

avatarFileInput.addEventListener('change', (evt) => {
  changePicturePreview(evt, avatarPreview, AVATAR_FILE_TYPES);
});

photosInput.addEventListener('change', (evt) => {
  changePicturePreview(evt, photosPreview);
});

export {resetPreviews};
