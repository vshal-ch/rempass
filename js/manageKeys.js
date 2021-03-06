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
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { openModal } from "./script.js";

const passList = document.querySelector(".passwords-list");
let copyPass = document.querySelectorAll(".copy-action");
let passText = document.querySelectorAll(".password-text");
let details = document.querySelectorAll(".password");
let openDetails = document.querySelectorAll(".visible-part");
let deleteCTA = document.querySelectorAll(".del-action img");
let editCTA = document.querySelector(".edit-action img");
let toggleView = document.querySelectorAll(".toggle-password");

const db = getFirestore(app);
const auth = getAuth(app);

function showDetails() {
  details[this.index].classList.toggle("visible");
}

function copyToClip(e) {
  e.stopPropagation();
  navigator.clipboard.writeText(passText[this.index].value);
}

async function startDelete() {
  if (!confirm("Do you want delete")) {
    return;
  }
  try {
    await deleteDoc(doc(db, window.acc.id + "", this.dataset.id + ""));
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
  toggleView = document.querySelectorAll(".toggle-password");

  copyPass.forEach((item, index) => {
    item.index = index;
    item.addEventListener("click", copyToClip);
  });

  toggleView.forEach((view, index) => {
    view.addEventListener("click", () => {
      if (view.getAttribute("src") == "./assets/visibility.svg") {
        view.setAttribute("src", "./assets/visibility_off_white_24dp.svg");
        passText[index].setAttribute("type", "password");
      } else {
        view.setAttribute("src", "./assets/visibility.svg");
        passText[index].setAttribute("type", "text");
      }
    });
  });

  editCTA.forEach((cta) =>
    cta.addEventListener("click", async () => {
      let res = await getDoc(doc(db, window.acc.id + "", cta.dataset.id + ""));
      openModal({
        modalTitle: "Update",
        platValue: cta.dataset.id,
        uValue: res.data().uname,
        passValue: res.data().key,
      });
    })
  );
  deleteCTA.forEach((cta) => cta.addEventListener("click", startDelete));
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
                        <input type='password' class="password-text" value='${
                          doc.data().key
                        }' disabled/>
                        <img src="./assets/visibility_off_white_24dp.svg" alt="show" class="toggle-password">
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
  passList.classList.add("yes");
  startListeners();
}

const coll = collection(db, window.acc.id);
const snapShotListener = onSnapshot(coll, populate);
