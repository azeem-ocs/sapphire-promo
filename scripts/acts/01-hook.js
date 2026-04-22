window.__sapphire = window.__sapphire || {};

// ACT 1 — HOOK (0–3.5s)
window.__sapphire.animateHook = function (tl) {
  tl.to("#hook-grid", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
  tl.to(["#corner-tl", "#corner-tr", "#corner-bl", "#corner-br"], {
    opacity: 1, duration: 0.3, stagger: 0.06, ease: "power2.out"
  }, 0.1);
  tl.to("#hook-kicker", {
    opacity: 1, duration: 0.5, ease: "power3.out"
  }, 0.3);
  tl.to("#word-1", { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, 0.5);
  tl.to("#word-2", { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, 0.9);
  tl.to("#word-3", { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, 1.3);
  tl.to("#word-4", { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, 1.7);
  // Accent word punch scale
  tl.fromTo("#word-2", { scale: 1 }, {
    scale: 1.08, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1,
    transformOrigin: "50% 50%"
  }, 1.0);
  // Underline
  tl.to("#hook-underline", {
    width: 760, duration: 0.5, ease: "power3.inOut"
  }, 2.1);
  // Radial pulse
  tl.to("#hook-radial", {
    opacity: 1, scale: 1, duration: 0.9, ease: "power2.out"
  }, 2.0);
  tl.to("#hook-radial", {
    opacity: 0.25, duration: 0.5, ease: "power2.inOut"
  }, 2.9);
  tl.to("#hook-sub", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, 2.5);
  // Wipe exit (scene ends at 3.5)
  tl.to("#hook-wipe", {
    y: 0, duration: 0.4, ease: "power3.inOut"
  }, 3.1);
};
