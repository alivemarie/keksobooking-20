'use strict';

var mapPinsField = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('button');
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
  'https://r-cf.bstatic.com/images/hotel/max1280x900/566/56627297.jpg',
  'https://q-cf.bstatic.com/images/hotel/max1280x900/232/232445809.jpg',
  'https://q-cf.bstatic.com/images/hotel/max1280x900/231/231736863.jpg',
  'https://r-cf.bstatic.com/images/hotel/max1280x900/255/255828343.jpg',
  'https://r-cf.bstatic.com/images/hotel/max1280x900/255/255828355.jpg'];
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

var generatePin = function (id) {
  var newPin = templatePin.cloneNode(true);
  newPin.querySelector('img').src = offersCards[id].author.avatar;
  newPin.querySelector('img').alt = offersCards[id].offer.title;
  var newPinX = offersCards[id].location.x - (newPin.offsetWidth / 2);
  var newPinY = offersCards[id].location.y - newPin.offsetHeight;
  newPin.style.left = newPinX + 'px';
  newPin.style.top = newPinY + 'px';
  return newPin;
};


var generateFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    fragment.appendChild(generatePin(i));
  }
  return fragment;
};

var offersCards = [];
for (var i = 0; i < OFFERS_NUMBER; i++) {
  offersCards.push(generateCard(i));
}

// module4-task2
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.children;
var mapFilters = document.querySelector('.map__filters').children;
var addressField = document.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var PIN_LEG = 20;
var adFormReset = document.querySelector('.ad-form__reset');

var getAddressCoords = function (currentPin) {
  return Math.round(currentPin.offsetLeft + currentPin.offsetWidth / 2) + ', ' + Math.round(currentPin.offsetTop + currentPin.offsetHeight + PIN_LEG);
};

var disableElements = function (parent) {
  for (var i = 0; i < parent.length; i++) {
    parent[i].disabled = true;
  }
};

var enableElements = function (parent) {
  for (var i = 0; i < parent.length; i++) {
    parent[i].disabled = false;
  }
};

var deactivatePage = function () {
  disableElements(adFormElements);
  disableElements(mapFilters);
  addressField.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
  if (!document.querySelector('.map').classList.contains('map--faded')) {
    document.querySelector('.map').classList.add('map--faded');
  }
};

var activatePage = function () {
  enableElements(adFormElements);
  enableElements(mapFilters);
  document.querySelector('.map').classList.remove('map--faded');
};

deactivatePage();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
    activatePage();
    mapPinsField.appendChild(generateFragment());
    addressField.value = getAddressCoords(mainPin);
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    mapPinsField.appendChild(generateFragment());
    addressField.value = getAddressCoords(mainPin);
  }
});

adFormReset.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
    deactivatePage();
  }
});

adFormReset.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    deactivatePage();
  }
});

var adTitle = adForm.querySelector('#title');
var adPrice = adForm.querySelector('#price');
var adPropertyType = adForm.querySelector('#type');
var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');
var MIN_NAME_LENGTH = 30;
var MAX_NAME_LENGTH = 100;
var inputLength = 0;

adTitle.addEventListener('input', function () {
  inputLength = adTitle.value.length;
  if (inputLength < MIN_NAME_LENGTH) {
    adTitle.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - inputLength + ' симв.'));
  } else if (inputLength > MAX_NAME_LENGTH) {
    adTitle.setCustomValidity('Удалите лишние ' + (inputLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    adTitle.setCustomValidity('');
  }
});

adTitle.addEventListener('invalid', function () {
  if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});

adPrice.addEventListener('invalid', function () {
  if (adPrice.validity.rangeUnderflow) {
    adPrice.setCustomValidity('Минимальное значение - ' + adPrice.min);
  } else if (adPrice.validity.rangeOverflow) {
    adPrice.setCustomValidity('Максимальное значение - 1 000 000');
  } else if (adPrice.validity.valueMissing) {
    adPrice.setCustomValidity('Обязательное поле');
  } else {
    adPrice.setCustomValidity('');
  }
});

adPropertyType.addEventListener('change', function () {
  switch (adPropertyType.value) {
    case 'flat':
      adPrice.min = 1000;
      adPrice.placeholder = '1000';
      break;
    case 'house':
      adPrice.min = 5000;
      adPrice.placeholder = '6000';
      break;
    case 'palace':
      adPrice.min = 10000;
      adPrice.placeholder = '10000';
      break;
    case 'bungalo':
      adPrice.min = 0;
      adPrice.placeholder = '100';
      break;
  }
});

adTimeIn.addEventListener('change', function () {
  adTimeOut.selectedIndex = adTimeIn.selectedIndex;
});

adTimeOut.addEventListener('change', function () {
  adTimeIn.selectedIndex = adTimeOut.selectedIndex;
});

adRoomNumber.addEventListener('change', function () {
  for (var i = 0; i < adCapacity.length; i++) {
    adCapacity[i].disabled = true;
  }
  adCapacity.setCustomValidity('');
  switch (adRoomNumber.value) {
    case '1':
      adCapacity[2].disabled = false;
      if (adCapacity.selectedIndex !== 2) {
        adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
      }
      break;
    case '2':
      adCapacity[2].disabled = false;
      adCapacity[1].disabled = false;
      if ((adCapacity.selectedIndex !== 2) || (adCapacity.selectedIndex !== 1)) {
        adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
      }
      break;
    case '3':
      adCapacity[0].disabled = false;
      adCapacity[1].disabled = false;
      adCapacity[2].disabled = false;
      if (adCapacity.selectedIndex === 3) {
        adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
      }
      break;
    case '100':
      adCapacity[3].disabled = false;
      if (adCapacity.selectedIndex !== 3) {
        adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
      }
  }
});

adCapacity.addEventListener('change', function () {
  if ((adCapacity.selectedIndex !== 2) && (adRoomNumber.value === '1')) {
    adCapacity.setCustomValidity('Не совпадает количество людей и комнат, выберите другие значения');
  } else {
    adCapacity.setCustomValidity('');
  }
});
