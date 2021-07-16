'use strict';
(function () {
  var OFFERS_NUMBER = 12;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Генерируем пины на карте и добавляем на страницу с помощью Document Fragment
  var mapPinsField = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('button');

  var generatePin = function (pinData) {
    var addedPin = templatePin.cloneNode(true);
    addedPin.querySelector('img').src = pinData.author.avatar;
    addedPin.querySelector('img').alt = pinData.offer.title;
    var addedPinX = pinData.location.x - (addedPin.offsetWidth / 2);
    var addedPinY = pinData.location.y - addedPin.offsetHeight;
    addedPin.style.left = addedPinX + 'px';
    addedPin.style.top = addedPinY + 'px';
    return addedPin;
  };

  var generateFragment = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > OFFERS_NUMBER ? OFFERS_NUMBER : data.length;
    for (var pin = 0; pin < takeNumber; pin++) {
      var lastPinOnMap = generatePin(data[pin]);
      window.card.onClickAddCard(lastPinOnMap, data[pin]);
      fragment.appendChild(lastPinOnMap);
    }
    return fragment;
  };

  var renderPins = function (data) {
    var pinsForDelete = mapPinsField.querySelectorAll('button:not(.map__pin--main)');
    pinsForDelete.forEach(function (element) {
      element.remove();
    });
    mapPinsField.appendChild(generateFragment(data));
  };

  window.render = {
    FEATURES: FEATURES,
    renderPins: renderPins
  };

})();
