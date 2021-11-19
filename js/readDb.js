import {app} from './instance.js';
import {getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const db = getFirestore(app);

async function checkDb(docId){
    const docRef = doc(db,'anonymous-users',docId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return docSnap.data();
    }
    else{
        console.log("User not found");
    }
}

export { checkDb }