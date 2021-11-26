import { app } from "./instance.js";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { openModal } from "./script.js"

const passList = document.querySelector(".passwords-list");
let copyPass = document.querySelectorAll(".copy-action");
let passText = document.querySelectorAll(".password-text");
let details = document.querySelectorAll(".password");
let openDetails = document.querySelectorAll(".visible-part");
let deleteCTA = document.querySelectorAll(".del-action img");
let editCTA = document.querySelector(".edit-action img");

const db = getFirestore(app);
const auth = getAuth(app);

function showDetails() {
  details[this.index].classList.toggle("visible");
}

function copyToClip(e) {
  e.stopPropagation();
  navigator.clipboard.writeText(passText[this.index].textContent);
}

async function startDelete() {
  if (!confirm("Do you want delete")) {
    return;
  }
  try {
    await deleteDoc(doc(db, auth.currentUser.uid + "", this.dataset.id + ""));
  } catch (e) {
    console.log(e.message);
  }
}

function startListeners() {
  copyPass = document.querySelectorAll(".copy-action");
  passText = document.querySelectorAll(".password-text");
  details = document.querySelectorAll(".password");
  openDetails = document.querySelectorAll(".visible-part");
  deleteCTA = document.querySelectorAll(".del-action img");
  editCTA = document.querySelectorAll(".edit-action img");

  copyPass.forEach((item, index) => {
    item.index = index;
    item.addEventListener("click", copyToClip);
  });
  
  editCTA.forEach(cta => cta.addEventListener("click", async ()=>{
    let res = await getDoc(doc(db, auth.currentUser.uid + "", cta.dataset.id + ""));
    openModal({modalTitle:"Update",platValue:cta.dataset.id,uValue:res.data().uname,passValue:res.data().key})
  }));
  deleteCTA.forEach(cta => cta.addEventListener("click", startDelete));
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
                        <span class="del-action action">
                          <img src="./assets/delete_white_24dp.svg" alt="del" data-id="${
                            doc.id
                          }">
                        </span>
                        <span class="edit-action action">
                          <img src="./assets/edit_white_24dp.svg" alt="edit" data-id="${
                            doc.id
                          }">
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
