'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var map = window.util.map;
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
      window.util.removePopup();
    }
    var mapPins = [];
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    mapPins.shift();
    mapPins.forEach(function (item) {
      item.remove();
    });
    ads = window.filterPin();
    window.putPin(window.util.pinMain, window.filterPin(), NUMBER_SHOW_PIN).addEventListener('click', onPinClick);
  };

  var onPinMainMouseup = function () {
    ads = window.initialAds;
    if (ads) {
      map.classList.remove('map--faded');
      window.util.form.classList.remove('ad-form--disabled');
      var newMap = window.putPin(window.util.pinMain, ads, NUMBER_SHOW_PIN);
      removeDisabled(formFieldsets);
      removeDisabled(formSelect);
      window.util.pinMain.removeEventListener('mouseup', onPinMainMouseup);
      newMap.addEventListener('click', onPinClick);
      window.util.formFilter.addEventListener('change', function () {
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
      window.util.pinMain.removeEventListener('keydown', onPinMainKeydown);
    }
  };

  var onPinClick = function (evt) {
    window.util.removePinActive();
    window.util.removePopup();
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
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.util.removePinActive();
      window.util.removePopup();
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
        window.util.removePinActive();
        window.util.removePopup();
        popupClose.removeEventListener('click', onPopupCloseClick);
      };
      document.addEventListener('keydown', onPopupKeydown);
      popupClose.addEventListener('click', onPopupCloseClick);
    }
  };

  window.util.pinMain.addEventListener('mousedown', window.pinMainState.onPinMainMousedown);
  window.util.pinMain.addEventListener('keydown', onPinMainKeydown);
  window.util.pinMain.addEventListener('mouseup', onPinMainMouseup);
})();
