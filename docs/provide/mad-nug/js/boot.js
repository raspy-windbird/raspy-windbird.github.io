import dom from "./assets/dom.js";

async function boot(){
    const Dom = new dom();
    Dom.create("input","boot",{type:"button",value:"SYSTEM",id:"boot"});
    
    const button = document.getElementById("boot");
    await button_clicked(button);
}

async function button_clicked (ele){
    document.addEventListener('DOMContentLoaded', () => {
    
    if (ele) {
        ele.addEventListener("click", () => {
            console.log("/boot.js ---SYSTEM STARTED---");
            button.remove();
        }, { once: true });
    }});
}

/*
function boot_button(){
    create("input","boot",{type:"button",value:"SYSTEM",id:"boot_button"});
    const button = document.getElementById("boot_button");

    const button_clicked = new Promise (
        (resolve) => button.addEventListener("click",resolve)
    ).then(
        () => {
            console.log("button_clicked");
            button.remove();
        }
    )
}
*/

export default boot;