'use strict';
(function () {
  var popupCloseButton;
  var templateCard = document.querySelector('#card').content.querySelector('article');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    if (document.querySelector('.map__card')) {
      popupCloseButton = document.querySelector('.popup__close');
      popupCloseButton.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', onPopupEscPress);
      document.querySelector('.map__card').remove();
    }
  };

  var generateCard = function (cardData) {
    var propertyTypeDict = {
      'bungalo': 'Бунгало',
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом'
    };

    var openedCard = templateCard.cloneNode(true);

    // Проверяем данные по комнатам и количеству гостей
    var cardTextCapacity = false;
    if (cardData.offer.rooms) {
      if (cardData.offer.rooms === 1) {
        cardTextCapacity = cardData.offer.rooms + ' комната';
      } else if (cardData.offer.rooms > 1) {
        cardTextCapacity = cardData.offer.rooms + ' комнаты';
      }
    }
    if (cardData.offer.guests === 1) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', для ' + cardData.offer.guests + ' гостя';
      } else {
        cardTextCapacity = 'Для ' + cardData.offer.guests + ' гостя';
      }
    } else if (cardData.offer.guests > 1) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', для ' + cardData.offer.guests + ' гостей';
      } else {
        cardTextCapacity = 'Для ' + cardData.offer.guests + ' гостей';
      }
    } else if (cardData.offer.guests === 0) {
      if (cardTextCapacity) {
        cardTextCapacity = cardTextCapacity + ', не для гостей';
      } else {
        cardTextCapacity = 'Не для гостей';
      }
    }

    if (cardData.offer.title) {
      openedCard.querySelector('.popup__title').textContent = cardData.offer.title;
    } else {
      openedCard.querySelector('.popup__title').classList.add('hidden');
    }

    if (cardData.offer.address) {
      openedCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
    } else {
      openedCard.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (cardData.offer.price) {
      openedCard.querySelector('.popup__text--price').textContent = cardData.offer.price + 'Р/ночь';
    } else {
      openedCard.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (cardData.offer.type) {
      openedCard.querySelector('.popup__type').textContent = propertyTypeDict[cardData.offer.type];
    } else {
      openedCard.querySelector('.popup__type').classList.add('hidden');
    }

    if (cardTextCapacity) {
      openedCard.querySelector('.popup__text--capacity').textContent = cardTextCapacity;
    } else {
      openedCard.querySelector('.popup__text--capacity').classList.add('hidden');
    }


    if ((cardData.offer.checkin) && (cardData.offer.checkout)) {
      openedCard.querySelector('.popup__text--time').textContent = 'Заезд после '
          + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    } else if ((cardData.offer.checkin) && (!cardData.offer.checkout)) {
      openedCard.querySelector('.popup__text--time').textContent = 'Заезд после '
          + cardData.offer.checkin;
    } else if ((!cardData.offer.checkin) && (cardData.offer.checkout)) {
      openedCard.querySelector('.popup__text--time').textContent = 'Выезд до ' + cardData.offer.checkout;
    } else if ((!cardData.offer.checkin) && (!cardData.offer.checkout)) {
      openedCard.querySelector('.popup__text--time').classList.add('hidden');
    }

    for (var feature = 0; feature < window.render.FEATURES.length; feature++) {
      var featureClass = '.popup__feature--' + window.render.FEATURES[feature];
      if (!cardData.offer.features.includes(window.render.FEATURES[feature])) {
        openedCard.querySelector(featureClass).classList.add('hidden');
      }
    }

    if (cardData.offer.description) {
      openedCard.querySelector('.popup__description').textContent = cardData.offer.description;
    } else {
      openedCard.querySelector('.popup__description').classList.add('hidden');
    }

    if (cardData.author.avatar) {
      openedCard.querySelector('.popup__avatar').src = cardData.author.avatar;
    } else {
      openedCard.querySelector('.popup__avatar').classList.add('hidden');
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

        closePopup();

        generateCard(data);
        popupCloseButton = document.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', closePopup);
        document.addEventListener('keydown', onPopupEscPress);

        window.cardPopup = {
          closePopup: closePopup
        };
      });
    }
  };
})();
