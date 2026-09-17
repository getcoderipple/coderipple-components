const button =
  document.querySelector(
    '[data-magnetic-button]'
  );

if (button) {

  button.addEventListener(
    'mousemove',
    function(event) {

      const rect =
        button.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      button.style.transform =
        'translate(' +
        x * 0.18 +
        'px, ' +
        y * 0.18 +
        'px)';
    }
  );

  button.addEventListener(
    'mouseleave',
    function() {

      button.style.transform =
        'translate(0, 0)';
    }
  );

}
