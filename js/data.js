'use strict';
(function () {
  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

  var loadData = function (onLoad) {

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
        onErrorMessage('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onErrorMessage('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onErrorMessage('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10 * ms;
    xhr.open('GET', URL);
    xhr.send();
  };

  var sendData = function (data) {
    var onSuccess = function () {
      var closeSuccessPopup = function () {
        newSuccessPopup.remove();
        document.removeEventListener('click', closeSuccessPopup);
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
      };

      var onEscCloseSuccessPopup = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeSuccessPopup();
        }
      };

      var newSuccessPopup = successPopupTemplate.cloneNode(true);
      document.addEventListener('click', closeSuccessPopup);
      document.addEventListener('keydown', onEscCloseSuccessPopup);

      main.appendChild(newSuccessPopup);
    };

    var onError = function () {
      var closeErrorPopup = function () {
        newErrorPopup.remove();
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

      var newErrorPopup = errorPopupTemplate.cloneNode(true);
      var errorButton = newErrorPopup.querySelector('.error__button');
      errorButton.addEventListener('click', closeErrorPopup);
      document.addEventListener('keydown', onEscCloseErrorPopup);
      document.addEventListener('click', closeErrorPopup);

      main.appendChild(newErrorPopup);
    };

    var URL = 'https://javascript.pages.academy/keksobooking';
    var statusCode = {
      OK: 200
    };

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    loadData: loadData,
    sendData: sendData
  };

})();
