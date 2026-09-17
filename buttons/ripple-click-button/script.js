document.addEventListener('click', function(e) {

  const rippleButton = e.target.closest('.ripple-btn');

  if (rippleButton) {

    const circle = document.createElement('span');

    const size = Math.max(
      rippleButton.clientWidth,
      rippleButton.clientHeight
    );

    const rect = rippleButton.getBoundingClientRect();

    circle.classList.add('ripple-circle');

    circle.style.width = size + 'px';
    circle.style.height = size + 'px';

    circle.style.left =
      e.clientX - rect.left - size / 2 + 'px';

    circle.style.top =
      e.clientY - rect.top - size / 2 + 'px';

    rippleButton.appendChild(circle);

    setTimeout(function() {
      circle.remove();
    }, 600);
  }

});
