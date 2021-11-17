const toggleFormBtn = document.querySelectorAll(".form-title");
const formContainer = document.querySelector(".form-block");

function changeForm() {
  if (!this.classList.contains("other")) {
    return;
  }
  if (this.dataset.show == "signup") {
    formContainer.style.transform = "translate(-100%)";
  } else {
    formContainer.style.transform = "translate(0)";
  }

  toggleFormBtn.forEach((btn) => btn.classList.add("other"));
  this.classList.remove("other");
}

toggleFormBtn.forEach((btn) => {
  btn.addEventListener("click", changeForm);
});

const modalTrigger = document.querySelector(".offer-message");
const gotoAuthBtn = document.querySelector(".goto-auth");

function openModal() {
  document.querySelector(".modal-container").classList.add("active");
  document.querySelector("main").classList.add("no-scroll");
  document.querySelector("main").style.pointerEvents = "none";
}

function closeModal() {
  document.querySelector(".modal-container").classList.remove("active");
  document.querySelector("main").classList.remove("no-scroll");
  document.querySelector("main").style.pointerEvents = "all";
}

modalTrigger.addEventListener("click", openModal);
gotoAuthBtn.addEventListener("click", closeModal);

const continueBtn = document.querySelector(".continue");
const backIcon = document.querySelector(".back-icon");

function continueToPM() {
  closeModal();
  document.body.classList.add("going-with-no-account");
  noPinCheckbox.checked = false;
  disablePinFields();
  checkSubmit();
}

function backToAuthPage() {
  reset();
  document.body.classList.remove("going-with-no-account");
}

continueBtn.addEventListener("click", continueToPM);
backIcon.addEventListener("click", backToAuthPage);

const fields = document.querySelectorAll(".input-no-login");
const submitBtn = document.querySelector(".submit-pin");
fields[0].value = "";

function validateInput() {
  if (this.value != "") {
    this.classList.add("somethings-there");
  } else {
    this.classList.remove("somethings-there");
  }
  let result = validateHelper(this.value, this.dataset.pattern);
  if (result.validation === false) {
    this.parentElement.classList.add("red-border");
    if (this.messageShown) {
      this.parentElement.nextElementSibling.textContent = `• ${result.message}`;
    }
  } else if (result.validation === true) {
    this.parentElement.classList.remove("red-border");
    if (this.messageShown) {
      this.parentElement.nextElementSibling.textContent = "";
    }
  }
  if (noPinCheckbox.checked) {
    checkSubmit();
  }
  if (fields[2].value != "") {
    checkSubmit();
  }
}

function handleFocusOut() {
  let result = validateHelper(this.value, this.dataset.pattern);
  if (!result.validation) {
    this.parentElement.classList.add("red-border");
    this.parentElement.nextElementSibling.textContent = `• ${result.message}`;
    this.messageShown = true;
  } else if (result.validation === true) {
    this.parentElement.classList.remove("red-border");
  }
  checkSubmit();
}

function validateHelper(string, type) {
  if (string.length < 3 && type === "name") {
    return {
      validation: false,
      message: `Name should contain more than 2 letters`,
    };
  }
  if (type === "confirm-pin") {
    if (string === fields[1].value) {
      return {
        validation: true,
        message: null,
      };
    } else {
      return {
        validation: false,
        message: "Passwords doesn't match",
      };
    }
  }
  let patternMessage = getPatternMessage(type);
  if (patternMessage.pattern != null && !patternMessage.pattern.test(string)) {
    return {
      validation: false,
      message: patternMessage.message,
    };
  } else {
    return {
      validation: true,
      message: null,
    };
  }
}

function getPatternMessage(type) {
  let pattern;
  let message;
  switch (type) {
    case "name":
      pattern = /^[a-zA-Z][a-zA-Z ]+$/;
      message = `Hmm, That doesn't look like a name!`;
      break;
    case "pin":
      pattern = /^[0-9][0-9]{5}$/;
      message = `Pin should be a six digit number`;
      break;
    default:
      pattern = null;
  }
  return {
    pattern,
    message,
  };
}

fields.forEach((field) => {
  field.addEventListener("input", validateInput);
  field.addEventListener("focusout", handleFocusOut);
});

function reset() {
  fields.forEach((input) => {
    input.value = "";
    input.classList.remove("somethings-there");
    input.parentElement.classList.remove("red-border");
    input.parentElement.nextElementSibling.textContent = "";
  });
  // submitBlock.classList.add("disabled");
}

function checkSubmit() {
  if (noPinCheckbox.checked) {
    if (validateHelper(fields[0].value, fields[0].dataset.pattern).validation) {
      toggleDisable(submitBtn, false);
    } else {
      toggleDisable(submitBtn, true);
    }
  } else {
    let c = 0;
    fields.forEach((input) => {
      if (validateHelper(input.value, input.dataset.pattern).validation) {
        c++;
      }
    });
    if (c == 3) {
      toggleDisable(submitBtn, false);
    } else {
      toggleDisable(submitBtn, true);
    }
  }
}

function toggleDisable(element, disable = true) {
  if (disable) {
    element.classList.add("disabled");
    element.setAttribute("disabled", "");
  } else {
    element.classList.remove("disabled");
    element.removeAttribute("disabled");
  }
}

const toggles = document.querySelectorAll(".toggle-view");
let openEye = `<svg
width="22"
height="15"
viewBox="0 0 22 15"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M11 2C14.79 2 18.17 4.13 19.82 7.5C18.17 10.87 14.79 13 11 13C7.21 13 3.83 10.87 2.18 7.5C3.83 4.13 7.21 2 11 2ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 5C12.38 5 13.5 6.12 13.5 7.5C13.5 8.88 12.38 10 11 10C9.62 10 8.5 8.88 8.5 7.5C8.5 6.12 9.62 5 11 5ZM11 3C8.52 3 6.5 5.02 6.5 7.5C6.5 9.98 8.52 12 11 12C13.48 12 15.5 9.98 15.5 7.5C15.5 5.02 13.48 3 11 3Z"
  fill="#cdcdcd"
/>
</svg>`;
let closedEye = `<svg
xmlns="http://www.w3.org/2000/svg"
height="24px"
viewBox="0 0 24 24"
width="24px"
fill="#cdcdcd"
>
<path
  d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z"
  fill="none"
/>
<path
  d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"
/>
</svg>`;

toggles.forEach((toggle, index) => {
  toggle.state = 0;
  toggle.addEventListener("click", () => {
    if (toggle.state == 0) {
      fields[index + 1].setAttribute("type", "number");
      toggle.innerHTML = openEye;
      toggle.state = 1;
    } else if (toggle.state == 1) {
      fields[index + 1].setAttribute("type", "password");
      toggle.state = 0;
      toggle.innerHTML = closedEye;
    }
  });
});

const noPinCheckbox = document.querySelector("#skip");

function disablePinFields() {
  if (noPinCheckbox.checked) {
    toggleDisable(document.querySelectorAll(".to-be-disabled")[0], true);
    toggleDisable(document.querySelectorAll(".to-be-disabled")[1], true);
    toggleDisable(document.querySelector(".info-message"), true);
    checkSubmit();
  } else {
    toggleDisable(document.querySelectorAll(".to-be-disabled")[0], false);
    toggleDisable(document.querySelectorAll(".to-be-disabled")[1], false);
    toggleDisable(document.querySelector(".info-message"), false);
    checkSubmit();
  }
}

noPinCheckbox.addEventListener("input", disablePinFields);
