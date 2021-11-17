

export function addToLocalStorage(data){
    let jsonString = JSON.stringify(data);
    localStorage.setItem('accInfo',jsonString);
}