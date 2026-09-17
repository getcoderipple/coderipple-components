const textarea = document.querySelector('[data-counter-textarea]');
const counter = document.querySelector('[data-character-count]');

textarea.addEventListener('input', function() {
  counter.textContent = textarea.value.length;
});
