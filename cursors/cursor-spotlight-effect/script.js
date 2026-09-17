const area =
  document.querySelector('.cursor-spotlight-area');

const spotlight =
  document.querySelector('[data-cursor-spotlight]');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!spotlight) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      spotlight.style.left =
        event.clientX -
        rect.left +
        'px';

      spotlight.style.top =
        event.clientY -
        rect.top +
        'px';
    }
  );

}
