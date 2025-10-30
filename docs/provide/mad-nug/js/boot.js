import create from "./create.js";

//main//
function boot(){
    boot_button();
}

//sub//
function boot_button(){
    create("input","boot",{type:"button",value:"SYSTEM",id:"boot_button"});
    let button = document.getElementById("boot_button");
    button.addEventListener("click",
    function (){
        console.log("abc");
    })
}

//boot export
export default boot;