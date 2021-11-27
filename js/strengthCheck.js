const progress = document.querySelector(".progress");
const input = document.querySelector("#entered-pass");
const remarks = document.querySelector(".remarks");

function setPercent(p, element) {
  element.style.setProperty("--color", `hsl(${p},87%,44%)`);
  element.style.setProperty("--prog", `${p}%`);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(specialWeakness(password));
  return weaknesses;
}

function lowerCaseWeakness(password) {
  let matches = password.match(/[a-z]/g);
  if (matches == null || matches.length === 0) {
    return {
      message: "Your password has no lower case letters",
      deduction: 20,
    };
  }

  if (matches.length <= 4) {
    return {
      message: "Your password could use some more lower case letters",
      deduction: 5,
    };
  }
}

function upperCaseWeakness(password) {
  let matches = password.match(/[A-Z]/g);
  if (matches == null || matches.length === 0) {
    return {
      message: "Your password has no upper case letters",
      deduction: 20,
    };
  }

  if (matches.length <= 4) {
    return {
      message: "Your password could use some more upper case letters",
      deduction: 5,
    };
  }
}

function specialWeakness(password) {
  let matches = password.match(/[\!@#\$%\^&\*]/g);
  if (matches == null || matches.length === 0) {
    return {
      message: "Your password has no special characters",
      deduction: 30,
    };
  }

  if (matches.length <= 3) {
    return {
      message: "Your password could use some more special characters",
      deduction: 5,
    };
  }
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "your password is too short",
      deduction: 40,
    };
  }

  if (length <= 8) {
    return {
      message: "your password could be longer",
      deduction: 15,
    };
  }
}

export function handleInput(flag = true, element = progress,str = input.value) {
  let { strength, message } = check(str);
  setPercent(strength, element);
  if (flag) {
    remarks.innerHTML = message;
  }
}

export function check(string) {
  let str = string;
  let weaknesses = calculatePasswordStrength(str);
  let strength = 100;
  let message = "";
  weaknesses.forEach((element) => {
    if (!element) return;
    strength -= element.deduction;
    message += element.message + ";<br>";
  });
  return { strength, message };
}

input && input.addEventListener("input", handleInput);
