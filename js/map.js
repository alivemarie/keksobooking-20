'use strict';
(function () {
  var PIN_LEG = 20;
  var CoordLimit = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };
  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  window.map = {
    draggingPin: function (evt) {
      if (evt.buttons === 1) {
        window.formActivation.activatePage();
        addressField.value = window.formActivation.getAddressCoords(mainPin);

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

          if (mainPin.offsetTop > CoordLimit.y.max - mainPin.offsetHeight - PIN_LEG) {
            mainPin.style.top = CoordLimit.y.max - mainPin.offsetHeight - PIN_LEG + 'px';
          } else if (mainPin.offsetTop < CoordLimit.y.min - mainPin.offsetHeight - PIN_LEG) {
            mainPin.style.top = CoordLimit.y.min - mainPin.offsetHeight - PIN_LEG + 'px';
          }
          if (mainPin.offsetLeft > CoordLimit.x.max - mainPin.offsetWidth / 2) {
            mainPin.style.left = CoordLimit.x.max - mainPin.offsetWidth / 2 + 'px';
          } else if (mainPin.offsetLeft < CoordLimit.x.min - mainPin.offsetWidth / 2) {
            mainPin.style.left = CoordLimit.x.min - mainPin.offsetWidth / 2 + 'px';
          }
          addressField.value = window.formActivation.getAddressCoords(mainPin);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          addressField.value = window.formActivation.getAddressCoords(mainPin);
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    }
  };
})();
