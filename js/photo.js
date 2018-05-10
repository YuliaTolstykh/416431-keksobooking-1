'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo-container');
  var divNamePhoto = photoPreview.querySelectorAll('div');
  var AVATAR_PREVIEW_SRC = avatarPreview.src;
  var reader;

  var uploadFile = function (fileChooser, cb) {
    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var select = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (select) {
        reader = new FileReader();
        reader.addEventListener('load', cb);
        reader.readAsDataURL(file);
      }
    }
  };

  var onAvatarChooserChange = function () {
    var cb = function () {
      avatarPreview.src = reader.result;
    };
    uploadFile(avatarChooser, cb);
  };

  var onPhotoChooserChange = function () {
    divNamePhoto[1].classList.remove('ad-form__photo');
    var cb = function () {
      var image = document.createElement('img');
      image.className = 'ad-form__photo';
      image.src = reader.result;
      photoPreview.appendChild(image);
    };
    uploadFile(photoChooser, cb);
  };

  photoPreview.addEventListener('dblclick', function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG') {
      photoPreview.removeChild(target);
    }
  });

  avatarChooser.addEventListener('change', onAvatarChooserChange);
  photoChooser.addEventListener('change', onPhotoChooserChange);

  var removePhoto = function () {
    avatarPreview.src = AVATAR_PREVIEW_SRC;
    var images = photoPreview.querySelectorAll('img');
    images.forEach(function (it) {
      photoPreview.removeChild(it);
    });
    divNamePhoto[1].classList.add('ad-form__photo');
  };

  window.photo = {
    remove: removePhoto
  };
})();
