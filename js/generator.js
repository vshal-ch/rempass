const selectField = document.querySelector('#length');

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

