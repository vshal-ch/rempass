import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { app } from "./instance.js";
import { addToLocalStorage } from "./addToLocal.js";

const auth = getAuth(app);
const signUpForm = document.querySelector(".signup-form");

function handleSubmit(e) {
  e.preventDefault();
  let email = signUpForm[0].value;
  let pass = signUpForm[1].value;
  createUserWithEmailAndPassword(auth, email, pass).then((userCred) => {
    let user = userCred.user;
    addToLocalStorage("accInfo", {
      id: user.uid,
      accType: "email/pass",
      verif: false,
    });
  });
}

auth && onAuthStateChanged(auth, (user) => {
  if (!user.emailVerified) {
    location.href = "verify.html";
  } else {
  }
});

signUpForm.addEventListener("submit", handleSubmit);
