document.addEventListener(
  'DOMContentLoaded',
  function() {

    var productImage =
      document.getElementById('matchaProductImage');

    var productTitle =
      document.getElementById('matchaTitle');

    var deliveryDate =
      document.getElementById('matchaDeliveryDate');

    var optionButtons =
      document.querySelectorAll('.matcha-option');

    var orderButton =
      document.getElementById('matchaOrder');


    if (deliveryDate) {

      var today =
        new Date();

      var day =
        String(today.getDate()).padStart(2, '0');

      var month =
        String(today.getMonth() + 1).padStart(2, '0');

      var year =
        today.getFullYear();

      deliveryDate.textContent =
        day + '-' + month + '-' + year;

    }


    optionButtons.forEach(
      function(button) {

        button.addEventListener(
          'click',
          function() {

            var newImage =
              button.getAttribute('data-image');

            var newAlt =
              button.getAttribute('data-alt');

            var newTitle =
              button.getAttribute('data-title');


            optionButtons.forEach(
              function(item) {

                item.classList.remove('active');

              }
            );

            button.classList.add('active');


            if (productImage) {

              productImage.classList.add(
                'is-changing'
              );

              setTimeout(
                function() {

                  productImage.src =
                    newImage;

                  productImage.alt =
                    newAlt;

                  productImage.classList.remove(
                    'is-changing'
                  );

                },
                220
              );

            }


            if (productTitle) {

              productTitle.textContent =
                newTitle;

            }

          }
        );

      }
    );


    if (orderButton) {

      orderButton.addEventListener(
        'click',
        function(e) {

          e.preventDefault();

        }
      );

    }

  }
);
