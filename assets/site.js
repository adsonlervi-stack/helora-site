// Helora site: nav, mascote (olhos seguem o mouse, piscam, fitas), revelar ao rolar, formulário de contato.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s) }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)) };

  // nav
  var nav = $(".nav");
  if (nav) {
    var onS = function () { nav.classList.toggle("solid", scrollY > 20) }; onS(); addEventListener("scroll", onS, { passive: true });
    var bg = $(".burger"); if (bg) bg.onclick = function () { $(".nav ul").classList.toggle("open") };
    var here = location.pathname.split("/").pop() || "index.html";
    $$(".nav ul a").forEach(function (a) { if (a.getAttribute("href") === here) a.classList.add("on") });
  }

  // mascote
  $$(".mascot").forEach(function (m) {
    var eyes = $(".eyes", m);
    addEventListener("mousemove", function (e) {
      var r = m.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * .4;
      var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.max(1, Math.hypot(dx, dy)), k = Math.min(1, d / 500);
      eyes.style.transform = "translate(calc(-50% + " + (dx / d * 34 * k) + "%), " + (dy / d * 30 * k) + "%)";
    });
    addEventListener("touchstart", function (e) { var t = e.touches[0]; dispatchEvent(new MouseEvent("mousemove", { clientX: t.clientX, clientY: t.clientY })) }, { passive: true });
    (function blink() {
      setTimeout(function () {
        m.classList.add("blink"); setTimeout(function () { m.classList.remove("blink") }, 140);
        if (Math.random() < .3) setTimeout(function () { m.classList.add("blink"); setTimeout(function () { m.classList.remove("blink") }, 120) }, 280);
        blink();
      }, 2200 + Math.random() * 3200);
    })();
    var rb = $(".ribbons", m.parentNode);
    if (rb) (function rib() { setTimeout(function () { rb.classList.add("on"); setTimeout(function () { rb.classList.remove("on"); rib() }, 3400) }, 4000 + Math.random() * 3000) })();
    // sobe com a rolagem
    var wrap = m.parentNode;
    addEventListener("scroll", function () {
      var r = wrap.getBoundingClientRect(), p = Math.max(0, Math.min(1, 1 - r.top / innerHeight));
      m.style.transform = "translateX(-50%) translateY(" + (-p * 14) + "%)";
    }, { passive: true });
  });

  // o mascote fala
  $$(".say").forEach(function (el) {
    var L = ["Oi! Eu sou a Helora 👋", "Me pergunta qualquer coisa ↘", "Atendo seus clientes 24h 😊"], i = 0;
    function type(t, cb) { el.classList.remove("done"); el.classList.add("on"); el.textContent = ""; var k = 0; (function f() { el.textContent = t.slice(0, ++k); if (k < t.length) setTimeout(f, 45); else { el.classList.add("done"); setTimeout(cb, 2600) } })() }
    function loop() { type(L[i++ % L.length], function () { el.classList.remove("on"); setTimeout(loop, 1800) }) }
    setTimeout(loop, 1400);
  });

  // revelar
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }) }, { threshold: .12 });
  $$(".rv").forEach(function (e) { io.observe(e) });

  // contadores
  $$("[data-count]").forEach(function (el) {
    var end = +el.dataset.count, suf = el.dataset.suf || "", done = false;
    new IntersectionObserver(function (es, o) {
      if (!es[0].isIntersecting || done) return; done = true; o.disconnect();
      var t0 = performance.now();
      (function f(t) { var p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(f) })(t0);
    }).observe(el);
  });

  // formulário
  var f = $("#lead");
  if (f) {
    var API = "https://backend-production-b42a.up.railway.app/public/site-lead";
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var err = $("#err"); err.style.display = "none";
      var d = Object.fromEntries(new FormData(f));
      if (!d.nome || !d.empresa || !d.whatsapp || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || "")) { err.textContent = "Preencha nome, empresa, WhatsApp e um e-mail válido."; err.style.display = "block"; return }
      var b = f.querySelector("button"); b.disabled = true; b.textContent = "Enviando...";
      fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) }).then(function (r) {
        if (!r.ok) throw 0; window.heloraTrack && heloraTrack("generate_lead", { equipe: d.equipe || "" });
        [].slice.call(f.children).forEach(function (c) { c.style.display = "none" }); $("#ok").style.display = "block";
      }).catch(function () { err.textContent = "Não conseguimos enviar agora. Tente de novo."; err.style.display = "block"; b.disabled = false; b.textContent = "Enviar" });
    });
  }
  var y = $("#y"); if (y) y.textContent = new Date().getFullYear();
})();
