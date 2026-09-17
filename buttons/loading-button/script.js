const loadingBtn = document.querySelector('.loading-btn');
const loadingText = loadingBtn.querySelector('.loading-text');

loadingBtn.addEventListener('click', function(){

  loadingBtn.classList.add('is-loading');
  loadingText.textContent = 'Loading...';
  loadingBtn.disabled = true;

  setTimeout(function(){

    loadingBtn.classList.remove('is-loading');
    loadingBtn.classList.add('is-done');
    loadingText.textContent = 'Done ✓';

    loadingBtn.disabled = false;

  }, 2000);

});
