import { getContent } from "./readDb.js";
import {onAuthStateChanged,auth} from './no-acc-auth.js'

export async function startPopulate(parent){
    onAuthStateChanged(auth,(user)=>{
        if(user){
            populate(parent,user.uid)
        }
    })
    
}

async function populate(parent,uid){
    let docs=await getContent(uid);
    let str = "";
    docs.forEach(doc => {
        str+=`
        <li class="password">
                  <div class="visible-part">
                    <div class="name-and-logo">
                      <img src="./assets/github.svg" class='password-logo' alt="github">
                      <p class="name">${doc.id}</p>
                    </div>
                    <div class="icons">
                      <span class="copy-action action">
                        <img src="./assets/content_copy_white_24dp.svg" alt="copy">
                      </span>
                      <img src="./assets/arrow-head-down.svg" alt="open" class="down-arrow">
                    </div>
                  </div>
                  <div class="hidden-part">
                      <div class="password-block">
                        <p class="password-text">${doc.data().key}</p>
                        <img src="./assets/visibility.svg" alt="show" class="toggle-password">
                      </div>
                      <div class="actions-block">
                        <span class="def-action action">
                          <img src="./assets/delete_white_24dp.svg" alt="del">
                        </span>
                        <span class="edit-action action">
                          <img src="./assets/edit_white_24dp.svg" alt="edit">
                        </span>
                      </div>
                  </div>
                </li>
        `
    });
    parent.innerHTML = str;
}