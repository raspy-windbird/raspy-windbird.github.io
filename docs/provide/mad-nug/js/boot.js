import create from "./assets/dom.js";

function boot(){
    boot_button();
}


////sub////
//boot_button//
async function boot_button(){
    await create("input","boot",{type:"button",value:"SYSTEM",id:"boot_button"});
    await button_clicked();
}

async function button_clicked (){
    document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("boot_button");
    if (button) {
        button.addEventListener("click", () => {
            console.log("ボタンがクリックされました（一度だけ実行）");
        }, { once: true });
    }
});
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