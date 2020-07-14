'use strict';
(function () {
  var KEY_CODE = {
    ESCAPE: 'Escape'
  };

  var GuestsNumber = {
    ONE_GUEST: 1,
    NO_GUESTS: 0
  };
  var popupCloseButton;
  var templateCard = document.querySelector('#card').content.querySelector('article');

  var onEscKeyDown = function (evt) {
    if (evt.key === KEY_CODE.ESCAPE) {
      evt.preventDefault();
      onCloseButtonClick();
    }
  };

  var onCloseButtonClick = function () {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      popupCloseButton = document.querySelector('.popup__close');
      popupCloseButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onEscKeyDown);
      currentCard.remove();
    }
  };

  var generateCard = function (cardData) {
    var PropertyType = {
      'bungalo': 'Бунгало',
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом'
    };

    var openedCard = templateCard.cloneNode(true);

    // Проверяем данные по комнатам и количеству гостей
    var cardTextCapacity = false;
    if (cardData.offer.rooms) {
      if (cardData.offer.rooms.toString() === window.formValidation.RoomNumberValue.ONE_ROOM) {
        cardTextCapacity = cardData.offer.rooms + ' комната';
      } else if (cardData.offer.rooms > window.formValidation.RoomNumberValue.ONE_ROOM) {
        cardTextCapacity = cardData.offer.rooms + ' комнаты';
      }
    }
    if (cardData.offer.guests === GuestsNumber.ONE_GUEST) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', для ' + cardData.offer.guests + ' гостя';
      } else {
        cardTextCapacity = 'Для ' + cardData.offer.guests + ' гостя';
      }
    } else if (cardData.offer.guests > GuestsNumber.ONE_GUEST) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', для ' + cardData.offer.guests + ' гостей';
      } else {
        cardTextCapacity = 'Для ' + cardData.offer.guests + ' гостей';
      }
    } else if (cardData.offer.guests === GuestsNumber.NO_GUESTS) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', не для гостей';
      } else {
        cardTextCapacity = 'Не для гостей';
      }
    }

    var popupTitle = openedCard.querySelector('.popup__title');
    if (cardData.offer.title) {
      popupTitle.textContent = cardData.offer.title;
    } else {
      popupTitle.classList.add('hidden');
    }

    var popupAddress = openedCard.querySelector('.popup__text--address');
    if (cardData.offer.address) {
      popupAddress.textContent = cardData.offer.address;
    } else {
      popupAddress.classList.add('hidden');
    }

    var popupPrice = openedCard.querySelector('.popup__text--price');
    if (cardData.offer.price) {
      popupPrice.textContent = cardData.offer.price + 'Р/ночь';
    } else {
      popupPrice.classList.add('hidden');
    }

    var popupType = openedCard.querySelector('.popup__type');
    if (cardData.offer.type) {
      popupType.textContent = PropertyType[cardData.offer.type];
    } else {
      popupType.classList.add('hidden');
    }

    var popupCapacity = openedCard.querySelector('.popup__text--capacity');
    if (cardTextCapacity) {
      popupCapacity.textContent = cardTextCapacity;
    } else {
      popupCapacity.classList.add('hidden');
    }

    var popupTime = openedCard.querySelector('.popup__text--time');
    if ((cardData.offer.checkin) && (cardData.offer.checkout)) {
      popupTime.textContent = 'Заезд после '
          + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    } else if ((cardData.offer.checkin) && (!cardData.offer.checkout)) {
      popupTime.textContent = 'Заезд после '
          + cardData.offer.checkin;
    } else if ((!cardData.offer.checkin) && (cardData.offer.checkout)) {
      popupTime.textContent = 'Выезд до ' + cardData.offer.checkout;
    } else if ((!cardData.offer.checkin) && (!cardData.offer.checkout)) {
      popupTime.classList.add('hidden');
    }

    for (var feature = 0; feature < window.render.FEATURES.length; feature++) {
      var featureClass = '.popup__feature--' + window.render.FEATURES[feature];
      if (!cardData.offer.features.includes(window.render.FEATURES[feature])) {
        openedCard.querySelector(featureClass).classList.add('hidden');
      }
    }

    var popupDescription = openedCard.querySelector('.popup__description');
    if (cardData.offer.description) {
      popupDescription.textContent = cardData.offer.description;
    } else {
      popupDescription.classList.add('hidden');
    }

    var popupAvatar = openedCard.querySelector('.popup__avatar');
    if (cardData.author.avatar) {
      popupAvatar.src = cardData.author.avatar;
    } else {
      popupAvatar.classList.add('hidden');
    }

    var offerPhoto = openedCard.querySelector('.popup__photo');
    if (cardData.offer.photos.length > 0) {
      offerPhoto.src = cardData.offer.photos[0];
      if (cardData.offer.photos.length > 1) {
        for (var picture = 1; picture < cardData.offer.photos.length; picture++) {
          var lastPicture = offerPhoto.cloneNode(true);
          lastPicture.src = cardData.offer.photos[picture];
          offerPhoto.before(lastPicture);
        }
      }
    } else {
      offerPhoto.classList.add('hidden');
    }

    document.querySelector('.map__filters-container').before(openedCard);
  };

  window.card = {
    onClickAddCard: function (pin, data) {
      pin.addEventListener('click', function () {

        onCloseButtonClick();

        generateCard(data);
        popupCloseButton = document.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', onCloseButtonClick);
        document.addEventListener('keydown', onEscKeyDown);
      });
    },
    closePopup: onCloseButtonClick
  };
})();
