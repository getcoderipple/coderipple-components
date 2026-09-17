const passwordInput = document.getElementById('password-input');
const passwordToggle = document.querySelector('[data-password-toggle]');

passwordToggle.addEventListener('click', function() {

  const isHidden = passwordInput.type === 'password';

  passwordInput.type = isHidden ? 'text' : 'password';

  passwordToggle.textContent = isHidden ? 'Hide' : 'Show';

  passwordToggle.setAttribute(
    'aria-label',
    isHidden ? 'Hide password' : 'Show password'
  );

});
