const experience = document.querySelector('.cr-orbit-experience');

if (experience) {

  const switchButton =
    experience.querySelector('.cr-light-switch');

  const label =
    experience.querySelector('.cr-light-label');

  const orbitArea =
    experience.querySelector('.cr-orbit-area');

  const items =
    Array.from(experience.querySelectorAll('.cr-orbit-item'));

  let isRunning = false;
  let animationId = null;
  let orbitTime = 0;
  let previousTime = 0;


  function getOrbitSize() {

    const width = orbitArea.clientWidth;

    const cardHalfWidth =
      width <= 700 ? 40 : 62;

    const safePadding =
      width <= 700 ? 12 : 24;

    const maxRadius =
      Math.max(
        100,
        (width / 2) - cardHalfWidth - safePadding
      );

    let radiusX =
      Math.min(380, maxRadius);

    let radiusY = 150;

    if (width < 900) {
      radiusY = 130;
    }

    if (width < 700) {
      radiusY = 95;
    }

    if (width < 480) {
      radiusY = 82;
    }

    return {
      x: radiusX,
      y: radiusY
    };

  }


  function renderOrbit() {

    const orbit =
      getOrbitSize();

    const total =
      items.length;

    const fullCircle =
      Math.PI * 2;

    items.forEach(function(item, index) {

      const angle =
        orbitTime +
        (fullCircle / total) * index -
        Math.PI / 2;

      const cos =
        Math.cos(angle);

      const sin =
        Math.sin(angle);

      const x =
        cos * orbit.x;

      const y =
        sin * orbit.y;

      item.style.setProperty(
        '--x',
        x.toFixed(2) + 'px'
      );

      item.style.setProperty(
        '--y',
        y.toFixed(2) + 'px'
      );

      const depth =
        (sin + 1) / 2;

      const scale =
        0.86 + depth * 0.17;

      item.style.setProperty(
        '--depth',
        scale.toFixed(3)
      );

      item.classList.remove(
        'is-front',
        'is-back'
      );

      if (sin > 0.08) {

        item.classList.add('is-front');

      } else if (sin < -0.08) {

        item.classList.add('is-back');

      }

      const zIndex =
        Math.round(
          10 + depth * 25
        );

      item.style.zIndex =
        zIndex;

    });

  }


  function animate(timestamp) {

    if (!isRunning) {
      return;
    }

    if (!previousTime) {
      previousTime = timestamp;
    }

    const delta =
      Math.min(
        timestamp - previousTime,
        32
      );

    previousTime =
      timestamp;

    orbitTime +=
      delta * 0.00096;

    renderOrbit();

    animationId =
      requestAnimationFrame(animate);

  }


  if (switchButton) {

    switchButton.addEventListener(
      'click',
      function() {

        const isOn =
          experience.classList.toggle('is-on');

        switchButton.setAttribute(
          'aria-label',
          isOn
            ? 'Switch light off'
            : 'Switch light on'
        );

        if (label) {

          label.innerHTML =
            isOn
              ? 'Pull the cord<br>to switch off'
              : 'Pull the cord<br>to switch on';

        }

        if (isOn) {

          if (!isRunning) {

            isRunning = true;
            previousTime = 0;

            animationId =
              requestAnimationFrame(animate);

          }

        } else {

          isRunning = false;
          previousTime = 0;

          if (animationId) {

            cancelAnimationFrame(
              animationId
            );

          }

        }

      }
    );

  }


  renderOrbit();


  window.addEventListener(
    'resize',
    function() {

      renderOrbit();

    }
  );

}
