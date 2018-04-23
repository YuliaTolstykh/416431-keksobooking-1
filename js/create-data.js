'use strict';

(function () {
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

  window.createData = function () {
    var dataAds = [];
    for (var i = 0; i < TOTAL_NUMBER_ADS; i++) {
      var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
      var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      var featuresLength = getRandomInt(1, features.length + 1);
      dataAds[i] = {
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
      dataAds[i].offer.address = dataAds[i].location.x.toString() + ', ' + dataAds[i].location.y.toString();
    }
    return dataAds;
  };

})();
