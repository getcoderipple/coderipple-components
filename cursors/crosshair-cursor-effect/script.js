(() => {

  const component =
    document.querySelector("#crCrosshair");

  if (!component) return;


  const panel =
    component.querySelector(
      ".cr-crosshair__panel"
    );


  const cursor =
    component.querySelector(
      ".cr-crosshair__cursor"
    );


  const coordX =
    component.querySelector(
      ".cr-crosshair__coordinate--x"
    );


  const coordY =
    component.querySelector(
      ".cr-crosshair__coordinate--y"
    );


  const targets =
    component.querySelectorAll(
      ".cr-crosshair__target"
    );


  if (
    !panel ||
    !cursor ||
    !coordX ||
    !coordY
  ) {
    return;
  }


  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  let isInside = false;
  let animationFrame = null;


  /* =========================================
     FORMAT COORDINATE
  ========================================== */

  const formatCoordinate = (value) => {

    return String(
      Math.max(
        0,
        Math.round(value)
      )
    ).padStart(3, "0");

  };


  /* =========================================
     UPDATE CURSOR
  ========================================== */

  const updateCursor = () => {

    if (!isInside) {

      animationFrame = null;

      return;
    }


    currentX +=
      (mouseX - currentX) * 0.22;


    currentY +=
      (mouseY - currentY) * 0.22;


    cursor.style.transform =
      `translate3d(
        ${currentX}px,
        ${currentY}px,
        0
      )`;


    animationFrame =
      requestAnimationFrame(
        updateCursor
      );

  };


  /* =========================================
     MOUSE ENTER
  ========================================== */

  panel.addEventListener(
    "mouseenter",
    (event) => {

      const rect =
        panel.getBoundingClientRect();


      mouseX =
        event.clientX - rect.left;


      mouseY =
        event.clientY - rect.top;


      currentX = mouseX;
      currentY = mouseY;

      isInside = true;


      cursor.style.transform =
        `translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )`;


      cursor.style.opacity = "1";


      coordX.textContent =
        `X ${formatCoordinate(mouseX)}`;


      coordY.textContent =
        `Y ${formatCoordinate(mouseY)}`;


      if (!animationFrame) {

        animationFrame =
          requestAnimationFrame(
            updateCursor
          );

      }

    }
  );


  /* =========================================
     MOUSE MOVE
  ========================================== */

  panel.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        panel.getBoundingClientRect();


      mouseX =
        event.clientX - rect.left;


      mouseY =
        event.clientY - rect.top;


      coordX.textContent =
        `X ${formatCoordinate(mouseX)}`;


      coordY.textContent =
        `Y ${formatCoordinate(mouseY)}`;

    }
  );


  /* =========================================
     MOUSE LEAVE
  ========================================== */

  panel.addEventListener(
    "mouseleave",
    () => {

      isInside = false;

      cursor.style.opacity = "0";

      cursor.classList.remove(
        "is-targeting"
      );


      if (animationFrame) {

        cancelAnimationFrame(
          animationFrame
        );

        animationFrame = null;

      }

    }
  );


  /* =========================================
     TARGET HOVER
  ========================================== */

  targets.forEach((target) => {

    target.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add(
          "is-targeting"
        );

      }
    );


    target.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove(
          "is-targeting"
        );

      }
    );


    target.addEventListener(
      "focus",
      () => {

        cursor.classList.add(
          "is-targeting"
        );

      }
    );


    target.addEventListener(
      "blur",
      () => {

        cursor.classList.remove(
          "is-targeting"
        );

      }
    );

  });


  /* =========================================
     PAGE VISIBILITY
  ========================================== */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (!document.hidden) return;


      isInside = false;

      cursor.style.opacity = "0";

      cursor.classList.remove(
        "is-targeting"
      );


      if (animationFrame) {

        cancelAnimationFrame(
          animationFrame
        );

        animationFrame = null;

      }

    }
  );

})();
