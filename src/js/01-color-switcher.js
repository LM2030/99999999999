function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let timer = 0;

refs.start.addEventListener('click', magicStart);
refs.stop.addEventListener('click', magicStop);

function magicStart() {
  refs.start.toggleAttribute('disabled');
  timer = setInterval(colorChange, 1000);
}

function colorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function magicStop() {
  refs.start.toggleAttribute('disabled');
  clearInterval(timer);
}
