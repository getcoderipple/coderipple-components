(() => {
  const initAuthFlip = (component) => {
    if (component.dataset.crAuthflipReady === "true") return;

    const card = component.querySelector(".cr-authflip__card");
    const loginFace = component.querySelector(".cr-authflip__face--login");
    const signupFace = component.querySelector(".cr-authflip__face--signup");

    if (!card || !loginFace || !signupFace) return;

    component.dataset.crAuthflipReady = "true";

    let currentView = "login";
    let isAnimating = false;

    const getFocusableElements = (face) => {
      return face.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    };

    const setFaceAccessibility = (activeFace, inactiveFace) => {
      activeFace.setAttribute("aria-hidden", "false");
      inactiveFace.setAttribute("aria-hidden", "true");

      getFocusableElements(activeFace).forEach((element) => {
        if (element.dataset.crPreviousTabindex !== undefined) {
          const previousValue = element.dataset.crPreviousTabindex;

          if (previousValue === "") {
            element.removeAttribute("tabindex");
          } else {
            element.setAttribute("tabindex", previousValue);
          }

          delete element.dataset.crPreviousTabindex;
        }
      });

      getFocusableElements(inactiveFace).forEach((element) => {
        if (element.dataset.crPreviousTabindex === undefined) {
          element.dataset.crPreviousTabindex =
            element.getAttribute("tabindex") || "";
        }

        element.setAttribute("tabindex", "-1");
      });
    };

    const switchView = (target) => {
      if (
        isAnimating ||
        target === currentView ||
        !["login", "signup"].includes(target)
      ) {
        return;
      }

      isAnimating = true;
      currentView = target;

      const showingSignup = target === "signup";

      card.classList.toggle("is-signup", showingSignup);

      if (showingSignup) {
        setFaceAccessibility(signupFace, loginFace);
      } else {
        setFaceAccessibility(loginFace, signupFace);
      }

      window.setTimeout(() => {
        const activeFace = showingSignup ? signupFace : loginFace;
        const firstInput = activeFace.querySelector("input");

        isAnimating = false;

        if (
          firstInput &&
          window.matchMedia("(pointer: fine)").matches
        ) {
          firstInput.focus({ preventScroll: true });
        }
      }, 850);
    };

    setFaceAccessibility(loginFace, signupFace);

    component.addEventListener("click", (event) => {
      const switchButton = event.target.closest(
        ".cr-authflip__switch[data-cr-authflip-target]"
      );

      if (switchButton && component.contains(switchButton)) {
        switchView(switchButton.dataset.crAuthflipTarget);
        return;
      }

      const passwordButton = event.target.closest(
        ".cr-authflip__password-toggle"
      );

      if (!passwordButton || !component.contains(passwordButton)) return;

      const passwordWrapper = passwordButton.closest(
        ".cr-authflip__password"
      );

      const input = passwordWrapper?.querySelector("input");

      if (!input) return;

      const isCurrentlyHidden = input.type === "password";

      input.type = isCurrentlyHidden ? "text" : "password";

      passwordButton.setAttribute(
        "aria-pressed",
        String(isCurrentlyHidden)
      );

      passwordButton.setAttribute(
        "aria-label",
        isCurrentlyHidden ? "Hide password" : "Show password"
      );
    });

    component.addEventListener("submit", (event) => {
      const form = event.target.closest(".cr-authflip__form");

      if (!form) return;

      /*
       * Demo behavior:
       * prevents the CodeRipple Playground from reloading.
       *
       * Remove this preventDefault() when connecting the form
       * to a real login/registration endpoint.
       */
      event.preventDefault();
    });
  };

  const initAll = (root = document) => {
    root.querySelectorAll(".cr-authflip").forEach(initAuthFlip);
  };

  initAll();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (node.matches(".cr-authflip")) {
          initAuthFlip(node);
        }

        initAll(node);
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
