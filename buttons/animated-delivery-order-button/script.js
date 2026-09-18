(function () {

  var button =
    document.getElementById(
      'crOrderBtn'
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

      if (
        button.classList.contains(
          'cr-success'
        )
      ) {

        button.classList.remove(
          'cr-success'
        );

        button.classList.remove(
          'cr-running'
        );

        return;
      }

      running = true;

      button.classList.add(
        'cr-running'
      );

      setTimeout(
        function () {

          button.classList.add(
            'cr-driving'
          );

        },
        280
      );

      setTimeout(
        function () {

          button.classList.remove(
            'cr-driving'
          );

          button.classList.add(
            'cr-success'
          );

        },
        2600
      );

      setTimeout(
        function () {

          running = false;

        },
        3150
      );

    }
  );

})();
