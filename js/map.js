'use strict';

var WIDTH_MARK_MAP = 31;
var HEIGHT_MARK_MAP = 84;
var TOTAL_NUMBER_ADS = 8;
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPES = ['flat', 'house', 'bungalo'];
var AD_TIMES = ['12:00', '13:00', '14:00'];

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
  var similarAds = pin.cloneNode(true);
  var avatar = similarAds.querySelector('img');
  avatar.src = ad.author.avatar;
  var positionX = ad.location.x - WIDTH_MARK_MAP;
  var positionY = ad.location.y + HEIGHT_MARK_MAP;
  var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
  similarAds.style = position;
  return similarAds;
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
};

var createAdsElement = function (arr) {
  var similarAdsTemplate = document.querySelector('template').content;
  createAdsElement = similarAdsTemplate.cloneNode(true);
  createAdsElement.querySelector('.popup__title').textContent = arr.offer.title;
  createAdsElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  createAdsElement.querySelector('.popup__text--price').innerHTML = arr.offer.price + ' &#x20bd;/ночь';
  createAdsElement.querySelector('.popup__type').textContent = offerType[arr.offer.type].ru;
  createAdsElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' для ' + arr.offer.guests + ' гостей';
  createAdsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  createAdsElement.querySelector('.popup__features').innerHTML = getTextHTML(arr.offer.features).join('');
  createAdsElement.querySelector('.popup__description').textContent = arr.offer.description;
  createAdsElement.querySelector('.popup__avatar').src = arr.author.avatar;
  createAdsElement.querySelector('.popup__photo').src = arr.offer.photos[0];
  return createAdsElement;
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinAd = document.querySelector('.map__pin');
putPin(pinAd);
showCard(ads[0]);
