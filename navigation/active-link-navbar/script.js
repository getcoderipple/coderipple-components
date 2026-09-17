document.querySelectorAll('.active-navbar a').forEach(function(link) {

  link.addEventListener('click', function(e) {

    e.preventDefault();

    const navbar = this.closest('.active-navbar');

    navbar.querySelectorAll('a').forEach(function(item) {
      item.classList.remove('active');
    });

    this.classList.add('active');

  });

});
