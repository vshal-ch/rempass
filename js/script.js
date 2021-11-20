import {checkDb} from './readDb.js';

const addPasswordButton = document.querySelector(".add-password");
const addPasswordModal = document.querySelector(".add-password-modal");
const modalBack = document.querySelector(".modal-back");
const closeModalBtn = document.querySelector(".close-modal");
const addPasswordForm = document.querySelector(".add-password-form");
const submitPassBtn = document.querySelector('.password-submit');
const menu = document.querySelector('aside');
const menuOpen = document.querySelector('.hamburgur');
const menuClose = document.querySelector('.cross');
const userName = document.querySelector('.name');
const openDetails = document.querySelector('.visible-part');
const details = document.querySelector('.password');
const passText = document.querySelector('.password-text');
const copyPass = document.querySelector('.copy-action');

( async () => {
  let obj = JSON.parse(localStorage.getItem('accInfo'));
  let data = await checkDb(obj.divId);
  userName.textContent = data.name+`'s`;
})();

function openModal() {
  modalBack.classList.add("active");
  addPasswordModal.classList.add("active");
}

function closeModal(e) {
  e.preventDefault();
  addPasswordForm.reset();
  modalBack.classList.remove("active");
  addPasswordModal.classList.remove("active");
}

function addPassword(e) {
  e.preventDefault();
  let pName = addPasswordForm['platform'].value;
  let uName = addPasswordForm['username'].value;
  let pass = addPasswordForm['password'].value;
  
}

function openMenu(){
  menu.classList.add('visible')
}

function closeMenu(){
  menu.classList.remove('visible')
}

function showDetails(){
  details.classList.toggle('visible')
}

function copyToClip(e){
  navigator.clipboard.writeText(passText.textContent);
  e.stopPropagation();
}

copyPass.addEventListener('click',copyToClip,true);
openDetails.addEventListener('click',showDetails)
menuOpen.addEventListener('click',openMenu);
menuClose.addEventListener('click',closeMenu);
addPasswordButton.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
addPasswordForm.addEventListener("submit", addPassword);