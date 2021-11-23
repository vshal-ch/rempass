import {checkDb} from './readDb.js';
import {addPasswordHelper} from './addToDb.js'
import { startPopulate } from './populator.js'

const addPasswordButton = document.querySelector(".add-password");
const addPasswordModal = document.querySelector(".add-password-modal");
const modalBack = document.querySelector(".modal-back");
const closeModalBtn = document.querySelector(".close-modal");
const addPasswordForm = document.querySelector(".add-password-form");
const menu = document.querySelector('aside');
const menuOpen = document.querySelector('.hamburgur');
const menuClose = document.querySelector('.cross');
const userName = document.querySelector('.name');
const openDetails = document.querySelectorAll('.visible-part');
const details = document.querySelectorAll('.password');
const passText = document.querySelector('.password-text');
const copyPass = document.querySelector('.copy-action');
const passList = document.querySelector('.passwords-list');

startPopulate(passList);

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

function showDetails(){
  details[this.index].classList.toggle('visible')
}

function copyToClip(e){
  navigator.clipboard.writeText(passText.textContent);
  e.stopPropagation();
}

copyPass.addEventListener('click',copyToClip);
openDetails.forEach((item,index)=>{
  item.index = index
  item.addEventListener('click',showDetails);
})
menuOpen.addEventListener('click',openMenu);
menuClose.addEventListener('click',closeMenu);
addPasswordButton && addPasswordButton.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
addPasswordForm.addEventListener("submit", addPassword);