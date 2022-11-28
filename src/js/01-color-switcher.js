function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bgColor: document.querySelector(`body`),
  start: document.querySelector(`button[data-start]`),
  stop: document.querySelector(`button[data-stop]`),
};

let timer = 0;
refs.start.addEventListener('click', () => {
  timer = setInterval(() => {
    refs.bgColor.style.backgroundColor = getRandomHexColor();
    refs.start.disabled = true;
  }, 1000);
});

refs.stop.addEventListener('click', () => {
  clearInterval(timer);
  refs.start.disabled = false;
});
