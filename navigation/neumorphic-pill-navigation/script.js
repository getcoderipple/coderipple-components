const pillNav = document.querySelector('.cr-pill-nav');

if (pillNav) {

  pillNav.addEventListener('click', function (e) {

    const item = e.target.closest('.cr-pill-item');

    if (!item) return;

    pillNav
      .querySelectorAll('.cr-pill-item')
      .forEach(function (button) {

        button.classList.remove('active');

      });

    item.classList.add('active');

  });

}
