window.__sapphire = window.__sapphire || {};

window.__sapphire.animateAmbient = function (tl) {
  // Slow rotation through the full 20s
  tl.to("#ambient-orb", {
    rotation: 360, duration: 20, ease: "none", transformOrigin: "50% 50%"
  }, 0);
};
