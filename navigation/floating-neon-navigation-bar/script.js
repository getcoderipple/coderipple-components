document.addEventListener(
  'DOMContentLoaded',
  function() {

    var nav =
      document.querySelector('.cr-floating-nav');

    if (!nav) {
      return;
    }

    var items =
      nav.querySelectorAll('.cr-nav-item');

    items.forEach(
      function(item) {

        item.addEventListener(
          'click',
          function() {

            items.forEach(
              function(navItem) {

                navItem.classList.remove(
                  'active'
                );

              }
            );

            item.classList.add(
              'active'
            );

            var index =
              item.getAttribute('data-index');

            nav.style.setProperty(
              '--active-index',
              index
            );

          }
        );

      }
    );

  }
);
