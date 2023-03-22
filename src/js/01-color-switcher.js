function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onBtnChangeColor = document.querySelector("[data-start]");
const onBtnStopColor = document.querySelector("[data-stop]");
let idInterval = null;
    
onBtnChangeColor.addEventListener("click", () => {
  idInterval = setInterval(() => {
      
    const colorRandom = getRandomHexColor();
    document.body.style.backgroundColor = colorRandom;

  }, 1000)
    
  onBtnChangeColor.disabled = true;
  onBtnStopColor.disabled = false;
    
});

onBtnStopColor.addEventListener('click', () => {
    clearInterval(idInterval);
    onBtnStopColor.disabled = true;
    onBtnChangeColor.disabled = false;

});
