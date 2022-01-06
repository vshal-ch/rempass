import { getAuth, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
(function () {
  let json = JSON.parse(localStorage.getItem("accInfo"));
  if (json && (json.accType !== "email/pass" || json.verif != false)) {
    location.href = "index.html";
  }
})();

const auth = getAuth();
async function sendMail(){
  let user = await auth.currentUser()
  console.log(user);
  
}

// sendMail()