'use strict';
(function () {
  var PIN_LEG = 20;
  var CoordsLimit = {
    x: {
      MIN: 0,
      MAX: 1200
    },
    y: {
      MIN: 130,
      MAX: 630
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

          if (mainPin.offsetTop > CoordsLimit.y.MAX - mainPin.offsetHeight - PIN_LEG) {
            mainPin.style.top = CoordsLimit.y.MAX - mainPin.offsetHeight - PIN_LEG + 'px';
          } else if (mainPin.offsetTop < CoordsLimit.y.MIN - mainPin.offsetHeight - PIN_LEG) {
            mainPin.style.top = CoordsLimit.y.MIN - mainPin.offsetHeight - PIN_LEG + 'px';
          }
          if (mainPin.offsetLeft > CoordsLimit.x.MAX - mainPin.offsetWidth / 2) {
            mainPin.style.left = CoordsLimit.x.MAX - mainPin.offsetWidth / 2 + 'px';
          } else if (mainPin.offsetLeft < CoordsLimit.x.MIN - mainPin.offsetWidth / 2) {
            mainPin.style.left = CoordsLimit.x.MIN - mainPin.offsetWidth / 2 + 'px';
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
