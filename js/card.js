'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var propertyTypeDict = {
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом'
  };

  var newCard = templateCard.cloneNode(true);
  var cardData = window.data.offersCards[0];

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
    newCard.querySelector('.popup__title').textContent = cardData.offer.title;
  } else {
    newCard.querySelector('.popup__title').classList.add('hidden');
  }

  if (cardData.offer.address) {
    newCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
  } else {
    newCard.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (cardData.offer.price) {
    newCard.querySelector('.popup__text--price').textContent = cardData.offer.price + 'Р/ночь';
  } else {
    newCard.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (cardData.offer.type) {
    newCard.querySelector('.popup__type').textContent = propertyTypeDict[cardData.offer.type];
  } else {
    newCard.querySelector('.popup__type').classList.add('hidden');
  }

  if (cardTextCapacity) {
    newCard.querySelector('.popup__text--capacity').textContent = cardTextCapacity;
  } else {
    newCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }


  if ((cardData.offer.checkin) && (cardData.offer.checkout)) {
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после '
      + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  } else if ((cardData.offer.checkin) && (!cardData.offer.checkout)) {
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после '
      + cardData.offer.checkin;
  } else if ((!cardData.offer.checkin) && (cardData.offer.checkout)) {
    newCard.querySelector('.popup__text--time').textContent = 'Выезд до ' + cardData.offer.checkout;
  } else if ((!cardData.offer.checkin) && (!cardData.offer.checkout)) {
    newCard.querySelector('.popup__text--time').classList.add('hidden');
  }

  for (var feature = 0; feature < window.data.FEATURES.length; feature++) {
    var featureClass = '.popup__feature--' + window.data.FEATURES[feature];
    if (!cardData.offer.features.includes(window.data.FEATURES[feature])) {
      newCard.querySelector(featureClass).classList.add('hidden');
    }
  }


  if (cardData.offer.description) {
    newCard.querySelector('.popup__description').textContent = cardData.offer.description;
  } else {
    newCard.querySelector('.popup__description').classList.add('hidden');
  }


  if (cardData.author.avatar) {
    newCard.querySelector('.popup__avatar').src = cardData.author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').classList.add('hidden');
  }


  var offerPhoto = newCard.querySelector('.popup__photo');
  if (cardData.offer.photos.length > 0) {
    offerPhoto.src = cardData.offer.photos[0];
    if (cardData.offer.photos.length > 1) {
      for (var picture = 1; picture < cardData.offer.photos.length; picture++) {
        var newPicture = offerPhoto.cloneNode(true);
        newPicture.src = cardData.offer.photos[picture];
        offerPhoto.before(newPicture);
      }
    }
  } else {
    offerPhoto.classList.add('hidden');
  }

  document.querySelector('.map__filters-container').before(newCard);
})();
