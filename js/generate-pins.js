'use strict';
(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('button');

  var generatePin = function (id) {
    var newPin = templatePin.cloneNode(true);
    newPin.querySelector('img').src = window.data.offersCards[id].author.avatar;
    newPin.querySelector('img').alt = window.data.offersCards[id].offer.title;
    var newPinX = window.data.offersCards[id].location.x - (newPin.offsetWidth / 2);
    var newPinY = window.data.offersCards[id].location.y - newPin.offsetHeight;
    newPin.style.left = newPinX + 'px';
    newPin.style.top = newPinY + 'px';
    return newPin;
  };

  var generateFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.OFFERS_NUMBER; i++) {
      fragment.appendChild(generatePin(i));
    }
    return fragment;
  };

  window.generateFragment = generateFragment;
})();
