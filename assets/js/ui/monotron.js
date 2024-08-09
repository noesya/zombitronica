import "/src/webui/WebUI.js"
var slider2d = new window.zombitron.Slider2D('position', [220,220], window.zombitron.ui);

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});