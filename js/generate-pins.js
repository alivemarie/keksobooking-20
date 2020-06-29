'use strict';
(function () {
  var mapPinsField = document.querySelector('.map__pins');
  var pinShiftLeft = 50;
  var OFFERS_NUMBER = 8;
  var TITLES = ['Особняк', 'Аппартаменты', 'Студия', 'Хостел', 'Номер в отеле'];
  var DESCRIPTIONS = ['Небольшой частный домик в хорошем районе, подходит для путешествующих семьёй, расположение позволяет посетить множество достопримечательностей неподалёку',
    'Просторная студия с евроремонтом в новом доме, расположена на 10 этаже, с видом на город',
    'описание 3',
    'описание 4',
    'описание 5',
    'описание 6',
    'описание 7',
    'описание 8'];

  var PROPERTY_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
  var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    'https://r-cf.bstatic.com/images/hotel/max1280x900/566/56627942.jpg',
    'https://r-cf.bstatic.com/images/hotel/max1280x900/566/56627297.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var generateCard = function (cardId) {

    // Создаем массив строк случайной длины для features
    var features = FEATURES.slice();
    features.sort(function () {
      return 0.5 - Math.random();
    });
    var featuresNumber = getRandomNumber(1, FEATURES.length);
    features = features.slice(0, featuresNumber);

    // Создаем массив строк случайной длины для photos
    var photos = PHOTOS.slice();
    photos.sort(function () {
      return 0.5 - Math.random();
    });
    var photosNumber = getRandomNumber(1, PHOTOS.length);
    photos = photos.slice(0, photosNumber);

    var card = {
      author: {
        avatar: 'img/avatars/user0' + ++cardId + '.png'
      },
      offer: {
        title: TITLES[getRandomNumber(0, TITLES.length)],
        price: getRandomNumber(10000, 100000),
        type: PROPERTY_TYPE[getRandomNumber(0, PROPERTY_TYPE.length)],
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(0, 3),
        checkin: TIME_CHECKIN[getRandomNumber(0, TIME_CHECKIN.length)],
        checkout: TIME_CHECKOUT[getRandomNumber(0, TIME_CHECKOUT.length)],
        features: features,
        description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
        photos: photos
      },
      location: {
        x: getRandomNumber(mapPinsField.clientLeft, mapPinsField.clientWidth - pinShiftLeft),
        y: getRandomNumber(130, 631)
      }
    };

    card.offer.address = card.location.x + ', ' + card.location.y;

    return card;
  };

  var offersCards = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    offersCards.push(generateCard(i));
  }

  // Экспорт массива сгенерированных данных
  window.generatePins = {
    FEATURES: FEATURES,
    offersCards: offersCards,
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

  var generateFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var pin = 0; pin < OFFERS_NUMBER; pin++) {
      var newPinOnMap = generatePin(window.data.dataArray[pin]);
      window.card.onClickAddCard(newPinOnMap, window.data.dataArray[pin]);
      fragment.appendChild(newPinOnMap);
    }
    return fragment;
  };
  window.generateFragment = generateFragment;

})();
