window.__sapphire = window.__sapphire || {};

// ACT 5 — CTA (16.5–20s)
window.__sapphire.animateCta = function (tl) {
  const C0 = 16.5;
  tl.to("#cta-grid", { opacity: 1, duration: 0.6, ease: "power2.out" }, C0);
  tl.to(["#ca-tl", "#ca-tr", "#ca-bl", "#ca-br"], {
    opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out"
  }, C0 + 0.1);
  tl.to("#cta-kicker", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, C0 + 0.3);
  tl.to("#logo-wrapper", {
    opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)"
  }, C0 + 0.4);
  tl.to("#logo-ring-inner", {
    opacity: 1, rotation: 90, duration: 1.0, ease: "power2.out"
  }, C0 + 0.6);
  tl.to("#logo-ring-outer", {
    opacity: 0.6, rotation: -180, duration: 2.0, ease: "none"
  }, C0 + 0.6);
  tl.to("#cta-w1", {
    opacity: 1, y: 0, duration: 0.6, ease: "power4.out"
  }, C0 + 1.0);
  tl.to("#cta-w2", {
    opacity: 1, y: 0, duration: 0.6, ease: "power4.out"
  }, C0 + 1.2);
  // Brand pulse
  tl.fromTo(".cta-brand", { scale: 1 }, {
    scale: 1.03, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1,
    transformOrigin: "50% 50%"
  }, C0 + 1.6);
  tl.to("#cta-tagline", {
    opacity: 1, duration: 0.5, ease: "power2.out"
  }, C0 + 1.9);
  tl.to("#cta-pill", {
    opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)"
  }, C0 + 2.2);
  tl.fromTo("#cta-pill", { scale: 1 }, {
    scale: 1.04, duration: 0.25, ease: "power2.inOut", yoyo: true, repeat: 1,
    transformOrigin: "50% 50%"
  }, C0 + 2.7);
  tl.to("#foot-label", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, C0 + 2.6);
};
