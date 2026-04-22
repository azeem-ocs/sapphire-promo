window.__sapphire = window.__sapphire || {};

// ACT 4 — AUTHORITY (12.5–16.5s)
window.__sapphire.animateAuthority = function (tl) {
  const A0 = 12.5;
  tl.to("#auth-glow", {
    opacity: 1, scale: 1, duration: 1.2, ease: "power3.out"
  }, A0);
  tl.fromTo("#auth-panel",
    { opacity: 0, y: 140 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
  A0 + 0.15);
  tl.to("#auth-kicker", { opacity: 1, duration: 0.4, ease: "power2.out" }, A0 + 0.5);
  tl.to("#auth-heading", { opacity: 1, duration: 0.5, ease: "power3.out" }, A0 + 0.6);
  tl.to("#ticker-wrap", { opacity: 1, duration: 0.5, ease: "power2.out" }, A0 + 0.9);
  tl.fromTo("#ticker", { x: 0 }, {
    x: -1600, duration: 3.5, ease: "none"
  }, A0 + 0.9);
  tl.to("#stat1", {
    opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)"
  }, A0 + 1.5);
  // Count up — stat 1
  const stat1Counter = { val: 0 };
  tl.to(stat1Counter, {
    val: 320,
    duration: 1.0,
    ease: "power2.out",
    onUpdate: function () {
      const el = document.querySelector("#stat1-val");
      if (el) el.textContent = Math.round(stat1Counter.val) + "+";
    }
  }, A0 + 1.5);
  tl.to("#stat2", {
    opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)"
  }, A0 + 1.8);
  const stat2Counter = { val: 0 };
  tl.to(stat2Counter, {
    val: 4.8,
    duration: 1.0,
    ease: "power2.out",
    onUpdate: function () {
      const el = document.querySelector("#stat2-val");
      if (el) el.textContent = stat2Counter.val.toFixed(1) + "×";
    }
  }, A0 + 1.8);
  // Exit: panel fades, sweep
  tl.to("#auth-panel", {
    opacity: 0, y: -40, duration: 0.4, ease: "power3.in"
  }, A0 + 3.4);
  tl.to("#sweep", {
    y: 0, duration: 0.5, ease: "power3.out"
  }, A0 + 3.5);
};
