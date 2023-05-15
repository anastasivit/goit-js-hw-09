import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let countdownTimer = null;

const padZero = number => String(number).padStart(2, '0');

const updateCountdownUI = (
  daysValue,
  hoursValue,
  minutesValue,
  secondsValue
) => {
  days.textContent = padZero(daysValue);
  hours.textContent = padZero(hoursValue);
  minutes.textContent = padZero(minutesValue);
  seconds.textContent = padZero(secondsValue);
};

const updateRemainingTime = timeDiff => {
  const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const remainingMinutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const remainingSeconds = Math.floor((timeDiff / 1000) % 60);

  updateCountdownUI(
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds
  );
};

const startTimer = targetDate => {
  const updateTimer = () => {
    const timeDiff = targetDate - Date.now();

    if (timeDiff < 0) {
      clearInterval(countdownTimer);
      alert('The target date has already passed');
      return;
    }

    updateRemainingTime(timeDiff);
  };

  updateTimer();
  countdownTimer = setInterval(updateTimer, 1000);
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate.getTime() < currentDate.getTime()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startTimer(selectedDate);
      dateTimePicker.disabled = true;
      startButton.disabled = true;
    }
  },
});
