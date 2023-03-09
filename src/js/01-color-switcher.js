const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

const { startBtn, stopBtn } = refs;
let intervalId = null;
startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn(e) {
    if (startBtn.disabled) {
        return;
    }
    
        intervalId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    console.log('new color');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopBtn(e) {
    if (!stopBtn.disabled) {
        clearInterval(intervalId);
        stopBtn.disabled = true;
        startBtn.disabled = false;
    }
}
