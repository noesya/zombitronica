import '/socket.io/socket.io.js';
window.zombitron = window.zombitron || {};
var ui = {
    colors : {
        accent: "#f25138",
        fill: "#666"
    }
}
window.zombitron.ui = window.zombitron.ui || ui;
import Slider from "/src/webui/Slider.js";
window.zombitron.Slider = Slider;
import Slider2D from "/src/webui/Slider2D.js";
window.zombitron.Slider2D = Slider2D;
import Potentiometer from "/src/webui/Potentiometer.js";
window.zombitron.Potentiometer = Potentiometer;