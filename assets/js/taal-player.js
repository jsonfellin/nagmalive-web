/* Taal player — drives the 16-beat Teentaal visualizer in the hero.
 *
 * Behavior:
 *   - On play, attempts to play the audio file at data-src.
 *   - The beat visualizer ticks on a setInterval derived from BPM, regardless of audio.
 *   - If audio fails to load (e.g. file not yet provided), the visualizer still runs silently
 *     and the hint label updates to indicate audio is unavailable.
 *
 * The beat highlight is decoupled from the actual audio — so it works "well enough" while
 * the user produces a real tabla loop to drop in at /assets/audio/teentaal-loop.mp3.
 */
(function () {
  var player = document.querySelector('.taal-player');
  if (!player) return;

  var btn       = player.querySelector('.taal-player__play');
  var beats     = Array.prototype.slice.call(player.querySelectorAll('.taal-player__beat'));
  var hintEl    = document.querySelector('.taal-player__hint');
  var beatCount = parseInt(player.dataset.beats || '16', 10);
  var bpm       = parseInt(player.dataset.bpm || '80', 10);
  var msPerBeat = (60 * 1000) / bpm;
  var src       = player.dataset.src;

  var audio = null;
  var audioAvailable = false;
  var timer = null;
  var endTimer = null;
  var fadeTimer = null;
  var TAIL_MS = 2000;
  var current = -1;
  var originalHint = hintEl ? hintEl.innerHTML : '';

  if (src) {
    audio = new Audio(src);
    audio.loop = false;
    // The clip is one cycle plus a short tail that lands on sam and fades out (baked in).
    audio.addEventListener('ended', function () { if (player.dataset.playing === 'true') stop(); });
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', function () { audioAvailable = true; }, { once: true });
    audio.addEventListener('error', function () { audioAvailable = false; });
  }

  function clearActive() {
    if (current >= 0 && beats[current]) beats[current].classList.remove('is-active');
  }

  function step() {
    clearActive();
    current = (current + 1) % beatCount;
    if (beats[current]) beats[current].classList.add('is-active');
  }

  function start() {
    player.dataset.playing = 'true';
    btn.setAttribute('aria-label', 'Pause sarangi preview');
    current = -1;
    step();
    timer = setInterval(step, msPerBeat);
    // Visuals: one cycle, then hold on sam while the audio tail fades out.
    endTimer = setTimeout(finish, beatCount * msPerBeat);

    if (audio && audioAvailable) {
      audio.currentTime = 0;
      var p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          if (hintEl) hintEl.textContent = 'Audio preview coming soon — visual cycle only';
        });
      }
    } else if (audio) {
      // Try anyway (covers cases where canplaythrough didn't fire yet)
      var p2 = audio.play();
      if (p2 && typeof p2.catch === 'function') {
        p2.catch(function () {
          if (hintEl) hintEl.textContent = 'Audio preview coming soon — visual cycle only';
        });
      }
    } else if (hintEl) {
      hintEl.textContent = 'Audio preview coming soon — visual cycle only';
    }
  }

  function finish() {
    endTimer = null;
    if (timer) { clearInterval(timer); timer = null; }
    step(); // lands on sam (beat 1)
    if (!audio) fadeTimer = setTimeout(stop, TAIL_MS);
  }

  function stop() {
    player.dataset.playing = 'false';
    btn.setAttribute('aria-label', 'Play sarangi preview');
    if (timer) { clearInterval(timer); timer = null; }
    if (endTimer) { clearTimeout(endTimer); endTimer = null; }
    if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null; }
    clearActive();
    current = -1;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    if (hintEl) hintEl.innerHTML = originalHint;
  }

  btn.addEventListener('click', function () {
    if (player.dataset.playing === 'true') stop(); else start();
  });

  // Stop when the user navigates away from the tab (be polite about audio).
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && player.dataset.playing === 'true') stop();
  });
})();
