import { checkDb } from "./readDb.js";
import { addPasswordHelper } from "./addToDb.js";
import { getPass } from "./generatorHelper.js";

const addPasswordButton = document.querySelector(".add-password");
const addPasswordModal = document.querySelector(".add-password-modal");
const modalBack = document.querySelector(".modal-back");
const closeModalBtn = document.querySelector(".close-modal");
const addPasswordForm = document.querySelector(".add-password-form");
const menu = document.querySelector("aside");
const menuOpen = document.querySelector(".hamburgur");
const menuClose = document.querySelector(".cross");
const userName = document.querySelector(".name");
const formHeading = document.querySelector(".form-heading");
const platformField = document.querySelector(".platform-name-input");
const unameField = document.querySelector(".uname-input");
const passField = document.querySelector(".password-input");
const submitBtn = document.querySelector(".password-submit");
const save = document.querySelector(".save-action");
const displayField = document.querySelector("#generated-pass");
const clearIcons = document.querySelectorAll(".clear");
const generateIcon = document.querySelector(".generate");
const toggleView = document.querySelector(".toggle-view");

(async () => {
  let obj = JSON.parse(localStorage.getItem("accInfo"));
  let data = await checkDb(obj.divId);
  userName.textContent = data.name + `'s`;
})();

export function openModal({
  modalTitle = "Add",
  platValue = "",
  uValue = "",
  passValue = "",
} = {}) {
  formHeading.textContent = modalTitle + " Password";
  platformField.value = platValue;
  unameField.value = uValue;
  passField.value = passValue;
  submitBtn.value = modalTitle.toUpperCase();
  platformField.parentElement.classList.remove("error");
  unameField.parentElement.classList.remove("error");

  modalBack.classList.add("active");
  addPasswordModal.classList.add("active");
}

function closeModal(e) {
  addPasswordForm.reset();
  modalBack.classList.remove("active");
  addPasswordModal.classList.remove("active");
}

async function addPassword(e) {
  e.preventDefault();

  let pName = addPasswordForm["platform"].value;
  let uName = addPasswordForm["username"].value;
  let pass = addPasswordForm["password"].value;
  if (pName.trim() == "" || uName.trim() == "") {
    if (pName.trim() == "") {
      platformField.parentElement.classList.add("error");
      platformField.flag = true;
    }
    if (uName.trim() == "") {
      unameField.parentElement.classList.add("error");
      unameField.flag = true;
    }
    return;
  }
  let obj = JSON.parse(localStorage.getItem("accInfo"));
  if (!obj) {
    return;
  }
  let { divId } = obj;
  let res = await addPasswordHelper(divId, pName, uName, pass);
  console.log(res);
  closeModal(e);
}

function openMenu() {
  menu.classList.add("visible");
}

function closeMenu() {
  menu.classList.remove("visible");
}

function showPass() {
  let pass = getPass();
  addPasswordForm["password"].value = pass;
}

function changeBord(){
  if(!this.flag) return
  
}

menuOpen && menuOpen.addEventListener("click", openMenu);
menuClose && menuClose.addEventListener("click", closeMenu);
addPasswordButton && addPasswordButton.addEventListener("click", openModal);
save &&
  save.addEventListener("click", () => {
    openModal({ passValue: displayField.value });
  });
closeModalBtn && closeModalBtn.addEventListener("click", closeModal);
addPasswordForm && addPasswordForm.addEventListener("submit", addPassword);
clearIcons.length &&
  clearIcons.forEach((icon) => {
    icon.parentElement.addEventListener("click", () => {
      addPasswordForm[icon.parentElement.dataset.clear].value = "";
    });
  });
generateIcon && generateIcon.parentElement.addEventListener("click", showPass);
toggleView &&
  toggleView.addEventListener("click", () => {
    if (toggleView.getAttribute("src") == "./assets/visibility.svg") {
      toggleView.setAttribute("src", "./assets/visibility_off_white_24dp.svg");
      addPasswordForm["password"].setAttribute("type", "password");
    } else {
      toggleView.setAttribute("src", "./assets/visibility.svg");
      addPasswordForm["password"].setAttribute("type", "text");
    }
  });

unameField.addEventListener('input',changeBord);
platformField.addEventListener('input',changeBord);