(function(){
    let json = JSON.parse(sessionStorage.getItem('lgdinfnm'));
    window.acc= JSON.parse(localStorage.getItem('accInfo'));
    if(!window.acc){
        location.href = 'index.html'
    }
    if(!json && window.acc.accType=='wthpn'){
        location.href='pintaker.html';
    }
})();