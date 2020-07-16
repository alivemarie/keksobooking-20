'use strict';
(function () {
  var MS = 1000; // 1s
  var TIMEOUT_SECONDS = 10;
  var StatusCode = {
    OK: 200
  };
  var ERROR_MESSAGE_STYLE_SETTINGS = {
    left: 0,
    right: 0,
    fontSize: '30px',
    position: 'absolute',
    style: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;'
  };

  var RESPONSE_TYPES = {
    JSON: 'json'
  };

  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

  var loadData = function (onLoad, url) {

    var showErrorMessage = function (errorMessage) {
      var node = document.createElement('div');
      node.style = ERROR_MESSAGE_STYLE_SETTINGS.style;
      node.style.position = ERROR_MESSAGE_STYLE_SETTINGS.position;
      node.style.left = ERROR_MESSAGE_STYLE_SETTINGS.left;
      node.style.right = ERROR_MESSAGE_STYLE_SETTINGS.right;
      node.style.fontSize = ERROR_MESSAGE_STYLE_SETTINGS.fontSize;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPES.JSON;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        window.loadedData = xhr.response;
      } else {
        showErrorMessage('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      showErrorMessage('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      showErrorMessage('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_SECONDS * MS;
    xhr.open('GET', url);
    xhr.send();
  };

  var sendData = function (data, url) {
    var onSuccess = function () {
      var onSuccessPopupClick = function () {
        lastSuccessPopup.remove();
        document.removeEventListener('click', onSuccessPopupClick);
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
      };

      var onEscCloseSuccessPopup = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          onSuccessPopupClick();
        }
      };

      var lastSuccessPopup = successPopupTemplate.cloneNode(true);
      document.addEventListener('click', onSuccessPopupClick);
      document.addEventListener('keydown', onEscCloseSuccessPopup);

      main.appendChild(lastSuccessPopup);
      window.formActivation.deactivatePage();
    };

    var onError = function () {
      var onErrorPopupClick = function () {
        lastErrorPopup.remove();
        document.removeEventListener('click', onErrorPopupClick);
        document.removeEventListener('keydown', onEscCloseErrorPopup);
        document.removeEventListener('click', onErrorPopupClick);
      };

      var onEscCloseErrorPopup = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          onErrorPopupClick();
        }
      };

      var lastErrorPopup = errorPopupTemplate.cloneNode(true);
      var errorButton = lastErrorPopup.querySelector('.error__button');
      errorButton.addEventListener('click', onErrorPopupClick);
      document.addEventListener('keydown', onEscCloseErrorPopup);
      document.addEventListener('click', onErrorPopupClick);

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
