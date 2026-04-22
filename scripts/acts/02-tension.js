window.__sapphire = window.__sapphire || {};

// ACT 2 — TENSION (3.5–7s)
window.__sapphire.animateTension = function (tl) {
  const T0 = 3.5;
  tl.to("#tension-header", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, T0 + 0.1);
  const panelOrder = ["#tp5", "#tp2", "#tp8", "#tp1", "#tp9", "#tp3", "#tp7", "#tp4", "#tp6"];
  panelOrder.forEach((id, i) => {
    tl.to(id, {
      opacity: 1, scale: 1, duration: 0.35, ease: "power4.out"
    }, T0 + 0.5 + i * 0.07);
  });
  // Grid shake
  tl.to("#tension-grid", { x: 6, duration: 0.055, ease: "none" }, T0 + 1.70);
  tl.to("#tension-grid", { x: -6, duration: 0.055, ease: "none" }, T0 + 1.77);
  tl.to("#tension-grid", { x: 5, duration: 0.055, ease: "none" }, T0 + 1.84);
  tl.to("#tension-grid", { x: -4, duration: 0.055, ease: "none" }, T0 + 1.91);
  tl.to("#tension-grid", { x: 0, duration: 0.08, ease: "none" }, T0 + 1.98);
  // Footer
  tl.to("#tension-footer", {
    opacity: 1, duration: 0.4, ease: "power2.out"
  }, T0 + 1.4);
  // X draws
  tl.to("#x-svg", { opacity: 1, duration: 0.05 }, T0 + 2.2);
  tl.fromTo("#x-line1",
    { attr: { "stroke-dasharray": "1500", "stroke-dashoffset": 1500 } },
    { attr: { "stroke-dashoffset": 0 }, duration: 0.45, ease: "power3.inOut" },
  T0 + 2.2);
  tl.fromTo("#x-line2",
    { attr: { "stroke-dasharray": "1500", "stroke-dashoffset": 1500 } },
    { attr: { "stroke-dashoffset": 0 }, duration: 0.45, ease: "power3.inOut" },
  T0 + 2.4);
  tl.fromTo("#x-svg", { scale: 1 }, {
    scale: 1.05, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1,
    transformOrigin: "50% 50%"
  }, T0 + 2.85);
  // Flash
  tl.to("#flash-layer", { opacity: 1, duration: 0.08, ease: "power2.in" }, T0 + 3.15);
  tl.to("#flash-layer", { opacity: 0, duration: 0.22, ease: "power2.out" }, T0 + 3.25);
};
