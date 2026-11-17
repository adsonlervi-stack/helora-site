// Mascote Helora: física de mola. Os olhos (pílulas) andam e giram na direção do cursor,
// o corpo inclina e estica com a velocidade da rolagem, flutua parado e acorda com gotinhas ao abrir a página.
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mouse = { x: innerWidth / 2, y: innerHeight * .3, has: false };
  addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.has = true }, { passive: true });
  addEventListener("touchstart", function (e) { var t = e.touches[0]; mouse.x = t.clientX; mouse.y = t.clientY; mouse.has = true }, { passive: true });

  function spring(v, s, target, k, d) { s.v += (target - v) * k; s.v *= d; return v + s.v }

  function Orb(root, opt) {
    opt = opt || {};
    var eyeL = root.querySelector("[data-eye=l]"), eyeR = root.querySelector("[data-eye=r]");
    var body = root.querySelector(".orb-body") || root;
    var st = { ex: 0, ey: 0, tl: 0, tr: 0, lean: 0, sq: 1, lid: 1 }, sv = {};
    for (var k in st) sv[k] = { v: 0 };
    var lidT = 1, lastY = scrollY, vel = 0;
    // piscar
    (function blink() {
      setTimeout(function () {
        lidT = .08; setTimeout(function () { lidT = 1 }, 120);
        if (Math.random() < .28) setTimeout(function () { lidT = .08; setTimeout(function () { lidT = 1 }, 110) }, 260);
        blink();
      }, 2600 + Math.random() * 3400);
    })();
    function frame() {
      var r = root.getBoundingClientRect();
      if (r.bottom > -50 && r.top < innerHeight + 50) {
        var cx = r.left + r.width / 2, cy = r.top + r.height * .42;
        var dx = mouse.x - cx, dy = mouse.y - cy, d = Math.max(1, Math.hypot(dx, dy));
        var reach = Math.min(1, d / (r.width * 1.2 + 200));
        var tx = mouse.has ? dx / d * reach : 0, ty = mouse.has ? dy / d * reach : 0;
        var R = opt.eyeTravel || .11; // fração do tamanho
        st.ex = spring(st.ex, sv.ex, tx * r.width * R, .06, .78);
        st.ey = spring(st.ey, sv.ey, ty * r.width * R * .9, .06, .78);
        // cada olho gira de leve para "apontar" o olhar, um pouco diferente do outro
        st.tl = spring(st.tl, sv.tl, tx * 30 + ty * tx * 8, .05, .8);
        st.tr = spring(st.tr, sv.tr, tx * 34 - ty * tx * 6, .05, .8);
        // corpo: inclina para o lado do olhar e estica com a rolagem
        var y = scrollY; vel = vel * .85 + (y - lastY) * .15; lastY = y;
        st.lean = spring(st.lean, sv.lean, tx * 5 + Math.max(-8, Math.min(8, vel * .25)), .05, .82);
        st.sq = spring(st.sq, sv.sq, 1 - Math.max(-.08, Math.min(.08, vel * .004)), .08, .75);
        st.lid = spring(st.lid, sv.lid, lidT, .45, .45);
        var t = performance.now() / 1000, bob = reduce ? 0 : Math.sin(t * 1.6) * (opt.bob || 6);
        body.style.transform = "translateY(" + bob + "px) rotate(" + st.lean + "deg) scale(" + (2 - st.sq) + "," + st.sq + ")";
        [[eyeL, st.tl], [eyeR, st.tr]].forEach(function (p) {
          if (!p[0]) return;
          p[0].style.transform = "translate(" + st.ex + "px," + st.ey + "px) rotate(" + p[1] + "deg) scaleY(" + Math.max(.06, st.lid) + ")";
        });
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // acordar: gotinhas que saem do mascote ao abrir a página
  function wake(root) {
    var g = document.createElement("div"); g.className = "orb-wake";
    for (var i = 0; i < 12; i++) {
      var W = root.getBoundingClientRect().width, a = i / 12 * Math.PI * 2 + Math.random() * .4, dist = W * (.36 + Math.random() * .22), s = W * (.02 + Math.random() * .025);
      var b = document.createElement("i");
      b.style.cssText = "width:" + s + "px;height:" + s + "px;--x:" + Math.cos(a) * dist + "%;--y:" + Math.sin(a) * dist + "%;animation-delay:" + (Math.random() * .12) + "s";
      g.appendChild(b);
    }
    root.appendChild(g); setTimeout(function () { g.remove() }, 1800);
  }

  window.HeloraOrb = Orb;
  document.querySelectorAll("[data-orb]").forEach(function (el) {
    Orb(el, { eyeTravel: el.dataset.orb === "mini" ? .09 : .1, bob: el.dataset.orb === "mini" ? 2 : 7 });
    if (el.dataset.orb === "hero" && !reduce) { el.classList.add("orb-intro"); wake(el) }
  });
})();
