// The supplied Chuseok schedule ends at midnight on September 28 in Korea.
(function () {
  'use strict';
  const expiresAt = Date.parse('2026-09-28T00:00:00+09:00');
  const home = document.currentScript.dataset.expiredHome;
  const style = document.createElement('style');
  style.textContent = '.chuseok-expired [data-chuseok-notice] { display: none !important; }';
  document.head.appendChild(style);

  function update() {
    const expired = Date.now() >= expiresAt;
    document.documentElement.classList.toggle('chuseok-expired', expired);
    if (expired && home) window.location.replace(home);
  }

  update();
  // Also handle pages left open overnight or restored from the back/forward cache.
  window.setInterval(update, 1000);
  window.addEventListener('pageshow', update);
  document.addEventListener('visibilitychange', update);
})();
