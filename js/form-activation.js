'use strict';
(function () {
  var PIN_LEG = 20;
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var KEY_CODE = {
    ENTER: 'Enter'
  };
  var MOUSE_BUTTON_CODE = {
    MOUSE_LEFT_BUTTON: 1
  };
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
  var map = document.querySelector('.map');
  var isPageActive = false;
  var initialMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var getAddressCoords = function (currentPin) {
    return Math.round(currentPin.offsetLeft + Math.floor(currentPin.offsetWidth / 2)) + ', ' + Math.round(currentPin.offsetTop + currentPin.offsetHeight + PIN_LEG);
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

  var onAdFormResetMousedown = function (evt) {
    if (evt.buttons === MOUSE_BUTTON_CODE.MOUSE_LEFT_BUTTON) {
      deactivatePage();
    }
  };

  var onAdFormResetKeyDown = function (evt) {
    if (evt.key === KEY_CODE.ENTER) {
      deactivatePage();
    }
  };

  var onAdFormSubmit = function (evt) {
    window.data.sendData(new FormData(adForm), URL_POST);
    evt.preventDefault();
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === KEY_CODE.ENTER) {
      activatePage();
      addressField.value = getAddressCoords(mainPin);
    }
  };

  var deactivatePage = function () {
    // Восстанавливаем изначальные значения для полей
    window.formValidation.recoverInitialValues();

    // Деактивируем элементы формы с фильтрами и формы с полями ввода
    disableElements(adForm.children);
    disableElements(mapFilters.children);

    // Удаляем карточку объявления
    if (document.querySelector('.map__card')) {
      window.card.closePopup();
    }

    // Добавляем стили оформления заблокированной страницы
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }

    // Удаляем слушателей валидации формы и слушателей кнопок сброса и отправки формы
    window.formValidation.removeFormValidationListeners();
    adFormReset.removeEventListener('mousedown', onAdFormResetMousedown);
    adFormReset.removeEventListener('keydown', onAdFormResetKeyDown);
    adForm.removeEventListener('submit', onAdFormSubmit);

    // Добавляем слушатель главной метки - для активации страницы по клавише Enter
    mainPin.addEventListener('keydown', onMainPinKeyDown);

    // Сбрасываем все введенные данные и выбранные фильтры
    adForm.reset();
    mapFilters.reset();

    // Возвращаем главной метке изначальные координаты
    // и вычисляем координаты для подстановки в поле адреса
    mainPin.style.left = initialMainPinCoords.x + 'px';
    mainPin.style.top = initialMainPinCoords.y + 'px';
    addressField.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

    // Удаляем все отрисованные пины на карте
    var pinsForDelete = mapPinsField.querySelectorAll('button:not(.map__pin--main)');
    pinsForDelete.forEach(function (element) {
      element.remove();
    });

    // Возвращаем дефолтные картинки в превью
    avatarPreview.src = 'img/muffin-grey.svg';
    picturePreviewBlock.innerHTML = '';

    // Очищаем значения фильтров, и удаляем слушателя с формы фильтрации
    window.filter.resetFilter();
    mapFilters.removeEventListener('change', window.filter.onFiltersChange);
    isPageActive = false;
  };

  var activatePage = function () {
    if (!isPageActive) {
      // Активируем элементы формы с фильтрами и формы с полями ввода
      enableElements(adForm.children);
      enableElements(mapFilters.children);

      // Удаляем стили оформления заблокированной страницы
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      // Добавляем слушателей валидации формы и слушателей кнопок сброса и отправки формы
      window.formValidation.addFormValidationListeners();
      adFormReset.addEventListener('mousedown', onAdFormResetMousedown);
      adFormReset.addEventListener('keydown', onAdFormResetKeyDown);
      adForm.addEventListener('submit', onAdFormSubmit);

      // Удаляем слушатель главной метки для клавиши Enter
      mainPin.removeEventListener('keydown', onMainPinKeyDown);

      // Обновляем координаты главной метки - ее острый конец
      addressField.value = getAddressCoords(mainPin);

      // Загружаем данные объявлений и рисуем пины на карте
      window.data.loadData(window.render.renderPins, URL_GET);

      // Добавляем отображение превью фотографий
      window.preview.showPreview(avatarChooser, avatarPreviewBlock);
      window.preview.showPreview(pictureChooser, picturePreviewBlock);

      // Добавляем слушатель на форму фильтрации
      mapFilters.addEventListener('change', window.filter.onFiltersChange);

      isPageActive = true;
    }
  };

  deactivatePage();

  mainPin.addEventListener('mousedown', window.map.onMainPinMousedown);

  window.formActivation = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    getAddressCoords: getAddressCoords,
  };
})();
