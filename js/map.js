'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var ACTIVATION_DELAY = 2000;
  var map = window.util.map;
  var ads;
  var formFieldsets = document.querySelectorAll('fieldset');
  var formSelect = document.querySelectorAll('.map__filter');
  var initialAds = [];

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
    return evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE;
  };

  var getInactiveStatePage = function () {
    addDisabled(formFieldsets);
    addDisabled(formSelect);
    map.classList.add('map--faded');
    window.util.form.classList.add('ad-form--disabled');
    var setDelayedFunction = function () {
      getActiveStatePage();
      getActiveStateMap(window.map.initialAds);
    };
    setTimeout(setDelayedFunction, ACTIVATION_DELAY);
  };

  var getActiveStatePage = function () {
    map.classList.remove('map--faded');
    window.util.form.classList.remove('ad-form--disabled');
    removeDisabled(formFieldsets);
    removeDisabled(formSelect);
  };

  var getActiveStateMap = function (data) {
    ads = data;
    window.pin.create(window.util.pinMain, data.slice(0, NUMBER_SHOW_PIN));
    map.addEventListener('click', onPinClick);
  };

  var onPinMainKeydown = function (evt) {
    if (checkKeyCode(evt)) {
      getActiveStatePage();
      onPinMainMouseup();
      window.util.pinMain.removeEventListener('keydown', onPinMainKeydown);
    }
  };

  var onPinClick = function (evt) {
    var targetElement = evt.target;
    var actualEvent;
    var handler = function () {
      window.util.removePinActive();
      window.util.removePopup();
      var mapPinElements = map.querySelectorAll('.map__pin');
      var mapPins = [].slice.call(mapPinElements);
      setPinActive(mapPins, mapPins.indexOf(actualEvent));
    };
    if (targetElement.tagName === 'IMG' && targetElement.parentElement.tagName === 'BUTTON') {
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
      var popupClose = map.querySelector('.popup__close');
      var onPopupCloseClick = function (evt) {
        window.util.removePinActive();
        window.util.removePopup();
        evt.stopPropagation();
        popupClose.removeEventListener('click', onPopupCloseClick);
      };
      document.addEventListener('keydown', onPopupKeydown);
      popupClose.addEventListener('click', onPopupCloseClick);
    }
  };

  var onFilterChange = function () {
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      window.util.removePopup();
    }
    window.util.removePin();
    ads = window.filterPins();
    getActiveStateMap(ads);
  };

  var onLoad = function (data) {
    window.map.initialAds = data;
    getActiveStateMap(window.map.initialAds);
  };

  var onPinMainMouseup = function () {
    window.util.pinMain.removeEventListener('mouseup', onPinMainMouseup);
    window.backend.load(onLoad, window.statusLoading.onError);
    window.util.formFilter.addEventListener('change', function () {
      window.debounce(onFilterChange);
    });
  };

  var onPinMainMousedown = function (evt) {
    getActiveStatePage();
    window.pinMainState.onPinMainMousedown(evt);
  };

  addDisabled(formFieldsets);
  addDisabled(formSelect);

  window.util.pinMain.addEventListener('mousedown', onPinMainMousedown);
  window.util.pinMain.addEventListener('keydown', onPinMainKeydown);
  window.util.pinMain.addEventListener('mouseup', onPinMainMouseup);

  window.map = {
    initialAds: initialAds,
    getInactiveStatePage: getInactiveStatePage
  };
})();
