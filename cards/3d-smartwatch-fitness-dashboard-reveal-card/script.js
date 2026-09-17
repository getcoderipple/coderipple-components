document.addEventListener(
  'DOMContentLoaded',
  function() {

    var watchCard =
      document.getElementById('watchCard');

    var watchTrigger =
      document.getElementById('watchTrigger');

    if (watchCard) {

      if (watchTrigger) {

        watchTrigger.addEventListener(
          'click',
          function(e) {

            e.preventDefault();

            watchCard.classList.add('active');

          }
        );

      }


      document.addEventListener(
        'click',
        function(e) {

          if (!watchCard.contains(e.target)) {

            watchCard.classList.remove('active');

            watchCard.style.transform =
              'perspective(1000px) rotateX(0deg) rotateY(0deg)';

          }

        }
      );


      watchCard.addEventListener(
        'mousemove',
        function(e) {

          if (!watchCard.classList.contains('active')) {
            return;
          }

          var rect =
            watchCard.getBoundingClientRect();

          var mouseX =
            e.clientX - rect.left;

          var mouseY =
            e.clientY - rect.top;

          var centerX =
            rect.width / 2;

          var centerY =
            rect.height / 2;

          var rotateY =
            ((mouseX - centerX) / centerX) * 4;

          var rotateX =
            ((centerY - mouseY) / centerY) * 3;

          watchCard.style.transform =
            'perspective(1000px) rotateX(' +
            rotateX +
            'deg) rotateY(' +
            rotateY +
            'deg)';

        }
      );


      watchCard.addEventListener(
        'mouseleave',
        function() {

          watchCard.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg)';

        }
      );

    }

  }
);
