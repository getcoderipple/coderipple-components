(() => {
  const components = document.querySelectorAll(
    ".cr-popup-contact"
  );

  components.forEach((component) => {
    if (component.dataset.ready === "true") return;

    component.dataset.ready = "true";

    const trigger = component.querySelector(
      ".cr-popup-contact__trigger"
    );

    const panel = component.querySelector(
      ".cr-popup-contact__panel"
    );

    const closeButton = component.querySelector(
      ".cr-popup-contact__close"
    );

    const form = component.querySelector(
      ".cr-popup-contact__form"
    );

    const success = component.querySelector(
      ".cr-popup-contact__success"
    );

    if (!trigger || !panel || !closeButton) return;


    const openCard = () => {
      trigger.style.display = "none";

      trigger.setAttribute(
        "aria-expanded",
        "true"
      );

      panel.classList.add("is-open");

      panel.setAttribute(
        "aria-hidden",
        "false"
      );
    };


    const closeCard = () => {
      panel.classList.remove("is-open");

      panel.setAttribute(
        "aria-hidden",
        "true"
      );

      trigger.setAttribute(
        "aria-expanded",
        "false"
      );

      trigger.style.display = "inline-flex";
    };


    trigger.addEventListener(
      "click",
      openCard
    );


    closeButton.addEventListener(
      "click",
      closeCard
    );


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          panel.classList.contains("is-open")
        ) {
          closeCard();
        }
      }
    );


    if (form) {
      form.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();

          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }

          form.reset();

          if (success) {
            success.classList.add(
              "is-visible"
            );

            setTimeout(() => {
              success.classList.remove(
                "is-visible"
              );
            }, 3000);
          }
        }
      );
    }
  });
})();
