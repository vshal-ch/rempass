(function () {
  let json = JSON.parse(sessionStorage.getItem("lgdinfnm"));
  window.acc = JSON.parse(localStorage.getItem("accInfo"));
  if (window.acc && window.acc.accType === "emps" && !window.acc.verif) {
    location.href = "verify.html";
  } else if (!window.acc) {
    location.href = "index.html";
  } else {
    if (!json && window.acc.accType == "wthpn") {
      location.href = "pintaker.html";
    } 
    // else {
    //   if (!location.href.endsWith("home.html")) {
    //     location.href = "home.html";
    //   }
    // }
  }
})();
