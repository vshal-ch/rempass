import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import {app} from "./instance.js";
import {auth} from "./no-acc-auth.js";

let db = getFirestore(app);

export async function addData(coll,docId,data){
    try{
        let docRef =await setDoc(doc(db,coll,docId),data);
        return docRef;
    }
    catch(e){
        console.log(e);
    }
}

export function addPasswordHelper(divid,platformName,uname,key){
    let coll = auth.currentUser;
    console.log(coll);
}