import { Notify } from "notiflix/build/notiflix-notify-aio";

let delayValue = null;
let stepValue = null;
let amountValue = null

const submitBtn = document.querySelector('.form');
submitBtn.addEventListener("submit", submitPress);

function submitPress(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

delayValue = Number(delay.value);
stepValue = Number(step.value);
amountValue = Number(amount.value);

for (let i = 1; i <= amountValue; i += 1) {
  createPromise (i, delayValue)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);})
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);});
    delayValue += stepValue
}
  submitBtn.reset();
};
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}