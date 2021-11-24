import { app } from "./instance.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const passList = document.querySelector(".passwords-list");
let copyPass = document.querySelectorAll(".copy-action");
let passText = document.querySelectorAll(".password-text");
let details = document.querySelectorAll(".password");
let openDetails = document.querySelectorAll(".visible-part");

const db = getFirestore(app);
const auth = getAuth(app);

function showDetails() {
  details[this.index].classList.toggle("visible");
}

function copyToClip(e) {
  navigator.clipboard.writeText(passText[this.index].textContent);
  e.stopPropagation();
}

function startListeners() {
  copyPass = document.querySelectorAll(".copy-action");
  passText = document.querySelectorAll(".password-text");
  details = document.querySelectorAll(".password");
  openDetails = document.querySelectorAll(".visible-part");

  copyPass.forEach((item, index) => {
    item.index = index;
    item.addEventListener("click", copyToClip);
  });
  "click", copyToClip;
  openDetails.forEach((item, index) => {
    item.index = index;
    item.addEventListener("click", showDetails);
  });
}

function populate(data) {
  let str = "";
  data.forEach((doc) => {
    str += `
        <li class="password">
                  <div class="visible-part">
                    <div class="name-and-logo">
                      <img src="./assets/github.svg" class='password-logo' alt="github">
                      <p class="name">${doc.id}</p>
                    </div>
                    <div class="icons">
                      <span class="copy-action action">
                        <img src="./assets/content_copy_white_24dp.svg" alt="copy">
                      </span>
                      <img src="./assets/arrow-head-down.svg" alt="open" class="down-arrow">
                    </div>
                  </div>
                  <div class="hidden-part">
                      <div class="password-block">
                        <p class="password-text">${doc.data().key}</p>
                        <img src="./assets/visibility.svg" alt="show" class="toggle-password">
                      </div>
                      <div class="actions-block">
                        <span class="def-action action">
                          <img src="./assets/delete_white_24dp.svg" alt="del">
                        </span>
                        <span class="edit-action action">
                          <img src="./assets/edit_white_24dp.svg" alt="edit">
                        </span>
                      </div>
                  </div>
                </li>
        `;
  });
  passList.innerHTML = str;
  startListeners();
}

async function startGettingDocs(user) {
  if (user) {
    const coll = collection(db, user.uid);
    const snapShotListener = onSnapshot(coll, populate);
  }
}

onAuthStateChanged(auth, startGettingDocs);
