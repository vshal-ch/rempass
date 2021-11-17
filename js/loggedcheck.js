(function(){
    let json = JSON.parse(sessionStorage.getItem('lgdinfnm'));
    let acc= JSON.parse(localStorage.getItem('accInfo'));
    if(!json && acc.pass){
        location.href='pintaker.html';
    }
})();