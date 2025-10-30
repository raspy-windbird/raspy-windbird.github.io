import dom from "./assets/dom.js";



async function boot(){
    const button_id = "boot";
    const Dom = new dom();
    Dom.create("input","boot",{type:"button",value:"SYSTEM",id:button_id});
    const button = document.getElementById(button_id);
    Dom.clicked(button,console.log("click");,True);
}


/*
async function clicked (ele){
    document.addEventListener('DOMContentLoaded', () => {
    
    if (ele) {
        ele.addEventListener("click", () => {
            console.log("boot.js ---SYSTEM STARTED---");
            ele.remove();
        }, { once: true });
    }});
}
*/
[]
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