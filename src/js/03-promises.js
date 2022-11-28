import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};
refs.form.addEventListener('submit', startButton);

function startButton(event) {
  event.preventDefault();
  createPromises(Number(refs.delay.value), Number(refs.step.value));
}

function createPromises(delay, step) {
  for (let i = 1; i <= Number(refs.amount.value); i += 1) {
    delay += i === 1 ? 0 : step;
    createPromise(i, delay).then(succes).catch(error);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function succes({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function error({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
