'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var ACTIVATION_DELAY = 3000;
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

  var checkKeyCode = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
      return true;
    } else {
      return false;
    }
  };

  window.getInactiveState = function () {
    addDisabled(formFieldsets);
    addDisabled(formSelect);
    map.classList.add('map--faded');
    window.util.form.classList.add('ad-form--disabled');
    setTimeout(getActiveState, ACTIVATION_DELAY);
  };

  var getActiveState = function () {
    map.classList.remove('map--faded');
    window.util.form.classList.remove('ad-form--disabled');
    removeDisabled(formFieldsets);
    removeDisabled(formSelect);
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
    var targetElement = evt.target;
    var actualEvent;
    var handler = function () {
      var mapPinElements = document.querySelectorAll('.map__pin');
      var mapPins = [].slice.call(mapPinElements);
      setPinActive(mapPins, mapPins.indexOf(actualEvent));
    };
    if (targetElement.tagName === 'IMG') {
      actualEvent = targetElement.parentElement;
      handler();
    }
    if (targetElement.tagName === 'BUTTON') {
      actualEvent = targetElement;
      handler();
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

  var onFilterChange = function () {
    if (map.querySelector('.popup')) {
      window.util.removePopup();
    }
    window.util.removePin();
    ads = window.filterPins();
    window.putPin(window.util.pinMain, ads, NUMBER_SHOW_PIN).addEventListener('click', onPinClick);
  };

  var onPinMainMouseup = function () {
    window.util.pinMain.removeEventListener('mouseup', onPinMainMouseup);
    window.util.formFilter.addEventListener('change', function () {
      window.debounce(onFilterChange);
    });
  };

  var onPinMainMousedown = function (evt) {
    getActiveState();
    window.pinMainState.onPinMainMousedown(evt);
  };

  addDisabled(formFieldsets);
  addDisabled(formSelect);

  window.util.pinMain.addEventListener('mousedown', onPinMainMousedown);
  window.util.pinMain.addEventListener('keydown', onPinMainKeydown);
  window.util.pinMain.addEventListener('mouseup', onPinMainMouseup);
})();
