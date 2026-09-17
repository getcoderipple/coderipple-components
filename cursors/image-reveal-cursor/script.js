const area =
  document.querySelector('.image-reveal-area');

if (area) {

  const preview =
    area.querySelector('[data-reveal-preview]');

  const image =
    area.querySelector('[data-reveal-image]');


  area.addEventListener(
    'mousemove',
    function(event) {

      if (!preview) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      preview.style.left =
        event.clientX -
        rect.left +
        'px';

      preview.style.top =
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
          '[data-reveal-image-src]'
        );

      if (!item) {
        return;
      }

      if (!preview) {
        return;
      }

      if (!image) {
        return;
      }

      image.src =
        item.getAttribute(
          'data-reveal-image-src'
        );

      image.alt =
        item.textContent.trim();

      preview.classList.add(
        'active'
      );
    }
  );


  area.addEventListener(
    'mouseout',
    function(event) {

      const item =
        event.target.closest(
          '[data-reveal-image-src]'
        );

      if (!item) {
        return;
      }

      if (!preview) {
        return;
      }

      preview.classList.remove(
        'active'
      );
    }
  );

}
