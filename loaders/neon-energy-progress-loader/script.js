document.addEventListener(
  'DOMContentLoaded',
  function() {

    var number =
      document.getElementById('cr-load-number');

    var count =
      document.getElementById('cr-load-count');

    var bar =
      document.getElementById('cr-progress-bar');

    var loaderText =
      document.getElementById('cr-loader-text');

    if (!number) {
      return;
    }

    if (!count) {
      return;
    }

    if (!bar) {
      return;
    }

    if (!loaderText) {
      return;
    }

    var progress = 0;

    function startLoader() {

      progress = 0;

      number.textContent = '0';
      count.textContent = '0';
      bar.style.width = '0%';

      loaderText.textContent = 'Loading';

      var loader =
        setInterval(
          function() {

            progress += 1;

            number.textContent =
              progress;

            count.textContent =
              progress;

            bar.style.width =
              progress + '%';

            if (progress >= 100) {

              clearInterval(loader);

              loaderText.textContent =
                'Done ✓';

              setTimeout(
                function() {

                  startLoader();

                },
                1500
              );

            }

          },
          45
        );

    }

    startLoader();

  }
);
