/* Scroll reveal. The `js` class is set by an inline script in <head>, so elements
   are visible by default when JS is unavailable.

   The data-reveal-ready attribute below is a liveness signal, not decoration. The
   inline script starts a 2s timer that strips the `js` class unless this file has
   marked itself ready. Without it, a failed request for this script — a wrong
   ../assets/ depth on a work/ page being the likely cause — would leave every
   .reveal block hidden with nothing able to unhide it. Set it before any early
   return, so a page with no .reveal elements also counts as ready. */
(function () {
  "use strict";

  document.documentElement.setAttribute("data-reveal-ready", "");

  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-in");
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  targets.forEach(function (el) { observer.observe(el); });
})();
