const fileInput = document.querySelector('[data-file-input]');
const fileName = document.querySelector('[data-file-name]');

fileInput.addEventListener('change', function() {

  if (fileInput.files.length) {
    fileName.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = 'No file selected';
  }

});
