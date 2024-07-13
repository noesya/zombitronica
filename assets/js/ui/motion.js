
const socket = io();

var buttonAllowMotion = document.getElementById('allow-motion');
console.log(buttonAllowMotion);
function askDeviceMotionPermission() {
    if (typeof (DeviceOrientationEvent) !== "undefined" && typeof (DeviceOrientationEvent.requestPermission) === "function") {
        // (optional) Do something before API request prompt.
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response == "granted") {
                    window.addEventListener("deviceorientation", (event) => {
                        var betaRatio = event.beta;
                        console.log(event)
                        socket.emit('dial-motion', betaRatio/90 );
                        var background = "hsl(" + betaRatio*2 + " 80% 50%)";

                        document.querySelector('body').style.background = background;
                    });
                }
            })
            .catch(console.error)
    } else {
        alert("DeviceOrientationEvent is not defined");
    }
    buttonAllowMotion.removeEventListener('click', askDeviceMotionPermission);
    buttonAllowMotion.style.display = "none";
}

buttonAllowMotion.addEventListener('click', askDeviceMotionPermission);
