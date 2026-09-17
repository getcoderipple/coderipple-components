document.addEventListener(
  'DOMContentLoaded',
  function() {

    var heroImage =
      document.getElementById('travelHeroImage');

    var title =
      document.getElementById('travelTitle');

    var description =
      document.getElementById('travelDescription');

    var currentNumber =
      document.getElementById('travelCurrent');

    var progress =
      document.getElementById('travelProgress');

    var prevButton =
      document.getElementById('travelPrev');

    var nextButton =
      document.getElementById('travelNext');

    var cards =
      document.querySelectorAll('.cr-travel-card');

    var content =
      document.querySelector('.cr-travel-content');

    var currentIndex = 0;


    function changeDestination(index) {

      if (!cards.length) {
        return;
      }


      if (index < 0) {
        index = cards.length - 1;
      }

      if (index >= cards.length) {
        index = 0;
      }


      var selectedCard =
        cards[index];

      var newImage =
        selectedCard.getAttribute('data-image');

      var newAlt =
        selectedCard.getAttribute('data-alt');

      var newTitle =
        selectedCard.getAttribute('data-title');

      var newDescription =
        selectedCard.getAttribute('data-description');


      cards.forEach(
        function(card) {

          card.classList.remove(
            'active'
          );

        }
      );


      selectedCard.classList.add(
        'active'
      );


      if (heroImage) {

        heroImage.classList.add(
          'is-changing'
        );

      }


      if (content) {

        content.classList.add(
          'is-changing'
        );

      }


      setTimeout(
        function() {

          if (heroImage) {

            heroImage.src =
              newImage;

            heroImage.alt =
              newAlt;

          }


          if (title) {

            title.textContent =
              newTitle;

          }


          if (description) {

            description.textContent =
              newDescription;

          }


          if (currentNumber) {

            currentNumber.textContent =
              String(index + 1).padStart(
                2,
                '0'
              );

          }


          if (progress) {

            var width =
              ((index + 1) / cards.length) * 100;

            progress.style.width =
              width + '%';

          }


          if (heroImage) {

            heroImage.classList.remove(
              'is-changing'
            );

          }


          if (content) {

            content.classList.remove(
              'is-changing'
            );

          }


          currentIndex =
            index;

        },
        320
      );

    }


    cards.forEach(
      function(card,index) {

        card.addEventListener(
          'click',
          function() {

            changeDestination(
              index
            );

          }
        );

      }
    );


    if (prevButton) {

      prevButton.addEventListener(
        'click',
        function() {

          changeDestination(
            currentIndex - 1
          );

        }
      );

    }


    if (nextButton) {

      nextButton.addEventListener(
        'click',
        function() {

          changeDestination(
            currentIndex + 1
          );

        }
      );

    }

  }
);
