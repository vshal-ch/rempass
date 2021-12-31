(function(){
    let json = JSON.parse(localStorage.getItem('accInfo'));
    console.log(json);
    if(json && json.logged){
        location.href = 'home.html';
    }
})();