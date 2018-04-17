'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SPACEBAR_KEYCODE = 32;
var WIDTH_MARK_MAP = 31;
var HEIGHT_MARK_MAP = 84;
var TOTAL_NUMBER_ADS = 8;
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPES = ['flat', 'house', 'bungalo'];
var AD_TIMES = ['12:00', '13:00', '14:00'];
var map = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var selectRandomElement = function (vector, n) {
  return vector.splice(getRandomInt(0, n), 1);
};

var mixElements = function (arr, n) {
  var attributes = [];
  var count = 0;
  do {
    attributes[count] = selectRandomElement(arr, arr.length - count);
    count++;
  } while (count < n);
  return attributes;
};

var ads = [];
var createAds = function () {
  for (var i = 0; i < TOTAL_NUMBER_ADS; i++) {
    var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var featuresLength = getRandomInt(1, features.length + 1);
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': selectRandomElement(AD_TITLES, i),
        'address': '',
        'price': getRandomInt(1000, 1000000),
        'type': AD_TYPES[getRandomInt(0, 3)],
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 100),
        'checkin': AD_TIMES[getRandomInt(0, 3)],
        'checkout': AD_TIMES[getRandomInt(0, 3)],
        'features': mixElements(features, featuresLength),
        'description': '',
        'photos': mixElements(adPhotos, adPhotos.length)
      },
      'location': {
        'x': getRandomInt(300, 900),
        'y': getRandomInt(100, 500)
      }
    };
    ads[i].offer.address = ads[i].location.x.toString() + ', ' + ads[i].location.y.toString();
  }
  return ads;
};

createAds();

var locateAds = function (ad, pin) {
  var similarAd = pin.cloneNode(true);
  similarAd.classList.remove('map__pin--main');
  var svg = similarAd.querySelector('svg');
  similarAd.removeChild(svg);
  var avatar = similarAd.querySelector('img');
  avatar.src = ad.author.avatar;
  var positionX = ad.location.x - WIDTH_MARK_MAP;
  var positionY = ad.location.y + HEIGHT_MARK_MAP;
  var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
  similarAd.style = position;
  return similarAd;
};

var offerType = {
  flat: {
    ru: 'Квартира'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  }
};

var getTextHTML = function (arr) {
  var textHTML = [];
  var n = 0;
  while (n < arr.length) {
    textHTML[n] = '<li class="feature feature--' + arr[n] + '"></li>';
    n++;
  }
  return textHTML;
};

var putPin = function (pin) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(locateAds(ads[j], pin));
  }
  pin.parentElement.appendChild(fragment);
  return pin.parentElement;
};

var createAdsElement = function (arr) {
  var similarAdsTemplate = document.querySelector('template').content;
  var adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.removeChild(adsElement.querySelector('.map__pin'));
  adsElement.querySelector('.popup__title').textContent = arr.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  adsElement.querySelector('.popup__text--price').innerHTML = arr.offer.price + ' &#x20bd;/ночь';
  adsElement.querySelector('.popup__type').textContent = offerType[arr.offer.type].ru;
  adsElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' для ' + arr.offer.guests + ' гостей';
  adsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  adsElement.querySelector('.popup__features').innerHTML = getTextHTML(arr.offer.features).join('');
  adsElement.querySelector('.popup__description').textContent = arr.offer.description;
  adsElement.querySelector('.popup__avatar').src = arr.author.avatar;
  adsElement.querySelector('.popup__photo').src = arr.offer.photos[0];
  return adsElement;
};

var showCard = function (ad) {
  map.appendChild(createAdsElement(ad));
  var card = map.querySelector('.map__card');
  var photo = [];
  for (var k = 1; k < ad.offer.photos.length; k++) {
    photo[k] = card.querySelector('.popup__photo').cloneNode(true);
    photo[k].src = ad.offer.photos[k];
    card.querySelector('.popup__photos').appendChild(photo[k]);
  }
};

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

var getStartCoords = function (element) {
  var startCoords = element.getBoundingClientRect();
  var positionElement = 'x: ' + Math.round(startCoords.x) + ', ' + 'y: ' + Math.round(startCoords.y);
  var addressInput = document.getElementById('address');
  addressInput.disabled = 'disabled';
  addressInput.value = positionElement;
  return addressInput.value;
};

window.startCoordsPinMain = getStartCoords(pinMain);
addDisabled(formFieldsets);
addDisabled(formSelect);
getStartCoords(pinMain);

var onPinMainMouseup = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  var pinAd = document.querySelector('.map__pin--main');
  var newMap = putPin(pinAd);
  removeDisabled(formFieldsets);
  removeDisabled(formSelect);
  pinMain.removeEventListener('mouseup', onPinMainMouseup);
  newMap.addEventListener('click', onPinClick);
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
    showCard(ads[n - 1]);
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

pinMain.addEventListener('keydown', onPinMainKeydown);
pinMain.addEventListener('mouseup', onPinMainMouseup);
