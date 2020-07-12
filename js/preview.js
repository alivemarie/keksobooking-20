'use strict';
(function () {
  var showPreview = function (fileChooser, filePreviewBlock) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        if (!filePreviewBlock.querySelector('img')) {
          var filePreview = document.createElement('img');
          filePreview.alt = 'Фотография жилья';
          filePreview.style.width = '40px';
          filePreview.style.height = '44px';
          filePreviewBlock.appendChild(filePreview);
        } else {
          filePreview = filePreviewBlock.querySelector('img');
        }

        reader.addEventListener('load', function () {
          filePreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  window.preview = {
    showPreview: showPreview
  };

})();
