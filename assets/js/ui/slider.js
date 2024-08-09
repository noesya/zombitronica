import "/src/webui/WebUI.js"

var size = [130, 280];

var multislider = [
    new window.zombitron.Slider('slider1', size, window.zombitron.ui),
    new window.zombitron.Slider('slider2', size, window.zombitron.ui),
    new window.zombitron.Slider('slider3', size, window.zombitron.ui),
    new window.zombitron.Slider('slider4', size, window.zombitron.ui)
];

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });