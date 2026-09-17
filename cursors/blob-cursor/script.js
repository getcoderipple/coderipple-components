const area =
  document.querySelector('.blob-cursor-area');

const blob =
  document.querySelector('[data-blob-cursor]');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!blob) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      blob.style.left =
        event.clientX -
        rect.left +
        'px';

      blob.style.top =
        event.clientY -
        rect.top +
        'px';
    }
  );

}
