'use strict';

(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_PRICES_PER_NIGHT = [1000, 0, 5000, 10000];
  var APARTMENT_TYPES = ['квартиры', 'лачуги', 'дома', 'дворца'];
  var ACTIVE_OPTIONS = [
    [2],
    [1, 2],
    [0, 1, 2],
    [3]
  ];
  var INITIAL_OPTION_ROOMS = 0;
  var INITIAL_OPTION_CAPACITY = 2;
  var form = document.querySelector('.ad-form');
  var titleInput = form.elements.title;
  var addressInput = form.elements.address;
  var priceInput = form.elements.price;
  var selectTimein = form.elements.timein;
  var selectTimeout = form.elements.timeout;
  var selectRooms = form.elements.rooms;
  var selectCapacity = form.elements.capacity;
  var selectType = form.elements.type;
  var minPriceMessage = 'квартиры 1000';

  var changeColor = function (input) {
    input.style = 'border-color: red';
  };

  var returnColor = function (input) {
    input.removeAttribute('style');
  };

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort || titleInput.validity.tooLong || titleInput.validity.valueMissing) {
      changeColor(titleInput);
    } else {
      titleInput.setCustomValidity('');
      returnColor(titleInput);
    }
  });

  titleInput.addEventListener('input', function () {
    if (titleInput.validity.valid) {
      returnColor(titleInput);
    }
  });

  addressInput.addEventListener('invalid', function () {
    if (addressInput.validity.valueMissing) {
      addressInput.setCustomValidity('');
      changeColor(addressInput);
    } else {
      addressInput.setCustomValidity('');
      returnColor(addressInput);
    }
  });

  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная цена для ' + minPriceMessage + ' руб.');
      changeColor(priceInput);
    } else if (priceInput.validity.rangeOverflow || priceInput.validity.valueMissing || priceInput.validity.typeMismatch) {
      changeColor(priceInput);
    } else {
      priceInput.setCustomValidity('');
      returnColor(priceInput);
    }
  });

  priceInput.addEventListener('input', function () {
    if (priceInput.validity.valid) {
      returnColor(priceInput);
    }
  });

  var syncValues = function (field1, field2) {
    field2.value = field1.value;
  };

  var syncValueWithMin = function (fields1, fields2, values1, values2) {
    for (var j = 0; j < fields1.length; j++) {
      if (fields1.selectedIndex === j) {
        fields2.value = values1[j];
        fields2.min = values1[j];
        minPriceMessage = values2[j] + ' ' + values1[j];
        break;
      }
    }
    return minPriceMessage;
  };

  var syncValueWithPersons = function (fields1, fields2) {
    for (var i = 0; i < fields2.length; i++) {
      fields2.options[i].disabled = true;
    }
    for (var j = 0; j < fields2.length; j++) {
      if (fields1.selectedIndex === j) {
        fields2.options[ACTIVE_OPTIONS[j][0]].selected = true;
        for (var n = 0; n < ACTIVE_OPTIONS[j].length; n++) {
          fields2.options[ACTIVE_OPTIONS[j][n]].removeAttribute('disabled');
        }
      }
    }
  };

  var syncInitialValueWithPersons = function (field1, field2) {
    for (var i = 0; i < field2.length; i++) {
      field2.options[i].disabled = true;
    }
    field1.options[INITIAL_OPTION_ROOMS].selected = true;
    field2.options[INITIAL_OPTION_CAPACITY].removeAttribute('disabled');
    field2.options[INITIAL_OPTION_CAPACITY].selected = true;
  };

  syncInitialValueWithPersons(selectRooms, selectCapacity);
  window.synchronizeFields(selectTimein, selectTimeout, '', '', syncValues);
  window.synchronizeFields(selectTimeout, selectTimein, '', '', syncValues);
  window.synchronizeFields(selectType, priceInput, MIN_PRICES_PER_NIGHT, APARTMENT_TYPES, syncValueWithMin);
  window.synchronizeFields(selectRooms, selectCapacity, '', '', syncValueWithPersons);

  var checkForm = function (evt) {
    if (titleInput.value.length < MIN_LENGTH_TITLE || titleInput.value.length > MAX_LENGTH_TITLE) {
      changeColor(titleInput);
      evt.preventDefault();
    }
    if (priceInput.min < MIN_PRICE || priceInput.max > MAX_PRICE || priceInput.type !== 'number' || priceInput.value === '') {
      changeColor(priceInput);
      evt.preventDefault();
    }
    if (addressInput.value === '' || addressInput.value === 'undefined') {
      changeColor(addressInput);
      evt.preventDefault();
      return;
    }
  };

  var onFormReset = function () {
    syncInitialValueWithPersons(selectRooms, selectCapacity);
    addressInput.setAttribute('value', window.pinMainState.initialState.addressValue); // Вопрос: Почему строки эта и следующая не равноценны? эта -работает, следующая - нет.
    // addressInput.value = window.startCoordsPinMain;
    var pinMain = document.querySelector('.map__pin--main');
    pinMain.style = 'top: ' + window.pinMainState.initialState.positionTop + '; left: ' + window.pinMainState.initialState.positionLeft + ';';
  };

  form.addEventListener('reset', onFormReset);
  form.addEventListener('submit', checkForm);
})();
