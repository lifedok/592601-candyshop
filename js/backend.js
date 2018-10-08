'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_SEND = 'https://js.dump.academy/candyshop';
  var TIMEOUT = 10000;
  var STATUS_SUCCESS = 200;

  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    messageInfo(xhr, onLoad, onError);
    xhr.open(method, url);
    xhr.send(data);
  };

  var messageInfo = function (xhr, load, error) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
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
    xhr.timeout = TIMEOUT;
  };

  window.backend = {
    loadData: function (onLoad, onError) {
      sendRequest('GET', URL_LOAD, onLoad, onError);
    },
    sendData: function (onLoad, onError, data) {
      sendRequest('POST', URL_SEND, onLoad, onError, data);
    }
  };
})();
