document.addEventListener(
  'DOMContentLoaded',
  function() {

    var audioCard =
      document.getElementById('audioCard');

    var audioTrigger =
      document.getElementById('audioTrigger');

    if (audioCard) {

      if (audioTrigger) {

        audioTrigger.addEventListener(
          'click',
          function(e) {

            e.preventDefault();

            audioCard.classList.add('active');

          }
        );

      }


      document.addEventListener(
        'click',
        function(e) {

          if (!audioCard.contains(e.target)) {

            audioCard.classList.remove('active');

            audioCard.style.transform =
              'rotateX(0deg) rotateY(0deg)';

          }

        }
      );


      audioCard.addEventListener(
        'mousemove',
        function(e) {

          if (!audioCard.classList.contains('active')) {
            return;
          }

          var rect =
            audioCard.getBoundingClientRect();

          var mouseX =
            e.clientX - rect.left;

          var mouseY =
            e.clientY - rect.top;

          var centerX =
            rect.width / 2;

          var centerY =
            rect.height / 2;

          var rotateY =
            ((mouseX - centerX) / centerX) * 5;

          var rotateX =
            ((centerY - mouseY) / centerY) * 4;

          audioCard.style.transform =
            'perspective(1000px) rotateX(' +
            rotateX +
            'deg) rotateY(' +
            rotateY +
            'deg)';

        }
      );


      audioCard.addEventListener(
        'mouseleave',
        function() {

          audioCard.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg)';

        }
      );

    }

  }
);
