document.addEventListener(
  'DOMContentLoaded',
  function() {

    var lampScene =
      document.getElementById('lampScene');

    var lampSwitch =
      document.getElementById('lampSwitch');

    if (lampSwitch) {

      lampSwitch.addEventListener(
        'click',
        function() {

          if (lampScene) {

            lampScene.classList.toggle(
              'is-on'
            );

          }

        }
      );

    }

  }
);
