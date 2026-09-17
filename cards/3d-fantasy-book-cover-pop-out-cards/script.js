document.addEventListener('DOMContentLoaded', function() {

  var links = document.querySelectorAll('.fantasy-card-link');

  var touchDevice = window.matchMedia(
    '(hover: none), (pointer: coarse)'
  ).matches;

  if (touchDevice) {

    links.forEach(function(link) {

      var card = link.querySelector('.fantasy-card');

      link.addEventListener('click', function(e) {

        var active = card.classList.contains('is-active');

        document
          .querySelectorAll('.fantasy-card.is-active')
          .forEach(function(item) {

            if (item !== card) {
              item.classList.remove('is-active');
            }

          });

        if (!active) {
          e.preventDefault();
          card.classList.add('is-active');
        }

      });

    });

    document.addEventListener('click', function(e) {

      if (!e.target.closest('.fantasy-card-link')) {

        document
          .querySelectorAll('.fantasy-card.is-active')
          .forEach(function(card) {
            card.classList.remove('is-active');
          });

      }

    });

  }

});
