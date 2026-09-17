const area =
  document.querySelector('.glow-cursor-area');

const glow =
  document.querySelector('[data-glow-cursor]');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!glow) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      glow.style.left =
        event.clientX -
        rect.left +
        'px';

      glow.style.top =
        event.clientY -
        rect.top +
        'px';
    }
  );

}
