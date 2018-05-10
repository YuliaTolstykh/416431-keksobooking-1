'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFilter = document.querySelector('.map__filters');
  var map = document.querySelector('.map');

  window.util = {
    ESC_KEYCODE: 27,
    pinMain: pinMain,
    form: form,
    formFilter: formFilter,
    map: map,
    removePinActive: function () {
      var activePin = map.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    },
    removePopup: function () {
      var popup = map.querySelector('.popup');
      if (popup) {
        map.removeChild(popup);
      }
    },
    removePin: function () {
      var mapPins = [];
      var pins = map.querySelectorAll('.map__pin');
      mapPins = [].slice.call(pins);
      mapPins.shift();
      mapPins.forEach(function (item) {
        item.remove();
      });
    }
  };
})();
