import create from "./create.js";

//main//
function boot(){
    boot_button();
}

//sub//
function boot_button(){
    let button = create("input","boot",{type:"button",value:"SYSTEM"});
    button.addEventListener("click",
    function (){
        console.log("abc");
    })
}

//boot export
export default boot;