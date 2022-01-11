import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { app } from "./instance.js";
import { addToLocalStorage } from "./addToLocal.js";
import { addData } from "./addToDb.js";

const auth = getAuth(app);
const signUpForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");

function handleSubmit(e) {
  e.preventDefault();
  let email = signUpForm[0].value;
  let pass = signUpForm[1].value;
  createUserWithEmailAndPassword(auth, email, pass).then((userCred) => {
    let user = userCred.user;
    if (!user.emailVerified) {
      addToLocalStorage("accInfo", {
        id: user.uid,
        accType: "emps",
        verif: false,
        logged: true,
      });
      sendEmailVerification(user)
        .then(() => {
          location.href = "verify.html";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
}

function getName(email) {
  return email.substring(0, email.indexOf("@"));
}

function handleLogin(e) {
  e.preventDefault();
  let email = loginForm[0].value;
  let pass = loginForm[1].value;
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        addToLocalStorage("accInfo", {
          id: user.uid,
          accType: "emps",
          verif: false,
          logged: true,
        });
        sendEmailVerification(user)
          .then(() => {
            location.href = "verify.html";
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        addToLocalStorage("accInfo", {
          id: user.uid,
          accType: "emps",
          verif: true,
          logged: true,
        });
        location.href = "home.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

signUpForm.addEventListener("submit", handleSubmit);
loginForm.addEventListener("submit", handleLogin);
