import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { app } from "./instance.js";
import { auth, onAuthStateChanged } from "./no-acc-auth.js";

let db = getFirestore(app);

export async function updateData(coll, docId, data) {
  try {
    let docRef = await updateDoc(doc(db, coll, docId), {
      ids: arrayUnion(data),
    });
    return docRef;
  } catch (e) {
    console.log(e);
  }
}

export async function addData(coll, docId, data) {
  try {
    let docRef = await setDoc(doc(db, coll, docId), data);
    return docRef;
  } catch (e) {
    console.log(e);
  }
}

export async function addPasswordHelper(id, platformName, uname, key) {
  let coll = id;
  let res = await addData(coll, platformName, { id, uname, key });
}
