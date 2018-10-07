'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_SEND = 'https://js.dump.academy/candyshop';
  var timeout = 10000;
  var statusSuccess = 200;

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    messageInfo(xhr, onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };
  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    messageInfo(xhr, onLoad, onError);
    xhr.open('POST', URL_SEND);
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
    loadData: loadData,
    sendData: sendData
  };
})();
