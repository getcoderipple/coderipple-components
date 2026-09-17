const area =
  document.querySelector('.cursor-trail-area');

if (area) {

  area.addEventListener(
    'mousemove',
    function(event) {

      const rect =
        area.getBoundingClientRect();

      const dot =
        document.createElement('span');

      dot.className =
        'cursor-trail-dot';

      dot.style.left =
        event.clientX -
        rect.left +
        'px';

      dot.style.top =
        event.clientY -
        rect.top +
        'px';

      area.appendChild(dot);

      setTimeout(
        function() {
          dot.remove();
        },
        550
      );
    }
  );

}
