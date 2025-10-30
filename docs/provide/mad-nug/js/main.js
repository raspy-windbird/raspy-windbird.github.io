import startup from "./startup.js";
import boot from "./boot.js";

console.log("main.js ---LOADING startup.js---");
startup();

console.log("main.js ---LOADING boot.js---");
boot();