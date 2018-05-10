'use strict';

(function () {
  var WIDTH_MARK_MAP = 25;
  var HEIGHT_MARK_MAP = 70;
  var HEIGHT_PIN = 40;

  var locatePin = function (advertisement, pinMain) {
    var similarAdvertisement = pinMain.cloneNode(true);
    similarAdvertisement.classList.remove('map__pin--main');
    var svg = similarAdvertisement.querySelector('svg');
    similarAdvertisement.removeChild(svg);
    var avatar = similarAdvertisement.querySelector('img');
    avatar.src = advertisement.author.avatar;
    avatar.height = HEIGHT_PIN;
    var positionX = advertisement.location.x - WIDTH_MARK_MAP;
    var positionY = advertisement.location.y - HEIGHT_MARK_MAP;
    similarAdvertisement.style.left = positionX + 'px';
    similarAdvertisement.style.top = positionY + 'px';
    return similarAdvertisement;
  };

  var createPin = function (pinMain, advertisements) {
    var fragment = document.createDocumentFragment();
    advertisements.forEach(function (pin) {
      fragment.appendChild(locatePin(pin, pinMain));
    });
    pinMain.parentElement.appendChild(fragment);
  };

  window.pin = {
    create: createPin
  };
})();
