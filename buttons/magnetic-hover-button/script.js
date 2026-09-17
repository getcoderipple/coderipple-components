const magneticBtn = document.querySelector('.magnetic-btn');

magneticBtn.addEventListener('mousemove', function(e){

  const rect = magneticBtn.getBoundingClientRect();

  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  magneticBtn.style.transform =
    `translate(${x * 0.28}px, ${y * 0.28}px)`;

});

magneticBtn.addEventListener('mouseleave', function(){

  magneticBtn.style.transform = 'translate(0, 0)';

});
