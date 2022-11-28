import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector(`span[data-days]`),
  hours: document.querySelector(`span[data-hours]`),
  minutes: document.querySelector(`span[data-minutes]`),
  seconds: document.querySelector(`span[data-seconds]`),
  startButton: document.querySelector('button[data-start]'),
};

let currentTime = null;
let setTime = null;
let interval = null;

disableButton();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please chose a date in the future');
      return;
    }
    setTime = selectedDates[0].getTime();
    disableButton();
  },
};

refs.startButton.addEventListener('click', startTimer);

const date = flatpickr('input#datetime-picker', options);

function disableButton() {
  refs.startButton.toggleAttribute('disabled');
}

function startTimer() {
  disableButton();
  interval = setInterval(runTimer, 1000);
}

function runTimer() {
  const deltaTime = findDeltaTime();
  stopTimer(deltaTime);
  const convertTime = convertMs(deltaTime);
  changeHtmlValues(convertTime);
}

function stopTimer(deltaTime) {
  if (deltaTime < 1000) clearInterval(interval);
}
function findDeltaTime() {
  currentTime = Date.now();
  return setTime - currentTime;
}

function pad(x) {
  return String(x).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function changeHtmlValues({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
