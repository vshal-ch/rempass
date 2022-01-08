import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { app } from "./instance.js";
import { addToLocalStorage } from "./addToLocal.js";
import { addData } from "./addToDb.js";

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
      accType: "emps",
      verif: false,
      logged: true,
    });
    if (!user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          location.href = "verify.html";
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      addData("emps", user.uid, {
        name: getName(user.email),
      }).then(() => {
        addToLocalStorage("accInfo", {
          id: user.uid,
          accType: "emps",
          verif: true,
          logged: true,
        });
        location.href = "home.html";
      });
    }
  });
}

function getName(email) {
  return email.substring(0, email.indexOf("@"));
}

// auth &&
//   onAuthStateChanged(auth, (user) => {
//     if (!user.emailVerified) {
//       sendEmailVerification(user)
//         .then(() => {
//           location.href = "verify.html";
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     } else {
//       addToLocalStorage("accInfo", {
//         id: user.uid,
//         accType: "emps",
//         verif: true,
//       });
//       location.href = "home.html";
//     }
//   });

signUpForm.addEventListener("submit", handleSubmit);
