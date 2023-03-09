import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  form: document.querySelector('.form'),

}

const { form } = refs;


form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

const {
  elements: {
    delay, step, amount
  }
} = e.currentTarget;
  
  runMakingPromises(step.value, amount.value, delay.value);

}

function runMakingPromises(stepValue, amountValue, delayValue) {
  
  for (let i = 0; i === amountValue; i += 1) {
    let delay = delayValue + stepValue * i;
    let position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
  }
}


function createPromise(position, delay) {

    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay,});
        } else {
          reject({position, delay,});
        }
      }, delay);
      
    }); 
  } 
