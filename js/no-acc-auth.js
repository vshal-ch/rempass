import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { app } from "./instance.js";
import { addData,updateData } from "./addToDb.js";
import { addToLocalStorage } from "./addToLocal.js";

const auth = getAuth(app);
const noAccForm = document.querySelector(".no-acc-form");

function withoutPin(name,id) {
  addData('woutpn',id,{
    name
  },true).then(() => {
    addToLocalStorage("accInfo", {
      logged: true,
      accType: "woutpn",
      id: id,
    });
    sessionStorage.setItem('lgdinfnm','{"flag":"yes"}');
    location.href = "home.html";
  });
}

function withPin(name,id,pin){
  
}

function createUserAnonymously(e) {
  e.preventDefault();
  let name = noAccForm["refer-name"].value;
  let pin = noAccForm["skip"].checked ? null : noAccForm["pin"].value;
  let dId = getDid();
  if (!pin) {
    withoutPin(name,dId);
  }
  else{

  }

  // signInAnonymously(auth).then((user) => {
  //   let pass = pin ? true : false;
  //   if (user) {
  //     addData("anonymous-users", getDid(), {
  //       id: user.user.uid,
  //       name,
  //       pin,
  //     }).then(() => {
  //       location.href = "home.html";
  //       addToLocalStorage("accinfo", {
  //         logged: true,
  //         accType: "no-auth",
  //         divId: getDid(),
  //         pass,
  //       });
  //     });
  //   }
  // });
}

function getDid() {
  let navigator_info = window.navigator;
  let screen_info = window.screen;
  let uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  return uid;
}

noAccForm && noAccForm.addEventListener("submit", createUserAnonymously);

export { auth, onAuthStateChanged };