'use strict';
(function () {
  var MAX_OFFERS_NUMBER = 5;

  var PriceFrames = {
    'low': {
      min: 0,
      max: 9999
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50001,
      max: Infinity
    },
    'any': {
      min: 0,
      max: Infinity
    }
  };

  var createFilterValues = function () {
    return {
      'housing-type': 'any',
      'housing-price': 'any',
      'housing-rooms': 'any',
      'housing-guests': 'any',
      'filter-wifi': false,
      'filter-dishwasher': false,
      'filter-parking': false,
      'filter-washer': false,
      'filter-elevator': false,
      'filter-conditioner': false
    };
  };

  var FilterValue = createFilterValues();

  var onFiltersChange = function (evt) {
    if (evt.target.type === 'checkbox') {
      FilterValue[evt.target.id] = !FilterValue[evt.target.id];
    } else {
      FilterValue[evt.target.id] = evt.target.value;
    }

    try {
      var filteredPins = window.verifiedData.slice();
    } catch (err) {
      filteredPins = [];
    }
    var lastFilteredPins = [];

    var filterOffers = function (it) {
      var isTypeMatch = (FilterValue['housing-type'] !== it.offer.type) && (FilterValue['housing-type'] !== 'any');
      var isRoomMatch = (+FilterValue['housing-rooms'] !== it.offer.rooms) && (FilterValue['housing-rooms'] !== 'any');
      var isGuestMatch = (+FilterValue['housing-guests'] !== it.offer.guests) && (FilterValue['housing-guests'] !== 'any');
      var isWifiMatch = !it.offer.features.includes('wifi') && (FilterValue['filter-wifi']);
      var isDishwasherMatch = !it.offer.features.includes('dishwasher') && (FilterValue['filter-dishwasher']);
      var isParkingMatch = !it.offer.features.includes('parking') && (FilterValue['filter-parking']);
      var isWasherMatch = !it.offer.features.includes('washer') && (FilterValue['filter-washer']);
      var isElevatorMatch = !it.offer.features.includes('elevator') && (FilterValue['filter-elevator']);
      var isConditionerMatch = !it.offer.features.includes('conditioner') && (FilterValue['filter-conditioner']);
      var isPriceMatch = (it.offer.price > PriceFrames[FilterValue['housing-price']].max) || (it.offer.price < PriceFrames[FilterValue['housing-price']].min);

      return !isTypeMatch
          && !isRoomMatch
          && !isGuestMatch
          && !isWifiMatch
          && !isDishwasherMatch
          && !isParkingMatch
          && !isWasherMatch
          && !isElevatorMatch
          && !isConditionerMatch
          && !isPriceMatch;
    };

    for (var pin = 0; pin < filteredPins.length; pin++) {
      if (filterOffers(filteredPins[pin])) {
        lastFilteredPins.push(filteredPins[pin]);
      }
      if (lastFilteredPins.length === MAX_OFFERS_NUMBER) {
        break;
      }
    }

    var updatePins = function () {
      if (document.querySelector('.map__card')) {
        window.card.closePopup();
      }
      window.render.renderPins(lastFilteredPins);
    };

    window.debounce(updatePins);
  };

  var resetFilter = function () {
    FilterValue = createFilterValues();
  };

  window.filter = {
    resetFilter: resetFilter,
    onFiltersChange: onFiltersChange
  };
})();
