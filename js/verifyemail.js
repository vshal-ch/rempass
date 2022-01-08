import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { addToLocalStorage } from "./addToLocal.js";
import { addData } from "./addToDb.js";
import { app } from "./instance.js";

const doneBtn = document.querySelector(".done");

const auth = getAuth(app);
let user = auth.currentUser;
function checkVerify() {
  console.log(user);
  if (user.emailVerified) {
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
  } else {
    alert("No");
  }
}

function getName(email) {
  return email.substring(0, email.indexOf("@"));
}

doneBtn.addEventListener("click", checkVerify);
