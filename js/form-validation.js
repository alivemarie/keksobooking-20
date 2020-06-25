'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
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

  window.formValidation = {
    onTitleInput: function () {
      inputLength = adTitle.value.length;
      if (inputLength < MIN_NAME_LENGTH) {
        adTitle.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - inputLength + ' симв.'));
      } else if (inputLength > MAX_NAME_LENGTH) {
        adTitle.setCustomValidity('Удалите лишние ' + (inputLength - MAX_NAME_LENGTH) + ' симв.');
      } else {
        adTitle.setCustomValidity('');
      }
    },
    onTitleInvalid: function () {
      if (adTitle.validity.valueMissing) {
        adTitle.setCustomValidity('Обязательное поле');
      } else {
        adTitle.setCustomValidity('');
      }
    },
    onPriceInvalid: function () {
      if (adPrice.validity.rangeUnderflow) {
        adPrice.setCustomValidity('Минимальное значение - ' + adPrice.min);
      } else if (adPrice.validity.rangeOverflow) {
        adPrice.setCustomValidity('Максимальное значение - 1 000 000');
      } else if (adPrice.validity.valueMissing) {
        adPrice.setCustomValidity('Обязательное поле');
      } else {
        adPrice.setCustomValidity('');
      }
    },
    onPropertyTypeChange: function () {
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
    },
    onTimeInChange: function () {
      adTimeOut.selectedIndex = adTimeIn.selectedIndex;
    },
    onTimeOutChange: function () {
      adTimeIn.selectedIndex = adTimeOut.selectedIndex;
    },
    onRoomNumberChange: function () {
      for (var people = 0; people < adCapacity.length; people++) {
        adCapacity[people].disabled = true;
      }
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
    },
    onCapacityChange: function () {
      if ((adCapacity.selectedIndex !== 2) && (adRoomNumber.value === '1')) {
        adCapacity.setCustomValidity('Не совпадает количество людей и комнат, выберите другие значения');
      } else {
        adCapacity.setCustomValidity('');
      }
    },
    addFormValidationListeners: function () {
      adTitle.addEventListener('input', window.formValidation.onTitleInput);
      adTitle.addEventListener('invalid', window.formValidation.onTitleInvalid);
      adPrice.addEventListener('invalid', window.formValidation.onPriceInvalid);
      adPropertyType.addEventListener('change', window.formValidation.onPropertyTypeChange);
      adTimeIn.addEventListener('change', window.formValidation.onTimeInChange);
      adTimeOut.addEventListener('change', window.formValidation.onTimeOutChange);
      adRoomNumber.addEventListener('change', window.formValidation.onRoomNumberChange);
      adCapacity.addEventListener('change', window.formValidation.onCapacityChange);
    },
    removeFormValidationListeners: function () {
      adTitle.removeEventListener('input', window.formValidation.onTitleInput);
      adTitle.removeEventListener('invalid', window.formValidation.onTitleInvalid);
      adPrice.removeEventListener('invalid', window.formValidation.onPriceInvalid);
      adPropertyType.removeEventListener('change', window.formValidation.onPropertyTypeChange);
      adTimeIn.removeEventListener('change', window.formValidation.onTimeInChange);
      adTimeOut.removeEventListener('change', window.formValidation.onTimeOutChange);
      adRoomNumber.removeEventListener('change', window.formValidation.onRoomNumberChange);
      adCapacity.removeEventListener('change', window.formValidation.onCapacityChange);
    }
  };
})();
