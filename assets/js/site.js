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

  /* ------------------------------------------------------------------
     Theme toggle — the inline <head> script already set data-theme
     before first paint if a preference was stored; this wires the button.
     ------------------------------------------------------------------ */
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    var describeTheme = function (theme) {
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    };
    var systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    describeTheme(document.documentElement.getAttribute("data-theme") || (systemPrefersDark ? "dark" : "light"));

    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || (systemPrefersDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      describeTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length) {
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < revealTargets.length; i++) revealTargets[i].classList.add("is-in");
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      revealTargets.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* ------------------------------------------------------------------
     Hero Manual/Automated toggle — no-ops on pages without the markup
     ------------------------------------------------------------------ */
  var modeSwitch = document.querySelector(".mode-switch");
  var heroPanel = document.querySelector(".hero-panel");
  if (modeSwitch && heroPanel) {
    var modeButtons = modeSwitch.querySelectorAll(".mode-switch__btn");
    var timerEl = heroPanel.querySelector("[data-manual-timer]");
    var timerHandle = null;

    var stopTimer = function () {
      if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    };
    var startTimer = function () {
      if (!timerEl || reduceMotion) return;
      var startedAt = Date.now();
      stopTimer();
      timerHandle = setInterval(function () {
        var elapsed = Math.floor((Date.now() - startedAt) / 1000);
        var mins = Math.floor(elapsed / 60);
        var secs = (elapsed % 60).toString().padStart(2, "0");
        timerEl.textContent = "Time spent here: " + mins + ":" + secs;
      }, 1000);
    };

    var setMode = function (mode) {
      modeSwitch.setAttribute("data-active", mode);
      modeButtons.forEach(function (btn) {
        var active = btn.getAttribute("data-mode") === mode;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      heroPanel.querySelectorAll(".hero-panel__view").forEach(function (view) {
        var active = view.getAttribute("data-view") === mode;
        view.classList.toggle("is-active", active);
        view.setAttribute("aria-hidden", active ? "false" : "true");
      });
      if (mode === "manual") startTimer(); else stopTimer();
    };
    modeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () { setMode(btn.getAttribute("data-mode")); });
    });

    /* Hero diagram — hover/focus explorable, same pattern as the flagship case study */
    var autoDiagram = heroPanel.querySelector(".auto-diagram");
    var autoReadout = heroPanel.querySelector("[data-auto-readout]");
    if (autoDiagram && autoReadout) {
      var defaultReadout = autoReadout.textContent;
      var autoStages = autoDiagram.querySelectorAll("[data-stage]");
      var autoCaptions = {
        source: "Spreadsheets and exports land here — the same messy inputs shown in Manual mode.",
        automation: "Rules and automated tests run against every input before anything moves on.",
        export: "Output lands on schedule, with nobody clicking a button to send it."
      };
      autoStages.forEach(function (stage) {
        var focus = function () {
          autoDiagram.classList.add("has-focus");
          autoStages.forEach(function (s) { s.classList.toggle("is-active", s === stage); });
          autoReadout.textContent = autoCaptions[stage.getAttribute("data-stage")] || defaultReadout;
        };
        var clear = function () {
          autoDiagram.classList.remove("has-focus");
          autoStages.forEach(function (s) { s.classList.remove("is-active"); });
          autoReadout.textContent = defaultReadout;
        };
        stage.addEventListener("mouseenter", focus);
        stage.addEventListener("focus", focus);
        stage.addEventListener("mouseleave", clear);
        stage.addEventListener("blur", clear);
      });
    }
  }

  /* ------------------------------------------------------------------
     Nav scroll-spy — only on pages where the section ids the nav points
     to actually exist (index.html); no-ops everywhere else
     ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll('.site-nav a[href*="#"]');
  if (navLinks.length && "IntersectionObserver" in window) {
    var sectionMap = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").split("#")[1];
      var section = id && document.getElementById(id);
      if (section) sectionMap.push({ link: link, section: section });
    });
    if (sectionMap.length) {
      var setActiveLink = function (id) {
        sectionMap.forEach(function (entry) {
          var active = entry.section.id === id;
          if (active) entry.link.setAttribute("aria-current", "page");
          else entry.link.removeAttribute("aria-current");
        });
      };
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sectionMap.forEach(function (entry) { spyObserver.observe(entry.section); });
    }
  }

  /* ------------------------------------------------------------------
     Proof-strip count-up — animates once a stat is revealed
     ------------------------------------------------------------------ */
  var statEls = document.querySelectorAll(".proof__num");
  if (statEls.length) {
    var animateStat = function (el) {
      var raw = el.textContent.trim();
      var match = raw.match(/^([\d,]+)(.*)$/);
      if (!match) return;
      var target = parseInt(match[1].replace(/,/g, ""), 10);
      var suffix = match[2];
      if (reduceMotion || !isFinite(target)) return;
      var start = null;
      var duration = 800;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      statEls.forEach(function (el) { statObserver.observe(el); });
    }
  }

  /* ------------------------------------------------------------------
     Flagship case-study diagram — hover/focus explorable
     (campaign-launcher.html only; no-ops elsewhere)
     ------------------------------------------------------------------ */
  var archDiagram = document.querySelector(".arch-diagram");
  var archCaption = document.querySelector(".arch-diagram__cap");
  if (archDiagram && archCaption) {
    var defaultCaption = archCaption.textContent;
    var stages = archDiagram.querySelectorAll("[data-stage]");
    var captions = {
      input: "Three input grids — products, keywords, and search-term gaps — feed the pipeline.",
      validation: "8 hard rules and 6 export warnings catch budget floors, bid floors, and malformed rows before anything is generated.",
      engine: "The generation engine expands each product into the full row stack Amazon's bulk format requires.",
      types: "Five parallel campaign types per product: Auto, Broad, Phrase, Exact, and product-page targeting.",
      export: "Everything converges into a single bulk file — .xlsx via ExcelJS or .csv via a hand-written RFC 4180 encoder."
    };
    var focusStage = function (stage) {
      archDiagram.classList.add("has-focus");
      stages.forEach(function (s) { s.classList.toggle("is-active", s === stage); });
      archCaption.textContent = captions[stage.getAttribute("data-stage")] || defaultCaption;
    };
    var clearFocus = function () {
      archDiagram.classList.remove("has-focus");
      stages.forEach(function (s) { s.classList.remove("is-active"); });
      archCaption.textContent = defaultCaption;
    };
    stages.forEach(function (stage) {
      stage.addEventListener("mouseenter", function () { focusStage(stage); });
      stage.addEventListener("focus", function () { focusStage(stage); });
      stage.addEventListener("mouseleave", clearFocus);
      stage.addEventListener("blur", clearFocus);
    });
  }
})();
