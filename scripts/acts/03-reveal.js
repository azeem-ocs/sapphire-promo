window.__sapphire = window.__sapphire || {};

// ACT 3 — REVEAL (7–12.5s)
window.__sapphire.animateReveal = function (tl) {
  const R0 = 7.0;
  tl.to("#reveal-grid", { opacity: 1, duration: 0.6, ease: "power2.out" }, R0);
  tl.to("#orb-bg", {
    opacity: 1, scale: 1, duration: 1.5, ease: "power3.out"
  }, R0);
  tl.to("#reveal-kicker", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, R0 + 0.2);
  tl.to("#brand-w1", {
    opacity: 1, y: 0, duration: 0.7, ease: "power4.out"
  }, R0 + 0.4);
  tl.to("#brand-w2", {
    opacity: 1, y: 0, duration: 0.7, ease: "power4.out"
  }, R0 + 0.65);
  tl.fromTo("#brand-w2", { scale: 1 }, {
    scale: 1.03, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1,
    transformOrigin: "50% 50%"
  }, R0 + 1.3);
  tl.to("#divider", {
    width: 920, duration: 0.6, ease: "power3.inOut"
  }, R0 + 1.5);
  tl.to("#svc1", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, R0 + 1.9);
  tl.to("#svc2", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, R0 + 2.15);
  tl.to("#svc3", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, R0 + 2.4);
  tl.to("#svc4", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, R0 + 2.65);
  // Confidence pulse
  tl.to("#svc1", { scale: 1.02, duration: 0.15, ease: "power2.out" }, R0 + 3.3);
  tl.to("#svc2", { scale: 1.02, duration: 0.15, ease: "power2.out" }, R0 + 3.35);
  tl.to("#svc3", { scale: 1.02, duration: 0.15, ease: "power2.out" }, R0 + 3.4);
  tl.to("#svc4", { scale: 1.02, duration: 0.15, ease: "power2.out" }, R0 + 3.45);
  tl.to("#svc1", { scale: 1.0, duration: 0.4, ease: "power2.inOut" }, R0 + 3.5);
  tl.to("#svc2", { scale: 1.0, duration: 0.4, ease: "power2.inOut" }, R0 + 3.55);
  tl.to("#svc3", { scale: 1.0, duration: 0.4, ease: "power2.inOut" }, R0 + 3.6);
  tl.to("#svc4", { scale: 1.0, duration: 0.4, ease: "power2.inOut" }, R0 + 3.65);
  tl.to("#tagline", {
    opacity: 1, duration: 0.6, ease: "power2.out"
  }, R0 + 4.0);
  // Dim before exit
  tl.to(["#reveal-kicker", "#divider", ".services", "#tagline"], {
    opacity: 0.2, duration: 0.5, ease: "power2.inOut"
  }, R0 + 5.0);
};
