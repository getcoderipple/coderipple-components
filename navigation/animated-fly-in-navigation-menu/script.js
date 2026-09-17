const slideMenuWrap =
  document.querySelector('.cr-slide-menu-wrap');

if (slideMenuWrap) {

  const menu =
    slideMenuWrap.querySelector('.cr-slide-menu');

  const toggle =
    slideMenuWrap.querySelector('.cr-menu-toggle');

  const close =
    slideMenuWrap.querySelector('.cr-menu-close');

  if (toggle && menu) {

    toggle.addEventListener('click', function () {

      menu.classList.toggle('is-open');

    });

  }

  if (close && menu) {

    close.addEventListener('click', function () {

      menu.classList.remove('is-open');

    });

  }

  const menuLinks =
    slideMenuWrap.querySelectorAll(
      '.cr-menu-list a'
    );

  menuLinks.forEach(function (link) {

    link.addEventListener('click', function (e) {

      e.preventDefault();

      menuLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      link.classList.add('active');

    });

  });

}
