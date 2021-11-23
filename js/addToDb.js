import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { app } from "./instance.js";
import { auth, onAuthStateChanged } from "./no-acc-auth.js";

let db = getFirestore(app);

export async function addData(coll, docId, data) {
  try {
    let docRef = await setDoc(doc(db, coll, docId), data);
    return docRef;
  } catch (e) {
    console.log(e);
  }
}

export async function addPasswordHelper(divid, platformName, uname, key) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let coll = user.uid;
      let res = await addData(coll, platformName, { divid, uname, key });
      return res;
    }
  });
}
