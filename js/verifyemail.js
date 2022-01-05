(function () {
  let json = JSON.parse(localStorage.getItem("accInfo"));
  if (json && (json.accType !== "email/pass" || json.verif != false)) {
    location.href = "index.html";
  }
})();

import { getAuth, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const auth = getAuth();
sendEmailVerification(auth.currentUser).then(() => {
  console.log('sent');
});
