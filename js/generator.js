import { handleInput } from "./strengthCheck.js";
import { getPass } from "./generatorHelper.js";

const selectField = document.querySelector("#length");
const displayField = document.querySelector("#generated-pass");
const progress = document.querySelector(".progress");
const optionForm = document.querySelector(".option-form");
const copy = document.querySelector('.copy-action');
const regen = document.querySelector('.regen-action');

function fillSelect() {
  for (let i = 8; i < 30; i++) {
    let element = document.createElement("option");
    element.value = i;
    element.textContent = i;
    if (i === 16) {
      element.setAttribute("selected", "");
    }
    selectField.appendChild(element);
  }
}

fillSelect();
handleSubmit(undefined)

function handleSubmit(e) {
  e && e.preventDefault();
  displayField.value = getPass(
    optionForm["length"].value,
    optionForm["upper"].checked,
    optionForm["nums"].checked,
    optionForm["special"].checked
  );
  handleInput(false, progress, displayField.value);
}

function checkProgress(){
    handleInput(false, progress, displayField.value);
}

optionForm.addEventListener("submit", handleSubmit);
displayField.addEventListener('input',checkProgress)
copy.addEventListener('click',()=>{
    navigator.clipboard.writeText(displayField.value);
    copy.classList.add('done');
    setTimeout(()=>{
        copy.classList.remove('done');
    },500)
})
regen.addEventListener('click',handleSubmit);
// save.addEventListener('.click',()=>{
//     openModal({passValue:displayField.value});
// })