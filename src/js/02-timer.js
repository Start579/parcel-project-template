import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");
const startBtn1 = document.querySelector("[data-start]");

let currentTime = null;
startBtn1.addEventListener('click', onStartBtnClick);
addDisabledAttribute();

function onStartBtnClick(event){
  timer.start();
  addDisabledAttribute();
}

const timer = {
  start() {
   const interval = setInterval(() => {
    const startTime = new Date();
    const deltaTime = currentTime - startTime;
    
    const {days, hours, minutes, seconds} = this.convertMs(deltaTime);
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;

    if(days == '00' && hours == '00' && minutes == '00' && seconds == '00'){
      clearInterval(interval);
    }
   }, 1000)
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  // Добавляем 0 перед цифрой в таймере.
addLeadingZero(value) {
    return String(value).padStart(2, "0");
}
};
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let date = new Date();
    if (selectedDates[0].getTime() <= date.getTime()) {
      Notify.failure("Wrong Date", {
        position: "right-top",
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      });
    }
    else {
      Notify.success("Timer on", {
        position: "right-top",
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      });
        currentTime = selectedDates[0].getTime();
            startBtn1.removeAttribute("disabled", "disabled");
    }
    },
  })
function addDisabledAttribute(){
  startBtn1.setAttribute('disabled', 'disabled');
}