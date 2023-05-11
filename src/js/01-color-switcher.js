document.addEventListener('DOMContentLoaded', function (event) {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let intervalId = null;

  function startChangingColor() {
    startButton.disabled = true;
    intervalId = setInterval(function () {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function stopChangingColor() {
    startButton.disabled = false;
    clearInterval(intervalId);
  }

  startButton.addEventListener('click', startChangingColor);
  stopButton.addEventListener('click', stopChangingColor);

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
});
