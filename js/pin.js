'use strict';

(function () {
  var WIDTH_MARK_MAP = 31;
  var HEIGHT_MARK_MAP = 84;
  var CORRECTIVE_OFFSET = 100;

  var locatePin = function (ad, pin) {
    var similarAd = pin.cloneNode(true);
    similarAd.classList.remove('map__pin--main');
    var svg = similarAd.querySelector('svg');
    similarAd.removeChild(svg);
    var avatar = similarAd.querySelector('img');
    avatar.src = ad.author.avatar;
    var positionX = ad.location.x - WIDTH_MARK_MAP - CORRECTIVE_OFFSET;
    var positionY = ad.location.y + HEIGHT_MARK_MAP - CORRECTIVE_OFFSET;
    var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
    similarAd.style = position;
    return similarAd;
  };

  window.putPin = function (pin, ads, number) {
    var fragment = document.createDocumentFragment();
    var takePart = ads.length >= number ? number - 1 : ads.length - 1;
    for (var i = 0; i <= takePart; i++) {
      fragment.appendChild(locatePin(ads[i], pin));
    }
    pin.parentElement.appendChild(fragment);
    return pin.parentElement;
  };
})();
