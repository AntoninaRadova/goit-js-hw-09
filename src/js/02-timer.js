import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

refs.btnStart.disabled = true;
let timerDeadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        timerDeadline = selectedDates[0].getTime();

        if (timerDeadline < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.btnStart.disabled = true;
        } else {
            refs.btnStart.disabled = false;
        }
        refs.btnStart.addEventListener('click', onStart);
        
    }
        
}

flatpickr("#datetime-picker", options);

function onStart() {
    refs.btnStart.disabled = false;
    let timerId = null;
            
    timerId = setInterval(() => {
        let ms = timerDeadline - Date.now();

        if (ms < 1000) {
            clearInterval(timerId);
        }

        const data = convertMs(ms);

            refs.days.textContent = addLeadinZero(data.days);
            refs.hours.textContent =  addLeadinZero(data.hours);
            refs.minutes.textContent = addLeadinZero(data.minutes);
            refs.seconds.textContent = addLeadinZero(data.seconds);

    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadinZero(value) {
  return String(value).padStart(2, '0');
}
