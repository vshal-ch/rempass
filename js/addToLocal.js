

export function addToLocalStorage(name,data){
    let jsonString = JSON.stringify(data);
    localStorage.setItem(name,jsonString);
}