(function () {
  let json = JSON.parse(localStorage.getItem("accInfo"));
  if (json && json.logged) {
    if (json.verif) {
      location.href = "home.html";
    } else if (json.accType === "emps" && json.verif == false) {
      if (!location.href.endsWith("verify.html")) {
        location.href = "verify.html";
      }
    }
  } else {
    if (!location.href.endsWith("index.html")) {
      location.href = "index.html";
    }
  }
})();
