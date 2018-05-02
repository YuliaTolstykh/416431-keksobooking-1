'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    pinMain: document.querySelector('.map__pin--main'),
    form: document.querySelector('.ad-form'),
    formFilter: document.querySelector('.map__filters'),
    map: document.querySelector('.map'),
    removePinActive: function () {
      var activePin = window.util.map.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    },
    removePopup: function () {
      var popup = window.util.map.querySelector('.popup');
      if (popup) {
        window.util.map.removeChild(popup);
      }
    }
  };
})();
