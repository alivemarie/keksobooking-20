'use strict';
(function () {
  var onDownload = function (data) {
    window.data = {
      dataArray: data
    };
  };
  var onErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var loadData = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var statusCode = {
      OK: 200
    };
    var ms = 1000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10 * ms;
    xhr.open('GET', URL);
    xhr.send();
  };

  loadData(onDownload, onErrorMessage);

})();
