// Helora conversa com quem visita o site: balão de boas-vindas, dicas conforme a página e um chat que responde dúvidas e pega o contato.
(function () {
  var page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  var css = document.createElement("style");
  css.textContent = `
.hc-btn{position:fixed;right:22px;bottom:22px;z-index:90;width:68px;height:68px;border-radius:50%;border:0;cursor:pointer;background:radial-gradient(circle at 32% 25%,#4a9bff,#1b7cff 45%,#0050c8 80%,#0a2a8a);box-shadow:0 14px 34px #0050c855;transition:transform .25s}
.hc-btn:hover{transform:scale(1.06)}
.hc-btn .e{position:absolute;top:22px;width:9px;height:20px;border-radius:9px;background:#fff;z-index:1}
.hc-btn .e.a{left:22px}.hc-btn .e.b{left:37px}
.hc-btn.bl .e{transform:scaleY(.1)}
.hc-tip{position:fixed;left:0;top:0;z-index:90;max-width:270px;background:#fff;border-radius:18px 18px 4px 18px;padding:13px 16px;font:500 14.5px/1.45 "Plus Jakarta Sans",system-ui,sans-serif;color:#0f1b2d;box-shadow:0 16px 40px #0b3b7a2e,0 0 0 1px #0000000a;opacity:0;transform:translateY(10px);transition:.35s;pointer-events:none}
.hc-tip.on{opacity:1;transform:none;pointer-events:auto;cursor:pointer}
.hc-tip .x{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 2px 8px #0002;border:0;cursor:pointer;font-size:12px;color:#5d6676}
.hc-box{position:fixed;right:22px;bottom:104px;z-index:91;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 140px));background:#fff;border-radius:24px;box-shadow:0 30px 80px #0b3b7a40,0 0 0 1px #0000000d;display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(16px) scale(.97);transform-origin:bottom right;pointer-events:none;transition:.3s;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#0f1b2d}
.hc-box.on{opacity:1;transform:none;pointer-events:auto}
.hc-top{display:flex;align-items:center;gap:12px;padding:16px 18px;background:linear-gradient(135deg,#1b7cff,#0050c8);color:#fff}
.hc-top .av{width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 34% 26%,#fff,#e4ecf8);position:relative;flex:none}
.hc-top .av i{position:absolute;top:12px;width:6px;height:13px;border-radius:6px;background:#101820}.hc-top .av i:first-child{left:13px}.hc-top .av i:last-child{left:22px}
.hc-top b{display:block;font-size:15.5px}.hc-top small{opacity:.85;font-size:12.5px}
.hc-top button{margin-left:auto;background:#ffffff26;border:0;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.hc-m{flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:9px;background:#f5f7fb}
.hc-m .b{max-width:84%;padding:10px 13px;border-radius:16px;font-size:14.5px;line-height:1.45;animation:hcp .3s ease}
.hc-m .h{background:#fff;align-self:flex-start;border-bottom-left-radius:5px;box-shadow:0 1px 2px #0001}
.hc-m .u{background:#0071e3;color:#fff;align-self:flex-end;border-bottom-right-radius:5px}
.hc-m .t{align-self:flex-start;background:#fff;border-radius:16px;padding:12px 15px;display:flex;gap:4px}.hc-m .t i{width:6px;height:6px;border-radius:50%;background:#9db4d6;animation:hct 1s infinite}.hc-m .t i:nth-child(2){animation-delay:.15s}.hc-m .t i:nth-child(3){animation-delay:.3s}
.hc-q{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px;background:#f5f7fb}
.hc-q button{border:1px solid #d6e3f5;background:#fff;color:#0071e3;border-radius:99px;padding:7px 12px;font:600 13px inherit;font-family:inherit;cursor:pointer}
.hc-f{display:flex;gap:8px;padding:12px;border-top:1px solid #e8ebf1}
.hc-f input{flex:1;border:1px solid #e8ebf1;border-radius:99px;padding:11px 15px;font:inherit;font-size:14.5px;outline:none}
.hc-f button{border:0;background:#0071e3;color:#fff;border-radius:99px;padding:0 16px;font:600 14px inherit;font-family:inherit;cursor:pointer}
@keyframes hcp{from{opacity:0;transform:translateY(6px)}}@keyframes hct{0%,100%{opacity:.3}50%{opacity:1}}
@media(max-width:600px){.hc-tip{max-width:200px;font-size:13.5px}}.hc-btn.gone{opacity:0;pointer-events:none;transform:scale(.4)}`;
  document.head.appendChild(css);

  var btn = document.createElement("button"); btn.className = "hc-btn"; btn.setAttribute("aria-label", "Conversar com a Helora");
  btn.innerHTML = '<i class="e a"></i><i class="e b"></i>';
  var tip = document.createElement("div"); tip.className = "hc-tip";
  var box = document.createElement("div"); box.className = "hc-box";
  box.innerHTML = '<div class="hc-top"><div class="av"><i></i><i></i></div><div><b>Helora</b><small>Responde em segundos</small></div><button aria-label="Fechar">✕</button></div><div class="hc-m"></div><div class="hc-q"></div><form class="hc-f"><input placeholder="Escreva sua mensagem…" autocomplete="off"><button>Enviar</button></form>';
  document.body.append(btn, tip, box);
  var M = box.querySelector(".hc-m"), Q = box.querySelector(".hc-q"), inp = box.querySelector("input");

  // olhos do botão seguem o mouse e piscam
  var eyes = btn.querySelectorAll(".e");
  addEventListener("mousemove", function (e) {
    var r = btn.getBoundingClientRect(), dx = e.clientX - (r.left + 34), dy = e.clientY - (r.top + 34), d = Math.max(1, Math.hypot(dx, dy)), k = Math.min(1, d / 400);
    eyes.forEach(function (el) { el.style.translate = (dx / d * 6 * k) + "px " + (dy / d * 5 * k) + "px" });
  });
  function placeTip() { var r = btn.getBoundingClientRect(); tip.style.left = Math.max(10, r.left - (tip.offsetWidth || 260) - 14) + "px"; tip.style.top = (r.top + 6) + "px" }
  function perch() {}
  btn.setAttribute("data-orb", "mini"); btn.innerHTML = '<span class="orb-body" style="position:absolute;inset:0;border-radius:50%;background:inherit"></span><i class="e a" data-eye="l"></i><i class="e b" data-eye="r"></i>';
  setTimeout(function () { window.HeloraOrb && HeloraOrb(btn, { eyeTravel: .08, bob: 1.5 }) }, 0);
  addEventListener("resize", placeTip);

  // dicas por página
  var TIPS = {
    index: ["Oi! Eu sou a Helora 👋 Quer ver como eu atendo seus clientes?", "Psiu! Posso responder qualquer dúvida sobre o sistema."],
    recursos: ["Ficou com dúvida em algum recurso? Me pergunta 😊"],
    demonstracao: ["Clica numa pergunta ao lado e me vê respondendo ao vivo!"],
    segmentos: ["Me conta o seu segmento que eu te explico como funciona para você."],
    planos: ["Não sabe qual plano escolher? Eu te ajudo em 3 perguntas."],
    comparar: ["Ainda usa WhatsApp comum e planilha? Eu te mostro a diferença."],
    contato: ["Se preferir, a gente conversa por aqui mesmo 👇"]
  };
  var shown = false, closedTip = false;
  try { closedTip = sessionStorage.getItem("hc_tip") === "x" } catch (e) {}
  function showTip(t) {
    if (closedTip || box.classList.contains("on") ) { setTimeout(function () { showTip(t) }, 3000); return }
    tip.innerHTML = t + '<button class="x" aria-label="Fechar">✕</button>'; placeTip(); tip.classList.add("on");
    tip.querySelector(".x").onclick = function (e) { e.stopPropagation(); tip.classList.remove("on"); closedTip = true; try { sessionStorage.setItem("hc_tip", "x") } catch (e) {} };
  }
  tip.onclick = function () { open() };
  var tips = TIPS[page] || TIPS.index;
  setTimeout(function () { showTip(tips[0]) }, 2500);
  if (tips[1]) setTimeout(function () { tip.classList.remove("on"); setTimeout(function () { showTip(tips[1]) }, 600) }, 16000);

  // conversa
  function say(html, delay) {
    return new Promise(function (res) {
      var t = document.createElement("div"); t.className = "t"; t.innerHTML = "<i></i><i></i><i></i>"; M.appendChild(t); M.scrollTop = M.scrollHeight;
      setTimeout(function () { t.remove(); var b = document.createElement("div"); b.className = "b h"; b.innerHTML = html; M.appendChild(b); M.scrollTop = M.scrollHeight; res() }, delay || 700 + Math.min(1400, html.length * 12));
    });
  }
  function me(t) { var b = document.createElement("div"); b.className = "b u"; b.textContent = t; M.appendChild(b); M.scrollTop = M.scrollHeight }
  function chips(list) { Q.innerHTML = ""; list.forEach(function (c) { var b = document.createElement("button"); b.type = "button"; b.textContent = c; b.onclick = function () { send(c) }; Q.appendChild(b) }) }

  var KB = [
    [/pre[cç]o|valor|quanto|plano|custa/i, ["O plano Profissional, com CRM, sai por <b>R$ 397/mês</b>. A Helora IA é à parte, a partir de <b>R$ 197/mês</b>.", "Quer que eu peça para a equipe montar uma proposta para você?"], ["Quero uma proposta", "Ver planos"]],
    [/whats|n[uú]mero|trocar/i, ["Você usa o mesmo número de WhatsApp que já tem, pela API oficial da Meta ou por QR Code. A equipe toda atende por ele."], ["Quantas pessoas podem usar?", "Quero uma proposta"]],
    [/pessoas|equipe|atendentes|usu[aá]rio/i, ["Várias! Cada atendente tem seu acesso, as conversas são divididas por setor e dá para transferir com um clique."], ["Tem CRM?", "Quero uma proposta"]],
    [/crm|funil|venda|neg[oó]cio/i, ["Tem sim. Cada conversa vira um negócio no funil, com valor, etapa, etiquetas e histórico. Você vê quanto vai entrar no mês."], ["E a IA?", "Quero uma proposta"]],
    [/\bia\b|intelig|rob[oô]|bot|autom/i, ["Eu sou a IA 😊 Atendo 24 horas com as informações da sua empresa e passo para a equipe com o resumo pronto quando precisa de uma pessoa."], ["Quanto custa?", "Testar a demonstração"]],
    [/celular|app|aplicativo|mobile/i, ["Funciono no navegador do computador e do celular, e dá para instalar na tela inicial como aplicativo."], ["Quero uma proposta"]],
    [/instagram|messenger|canal|canais/i, ["WhatsApp, Instagram e Messenger chegam todos na mesma caixa de entrada."], ["Tem CRM?", "Quero uma proposta"]],
    [/migr|importar|outro sistema|planilha/i, ["A gente importa seus clientes e negócios por planilha e ajuda na migração do outro sistema."], ["Quero uma proposta"]],
    [/demo|testar|ver funcionando/i, ["Na página de demonstração você me vê atendendo uma corretora de exemplo. <a href=\"demonstracao.html\" style=\"color:#0071e3;font-weight:600\">Abrir demonstração →</a>"], ["Quero uma proposta"]],
    [/ver planos/i, ["<a href=\"planos.html\" style=\"color:#0071e3;font-weight:600\">Abrir a página de planos →</a>"], ["Quero uma proposta"]],
    [/oi|ol[aá]|bom dia|boa tarde|boa noite|e a[ií]/i, ["Oi! Que bom te ver por aqui 😊 Me conta: o que você quer resolver no atendimento da sua empresa?"], ["Quanto custa?", "Tem CRM?", "E a IA?"]]
  ];
  var lead = null, LEADQ = [["nome", "Ótimo! Qual é o seu nome?"], ["empresa", "Prazer! E o nome da sua empresa?"], ["whatsapp", "Qual o seu WhatsApp com DDD? A equipe fala com você por lá."], ["email", "E um e-mail para enviarmos a proposta?"]];
  function nextLead(v) {
    if (v !== undefined) lead.data[LEADQ[lead.i][0]] = v.trim(), lead.i++;
    if (lead.i < LEADQ.length) { chips([]); return say(LEADQ[lead.i][1]) }
    var d = lead.data; lead = null; d.equipe = ""; d.site = "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || "")) { lead = { i: 3, data: d }; return say("Hmm, esse e-mail parece incompleto. Pode conferir?") }
    say("Anotado! Enviando para a equipe…").then(function () {
      fetch("https://backend-production-b42a.up.railway.app/public/site-lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; window.heloraTrack && heloraTrack("generate_lead", { origem: "chat" }); return say("Pronto, " + (d.nome.split(" ")[0] || "") + "! A equipe Helora vai te chamar no WhatsApp em breve 💙") })
        .catch(function () { say("Não consegui enviar agora 😕 Tenta pela <a href=\"contato.html\" style=\"color:#0071e3\">página de contato</a>?") });
    });
  }
  function send(t) {
    t = (t || "").trim(); if (!t) return; me(t); inp.value = "";
    if (lead) return nextLead(t);
    if (/proposta|contratar|falar com|vendedor|quero conhecer|quero este/i.test(t)) { lead = { i: 0, data: {} }; return say("Bora! Vou pegar uns dados rapidinho.").then(function () { nextLead() }) }
    if (/testar a demonstra/i.test(t)) { location.href = "demonstracao.html"; return }
    for (var i = 0; i < KB.length; i++) if (KB[i][0].test(t)) {
      var k = KB[i]; var p = Promise.resolve(); k[1].forEach(function (s) { p = p.then(function () { return say(s) }) }); p.then(function () { chips(k[2]) }); return;
    }
    say("Boa pergunta! Essa eu prefiro passar para alguém da equipe responder certinho. Quer deixar seu contato?").then(function () { chips(["Quero uma proposta", "Quanto custa?"]) });
  }
  box.querySelector("form").onsubmit = function (e) { e.preventDefault(); send(inp.value) };
  box.querySelector(".hc-top button").onclick = function () { box.classList.remove("on"); perch() };
  var started = false;
  function open() {
    tip.classList.remove("on"); box.classList.add("on"); window.heloraTrack && heloraTrack("contact", { local: "chat" });
    if (!started) { started = true; say("Oi! Eu sou a Helora 👋", 500).then(function () { return say("Atendo clientes no WhatsApp, Instagram e Messenger, 24 horas. Posso te ajudar com alguma dúvida?") }).then(function () { chips(["Quanto custa?", "Tem CRM?", "E a IA?", "Quero uma proposta"]) }) }
    setTimeout(function () { inp.focus() }, 300);
  }
  btn.onclick = function () { box.classList.contains("on") ? box.classList.remove("on") : open(); setTimeout(perch, 20) };
  document.addEventListener("click", function (e) { var a = e.target.closest("a"); if (a && /contato\.html/.test(a.getAttribute("href") || "") && page !== "contato" && e.target.closest(".hero")) { e.preventDefault(); open(); send("Quero conhecer") } });
})();
