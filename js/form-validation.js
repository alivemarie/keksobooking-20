'use strict';
(function () {
  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;
  var adForm = document.querySelector('.ad-form');
  var adTitle = adForm.querySelector('#title');
  var adPrice = adForm.querySelector('#price');
  var adPropertyType = adForm.querySelector('#type');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var capacityOptions = adCapacity.querySelectorAll('option');
  var inputLength = 0;
  var RoomNumberValue = {
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
  var PropertyPrice = {
    FLAT: {
      VALUE: 'flat',
      MIN: 1000,
      PLACEHOLDER: '1000'
    },
    HOUSE: {
      VALUE: 'house',
      MIN: 5000,
      PLACEHOLDER: '5000'
    },
    PALACE: {
      VALUE: 'palace',
      MIN: 10000,
      PLACEHOLDER: '10000'
    },
    BUNGALO: {
      VALUE: 'bungalo',
      MIN: 0,
      PLACEHOLDER: '1000'
    }
  };
  var onTitleInput = function () {
    inputLength = adTitle.value.length;
    if (inputLength < MIN_NAME_LENGTH) {
      adTitle.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - inputLength + ' симв.'));
    } else if (inputLength > MAX_NAME_LENGTH) {
      adTitle.setCustomValidity('Удалите лишние ' + (inputLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      adTitle.setCustomValidity('');
    }
  };
  var onTitleInvalid = function () {
    if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Обязательное поле');
    } else {
      adTitle.setCustomValidity('');
    }
  };
  var onPriceInvalid = function () {
    if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity('Минимальное значение - ' + adPrice.min);
    } else if (adPrice.validity.rangeOverflow) {
      adPrice.setCustomValidity('Максимальное значение - 1 000 000');
    } else if (adPrice.validity.valueMissing) {
      adPrice.setCustomValidity('Обязательное поле');
    } else {
      adPrice.setCustomValidity('');
    }
  };
  var onPropertyTypeChange = function () {
    switch (adPropertyType.value) {
      case PropertyPrice.FLAT.VALUE:
        adPrice.min = PropertyPrice.FLAT.MIN;
        adPrice.placeholder = PropertyPrice.FLAT.PLACEHOLDER;
        break;
      case PropertyPrice.HOUSE.VALUE:
        adPrice.min = PropertyPrice.HOUSE.MIN;
        adPrice.placeholder = PropertyPrice.HOUSE.PLACEHOLDER;
        break;
      case PropertyPrice.PALACE.VALUE:
        adPrice.min = PropertyPrice.PALACE.MIN;
        adPrice.placeholder = PropertyPrice.PALACE.PLACEHOLDER;
        break;
      case PropertyPrice.BUNGALO.VALUE:
        adPrice.min = PropertyPrice.BUNGALO.MIN;
        adPrice.placeholder = PropertyPrice.BUNGALO.PLACEHOLDER;
        break;
    }
  };
  var recoverInitialValues = function () {
    adPrice.min = PropertyPrice.BUNGALO.MIN;
    adPrice.placeholder = PropertyPrice.BUNGALO.PLACEHOLDER;
  };
  var onTimeInChange = function () {
    adTimeOut.selectedIndex = adTimeIn.selectedIndex;
  };
  var onTimeOutChange = function () {
    adTimeIn.selectedIndex = adTimeOut.selectedIndex;
  };
  var onRoomNumberChange = function () {
    capacityOptions.forEach(function (element) {
      element.disabled = true;
    });
    adCapacity.setCustomValidity('');
    switch (adRoomNumber.value) {
      case RoomNumberValue.ONE_ROOM:
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        if (adCapacity.selectedIndex !== CapacityValue.ONE_GUEST) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomNumberValue.TWO_ROOMS:
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        adCapacity[CapacityValue.TWO_GUESTS].disabled = false;
        if ((adCapacity.selectedIndex !== CapacityValue.ONE_GUEST) || (adCapacity.selectedIndex !== CapacityValue.TWO_GUESTS)) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomNumberValue.THREE_ROOMS:
        adCapacity[CapacityValue.THREE_GUESTS].disabled = false;
        adCapacity[CapacityValue.TWO_GUESTS].disabled = false;
        adCapacity[CapacityValue.ONE_GUEST].disabled = false;
        if (adCapacity.selectedIndex === CapacityValue.NO_GUESTS) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
        break;
      case RoomNumberValue.HUNDRED:
        adCapacity[CapacityValue.NO_GUESTS].disabled = false;
        if (adCapacity.selectedIndex !== CapacityValue.NO_GUESTS) {
          adCapacity.setCustomValidity('Количество комнат не подходит под количество людей, измените значения');
        }
    }
  };
  var onCapacityChange = function () {
    if ((adCapacity.selectedIndex !== CapacityValue.ONE_GUEST) && (adRoomNumber.value === RoomNumberValue.ONE_ROOM)) {
      adCapacity.setCustomValidity('Не совпадает количество людей и комнат, выберите другие значения');
    } else {
      adCapacity.setCustomValidity('');
    }
  };
  window.formValidation = {
    addFormValidationListeners: function () {
      adTitle.addEventListener('input', onTitleInput);
      adTitle.addEventListener('invalid', onTitleInvalid);
      adPrice.addEventListener('invalid', onPriceInvalid);
      adPropertyType.addEventListener('change', onPropertyTypeChange);
      adTimeIn.addEventListener('change', onTimeInChange);
      adTimeOut.addEventListener('change', onTimeOutChange);
      adRoomNumber.addEventListener('change', onRoomNumberChange);
      adCapacity.addEventListener('change', onCapacityChange);
    },
    removeFormValidationListeners: function () {
      adTitle.removeEventListener('input', onTitleInput);
      adTitle.removeEventListener('invalid', onTitleInvalid);
      adPrice.removeEventListener('invalid', onPriceInvalid);
      adPropertyType.removeEventListener('change', onPropertyTypeChange);
      adTimeIn.removeEventListener('change', onTimeInChange);
      adTimeOut.removeEventListener('change', onTimeOutChange);
      adRoomNumber.removeEventListener('change', onRoomNumberChange);
      adCapacity.removeEventListener('change', onCapacityChange);
    },
    recoverInitialValues: recoverInitialValues,
    RoomNumberValue: RoomNumberValue
  };
})();
