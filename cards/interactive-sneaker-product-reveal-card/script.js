document.addEventListener(
  'DOMContentLoaded',
  function() {

    var voltCard =
      document.getElementById('voltCard');

    var voltTrigger =
      document.getElementById('voltTrigger');

    if (voltCard) {

      if (voltTrigger) {

        voltTrigger.addEventListener(
          'click',
          function(e) {

            e.preventDefault();

            voltCard.classList.add('active');

          }
        );

      }

      document.addEventListener(
        'click',
        function(e) {

          if (!voltCard.contains(e.target)) {
            voltCard.classList.remove('active');
          }

        }
      );

    }

  }
);
