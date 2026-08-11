/* FAC Electrical - small progressive-enhancement script.
   No build step, no framework: this file is loaded via <script src> on
   every page. */

(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Header shrinks once the page is scrolled, so the full-size logo is only
  // paid for at the top of the page.
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var applyScrollState = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(applyScrollState);
      }
    }, { passive: true });
    applyScrollState();
  }

  // Copy-to-clipboard buttons (phone / email / address)
  var copyButtons = document.querySelectorAll("[data-copy-value]");
  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy-value");
      var restoreLabel = btn.textContent;

      function markCopied() {
        btn.setAttribute("data-copied", "true");
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.removeAttribute("data-copied");
          btn.textContent = restoreLabel;
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(markCopied);
      } else {
        // Fallback for older browsers / non-secure contexts
        var temp = document.createElement("textarea");
        temp.value = value;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand("copy"); } catch (e) { /* no-op */ }
        document.body.removeChild(temp);
        markCopied();
      }
    });
  });

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
