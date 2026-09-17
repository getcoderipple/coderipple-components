const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', function() {

  dropdownMenu.classList.toggle('open');
  dropdownToggle.classList.toggle('active');

  const isOpen = dropdownMenu.classList.contains('open');

  dropdownToggle.setAttribute('aria-expanded', isOpen);

});
