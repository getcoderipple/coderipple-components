const toggle = document.querySelector('.hamburger-toggle');
const menu = document.querySelector('.hamburger-links');

toggle.addEventListener('click', function() {

  menu.classList.toggle('open');

  const isOpen = menu.classList.contains('open');

  toggle.setAttribute('aria-expanded', isOpen);

});
