(function () {
  var accordion = document.querySelector('.accordion');
  if (!accordion) return;

  var details = accordion.querySelectorAll('details');

  details.forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (detail.open) {
        // Close other open details
        details.forEach(function (other) {
          if (other !== detail && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
})();
