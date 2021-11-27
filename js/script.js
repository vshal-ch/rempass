import {checkDb} from './readDb.js';
import {addPasswordHelper} from './addToDb.js';

const addPasswordButton = document.querySelector(".add-password");
const addPasswordModal = document.querySelector(".add-password-modal");
const modalBack = document.querySelector(".modal-back");
const closeModalBtn = document.querySelector(".close-modal");
const addPasswordForm = document.querySelector(".add-password-form");
const menu = document.querySelector('aside');
const menuOpen = document.querySelector('.hamburgur');
const menuClose = document.querySelector('.cross');
const userName = document.querySelector('.name');
const formHeading = document.querySelector('.form-heading');
const platformField = document.querySelector('.platform-name-input');
const unameField = document.querySelector('.uname-input');
const passField = document.querySelector('.password-input');
const submitBtn = document.querySelector('.password-submit');

( async () => {
  let obj = JSON.parse(localStorage.getItem('accInfo'));
  let data = await checkDb(obj.divId);
  userName.textContent = data.name+`'s`;
})();

export function openModal({modalTitle="Add",platValue="",uValue="",passValue=""}={}) {
  formHeading.textContent = modalTitle+" Password";
  platformField.value = platValue;
  unameField.value = uValue;
  passField.value = passValue
  submitBtn.value = modalTitle.toUpperCase();
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
  let pName = addPasswordForm['platform'].value;
  let uName = addPasswordForm['username'].value;
  let pass = addPasswordForm['password'].value;
  if(pName.trim()==''||uName.trim()==''||pass.trim()==''){
    return
  }
  let obj = JSON.parse(localStorage.getItem('accInfo'));
  if(!obj){
    return
  }
  let {divId} = obj
  let res = await addPasswordHelper(divId,pName,uName,pass);
  console.log(res);
  closeModal(e);
}

function openMenu(){
  menu.classList.add('visible')
}

function closeMenu(){
  menu.classList.remove('visible')
}

menuOpen && menuOpen.addEventListener('click',openMenu);
menuClose && menuClose.addEventListener('click',closeMenu);
addPasswordButton && addPasswordButton.addEventListener("click", openModal);
closeModalBtn && closeModalBtn.addEventListener("click", closeModal);
addPasswordForm && addPasswordForm.addEventListener("submit", addPassword);