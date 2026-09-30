(() => {

  const component =
    document.querySelector("#crTiltProfile");

  if (!component) return;

  const card =
    component.querySelector(
      ".cr-tilt-profile__card"
    );

  const glow =
    component.querySelector(
      ".cr-tilt-profile__glow"
    );

  const glare =
    component.querySelector(
      ".cr-tilt-profile__glare"
    );

  const depthItems =
    component.querySelectorAll(
      "[data-depth]"
    );

  if (!card || !glow || !glare) return;


  /* SETTINGS */

  const MAX_TILT = 10;
  const PARALLAX_STRENGTH = 0.32;

  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  let targetRotateX = 0;
  let targetRotateY = 0;

  let currentRotateX = 0;
  let currentRotateY = 0;

  let pointerX = 0;
  let pointerY = 0;

  let isHovering = false;
  let animationFrame = null;


  /* HELPERS */

  const clamp = (value, min, max) => {
    return Math.min(
      Math.max(value, min),
      max
    );
  };


  /* DEPTH / PARALLAX */

  const updateDepthItems = () => {

    depthItems.forEach((item) => {

      const depth =
        Number.parseFloat(
          item.dataset.depth
        ) || 0;

      const moveX =
        pointerX *
        depth *
        PARALLAX_STRENGTH;

      const moveY =
        pointerY *
        depth *
        PARALLAX_STRENGTH;

      item.style.transform =
        `translate3d(
          ${moveX}px,
          ${moveY}px,
          ${depth}px
        )`;

    });

  };


  /* RESET DEPTH */

  const resetDepthItems = () => {

    depthItems.forEach((item) => {

      item.style.transform =
        "translate3d(0px, 0px, 0px)";

    });

  };


  /* SMOOTH ANIMATION */

  const animate = () => {

    currentRotateX +=
      (targetRotateX - currentRotateX) *
      0.12;

    currentRotateY +=
      (targetRotateY - currentRotateY) *
      0.12;

    card.style.transform =
      `rotateX(${currentRotateX}deg)
       rotateY(${currentRotateY}deg)`;

    if (
      isHovering ||
      Math.abs(currentRotateX) > 0.01 ||
      Math.abs(currentRotateY) > 0.01
    ) {

      animationFrame =
        requestAnimationFrame(animate);

    } else {

      currentRotateX = 0;
      currentRotateY = 0;

      card.style.transform =
        "rotateX(0deg) rotateY(0deg)";

      animationFrame = null;

    }

  };


  /* POINTER MOVE */

  const handlePointerMove = (event) => {

    if (
      !canHover.matches ||
      reduceMotion.matches
    ) {
      return;
    }

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const normalizedX =
      clamp(
        (x / rect.width) * 2 - 1,
        -1,
        1
      );

    const normalizedY =
      clamp(
        (y / rect.height) * 2 - 1,
        -1,
        1
      );

    pointerX = normalizedX;
    pointerY = normalizedY;

    targetRotateX =
      normalizedY * -MAX_TILT;

    targetRotateY =
      normalizedX * MAX_TILT;


    /* CURSOR FOLLOW GLOW */

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;


    /* DYNAMIC GLARE */

    const glareX =
      50 + normalizedX * 35;

    const glareY =
      50 + normalizedY * 35;

    glare.style.background =
      `radial-gradient(
        circle at ${glareX}% ${glareY}%,
        rgba(255, 255, 255, 0.20) 0%,
        rgba(103, 232, 249, 0.08) 18%,
        rgba(168, 85, 247, 0.04) 34%,
        transparent 62%
      )`;


    /* LAYERED PARALLAX */

    updateDepthItems();

  };


  /* POINTER ENTER */

  const handlePointerEnter = () => {

    if (
      !canHover.matches ||
      reduceMotion.matches
    ) {
      return;
    }

    isHovering = true;

    glow.style.opacity = "0.9";
    glare.style.opacity = "0.55";

    if (!animationFrame) {

      animationFrame =
        requestAnimationFrame(animate);

    }

  };


  /* POINTER LEAVE */

  const handlePointerLeave = () => {

    isHovering = false;

    targetRotateX = 0;
    targetRotateY = 0;

    pointerX = 0;
    pointerY = 0;

    glow.style.left = "50%";
    glow.style.top = "50%";
    glow.style.opacity = "0.5";

    glare.style.opacity = "0";

    resetDepthItems();

    if (!animationFrame) {

      animationFrame =
        requestAnimationFrame(animate);

    }

  };


  /* EVENT LISTENERS */

  card.addEventListener(
    "pointerenter",
    handlePointerEnter
  );

  card.addEventListener(
    "pointermove",
    handlePointerMove
  );

  card.addEventListener(
    "pointerleave",
    handlePointerLeave
  );


  /* WINDOW / TAB SAFETY RESET */

  window.addEventListener("blur", () => {

    if (isHovering) {
      handlePointerLeave();
    }

  });

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        isHovering
      ) {
        handlePointerLeave();
      }

    }
  );


  /* INPUT MODE CHANGE */

  const handleInputModeChange = () => {

    if (
      !canHover.matches ||
      reduceMotion.matches
    ) {

      handlePointerLeave();

      card.style.transform =
        "rotateX(0deg) rotateY(0deg)";

      resetDepthItems();

    }

  };

  canHover.addEventListener(
    "change",
    handleInputModeChange
  );

  reduceMotion.addEventListener(
    "change",
    handleInputModeChange
  );

})();
