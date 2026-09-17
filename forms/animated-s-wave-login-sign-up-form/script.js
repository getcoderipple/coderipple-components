document.addEventListener(
  'DOMContentLoaded',
  function() {

    var shell =
      document.querySelector('.cr-auth-shell');

    if (!shell) {
      return;
    }

    var switchButtons =
      shell.querySelectorAll('.cr-switch-btn');

    switchButtons.forEach(
      function(button) {

        button.addEventListener(
          'click',
          function() {

            var target =
              button.getAttribute('data-target');

            if (target === 'signup') {

              shell.classList.add(
                'signup-active'
              );

            }

            if (target === 'login') {

              shell.classList.remove(
                'signup-active'
              );

            }

          }
        );

      }
    );

  }
);
