const sidebar = document.querySelector('.cr-play-sidebar');
const toggle = document.querySelector('.cr-play-collapse-btn');
const logo = document.querySelector('.cr-play-logo');

if (sidebar && toggle && logo) {

  toggle.addEventListener('click', function () {
    sidebar.classList.add('is-collapsed');
  });

  logo.addEventListener('click', function () {

    if (
      sidebar.classList.contains('is-collapsed')
    ) {
      sidebar.classList.remove('is-collapsed');
    }

  });

}
