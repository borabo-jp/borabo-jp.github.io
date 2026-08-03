/* Scroll reveal. The `js` class is set by an inline script in <head>, so
   elements are visible by default when JS is unavailable. */
(function () {
  "use strict";

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
