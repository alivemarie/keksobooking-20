'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PreviewSize = {
    WIDTH: '40px',
    HEIGHT: '44px'
  };

  var showPreview = function (fileChooser, filePreviewBlock) {
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
          filePreviewBlock.style = 'display: flex; align-items: center; padding: 0 15px';
          filePreview.alt = 'Фотография жилья';
          filePreview.style.width = PreviewSize.WIDTH;
          filePreview.style.height = PreviewSize.HEIGHT;
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
