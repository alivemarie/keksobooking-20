'use strict';
(function () {
  var MAX_OFFERS_NUMBER = 5;

  var PriceFrames = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
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

  var onChangeFilters = function (evt) {
    if (evt.target.type === 'checkbox') {
      FilterValue[evt.target.id] = !FilterValue[evt.target.id];
    } else {
      FilterValue[evt.target.id] = evt.target.value;
    }

    var filteredPins = window.loadedData.slice();
    var lastFilteredPins = [];


    var filterOffers = function (it) {
      if ((FilterValue['housing-type'] !== it.offer.type) && (FilterValue['housing-type'] !== 'any')) {
        return false;
      }
      if ((+FilterValue['housing-rooms'] !== it.offer.rooms) && (FilterValue['housing-rooms'] !== 'any')) {
        return false;
      }
      if ((+FilterValue['housing-guests'] !== it.offer.guests) && (FilterValue['housing-guests'] !== 'any')) {
        return false;
      }
      if (!it.offer.features.includes('wifi') && (FilterValue['filter-wifi'])) {
        return false;
      }
      if (!it.offer.features.includes('dishwasher') && (FilterValue['filter-dishwasher'])) {
        return false;
      }
      if (!it.offer.features.includes('parking') && (FilterValue['filter-parking'])) {
        return false;
      }
      if (!it.offer.features.includes('washer') && (FilterValue['filter-washer'])) {
        return false;
      }
      if (!it.offer.features.includes('elevator') && (FilterValue['filter-elevator'])) {
        return false;
      }
      if (!it.offer.features.includes('conditioner') && (FilterValue['filter-conditioner'])) {
        return false;
      }
      if ((it.offer.price > PriceFrames[FilterValue['housing-price']].max) || (it.offer.price < PriceFrames[FilterValue['housing-price']].min)) {
        return false;
      }
      return true;
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
        window.cardPopup.closePopup();
      }
      window.render.renderPins(lastFilteredPins);
    };

    window.debounce(updatePins);
  };

  window.filter = {
    resetFilter: function () {
      FilterValue = createFilterValues();
    },
    onChangeFilters: onChangeFilters
  };
})();
