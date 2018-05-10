'use strict';

(function () {

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

  var createAdCard = function (arr) {
    var similarAdvertisementsTemplate = document.querySelector('template').content;
    var advertisement = similarAdvertisementsTemplate.cloneNode(true);
    advertisement.removeChild(advertisement.querySelector('.map__pin'));
    advertisement.querySelector('.popup__title').textContent = arr.offer.title;
    advertisement.querySelector('.popup__text--address').textContent = arr.offer.address;
    advertisement.querySelector('.popup__text--price').innerHTML = arr.offer.price + ' &#x20bd;/ночь';
    advertisement.querySelector('.popup__type').textContent = offerType[arr.offer.type].ru;
    advertisement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' для ' + arr.offer.guests + ' гостей';
    advertisement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    advertisement.querySelector('.popup__description').textContent = arr.offer.description;
    advertisement.querySelector('.popup__avatar').src = arr.author.avatar;

    var checkData = function (data, cb, className) {
      if (data.length !== 0) {
        cb();
      } else {
        var node = advertisement.querySelector(className);
        node.parentNode.removeChild(node);
      }
    };

    var getFeatures = function () {
      advertisement.querySelector('.popup__features').innerHTML = getTextHTML(arr.offer.features).join('');
    };

    var getPhotos = function () {
      advertisement.querySelector('.popup__photo').src = arr.offer.photos[0];
    };

    checkData(arr.offer.features, getFeatures, '.popup__features');
    checkData(arr.offer.photos, getPhotos, '.popup__photos');
    return advertisement;
  };

  window.showCard = function (dataCard) {
    window.util.map.appendChild(createAdCard(dataCard));
    var card = window.util.map.querySelector('.map__card');
    var photo = [];
    for (var k = 1; k < dataCard.offer.photos.length; k++) {
      photo[k] = card.querySelector('.popup__photo').cloneNode(true);
      photo[k].src = dataCard.offer.photos[k];
      card.querySelector('.popup__photos').appendChild(photo[k]);
    }
  };
})();
