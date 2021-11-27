import {handleInput} from "./strengthCheck.js"
import { getPass } from "./generatorHelper.js"

const selectField = document.querySelector('#length');
const displayField = document.querySelector("#generated-pass")
const progress = document.querySelector('.progress');

function fillSelect(){
    for(let i=8;i<30;i++){
        let element = document.createElement('option');
        element.value = i;
        element.textContent = i;
        if(i=== 16){
            element.setAttribute("selected","");
        }
        selectField.appendChild(element);
    }
}

fillSelect();
displayField.value = getPass();
handleInput(false,progress,displayField.value)