const area =
  document.querySelector('.text-cursor-area');

const cursor =
  document.querySelector('[data-text-cursor]');

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


  area.addEventListener(
    'mouseover',
    function(event) {

      const item =
        event.target.closest(
          '[data-cursor-text]'
        );

      if (!item) {
        return;
      }

      if (!cursor) {
        return;
      }

      cursor.textContent =
        item.getAttribute(
          'data-cursor-text'
        );
    }
  );


  area.addEventListener(
    'mouseout',
    function(event) {

      const item =
        event.target.closest(
          '[data-cursor-text]'
        );

      if (!item) {
        return;
      }

      if (!cursor) {
        return;
      }

      cursor.textContent =
        'VIEW';
    }
  );

}
