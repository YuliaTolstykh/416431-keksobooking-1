'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ERROR_TOP_INDENT = 200;
  var ERROR_INDENT = 5;
  var ERROR_COLOR = '#f0f0ea;';
  var form = document.querySelector('.ad-form');

  var drawMessageWindow = function (color, message, indentTop, indent, parentDiv) {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; padding: 150px 0; text-align: center; background-color: ' + color;
    div.style.position = 'absolute';
    div.style.top = indentTop + 'px';
    div.style.left = indent + '%';
    div.style.right = indent + '%';
    div.style.fontSize = '30px';
    div.textContent = message;
    var removeDiv = function () {
      parentDiv.removeChild(div);
      document.body.removeEventListener('keydown', onDivKeydown);
      div.removeEventListener('click', onDivClick);
    };
    var onDivClick = function () {
      removeDiv(div);
    };
    var onDivKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeDiv(div);
      }
    };
    div.addEventListener('click', onDivClick);
    document.body.addEventListener('keydown', onDivKeydown);
    return div;
  };

  var onLoad = function (data) {
    window.initialAds = data;
  };

  var onError = function (message) {
    var div = drawMessageWindow(ERROR_COLOR, message, ERROR_TOP_INDENT, ERROR_INDENT, document.body);
    document.body.insertAdjacentElement('afterbegin', div);
  };

  var onSave = function () {
    form.reset();
  };

  var sendForm = function () {
    window.backend.save(new FormData(form), onSave, onError);
  };

  form.addEventListener('submit', function (evt) {
    window.checkForm(evt, sendForm);
  });

  window.backend.load(onLoad, onError);
}());
