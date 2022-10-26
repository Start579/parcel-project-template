// ******************
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
// ******************
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

startBtn.addEventListener("click", (event) => {
    const timerId = setInterval(() => {    
    const randomColor = getRandomHexColor();    
    document.body.style.backgroundColor = randomColor;
}, 500);
startBtn.setAttribute("disabled", "disabled");
stopBtn.addEventListener("click", (event) => {
    startBtn.removeAttribute("disabled", "disabled");
    clearInterval(timerId);
});
});