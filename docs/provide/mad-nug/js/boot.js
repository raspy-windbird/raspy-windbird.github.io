import create from "./assets/dom.js";

function boot(){
    boot_button();
}


////sub////
//boot_button//
async function boot_button(){
    await button_create();
    await button_clicked();
}

async function button_create(){
    create("input","boot",{type:"button",value:"SYSTEM",id:"boot_button"});
}
async function button_clicked (){
    const button = document.getElementById("boot_button");
    button.addEventListener("click",resolve);
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

//boot export
export default boot;