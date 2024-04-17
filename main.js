'use strict';

const alertContainer = document.getElementById('alertContainer');
const submitPredictionButton = document.getElementById('submitPredictionButton');

function showAlert(message) {
  alertContainer.textContent = message;
  alertContainer.style.display = 'block';
  alertContainer.focus();

  submitPredictionButton.disabled = true;

  setTimeout(() => {
    alertContainer.textContent = '';
    alertContainer.style.display = 'none';

    submitPredictionButton.disabled = false;
  }, 4000);
}

function handlePredictionFormSubmit(event) {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const score = document.getElementById('score');
  const scoreFieldError = document.getElementById('scoreFieldError');

  scoreFieldError.style.display = 'none';

  if (score.value < 0 || score.value > 10 || isNaN(score.value)) {
    score.setAttribute('aria-invalid', 'true');
    scoreFieldError.style.display = 'block';
    scoreFieldError.textContent = 'Please enter a valid score between 0 and 10';
    scoreFieldError.focus();
  } else {
    scoreFieldError.textContent = '';
    scoreFieldError.style.display = 'none';

    showAlert(`Hello, ${fullname}! Your prediction has been submitted.`);
  }
}

function createAccordion(domNode) {
  const buttonEl = domNode.querySelector('button[aria-expanded]');
  const controlsId = buttonEl.getAttribute('aria-controls');
  const contentEl = document.getElementById(controlsId);
  let open = buttonEl.getAttribute('aria-expanded') === 'true';

  function toggleAccordion() {
    open = !open;
    buttonEl.setAttribute('aria-expanded', `${open}`);
    contentEl.toggleAttribute('hidden', !open);
  }

  buttonEl.addEventListener('click', toggleAccordion);

  return {
    toggle: toggleAccordion
  };
}

const accordions = document.querySelectorAll('.accordion .accordion_title_wrapper');

accordions.forEach((accordionEl) => {
  const accordion = createAccordion(accordionEl);
});

let toggleButton = document.getElementById("toggle-high-contrast");

toggleButton.addEventListener("click", function() {
    let body = document.getElementsByTagName("body")[0];

    body.classList.toggle("high-contrast");
});
