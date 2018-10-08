'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_SEND = 'https://js.dump.academy/candyshop';
  var timeout = 10000;
  var statusSuccess = 200;

  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    messageInfo(xhr, onLoad, onError);
    xhr.open(method, url);
    xhr.send(data);
  };

  var messageInfo = function (xhr, load, error) {
    xhr.addEventListener('load', function () {
      if (xhr.status === statusSuccess) {
        load(xhr.response);
      } else {
        error('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = timeout;
  };

  window.backend = {
    loadData: sendRequest('GET', URL_LOAD),
    sendData: sendRequest('POST', URL_SEND)
  };
})();
