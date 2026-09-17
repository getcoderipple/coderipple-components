const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-contact-status]');

form.addEventListener('submit', function(event) {

  event.preventDefault();

  status.textContent = 'Message submitted successfully!';

  form.reset();

});
