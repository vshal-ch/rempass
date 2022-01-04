(function(){
    let json = JSON.parse(localStorage.getItem('accInfo'));
    if(json && json.logged){
        location.href = 'home.html';
    }
})();