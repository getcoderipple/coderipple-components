(() => {

  const btn =
    document.getElementById("crShredBtn");

  const text =
    document.getElementById("crDeleteText");

  const trash =
    btn.querySelector(".cr-trash");

  if (!btn || !text || !trash) {
    return;
  }

  let running = false;

  const wait = (ms) =>
    new Promise(
      resolve => setTimeout(resolve, ms)
    );


  function buildLetters(label = "Delete") {

    text.innerHTML = "";

    [...label].forEach(char => {

      const span =
        document.createElement("span");

      span.className = "cr-letter";

      span.textContent =
        char === " "
          ? "\u00A0"
          : char;

      text.appendChild(span);

    });

  }


  function prepareLetters() {

    const trashRect =
      trash.getBoundingClientRect();

    const targetX =
      trashRect.left +
      trashRect.width / 2;

    const targetY =
      trashRect.top +
      trashRect.height / 2;

    const letters =
      [...text.querySelectorAll(".cr-letter")];

    letters.forEach(
      (letter, index) => {

        const rect =
          letter.getBoundingClientRect();

        const startX =
          rect.left +
          rect.width / 2;

        const startY =
          rect.top +
          rect.height / 2;

        const x =
          targetX - startX;

        const y =
          targetY - startY;

        const rotation =
          index % 2 === 0
            ? -28 - index * 5
            : 26 + index * 5;

        letter.style.setProperty(
          "--cr-x",
          `${x}px`
        );

        letter.style.setProperty(
          "--cr-y",
          `${y}px`
        );

        letter.style.setProperty(
          "--cr-rotate",
          `${rotation}deg`
        );

      }
    );

    return letters;

  }


  function createParticles(letter) {

    const letterRect =
      letter.getBoundingClientRect();

    const trashRect =
      trash.getBoundingClientRect();

    const targetX =
      trashRect.left +
      trashRect.width / 2;

    const targetY =
      trashRect.top +
      trashRect.height / 2;

    const amount = 4;

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const particle =
        document.createElement("span");

      particle.className =
        "cr-particle";

      const startX =
        letterRect.left +
        Math.random() *
        letterRect.width;

      const startY =
        letterRect.top +
        Math.random() *
        letterRect.height;

      particle.style.left =
        `${startX}px`;

      particle.style.top =
        `${startY}px`;

      particle.style.setProperty(
        "--px",
        `${targetX - startX}px`
      );

      particle.style.setProperty(
        "--py",
        `${targetY - startY}px`
      );

      particle.style.animationDelay =
        `${Math.random() * 70}ms`;

      document.body.appendChild(
        particle
      );

      particle.addEventListener(
        "animationend",
        () => particle.remove(),
        { once:true }
      );

    }

  }


  async function runDelete() {

    if (running) {
      return;
    }

    running = true;

    btn.classList.add(
      "cr-working",
      "cr-lid-open"
    );

    const letters =
      prepareLetters();

    await wait(180);

    for (const letter of letters) {

      createParticles(letter);

      letter.classList.add(
        "cr-shredding"
      );

      await wait(95);

    }

    await wait(500);

    btn.classList.remove(
      "cr-lid-open"
    );

    btn.classList.add(
      "cr-collapsed"
    );

    await wait(520);

    btn.classList.add(
      "cr-loading"
    );

    await wait(1100);

    btn.classList.remove(
      "cr-loading"
    );

    btn.classList.add(
      "cr-success-state"
    );

    await wait(850);

    btn.classList.add(
      "cr-complete"
    );

    await wait(550);

    resetAsDeleted();

  }


  function resetAsDeleted() {

    btn.classList.remove(
      "cr-collapsed",
      "cr-success-state"
    );

    trash.style.display = "none";

    text.innerHTML = "";

    const deleted =
      document.createElement("span");

    deleted.className =
      "cr-letter";

    deleted.textContent =
      "Deleted";

    text.appendChild(deleted);

    running = false;

    btn.addEventListener(
      "click",
      restoreButton,
      { once:true }
    );

  }


  function restoreButton(event) {

    event.stopPropagation();

    btn.classList.remove(
      "cr-working",
      "cr-complete"
    );

    trash.style.display = "";

    buildLetters("Delete");

    setTimeout(
      () => {

        btn.addEventListener(
          "click",
          runDelete,
          { once:true }
        );

      },
      50
    );

  }


  buildLetters("Delete");

  btn.addEventListener(
    "click",
    runDelete,
    { once:true }
  );

})();
