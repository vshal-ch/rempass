(function(){
    let json = JSON.parse(sessionStorage.getItem('lgdinfnm'));
    window.acc= JSON.parse(localStorage.getItem('accInfo'));
    if(!acc){
        location.href = 'index.html'
    }
    if(!json && window.acc.accType!='woutpn'){
        location.href='pintaker.html';
    }
})();