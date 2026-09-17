const orbitLogin = document.querySelector('.cr-orbit-login');

if (orbitLogin) {

  const passwordInput = orbitLogin.querySelector(
    'input[type="password"]'
  );

  const toggleButton = orbitLogin.querySelector(
    '.cr-orbit-password-toggle'
  );

  const form = orbitLogin.querySelector(
    '.cr-orbit-form'
  );

  if (passwordInput && toggleButton) {

    toggleButton.addEventListener('click', function () {

      const isHidden =
        passwordInput.type === 'password';

      passwordInput.type =
        isHidden ? 'text' : 'password';

      toggleButton.setAttribute(
        'aria-label',
        isHidden ? 'Hide password' : 'Show password'
      );

    });

  }

  if (form) {

    form.addEventListener('submit', function (event) {

      event.preventDefault();

      const button =
        form.querySelector('.cr-orbit-submit');

      if (!button) return;

      const originalHTML =
        button.innerHTML;

      button.innerHTML =
        '<span>Welcome ✓</span>';

      setTimeout(function () {
        button.innerHTML = originalHTML;
      }, 1600);

    });

  }

}
