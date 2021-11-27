import {check,handleInput} from "./strengthCheck.js"

export function getPass({
  size = 16,
  upper = true,
  num = true,
  spec = true,
} = {}) {
  let keys = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    special: "!@#$%^&*?",
    number: "1234567890",
  };

  let str = "";
  str += keys.lower;
  str += upper ? keys.upper : "";
  str += num ? keys.number : "";
  str += spec ? keys.special : "";

  let ps;
  let randomStr = [];
  let returns;
  let limit = size < 14 ? 80 : 100;
  do {
    randomStr = [];
    for (let i = 0; i < size; i++) {
      randomStr.push(str.split("")[getRandom(str.length)]);
    }
    if (!(upper && num && spec)) {
      break;
    }
    returns = check(randomStr.join(""));
  } while (returns.strength < limit);
  ps = randomStr.join("");
  return ps;
}

function getRandom(n) {
  return Math.floor(Math.random() * n);
}
