'use strict';
(function () {
  var PIN_LEG = 20;
  var pictureChooser = document.querySelector('#images');
  var picturePreviewBlock = document.querySelector('.ad-form__photo');
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreviewBlock = document.querySelector('.ad-form-header__preview');
  var avatarPreview = avatarPreviewBlock.querySelector('img');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinsField = document.querySelector('.map__pins');
  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormReset = document.querySelector('.ad-form__reset');
  var isPageActive = false;
  var initialMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

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
    disableElements(adForm.children);
    disableElements(mapFilters.children);
    if (document.querySelector('.map__card')) {
      window.cardPopup.closePopup();
    }
    if (!document.querySelector('.map').classList.contains('map--faded')) {
      document.querySelector('.map').classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    window.formValidation.removeFormValidationListeners();
    mainPin.style.left = initialMainPinCoords.x + 'px';
    mainPin.style.top = initialMainPinCoords.y + 'px';
    addressField.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    isPageActive = false;
    var pinsForDelete = mapPinsField.querySelectorAll('button:not(.map__pin--main)');
    for (var pin = 0; pin < pinsForDelete.length; pin++) {
      pinsForDelete[pin].remove();
    }
    adForm.reset();
    mapFilters.reset();
    avatarPreview.src = 'img/muffin-grey.svg';
    picturePreviewBlock.innerHTML = '';
    window.filter.resetFilter();
    mapFilters.removeEventListener('change', window.filter.onChangeFilters);
  };

  var activatePage = function () {
    if (!isPageActive) {
      enableElements(adForm.children);
      document.querySelector('.map').classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.formValidation.addFormValidationListeners();
      window.data.loadData(window.render.renderPins);
      enableElements(mapFilters.children);
      window.preview.showPreview(avatarChooser, avatarPreviewBlock);
      window.preview.showPreview(pictureChooser, picturePreviewBlock);
      addressField.value = getAddressCoords(mainPin);
      isPageActive = true;
      mapFilters.addEventListener('change', window.filter.onChangeFilters);
    }
  };

  deactivatePage();

  mainPin.addEventListener('mousedown', window.map.draggingPin);

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      addressField.value = getAddressCoords(mainPin);
    }
  });

  // Сброс формы
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

  adForm.addEventListener('submit', function (evt) {
    window.data.sendData(new FormData(adForm));
    evt.preventDefault();
    deactivatePage();
  });

  window.formActivation = {
    activatePage: activatePage,
    getAddressCoords: getAddressCoords,
  };
})();
