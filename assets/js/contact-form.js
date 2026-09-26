(function () {
  var form = document.getElementById('contact');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        form.style.display = 'none';
        document.getElementById('form-success').classList.add('is-visible');
      } else {
        alert('Something went wrong. Please try again or email support@nagmalive.com directly.');
      }
    })
    .catch(function () {
      alert('Something went wrong. Please try again or email support@nagmalive.com directly.');
    });
  });
})();
