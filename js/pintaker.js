import {checkDb} from './readDb.js';

const pinField = document.querySelector('.input');
const form = document.querySelector('form');
const formContainer = document.querySelector('.container');

function handleInput(){
    if(pinField.value.trim()!=''){
        pinField.parentElement.classList.add('present');
    }
    else{
        pinField.parentElement.classList.remove('present');
    }
}

async function seeIfCorrect(e){
    e.preventDefault();
    let value = pinField.value;
    if(value.trim()==''){
        return;
    }
    let {id} = JSON.parse(localStorage.getItem('accInfo'));
    let data = await checkDb(id,'wthpn');
    let {pin} = data;
    if(pin==value){
        formContainer.classList.remove('not-matched');
        sessionStorage.setItem('lgdinfnm','{"flag":"yes"}');
        location.href = 'home.html';
    }
    else{
        formContainer.classList.add('not-matched');
    }
}

pinField.addEventListener('input',handleInput);
form.addEventListener('submit',seeIfCorrect);