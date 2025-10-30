import create from "./create.js";

function boot(){
    boot_button();
}


//sub//
function boot_button(){
    create("input","boot",{type:"button",value:"SYSTEM",id:"boot_button"});
    const button = document.getElementById("boot_button");

    const button_clicked = new Promise (
        (resolve) => button.addEventListener("click",function(){})
    ).then(
        () => console.log("button_clicked"))

}

//boot export
export default boot;