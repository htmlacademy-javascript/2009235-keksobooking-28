const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const advertisementForm = document.querySelector('.ad-form');
const avatarFileInput = advertisementForm.querySelector('.ad-form__field');
const photosInput = advertisementForm.querySelector('.ad-form__upload');
const avatarPreview = advertisementForm.querySelector('.ad-form-header__preview');
const photosPreview = advertisementForm.querySelector('.ad-form__photo');

const changePicturePreview = (evt, preview) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const previewFile = URL.createObjectURL(file);
    const previewIcon = preview.querySelector('img');
    if (preview.querySelector('img')) {
      previewIcon.style.zIndex = '-1';
    }

    preview.style.backgroundImage = `url("${ previewFile }")`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  }
};

const cleanPicturePreview = (preview) => {
  const previewIcon = preview.querySelector('img');
  if (preview.querySelector('img')) {
    previewIcon.removeAttribute('style');
  }
  preview.removeAttribute('style');
};

const resetPreviews = () => {
  cleanPicturePreview(avatarPreview);
  cleanPicturePreview(photosPreview);
};

avatarFileInput.addEventListener('change', (evt) => {
  changePicturePreview(evt, avatarPreview);
});

photosInput.addEventListener('change', (evt) => {
  changePicturePreview(evt, photosPreview);
});

export {resetPreviews};
