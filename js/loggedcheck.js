(function(){
    let json = JSON.parse(sessionStorage.getItem('lgdinfnm'));
    let acc= JSON.parse(localStorage.getItem('accInfo'));
    if(!acc){
        location.href = 'index.html'
    }
    if(!json && acc && acc.pass){
        location.href='pintaker.html';
    }
})();