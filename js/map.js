'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var ads;
  var formFieldsets = document.querySelectorAll('fieldset');
  var formSelect = document.querySelectorAll('.map__filter');

  var addDisabled = function (fieldsets) {
    fieldsets.forEach(function (item) {
      item.disabled = 'disabled';
    });
  };

  var removeDisabled = function (fieldsets) {
    fieldsets.forEach(function (item) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
    });
  };

  addDisabled(formFieldsets);
  addDisabled(formSelect);

  var onFilterChange = function () {
    if (map.querySelector('.popup')) {
      removePopup();
    }
    var mapPins = [];
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    mapPins.shift();
    mapPins.forEach(function (item) {
      item.remove();
    });
    ads = window.filterPin();
    window.putPin(pinMain, window.filterPin(), NUMBER_SHOW_PIN).addEventListener('click', onPinClick);
  };

  var onPinMainMouseup = function () {
    ads = window.initialAds;
    if (ads) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      var newMap = window.putPin(pinMain, ads, NUMBER_SHOW_PIN);
      removeDisabled(formFieldsets);
      removeDisabled(formSelect);
      pinMain.removeEventListener('mouseup', onPinMainMouseup);
      newMap.addEventListener('click', onPinClick);
      var formFilter = document.querySelector('.map__filters');
      formFilter.addEventListener('change', function () {
        window.debounce(onFilterChange);
      });
    }
  };

  var checkKeyCode = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
      return true;
    } else {
      return false;
    }
  };

  var onPinMainKeydown = function (evt) {
    if (checkKeyCode(evt)) {
      onPinMainMouseup();
      pinMain.removeEventListener('keydown', onPinMainKeydown);
    }
  };

  var onPinClick = function (evt) {
    removePinActive();
    removePopup();
    var target = evt.target;
    var actualEvent;
    var handler = function () {
      var mapPinElements = document.querySelectorAll('.map__pin');
      var mapPins = [].slice.call(mapPinElements);
      setPinActive(mapPins, mapPins.indexOf(actualEvent));
    };
    switch (target.tagName) {
      case 'IMG':
        actualEvent = target.parentElement;
        handler();
        break;
      case 'BUTTON':
        actualEvent = target;
        handler();
        break;
      default:
        break;
    }
  };

  var onPopupKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePinActive();
      removePopup();
      evt.stopPropagation();
      document.removeEventListener('keydown', onPopupKeydown);
    }
  };

  var setPinActive = function (pins, n) {
    if (n !== 0) {
      pins[n].classList.add('map__pin--active');
      window.showCard(ads[n - 1]);
      var popupClose = document.querySelector('.popup__close');
      var onPopupCloseClick = function () {
        removePinActive();
        removePopup();
        popupClose.removeEventListener('click', onPopupCloseClick);
      };
      document.addEventListener('keydown', onPopupKeydown);
      popupClose.addEventListener('click', onPopupCloseClick);
    }
  };

  var removePinActive = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
    }
  };

  pinMain.addEventListener('mousedown', window.pinMainState.onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);
  pinMain.addEventListener('mouseup', onPinMainMouseup);
})();
