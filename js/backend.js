'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_SEND = 'https://js.dump.academy/candyshop';
  var timeout = 10000;
  var statusSuccess = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === statusSuccess) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = timeout; // 10s

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    send: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка отправки данных');
      });
      xhr.open('POST', URL_SEND);
      xhr.send();
    }
  };
})();
