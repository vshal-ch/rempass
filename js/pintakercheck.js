(function(){
    let acc =JSON.parse(localStorage.getItem('accInfo'));
    let isntDone = JSON.parse(sessionStorage.getItem('lgdinfnm'));
    if(isntDone || !acc.pass){
        location.href='home.html';
    }
})();