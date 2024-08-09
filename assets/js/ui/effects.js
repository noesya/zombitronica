import "/src/webui/WebUI.js"

let dial1 = new window.zombitron.Potentiometer('dial1', [150, 150], window.zombitron.ui); 
let dial2 = new window.zombitron.Potentiometer('dial2', [150, 150], window.zombitron.ui); 
let dial3 = new window.zombitron.Potentiometer('dial3', [150, 150], window.zombitron.ui); 

document.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        ev.preventDefault();
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});