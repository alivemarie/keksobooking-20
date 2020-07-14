'use strict';
(function () {
  var MS = 1000; // 1s
  var TIMEOUT_SECONDS = 10;
  var StatusCode = {
    OK: 200
  };
  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

  var loadData = function (onLoad, url) {

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

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        window.loadedData = xhr.response;
      } else {
        onErrorMessage('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onErrorMessage('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onErrorMessage('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_SECONDS * MS;
    xhr.open('GET', url);
    xhr.send();
  };

  var sendData = function (data, url) {
    var onSuccess = function () {
      var closeSuccessPopup = function () {
        lastSuccessPopup.remove();
        document.removeEventListener('click', closeSuccessPopup);
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
      };

      var onEscCloseSuccessPopup = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeSuccessPopup();
        }
      };

      var lastSuccessPopup = successPopupTemplate.cloneNode(true);
      document.addEventListener('click', closeSuccessPopup);
      document.addEventListener('keydown', onEscCloseSuccessPopup);

      main.appendChild(lastSuccessPopup);
    };

    var onError = function () {
      var closeErrorPopup = function () {
        lastErrorPopup.remove();
        document.removeEventListener('click', closeErrorPopup);
        document.removeEventListener('keydown', onEscCloseErrorPopup);
        document.removeEventListener('click', closeErrorPopup);
      };

      var onEscCloseErrorPopup = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeErrorPopup();
        }
      };

      var lastErrorPopup = errorPopupTemplate.cloneNode(true);
      var errorButton = lastErrorPopup.querySelector('.error__button');
      errorButton.addEventListener('click', closeErrorPopup);
      document.addEventListener('keydown', onEscCloseErrorPopup);
      document.addEventListener('click', closeErrorPopup);

      main.appendChild(lastErrorPopup);
    };

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.data = {
    loadData: loadData,
    sendData: sendData
  };

})();
