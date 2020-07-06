'use strict';
(function () {
  var HousingType = {
    '0': 'any',
    '1': 'palace',
    '2': 'flat',
    '3': 'house',
    '4': 'bungalo'
  };
  var housingTypeSelect = document.querySelector('#housing-type');
  var onChangeHousingType = function () {
    var filteredPins = window.loadedData.slice();
    var newFilteredPins = filteredPins.filter(function (it) {
      return it.offer.type === HousingType[housingTypeSelect.selectedIndex];
    });
    window.cardPopup.closePopup();
    window.render.renderPins(newFilteredPins);
  };

  housingTypeSelect.addEventListener('change', onChangeHousingType);

})();
