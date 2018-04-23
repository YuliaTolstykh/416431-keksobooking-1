'use strict';

(function () {
  var LOAD_OK = 200;
  var LOAD_BAD_REQUEST = 400;
  var LOAD_NOT_FOUND = 404;
  var LOAD_TIMEOUT = 5000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case LOAD_OK:
          break;
        case LOAD_BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case LOAD_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
      if (xhr.response !== null) {
        onLoad(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = LOAD_TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },
    save: function (data, onSave, onError) {
      var xhr = setup(onSave, onError);
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
}());
