const area =
  document.querySelector('.cursor-demo-area');

const cursor =
  document.querySelector('[data-circle-cursor]');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!cursor) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      cursor.style.left =
        event.clientX -
        rect.left +
        'px';

      cursor.style.top =
        event.clientY -
        rect.top +
        'px';
    }
  );

}
