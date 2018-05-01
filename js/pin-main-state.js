'use strict';

(function () {
  var MIN_X = 100;
  var MAX_X = 1035;
  var MIN_Y = 150;
  var MAX_Y = 580;
  var addressInput = window.util.form.elements.address;

  var getInitialPosition = function (element) {
    addressInput.value = 'x: ' + element.style.left.slice(0, -2) + ', ' + 'y: ' + element.style.top.slice(0, -2);
    return {
      value: addressInput.value,
      left: element.style.left,
      top: element.style.top
    };
  };

  var initialPosition = getInitialPosition(window.util.pinMain);

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
        var pinMainShiftedX = window.util.pinMain.offsetLeft - shift.x;
        var pinMainShiftedY = window.util.pinMain.offsetTop - shift.y;
        var arrowPositionX = pinMainShiftedX;
        var arrowPositionY = pinMainShiftedY;
        if (arrowPositionX >= MIN_X && arrowPositionX <= MAX_X && arrowPositionY >= MIN_Y && arrowPositionY <= MAX_Y) {
          window.util.pinMain.style.left = (pinMainShiftedX) + 'px';
          window.util.pinMain.style.top = (pinMainShiftedY) + 'px';
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
