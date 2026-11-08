(function () {
  var drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim");
  function toggle(on) { if (!drawer) return; drawer.classList.toggle("open", on); scrim.classList.toggle("open", on); document.body.classList.toggle("lock", on); }
  document.querySelectorAll("[data-drawer]").forEach(function (b) { b.addEventListener("click", function () { toggle(b.dataset.drawer === "open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });

  // hero slider
  var slides = [].slice.call(document.querySelectorAll(".slide")), dots = [].slice.call(document.querySelectorAll("[data-dot]")), i = 0, t;
  function show(n) { if (!slides.length) return; i = (n + slides.length) % slides.length; slides.forEach(function (s, k) { s.classList.toggle("on", k === i); }); dots.forEach(function (d, k) { d.classList.toggle("on", k === i); }); }
  function play() { t = setInterval(function () { show(i + 1); }, 5000); }
  if (slides.length > 1) { dots.forEach(function (d, k) { d.addEventListener("click", function () { clearInterval(t); show(k); play(); }); }); play(); }

  // EMI calculator
  var emi = document.getElementById("emi");
  if (emi) {
    var fmt = function (n) { return Math.round(n).toLocaleString(); };
    var calc = function () {
      var P = +emi.amt.value, r = +emi.rate.value / 1200, n = +emi.yrs.value * 12;
      emi.amt_o.value = fmt(P); emi.rate_o.value = (+emi.rate.value).toFixed(2); emi.yrs_o.value = emi.yrs.value;
      var m = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      document.getElementById("emi_out").textContent = "৳ " + fmt(m);
    };
    emi.addEventListener("input", calc); calc();
  }

  // inert sample forms
  document.querySelectorAll("[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var o = f.querySelector("output"); if (o) o.textContent = "Demonstration only — nothing was submitted or sent.";
      f.querySelectorAll("input,textarea").forEach(function (el) { if (el.type !== "button") el.value = ""; });
    });
  });
})();
