'use strict';
(function () {
  var mapPinsField = document.querySelector('.map__pins');
  var OFFERS_NUMBER = 5;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
    var takeNumber = data.length > OFFERS_NUMBER ? OFFERS_NUMBER : data.length;
    for (var pin = 0; pin < takeNumber; pin++) {
      var newPinOnMap = generatePin(data[pin]);
      window.card.onClickAddCard(newPinOnMap, data[pin]);
      fragment.appendChild(newPinOnMap);
    }
    return fragment;
  };

  window.render = {
    FEATURES: FEATURES,
    renderPins: function (data) {
      var pinsForDelete = mapPinsField.querySelectorAll('button:not(.map__pin--main)');
      for (var pin = 0; pin < pinsForDelete.length; pin++) {
        pinsForDelete[pin].remove();
      }
      mapPinsField.appendChild(generateFragment(data));
    }
  };

})();
