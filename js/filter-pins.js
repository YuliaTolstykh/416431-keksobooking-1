'use strict';

(function () {
  var FILTER_TYPE = 0;
  var FILTER_PRICE = 1;
  var FILTER_ROOMS = 2;
  var FILTER_GUESTS = 3;
  var MAX_LOW_PRICE = 10000;
  var MIN_HIGH_PRICE = 50000;
  var OPTION_ANY = 'any';
  var formFilter = document.querySelector('.map__filters');

  var offerPrice = function (price) {
    var lowPrice = (price < MAX_LOW_PRICE);
    var highPrice = (price >= MIN_HIGH_PRICE);
    var middlePrice = (price >= MAX_LOW_PRICE && price < MIN_HIGH_PRICE);
    switch (!!price) {
      case lowPrice:
        price = 'low';
        break;
      case highPrice:
        price = 'high';
        break;
      case middlePrice:
        price = 'middle';
        break;
      default:
        price = OPTION_ANY;
        break;
    }
    return price;
  };

  var getFeaturesAds = function (ads) {
    var features = formFilter.querySelectorAll('input[type=checkbox]:checked');
    var truthFeatures = true;
    if (features.length === 0) {
      truthFeatures = true;
    } else {
      features.forEach(function (it) {
        if (ads.offer.features.indexOf(it.value) === -1) {
          truthFeatures = false;
        }
      });
    }
    return truthFeatures;
  };

  var getFilter = function (ads) {
    return ((formFilter.elements[FILTER_TYPE].value === OPTION_ANY) ? ads : ads.offer.type === formFilter.elements[FILTER_TYPE].value)
    && ((formFilter.elements[FILTER_PRICE].value === OPTION_ANY) ? ads : offerPrice(ads.offer.price) === formFilter.elements[FILTER_PRICE].value)
    && ((formFilter.elements[FILTER_ROOMS].value === OPTION_ANY) ? ads : ads.offer.rooms === +formFilter.elements[FILTER_ROOMS].value)
    && ((formFilter.elements[FILTER_GUESTS].value === OPTION_ANY) ? ads : ads.offer.guests === +formFilter.elements[FILTER_GUESTS].value)
    && getFeaturesAds(ads);
  };

  window.filterPin = function () {
    var dataAds = window.initialAds.filter(getFilter);
    return dataAds;
  };
}());