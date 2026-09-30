(function () {
  if (typeof window.gtag !== 'function') return;

  // App store badge clicks → download_click, with which store and which
  // placement (hero, cta, footer) so we can see what drives installs.
  document.addEventListener('click', function (e) {
    var badge = e.target.closest('.app-badge');
    if (!badge) return;

    var store = badge.href.indexOf('apple.com') !== -1 ? 'app_store' : 'google_play';
    var location = badge.closest('.hero') ? 'hero'
      : badge.closest('.cta-banner') ? 'cta'
      : badge.closest('.site-footer') ? 'footer'
      : 'other';

    window.gtag('event', 'download_click', {
      store: store,
      link_location: location,
      link_url: badge.href
    });
  });

  // Hero taal player: count plays, not stops. This listener runs after the
  // button's own handler, so data-playing already reflects the new state.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.taal-player__play');
    if (!btn) return;
    var player = btn.closest('.taal-player');
    if (player && player.dataset.playing === 'true') {
      window.gtag('event', 'taal_player_play');
    }
  });

  // FAQ opens, with the question text. `toggle` doesn't bubble, so listen in
  // the capture phase.
  document.addEventListener('toggle', function (e) {
    var detail = e.target;
    if (!detail.open || !detail.closest || !detail.closest('.accordion')) return;
    var summary = detail.querySelector('summary');
    window.gtag('event', 'faq_open', {
      question: summary ? summary.textContent.trim() : ''
    });
  }, true);
})();
