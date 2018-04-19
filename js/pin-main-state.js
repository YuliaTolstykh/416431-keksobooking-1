'use strict';

(function () {
  var MIN_X = 100;
  var MAX_X = 1035;
  var MIN_Y = 100;
  var MAX_Y = 580;
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = form.elements.address;

  var getInitialPosition = function (element) {
    addressInput.value = 'x: ' + element.style.left + ', ' + 'y: ' + element.style.top;
    return {
      value: addressInput.value,
      left: element.style.left,
      top: element.style.top
    };
  };

  var initialPosition = getInitialPosition(pinMain);

  window.pinMainState = {
    initialState: {
      addressValue: initialPosition.value,
      positionLeft: initialPosition.left,
      positionTop: initialPosition.top
    },
    onPinMainMousedown: function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var pinMainShiftedX = pinMain.offsetLeft - shift.x;
        var pinMainShiftedY = pinMain.offsetTop - shift.y;
        var arrowPositionX = pinMainShiftedX;
        var arrowPositionY = pinMainShiftedY;
        if (arrowPositionX >= MIN_X && arrowPositionX <= MAX_X && arrowPositionY >= MIN_Y && arrowPositionY <= MAX_Y) {
          pinMain.style.left = (pinMainShiftedX) + 'px';
          pinMain.style.top = (pinMainShiftedY) + 'px';
          var pinMainPosition = 'x: ' + arrowPositionX + ', ' + 'y: ' + arrowPositionY;
          addressInput.value = pinMainPosition;
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
}());
