const checkout = document.querySelector(".cr-checkout");

if (checkout) {

  const card =
    checkout.querySelector(".cr-checkout__card");

  const cardPanel =
    checkout.querySelector(".cr-checkout__card-panel");

  const walletPanel =
    checkout.querySelector(".cr-checkout__wallet");

  const payButton =
    checkout.querySelector(".cr-checkout__submit");

  const payText =
    checkout.querySelector(".cr-checkout__pay-text");

  const resetButton =
    checkout.querySelector(".cr-checkout__reset");

  const nameInput =
    checkout.querySelector("#cr-card-name");

  const numberInput =
    checkout.querySelector("#cr-card-number");

  const expiryInput =
    checkout.querySelector("#cr-card-expiry");

  const cvcInput =
    checkout.querySelector("#cr-card-cvc");

  const methods =
    checkout.querySelectorAll(".cr-checkout__method");

  const methodRadios =
    checkout.querySelectorAll(
      'input[name="cr-payment-method"]'
    );


  function showError(input) {

    const field =
      input.closest(".cr-checkout__field");

    if (field) {
      field.classList.add("is-error");
    }

  }


  function removeError(input) {

    const field =
      input.closest(".cr-checkout__field");

    if (field) {
      field.classList.remove("is-error");
    }

  }


  function clearErrors() {

    checkout
      .querySelectorAll(".cr-checkout__field")
      .forEach(function (field) {

        field.classList.remove("is-error");

      });

  }


  function getPaymentMethod() {

    const selected =
      checkout.querySelector(
        'input[name="cr-payment-method"]:checked'
      );

    return selected
      ? selected.value
      : "card";

  }


  function updatePaymentMethod() {

    const method =
      getPaymentMethod();

    const isWallet =
      method === "wallet";


    methods.forEach(function (item) {

      const radio =
        item.querySelector(
          'input[type="radio"]'
        );

      if (!radio) return;

      item.classList.toggle(
        "is-active",
        radio.checked
      );

    });


    cardPanel.classList.toggle(
      "is-hidden",
      isWallet
    );


    walletPanel.classList.toggle(
      "is-active",
      isWallet
    );

    walletPanel.setAttribute(
      "aria-hidden",
      isWallet ? "false" : "true"
    );


    if (payText) {

      payText.textContent =
        isWallet
          ? "Pay with Wallet"
          : "Pay $49.00";

    }


    clearErrors();

  }


  methodRadios.forEach(function (radio) {

    radio.addEventListener(
      "change",
      updatePaymentMethod
    );

  });


  nameInput.addEventListener(
    "input",
    function () {

      removeError(this);

    }
  );


  numberInput.addEventListener(
    "input",
    function () {

      let value =
        this.value
          .replace(/\D/g, "")
          .slice(0, 16);

      const groups =
        value.match(/.{1,4}/g);

      this.value =
        groups
          ? groups.join(" ")
          : "";

      removeError(this);

    }
  );


  expiryInput.addEventListener(
    "input",
    function () {

      let value =
        this.value
          .replace(/\D/g, "")
          .slice(0, 4);

      if (value.length > 2) {

        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2);

      }

      this.value = value;

      removeError(this);

    }
  );


  cvcInput.addEventListener(
    "input",
    function () {

      this.value =
        this.value
          .replace(/\D/g, "")
          .slice(0, 4);

      removeError(this);

    }
  );


  function validateCard() {

    let valid = true;

    clearErrors();


    if (
      nameInput.value.trim().length < 2
    ) {

      showError(nameInput);

      valid = false;

    }


    const cardNumber =
      numberInput.value.replace(/\D/g, "");

    if (cardNumber.length !== 16) {

      showError(numberInput);

      valid = false;

    }


    const expiryMatch =
      expiryInput.value.match(
        /^(\d{2})\/(\d{2})$/
      );

    if (!expiryMatch) {

      showError(expiryInput);

      valid = false;

    } else {

      const month =
        Number(expiryMatch[1]);

      const year =
        Number(expiryMatch[2]);

      const now =
        new Date();

      const currentMonth =
        now.getMonth() + 1;

      const currentYear =
        now.getFullYear() % 100;


      if (
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        (
          year === currentYear &&
          month < currentMonth
        )
      ) {

        showError(expiryInput);

        valid = false;

      }

    }


    const cvc =
      cvcInput.value.replace(/\D/g, "");

    if (
      cvc.length < 3 ||
      cvc.length > 4
    ) {

      showError(cvcInput);

      valid = false;

    }


    return valid;

  }


  function processPayment() {

    payButton.classList.add(
      "is-loading"
    );

    payButton.disabled = true;


    setTimeout(function () {

      payButton.classList.remove(
        "is-loading"
      );

      payButton.disabled = false;

      card.classList.add(
        "is-success"
      );

    }, 1800);

  }


  payButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();


      if (
        payButton.classList.contains(
          "is-loading"
        )
      ) {
        return;
      }


      const method =
        getPaymentMethod();


      if (method === "card") {

        if (!validateCard()) {
          return;
        }

        processPayment();

        return;

      }


      if (method === "wallet") {

        clearErrors();

        processPayment();

      }

    }
  );


  resetButton.addEventListener(
    "click",
    function () {

      nameInput.value = "";
      numberInput.value = "";
      expiryInput.value = "";
      cvcInput.value = "";

      clearErrors();

      card.classList.remove(
        "is-success"
      );

      payButton.classList.remove(
        "is-loading"
      );

      payButton.disabled = false;


      methodRadios.forEach(
        function (radio) {

          radio.checked =
            radio.value === "card";

        }
      );


      updatePaymentMethod();

    }
  );


  updatePaymentMethod();

}
