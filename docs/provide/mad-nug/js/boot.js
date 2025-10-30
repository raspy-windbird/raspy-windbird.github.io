import create from "./assets/dom.js";

function boot(){
    boot_button();
}


//sub//
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

//boot export
export default boot;