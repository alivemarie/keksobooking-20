'use strict';
(function () {
// module4-task2
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilters = document.querySelector('.map__filters').children;
  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var PIN_LEG = 20;
  var adFormReset = document.querySelector('.ad-form__reset');
  var mapPinsField = document.querySelector('.map__pins');

  var getAddressCoords = function (currentPin) {
    return Math.round(currentPin.offsetLeft + currentPin.offsetWidth / 2) + ', ' + Math.round(currentPin.offsetTop + currentPin.offsetHeight + PIN_LEG);
  };

  var disableElements = function (parent) {
    for (var elementDisable = 0; elementDisable < parent.length; elementDisable++) {
      parent[elementDisable].disabled = true;
    }
  };

  var enableElements = function (parent) {
    for (var elementEnable = 0; elementEnable < parent.length; elementEnable++) {
      parent[elementEnable].disabled = false;
    }
  };

  var deactivatePage = function () {
    disableElements(adFormElements);
    disableElements(mapFilters);
    addressField.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    if (!document.querySelector('.map').classList.contains('map--faded')) {
      document.querySelector('.map').classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
  };

  var activatePage = function () {
    enableElements(adFormElements);
    enableElements(mapFilters);
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  deactivatePage();

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === 1) {
      activatePage();
      mapPinsField.appendChild(window.generateFragment());
      addressField.value = getAddressCoords(mainPin);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      mapPinsField.appendChild(window.generateFragment());
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
  var RoomnumberValue = {
    ONE_ROOM: '1',
    TWO_ROOMS: '2',
    THREE_ROOMS: '3',
    HUNDRED: '100'
  };
  var CapacityValue = {
    ONE_GUEST: 2,
    TWO_GUESTS: 1,
    THREE_GUESTS: 0,
    NO_GUESTS: 3
  };

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
    for (var people = 0; people < adCapacity.length; people++) {
      adCapacity[people].disabled = true;
    }
    adCapacity.setCustomValidity('');
    switch (adRoomNumber.value) {
      case RoomnumberValue.ONE_ROOM:
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        if (adCapacity.selectedIndex !== CapacityValue.ONE_GUEST) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomnumberValue.TWO_ROOMS:
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        adCapacity[CapacityValue.TWO_GUESTS].disabled = false;
        if ((adCapacity.selectedIndex !== CapacityValue.ONE_GUEST) || (adCapacity.selectedIndex !== CapacityValue.TWO_GUESTS)) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomnumberValue.THREE_ROOMS:
        adCapacity[CapacityValue.THREE_GUESTS].disabled = false;
        adCapacity[CapacityValue.TWO_GUESTS].disabled = false;
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        if (adCapacity.selectedIndex === CapacityValue.NO_GUESTS) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomnumberValue.HUNDRED:
        adCapacity[CapacityValue.NO_GUESTS].disabled = false;
        if (adCapacity.selectedIndex !== CapacityValue.NO_GUESTS) {
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
})();
