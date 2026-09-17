var radialMenu =
  document.getElementById('crRadialMenu');

var radialTrigger =
  document.getElementById('crRadialTrigger');

radialTrigger.addEventListener(
  'click',
  function(e){

    e.preventDefault();

    radialMenu.classList.toggle('active');

  }
);

document.addEventListener(
  'click',
  function(e){

    if (!radialMenu.contains(e.target)) {
      radialMenu.classList.remove('active');
    }

  }
);
