(() => {
      const component = document.querySelector("#crStepForm");

      if (!component) return;

      /* ==================================================
         ELEMENTS
      ================================================== */

      const form = component.querySelector(".cr-step-form__form");

      const formSteps = [
        ...component.querySelectorAll(".cr-form-step")
      ];

      const indicators = [
        ...component.querySelectorAll("[data-step-indicator]")
      ];

      const progressLines = [
        ...component.querySelectorAll(".cr-step__line")
      ];

      const backBtn = component.querySelector("#crBackBtn");
      const nextBtn = component.querySelector("#crNextBtn");
      const submitBtn = component.querySelector("#crSubmitBtn");

      const currentStepText =
        component.querySelector("#crCurrentStep");

      const header =
        component.querySelector(".cr-step-form__header");

      const progress =
        component.querySelector(".cr-step-form__progress");

      const success =
        component.querySelector(".cr-success");

      const restartBtn =
        component.querySelector(".cr-btn--restart");


      /* ==================================================
         INPUTS
      ================================================== */

      const email =
        component.querySelector("#crEmail");

      const password =
        component.querySelector("#crPassword");

      const confirmPassword =
        component.querySelector("#crConfirmPassword");

      const firstName =
        component.querySelector("#crFirstName");

      const lastName =
        component.querySelector("#crLastName");

      const username =
        component.querySelector("#crUsername");

      const role =
        component.querySelector("#crRole");

      const bio =
        component.querySelector("#crBio");

      const bioCount =
        component.querySelector("#crBioCount");

      const terms =
        component.querySelector("#crTerms");

      const termsError =
        component.querySelector(".cr-terms-error");


      /* ==================================================
         PASSWORD ELEMENTS
      ================================================== */

      const passwordToggle =
        component.querySelector(".cr-password-toggle");

      const passwordStrength =
        component.querySelector(".cr-password-strength");

      const passwordStatus =
        component.querySelector(".cr-password-status");


      /* ==================================================
         REVIEW EDIT BUTTONS
      ================================================== */

      const editButtons = [
        ...component.querySelectorAll("[data-edit-step]")
      ];


      let currentStep = 1;


      /* ==================================================
         FIELD HELPERS
      ================================================== */

      const getField = (input) => {
        if (!input) return null;

        return input.closest(".cr-field");
      };


      const getError = (input) => {
        const field = getField(input);

        if (!field) return null;

        return field.querySelector(".cr-field__error");
      };


      const showError = (input, message) => {
        const field = getField(input);
        const error = getError(input);

        if (!field) return;

        field.classList.add("cr-field--error");
        field.classList.remove("cr-field--valid");

        if (error) {
          error.textContent = message;
        }
      };


      const showValid = (input) => {
        const field = getField(input);
        const error = getError(input);

        if (!field) return;

        field.classList.remove("cr-field--error");
        field.classList.add("cr-field--valid");

        if (error) {
          error.textContent = "";
        }
      };


      const clearFieldState = (input) => {
        const field = getField(input);
        const error = getError(input);

        if (!field) return;

        field.classList.remove(
          "cr-field--error",
          "cr-field--valid"
        );

        if (error) {
          error.textContent = "";
        }
      };


      /* ==================================================
         EMAIL VALIDATION
      ================================================== */

      const validateEmail = () => {
        const value = email.value.trim();

        if (!value) {
          showError(
            email,
            "Email address is required."
          );

          return false;
        }

        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(value)) {
          showError(
            email,
            "Enter a valid email address."
          );

          return false;
        }

        showValid(email);

        return true;
      };


      /* ==================================================
         PASSWORD STRENGTH
      ================================================== */

      const getPasswordStrength = (value) => {
        if (!value) return 0;

        let score = 0;

        if (value.length >= 8) {
          score++;
        }

        if (/[A-Z]/.test(value)) {
          score++;
        }

        if (/[0-9]/.test(value)) {
          score++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
          score++;
        }

        return score;
      };


      const updatePasswordStrength = () => {
        const value = password.value;

        if (!value) {
          passwordStrength.removeAttribute(
            "data-strength"
          );

          passwordStatus.textContent =
            "Password strength";

          return;
        }

        const strength =
          getPasswordStrength(value);

        passwordStrength.setAttribute(
          "data-strength",
          String(strength)
        );

        const labels = {
          0: "Very weak",
          1: "Weak",
          2: "Fair",
          3: "Good",
          4: "Strong"
        };

        passwordStatus.textContent =
          labels[strength];
      };


      const validatePassword = () => {
        const value = password.value;

        if (!value) {
          showError(
            password,
            "Password is required."
          );

          return false;
        }

        if (value.length < 8) {
          showError(
            password,
            "Use at least 8 characters."
          );

          return false;
        }

        showValid(password);

        return true;
      };


      const validateConfirmPassword = () => {
        const value = confirmPassword.value;

        if (!value) {
          showError(
            confirmPassword,
            "Please confirm your password."
          );

          return false;
        }

        if (value !== password.value) {
          showError(
            confirmPassword,
            "Passwords do not match."
          );

          return false;
        }

        showValid(confirmPassword);

        return true;
      };


      /* ==================================================
         PROFILE VALIDATION
      ================================================== */

      const validateName = (input, label) => {
        const value = input.value.trim();

        if (!value) {
          showError(
            input,
            `${label} is required.`
          );

          return false;
        }

        if (value.length < 2) {
          showError(
            input,
            `${label} must contain at least 2 characters.`
          );

          return false;
        }

        showValid(input);

        return true;
      };


      const validateUsername = () => {
        const value = username.value.trim();

        if (!value) {
          showError(
            username,
            "Username is required."
          );

          return false;
        }

        if (value.length < 3) {
          showError(
            username,
            "Use at least 3 characters."
          );

          return false;
        }

        const usernamePattern =
          /^[A-Za-z0-9_]+$/;

        if (!usernamePattern.test(value)) {
          showError(
            username,
            "Use letters, numbers and underscores only."
          );

          return false;
        }

        showValid(username);

        return true;
      };


      const validateRole = () => {
        if (!role.value) {
          showError(
            role,
            "Please select your role."
          );

          return false;
        }

        showValid(role);

        return true;
      };


      /* ==================================================
         STEP VALIDATION
      ================================================== */

      const validateStepOne = () => {
        const emailValid =
          validateEmail();

        const passwordValid =
          validatePassword();

        const confirmValid =
          validateConfirmPassword();

        return (
          emailValid &&
          passwordValid &&
          confirmValid
        );
      };


      const validateStepTwo = () => {
        const firstValid =
          validateName(
            firstName,
            "First name"
          );

        const lastValid =
          validateName(
            lastName,
            "Last name"
          );

        const usernameValid =
          validateUsername();

        const roleValid =
          validateRole();

        return (
          firstValid &&
          lastValid &&
          usernameValid &&
          roleValid
        );
      };


      /* ==================================================
         REVIEW
      ================================================== */

      const setReviewValue = (name, value) => {
        const target =
          component.querySelector(
            `[data-review="${name}"]`
          );

        if (!target) return;

        const cleanValue =
          String(value || "").trim();

        target.textContent =
          cleanValue || "Not provided";
      };


      const updateReview = () => {
        setReviewValue(
          "email",
          email.value
        );


        const passwordDots =
          password.value
            ? "•".repeat(
                Math.min(
                  password.value.length,
                  12
                )
              )
            : "••••••••";

        setReviewValue(
          "password",
          passwordDots
        );


        const fullName = [
          firstName.value.trim(),
          lastName.value.trim()
        ]
          .filter(Boolean)
          .join(" ");

        setReviewValue(
          "name",
          fullName
        );


        const usernameValue =
          username.value.trim();

        setReviewValue(
          "username",
          usernameValue
            ? `@${usernameValue}`
            : ""
        );


        const selectedOption =
          role.options[
            role.selectedIndex
          ];

        setReviewValue(
          "role",
          role.value && selectedOption
            ? selectedOption.textContent
            : ""
        );


        setReviewValue(
          "bio",
          bio.value
        );
      };


      /* ==================================================
         PROGRESS
      ================================================== */

      const updateProgress = () => {
        indicators.forEach(
          (indicator, index) => {
            const stepNumber =
              index + 1;

            indicator.classList.remove(
              "cr-step--active",
              "cr-step--complete"
            );

            const number =
              indicator.querySelector(
                ".cr-step__circle span"
              );


            if (stepNumber < currentStep) {
              indicator.classList.add(
                "cr-step--complete"
              );

              if (number) {
                number.textContent = "✓";
              }

              return;
            }


            if (stepNumber === currentStep) {
              indicator.classList.add(
                "cr-step--active"
              );
            }


            if (number) {
              number.textContent =
                String(stepNumber);
            }
          }
        );


        progressLines.forEach(
          (line, index) => {
            line.classList.toggle(
              "cr-step__line--complete",
              index < currentStep - 1
            );
          }
        );
      };


      /* ==================================================
         SHOW STEP
      ================================================== */

      const showStep = (stepNumber) => {
        currentStep = Math.max(
          1,
          Math.min(stepNumber, 3)
        );


        formSteps.forEach((step) => {
          const number =
            Number(step.dataset.step);

          step.classList.toggle(
            "cr-form-step--active",
            number === currentStep
          );
        });


        backBtn.disabled =
          currentStep === 1;


        if (currentStep === 3) {
          updateReview();

          nextBtn.hidden = true;
          submitBtn.hidden = false;
        } else {
          nextBtn.hidden = false;
          submitBtn.hidden = true;
        }


        currentStepText.textContent =
          String(currentStep);


        updateProgress();
      };


      /* ==================================================
         NEXT
      ================================================== */

      nextBtn.addEventListener(
        "click",
        (event) => {
          event.preventDefault();


          if (currentStep === 1) {
            if (!validateStepOne()) {
              return;
            }

            showStep(2);

            return;
          }


          if (currentStep === 2) {
            if (!validateStepTwo()) {
              return;
            }

            updateReview();

            showStep(3);
          }
        }
      );


      /* ==================================================
         BACK
      ================================================== */

      backBtn.addEventListener(
        "click",
        (event) => {
          event.preventDefault();

          if (currentStep > 1) {
            showStep(
              currentStep - 1
            );
          }
        }
      );


      /* ==================================================
         EDIT REVIEW
      ================================================== */

      editButtons.forEach((button) => {
        button.addEventListener(
          "click",
          (event) => {
            event.preventDefault();

            const stepNumber =
              Number(
                button.dataset.editStep
              );

            if (!stepNumber) return;

            showStep(stepNumber);
          }
        );
      });


      /* ==================================================
         PASSWORD SHOW / HIDE
      ================================================== */

      if (passwordToggle) {
        passwordToggle.addEventListener(
          "click",
          (event) => {
            event.preventDefault();

            const hidden =
              password.type === "password";

            password.type =
              hidden
                ? "text"
                : "password";

            passwordToggle.setAttribute(
              "aria-label",
              hidden
                ? "Hide password"
                : "Show password"
            );
          }
        );
      }


      /* ==================================================
         LIVE VALIDATION
      ================================================== */

      email.addEventListener(
        "blur",
        validateEmail
      );


      email.addEventListener(
        "input",
        () => {
          const field =
            getField(email);

          if (
            field &&
            field.classList.contains(
              "cr-field--error"
            )
          ) {
            validateEmail();
          }
        }
      );


      password.addEventListener(
        "input",
        () => {
          updatePasswordStrength();

          const field =
            getField(password);

          if (
            field &&
            field.classList.contains(
              "cr-field--error"
            )
          ) {
            validatePassword();
          }

          if (
            confirmPassword.value
          ) {
            validateConfirmPassword();
          }
        }
      );


      password.addEventListener(
        "blur",
        validatePassword
      );


      confirmPassword.addEventListener(
        "input",
        () => {
          if (
            confirmPassword.value
          ) {
            validateConfirmPassword();
          } else {
            clearFieldState(
              confirmPassword
            );
          }
        }
      );


      confirmPassword.addEventListener(
        "blur",
        validateConfirmPassword
      );


      firstName.addEventListener(
        "blur",
        () => {
          validateName(
            firstName,
            "First name"
          );
        }
      );


      lastName.addEventListener(
        "blur",
        () => {
          validateName(
            lastName,
            "Last name"
          );
        }
      );


      username.addEventListener(
        "blur",
        validateUsername
      );


      role.addEventListener(
        "change",
        validateRole
      );


      /* ==================================================
         BIO COUNTER
      ================================================== */

      bio.addEventListener(
        "input",
        () => {
          bioCount.textContent =
            String(
              bio.value.length
            );
        }
      );


      /* ==================================================
         TERMS
      ================================================== */

      terms.addEventListener(
        "change",
        () => {
          if (terms.checked) {
            termsError.textContent = "";
          }
        }
      );


      /* ==================================================
         COMPLETE REGISTRATION
      ================================================== */

      const completeRegistration = () => {

        /*
         * Terms must be accepted.
         */

        if (!terms.checked) {
          termsError.textContent =
            "Please accept the Terms of Service and Privacy Policy.";

          return;
        }


        termsError.textContent = "";


        /*
         * Update data one last time.
         */

        updateReview();


        /*
         * Hide wizard.
         */

        form.hidden = true;

        if (progress) {
          progress.hidden = true;
        }

        if (header) {
          header.hidden = true;
        }


        /*
         * Show success state.
         */

        success.hidden = false;
      };


      /* ==================================================
         CREATE ACCOUNT BUTTON
         Direct click handler
      ================================================== */

      submitBtn.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopPropagation();

          completeRegistration();
        }
      );


      /* ==================================================
         FORM SUBMIT FALLBACK
      ================================================== */

      form.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();

          completeRegistration();
        }
      );


      /* ==================================================
         RESTART
      ================================================== */

      restartBtn.addEventListener(
        "click",
        (event) => {
          event.preventDefault();


          /*
           * Reset form data.
           */

          form.reset();


          /*
           * Remove validation states.
           */

          formSteps.forEach((step) => {
            const fields = [
              ...step.querySelectorAll(
                ".cr-field"
              )
            ];

            fields.forEach((field) => {
              field.classList.remove(
                "cr-field--error",
                "cr-field--valid"
              );

              const error =
                field.querySelector(
                  ".cr-field__error"
                );

              if (error) {
                error.textContent = "";
              }
            });
          });


          /*
           * Reset terms.
           */

          termsError.textContent = "";


          /*
           * Reset bio counter.
           */

          bioCount.textContent = "0";


          /*
           * Reset password meter.
           */

          passwordStrength.removeAttribute(
            "data-strength"
          );

          passwordStatus.textContent =
            "Password strength";


          /*
           * Reset password visibility.
           */

          password.type = "password";

          if (passwordToggle) {
            passwordToggle.setAttribute(
              "aria-label",
              "Show password"
            );
          }


          /*
           * Restore wizard.
           */

          success.hidden = true;

          form.hidden = false;

          if (progress) {
            progress.hidden = false;
          }

          if (header) {
            header.hidden = false;
          }


          /*
           * Return to Step 1.
           */

          showStep(1);
        }
      );


      /* ==================================================
         INITIAL STATE
      ================================================== */

      success.hidden = true;

      showStep(1);
    })();
