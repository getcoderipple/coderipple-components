(function () {

  var button =
    document.getElementById(
      'crPortalBtn'
    );

  if (!button) {
    return;
  }

  var running = false;

  button.addEventListener(
    'click',
    function () {

      if (running) {
        return;
      }

      running = true;

      button.classList.remove(
        'cr-complete'
      );

      button.classList.add(
        'cr-activating'
      );

      setTimeout(
        function () {

          button.classList.remove(
            'cr-activating'
          );

          button.classList.add(
            'cr-complete'
          );

        },
        1550
      );

      setTimeout(
        function () {

          button.classList.remove(
            'cr-complete'
          );

          running = false;

        },
        3600
      );

    }
  );

})();
