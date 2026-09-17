const area =
  document.querySelector('.follower-dot-area');

const dot =
  document.querySelector('[data-follower-dot]');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      if (!dot) {
        return;
      }

      const rect =
        area.getBoundingClientRect();

      dot.style.left =
        event.clientX -
        rect.left +
        'px';

      dot.style.top =
        event.clientY -
        rect.top +
        'px';
    }
  );

}
