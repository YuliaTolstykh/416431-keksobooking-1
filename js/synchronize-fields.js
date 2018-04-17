'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, value1, value2, callback) {
    field1.addEventListener('change', (function () {
      callback(field1, field2, value1, value2);
    }));
  };
}());
