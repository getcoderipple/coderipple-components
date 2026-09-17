document.addEventListener('click', function(e) {

  const trigger = e.target.closest('[data-dropdown-trigger]');

  if (trigger) {

    const dropdown = trigger.closest('[data-dropdown]');
    const isOpen = dropdown.classList.contains('open');

    document.querySelectorAll('[data-dropdown].open')
      .forEach(function(item) {

        item.classList.remove('open');

        const itemTrigger =
          item.querySelector('[data-dropdown-trigger]');

        if (itemTrigger) {
          itemTrigger.setAttribute('aria-expanded', 'false');
        }

      });

    if (!isOpen) {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    return;
  }

  const option = e.target.closest('[data-dropdown-option]');

  if (option) {

    const dropdown = option.closest('[data-dropdown]');
    const value = dropdown.querySelector('[data-dropdown-value]');
    const dropdownTrigger =
      dropdown.querySelector('[data-dropdown-trigger]');

    const selectedValue =
      option.getAttribute('data-dropdown-option');

    value.textContent = selectedValue;

    dropdownTrigger.classList.add('has-value');

    dropdown.querySelectorAll('[data-dropdown-option]')
      .forEach(function(item) {
        item.classList.remove('selected');
      });

    option.classList.add('selected');

    dropdown.classList.remove('open');

    dropdownTrigger.setAttribute(
      'aria-expanded',
      'false'
    );

    return;
  }

  document.querySelectorAll('[data-dropdown].open')
    .forEach(function(dropdown) {

      dropdown.classList.remove('open');

      const dropdownTrigger =
        dropdown.querySelector('[data-dropdown-trigger]');

      if (dropdownTrigger) {
        dropdownTrigger.setAttribute(
          'aria-expanded',
          'false'
        );
      }

    });

});
