'use strict';
(function () {
  var OFFERS_NUMBER = 8;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.generatePins = {
    FEATURES: FEATURES,
  };

  // Генерируем пины на карте и добавляем на страницу с помощью Document Fragment
  var templatePin = document.querySelector('#pin').content.querySelector('button');

  var generatePin = function (pinData) {
    var newPin = templatePin.cloneNode(true);
    newPin.querySelector('img').src = pinData.author.avatar;
    newPin.querySelector('img').alt = pinData.offer.title;
    var newPinX = pinData.location.x - (newPin.offsetWidth / 2);
    var newPinY = pinData.location.y - newPin.offsetHeight;
    newPin.style.left = newPinX + 'px';
    newPin.style.top = newPinY + 'px';
    return newPin;
  };

  var generateFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var pin = 0; pin < OFFERS_NUMBER; pin++) {
      var newPinOnMap = generatePin(data[pin]);
      window.card.onClickAddCard(newPinOnMap, data[pin]);
      fragment.appendChild(newPinOnMap);
    }
    return fragment;
  };

  window.generatePins = {
    generateFragment: generateFragment
  };

})();
