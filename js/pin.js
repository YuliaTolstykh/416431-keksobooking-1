'use strict';

(function () {
  var WIDTH_MARK_MAP = 25;
  var HEIGHT_MARK_MAP = 70;
  var CORRECTIVE_OFFSET = 100;
  var HEIGHT_PIN = 40;

  var locatePin = function (ad, pin) {
    var similarAd = pin.cloneNode(true);
    similarAd.classList.remove('map__pin--main');
    var svg = similarAd.querySelector('svg');
    similarAd.removeChild(svg);
    var avatar = similarAd.querySelector('img');
    avatar.src = ad.author.avatar;
    avatar.height = HEIGHT_PIN;
    var positionX = ad.location.x - WIDTH_MARK_MAP - CORRECTIVE_OFFSET;
    var positionY = ad.location.y + HEIGHT_MARK_MAP - CORRECTIVE_OFFSET;
    var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
    similarAd.style = position;
    return similarAd;
  };

  var createPin = function (pin, ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (pinElement) {
      fragment.appendChild(locatePin(pinElement, pin));
    });
    pin.parentElement.appendChild(fragment);
  };

  window.pin = {
    create: createPin
  };
})();
