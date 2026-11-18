/*
 * Homepage project-card reveal.
 * Cards remain visible unless this script successfully initializes.
 */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  var cards = document.querySelectorAll("main .h-card");
  if (!cards.length) return;

  var observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  // Only hide cards after the observer is ready; script/network failures
  // therefore leave the page content visible and fully usable.
  document.documentElement.classList.add("home-card-reveal-ready");

  try {
    cards.forEach(function (card) {
      observer.observe(card);
    });
  } catch (error) {
    document.documentElement.classList.remove("home-card-reveal-ready");
    observer.disconnect();
  }
})();
