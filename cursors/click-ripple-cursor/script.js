const area =
  document.querySelector('.click-ripple-area');

if (area) {

  area.addEventListener(
    'click',
    function(event) {

      const rect =
        area.getBoundingClientRect();

      const ripple =
        document.createElement('span');

      ripple.className =
        'click-ripple';

      ripple.style.left =
        event.clientX -
        rect.left +
        'px';

      ripple.style.top =
        event.clientY -
        rect.top +
        'px';

      area.appendChild(ripple);

      setTimeout(
        function() {
          ripple.remove();
        },
        700
      );

    }
  );

}
