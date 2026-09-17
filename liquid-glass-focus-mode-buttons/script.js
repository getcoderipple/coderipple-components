const focusButtons =
  document.querySelectorAll('.liquid-focus-btn');

focusButtons.forEach(function(button) {

  button.addEventListener('click', function() {

    focusButtons.forEach(function(item) {
      item.classList.remove('selected');
    });

    button.classList.add('selected');

  });

});
