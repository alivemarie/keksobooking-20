'use strict';
(function () {
  var housingTypeSelect = document.querySelector('#housing-type');
  var onChangeHousingType = function () {
    var filteredPins = window.loadedData.slice();
    var lastFilteredPins = [];
    if (housingTypeSelect.value === 'any') {
      lastFilteredPins = filteredPins.slice();
    } else {
      lastFilteredPins = filteredPins.filter(function (it) {
        return it.offer.type === housingTypeSelect.value;
      });
    }
    if (document.querySelector('.map__card')) {
      window.cardPopup.closePopup();
    }
    window.render.renderPins(lastFilteredPins);
  };

  housingTypeSelect.addEventListener('change', onChangeHousingType);

})();
