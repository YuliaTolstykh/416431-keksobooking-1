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

  window.showCard = function (ad) {
    var map = document.querySelector('.map');
    map.appendChild(createAdCard(ad));
    var card = map.querySelector('.map__card');
    var photo = [];
    for (var k = 1; k < ad.offer.photos.length; k++) {
      photo[k] = card.querySelector('.popup__photo').cloneNode(true);
      photo[k].src = ad.offer.photos[k];
      card.querySelector('.popup__photos').appendChild(photo[k]);
    }
  };
})();
