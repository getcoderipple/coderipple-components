const area =
  document.querySelector('.cursor-ring-area');

if (area) {

  const ring =
    area.querySelector('[data-cursor-ring]');

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!ring) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      ring.style.left =
        event.clientX -
        rect.left +
        'px';

      ring.style.top =
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
          '.cursor-ring-item'
        );

      if (!item) {
        return;
      }

      if (!ring) {
        return;
      }

      ring.classList.add(
        'active'
      );

    }
  );


  area.addEventListener(
    'mouseout',
    function(event) {

      const item =
        event.target.closest(
          '.cursor-ring-item'
        );

      if (!item) {
        return;
      }

      if (item.contains(event.relatedTarget)) {
        return;
      }

      if (!ring) {
        return;
      }

      ring.classList.remove(
        'active'
      );

    }
  );


  area.addEventListener(
    'click',
    function(event) {

      const link =
        event.target.closest(
          'a.cursor-ring-item'
        );

      if (!link) {
        return;
      }

      event.preventDefault();

    }
  );

}
