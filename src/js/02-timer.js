import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.getElementById('datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]'),

}

const { input, startBtn, daysValue, hoursValue, minutesValue, secondsValue } = refs;
startBtn.disabled = true;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    console.log(selectedDates[0]);  
    let timeDifferenceInMs = selectedDates[0].getTime() - Date.now();

    if (timeDifferenceInMs < 0) {
      pastTimeChosen();
    } else {     
      startBtn.disabled = false;

      runTimer(selectedDates);
     
    }
  },
};


flatpickr(input, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function pastTimeChosen() {
   Notify.failure("Please choose a date in the future");
  startBtn.disabled = true;
  return;
}

function runTimer(selectedDates) {
  startBtn.addEventListener('click', () => {
    
      timerId = setInterval(() => {
        let ms = selectedDates[0].getTime() - Date.now();
        const timeObj = convertMs(ms);
        startBtn.disabled = true;
          
        makeTimerInterface(timeObj);

        if (timeObj.days === 0 && timeObj.hours === "00" && timeObj.minutes === "00" && timeObj.seconds === "00") {
          clearInterval(timerId);
        }
      }, 1000);
    
  });
}

function makeTimerInterface(timeObj) {
  daysValue.textContent = timeObj.days;
  hoursValue.textContent = timeObj.hours;
  minutesValue.textContent = timeObj.minutes;
  secondsValue.textContent = timeObj.seconds;
}
