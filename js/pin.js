'use strict';

(function () {
  var WIDTH_MARK_MAP = 31;
  var HEIGHT_MARK_MAP = 84;

  var locatePin = function (ad, pin) {
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

  window.putPin = function (pin, ads) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(locatePin(ads[j], pin));
    }
    pin.parentElement.appendChild(fragment);
    return pin.parentElement;
  };
})();
