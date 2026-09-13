/* =========================================================================
   Handwerks-Assistent
   Ein Gesprächsverlauf, zwei Fenster: fest im Hero und schwebend beim Scrollen.
   Live über den n8n-Chat-Trigger, sonst Demomodus mit hinterlegten Antworten.
   ========================================================================= */
(function () {
  'use strict';

  var S = window.SITE; if (!S) return;
  var C = S.chat;
  var ICON = window.icon;

  var live = !!(C.webhookUrl && C.webhookUrl.indexOf('http') === 0);
  var sendet = false;
  var views = [];                 // alle gemounteten Fenster
  var verlauf = [];               // {text, who}

  var sessionId = (function () {
    try {
      var v = sessionStorage.getItem('mw_sid');
      if (!v) { v = 'web-' + Math.random().toString(36).slice(2, 12); sessionStorage.setItem('mw_sid', v); }
      return v;
    } catch (e) { return 'web-' + Math.random().toString(36).slice(2, 12); }
  })();

  /* ---------- Markup eines Fensters ---------- */
  function boxHtml(mitSchliessen) {
    return '<div class="chatbox">' +
      '<div class="chead">' +
        '<span class="cav">' + ICON('chat') + '</span>' +
        '<span class="ctxt"><b>' + C.titel + '</b><span><i class="dotlive"></i>' + C.untertitel + '</span></span>' +
        (mitSchliessen ? '<button class="cx" type="button" aria-label="Schließen">×</button>' : '') +
      '</div>' +
      '<div class="clog" aria-live="polite"></div>' +
      '<div class="chips"></div>' +
      '<div class="cfoot">' +
        '<form class="cform">' +
          '<textarea rows="1" maxlength="2000" aria-label="Ihre Nachricht" ' +
            'placeholder="Frage stellen oder Termin nennen …"></textarea>' +
          '<button class="csend" type="submit" aria-label="Senden" disabled>' + ICON('send') + '</button>' +
        '</form>' +
        '<div class="clegal">' + (live
          ? 'KI-Assistent · Antworten können Fehler enthalten'
          : 'Demomodus – noch kein n8n-Webhook hinterlegt') + '</div>' +
      '</div>' +
    '</div>';
  }

  function fmt(t) {
    return String(t)
      .replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; })
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  /* ---------- Ein Fenster aufbauen ---------- */
  function mount(host, mitSchliessen) {
    host.innerHTML = boxHtml(mitSchliessen);

    var v = {
      log:   host.querySelector('.clog'),
      chips: host.querySelector('.chips'),
      form:  host.querySelector('.cform'),
      input: host.querySelector('textarea'),
      send:  host.querySelector('.csend')
    };

    // bisherigen Verlauf nachzeichnen
    verlauf.forEach(function (m) { zeichne(v, m.text, m.who); });
    zeichneChips(v);
    // Bei reiner Begrüßung oben beginnen – sonst ist der erste Satz abgeschnitten
    if (verlauf.length <= 1) v.log.scrollTop = 0;

    v.form.addEventListener('submit', function (e) { e.preventDefault(); frage(v.input.value); });
    v.input.addEventListener('input', function () {
      v.send.disabled = !v.input.value.trim() || sendet;
      v.input.style.height = 'auto';
      v.input.style.height = Math.min(v.input.scrollHeight, 100) + 'px';
    });
    v.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); frage(v.input.value); }
    });
    v.chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (b) frage(b.textContent);
    });

    var x = host.querySelector('.cx');
    if (x) x.addEventListener('click', function () { schwebendAuf(false); });

    views.push(v);
    return v;
  }

  function zeichne(v, text, who) {
    var d = document.createElement('div');
    d.className = 'msg ' + who;
    d.innerHTML = fmt(text);
    v.log.appendChild(d);
    v.log.scrollTop = v.log.scrollHeight;
  }

  function zeichneChips(v) {
    v.chips.innerHTML = (C.vorschlaege || []).map(function (t) {
      return '<button class="chip" type="button">' + t + '</button>';
    }).join('');
  }

  function add(text, who) {
    verlauf.push({ text: text, who: who });
    views.forEach(function (v) { zeichne(v, text, who); });
  }

  function tippen(an) {
    views.forEach(function (v) {
      var t = v.log.querySelector('.typ');
      if (an && !t) {
        t = document.createElement('div');
        t.className = 'msg bot typ';
        t.innerHTML = '<i></i><i></i><i></i>';
        v.log.appendChild(t);
        v.log.scrollTop = v.log.scrollHeight;
      } else if (!an && t) { t.remove(); }
    });
  }

  function sperren(an) {
    sendet = an;
    views.forEach(function (v) {
      v.send.disabled = an || !v.input.value.trim();
      if (!an) v.chips.style.display = 'none';
    });
  }

  /* ---------- Demoantworten ---------- */
  var DEMO = [
    { re: /(wartung|wartungsvertrag|heizung warten|therme|prüfprotokoll|pruefprotokoll)/i, a:
      'Eine Wartung dauert bei uns 60 Minuten. Abgerechnet wird nach Aufwand: 78 € netto je Monteurstunde zuzüglich 35 € netto Anfahrt im Umkreis von 25 km.\n\nGünstiger wird es mit einem Wartungsvertrag ab 180 € netto pro Jahr und Anlage. Darin enthalten sind ein oder zwei feste Wartungstermine im Jahr und ein Prüfprotokoll nach jeder Wartung.\n\nSoll ich nach einem Termin schauen? Dafür bräuchte ich Ihren Namen, die Einsatzadresse und eine Telefonnummer.' },
    { re: /(wasser|rohrbruch|l[äa]uft aus|gasgeruch|notfall|notdienst|dringend|heizung.*(aus|kalt))/i, a:
      'Wenn Wasser austritt: bitte sofort den Haupthahn schließen. Bei Gasgeruch nicht schalten, nicht klingeln, Fenster öffnen und das Haus verlassen – im Zweifel die 112.\n\nUnser Notdienst ist rund um die Uhr unter **0172 1234567** erreichbar. Bitte rufen Sie dort direkt an – dafür buche ich bewusst keinen regulären Termin, das dauert zu lange.' },
    { re: /(bad|sanit[äa]r|dusche|waschtisch|fliesen|badsanierung)/i, a:
      'Für ein neues Bad nenne ich Ihnen bewusst keine Pauschale – der Preis hängt an Grundriss, Technik und Ausstattung, und eine Zahl ins Blaue hilft Ihnen nicht.\n\nWir kalkulieren nach Aufmaß vor Ort. Die Erstberatung ist kostenfrei, wenn daraus ein Angebot entsteht.\n\nEin Aufmaßtermin dauert 60 Minuten. Soll ich einen vormerken?' },
    { re: /(stundensatz|stundenlohn|kostet.*stunde|monteur|anfahrt|fahrtkosten)/i, a:
      'Unser Monteurstundensatz liegt bei 78 € netto. Dazu kommt die Anfahrt mit 35 € netto im Umkreis von 25 km.\n\nBei größeren Arbeiten bekommen Sie vorab ein schriftliches Angebot – dann wissen Sie, woran Sie sind, bevor jemand anrückt.' },
    { re: /(elektro|steckdose|sicherung|verteiler|e.?check|wallbox|strom)/i, a:
      'Elektroarbeiten rechnen wir nach Aufwand ab: 78 € netto je Monteurstunde plus 35 € netto Anfahrt.\n\nFür eine Wallbox erstellen wir nach einem kurzen Ortstermin ein Angebot – der Aufwand hängt davon ab, wie weit es vom Zählerschrank in die Garage ist und ob eine Leitung liegt.\n\nSoll ich einen Beratungstermin vor Ort vormerken? Der dauert 60 Minuten und ist kostenfrei, wenn ein Angebot daraus entsteht.' },
    { re: /(reparatur|st[öo]rung|tropf|verstopf|abfluss|klemmt|defekt|kaputt)/i, a:
      'Für eine Reparatur oder Störung plane ich 120 Minuten ein, abgerechnet nach tatsächlichem Aufwand: 78 € netto je Stunde plus 35 € netto Anfahrt.\n\nDamit ich im Kalender nachsehen kann, brauche ich Ihren Namen, die Adresse des Einsatzortes und eine Telefonnummer.\n\nWas genau ist es denn – und läuft aktuell Wasser?' },
    { re: /(termin|buchen|wann.*(zeit|frei|k[öo]nnt)|frei)/i, a:
      'Sehr gern. Damit ich im Kalender nachsehen kann, brauche ich drei Dinge:\n\n1. Worum geht es – Beratung und Aufmaß, Reparatur, Wartung?\n2. Die Adresse des Einsatzortes\n3. Ihr Name und eine Telefonnummer\n\nDann schlage ich Ihnen zwei bis drei konkrete Zeiten vor und buche direkt ein. Die Dauer richtet sich nach der Terminart: Aufmaß 60 Minuten, Wartung 60 Minuten, Störung 120 Minuten.' },
    { re: /(r[üu]ckruf|zur[üu]ckrufen|anrufen lassen|chef|meister sprechen)/i, a:
      'Kein Problem. Herr Bauer ruft Sie gern zurück – ich vergebe dafür ein 15-Minuten-Fenster aus seinem Kalender, damit Sie nicht ins Leere warten.\n\nWann würde es Ihnen passen, und unter welcher Nummer erreicht er Sie?' },
    { re: /(umkreis|einsatzgebiet|kommt ihr|fahrt ihr|entfernung|auch nach|wie weit)/i, a:
      'Wir arbeiten in Musterstadt und rund 50 km im Umkreis – unter anderem in Musterhausen, Musterdorf, Musterbach, Musterberg sowie in Beispielstadt, Beispielheim, Beispieltal und Beispielau.\n\nDie Anfahrt bis 25 km kostet 35 € netto; bei größerer Entfernung sagen wir Ihnen den Aufschlag vorher.\n\nWo genau wären wir denn im Einsatz?' },
    { re: /(sanierung|umbau|trockenbau|boden|t[üu]ren|maler|modernisier|altbau)/i, a:
      'Sanierung und Modernisierung machen wir aus einer Hand – inklusive Planung und Koordination der beteiligten Gewerke. Sie haben einen Ansprechpartner, nicht vier.\n\nEinen Preis kann ich dafür seriös erst nach einem Aufmaß nennen. Der Ortstermin dauert 60 Minuten und ist kostenfrei, wenn daraus ein Angebot entsteht.\n\nUm welche Räume geht es denn?' },
    { re: /(angebot|kostenvoranschlag|aufma[ßs]|beratung|vor ort)/i, a:
      'Beratung und Aufmaß vor Ort dauern 60 Minuten und sind kostenfrei, wenn daraus ein Angebot entsteht.\n\nSie bekommen danach ein schriftliches Angebot mit klarem Umfang – keine Überraschungen auf der Schlussrechnung.\n\nSoll ich einen Termin vormerken?' },
    { re: /([öo]ffnung|geschlossen|offen|samstag|sonntag|wochenende|wann.*erreichbar)/i, a:
      'Unser Büro ist montags bis donnerstags von 07:00 bis 17:00 Uhr und freitags von 07:00 bis 13:00 Uhr besetzt. Am Wochenende ist es geschlossen.\n\nDer Notdienst läuft rund um die Uhr unter 0172 1234567.\n\nIch selbst bin immer erreichbar – Sie können also auch jetzt schon einen Termin festmachen.' },
    { re: /(adresse|wo seid|wo ist|anfahrt zu euch|firmensitz|b[üu]ro)/i, a:
      'Sie finden uns in der Musterstraße 12, 72458 Musterstadt. Das Büro ist besetzt Mo–Do von 07:00 bis 17:00 Uhr und freitags bis 13:00 Uhr.\n\nFür einen Auftrag müssen Sie aber nicht vorbeikommen – Beratung und Aufmaß machen wir bei Ihnen vor Ort.' },
    { re: /(neubau|rohbau|montage|erschließung|erschliessung)/i, a:
      'Neubau und Montage übernehmen wir ebenfalls, inklusive der Abstimmung mit den anderen Gewerken auf der Baustelle.\n\nWas wir nicht machen: reinen Materialverkauf ohne Montage und Arbeiten außerhalb unseres Einsatzgebiets.\n\nWorum geht es bei Ihnen – und gibt es schon einen Zeitplan?' },
    { re: /(betriebsinhaber|handwerksbetrieb|assistent|bot|ki\b|ask connect|kostet.*bot|anbieten)/i, a:
      'Sie führen selbst einen Handwerksbetrieb? Dann sind Sie hier genau richtig – diese Seite ist eine Demo von ASK Connect.\n\nIch bin genau das Produkt: ein Assistent, der Ihre Leistungen, Stundensätze und Terminarten kennt, Fragen beantwortet und Termine in Ihren Google Kalender einträgt. Auch abends und am Wochenende.\n\nScrollen Sie auf dieser Seite zum Abschnitt „Für Betriebsinhaber" – dort steht, was das kostet und wie die Einführung abläuft.' }
  ];

  function demoAntwort(t) {
    for (var i = 0; i < DEMO.length; i++) if (DEMO[i].re.test(t)) return DEMO[i].a;
    return 'Das kann ich Ihnen aus dem Stand nicht sicher beantworten – und raten möchte ich bei Ihrem Gebäude nicht.\n\n' +
      'Rufen Sie uns gern unter ' + S.kontakt.telefon + ' an, oder schildern Sie mir Ihr Anliegen etwas genauer. ' +
      'Ich kann Ihnen auch direkt einen Rückruf einplanen.';
  }

  /* ---------- Senden ---------- */
  function frage(text) {
    text = (text || '').trim();
    if (!text || sendet) return;

    sperren(true);
    add(text, 'me');
    views.forEach(function (v) { v.input.value = ''; v.input.style.height = 'auto'; });
    tippen(true);

    if (!live) {
      setTimeout(function () {
        tippen(false);
        add(demoAntwort(text), 'bot');
        sperren(false);
      }, 750 + Math.min(text.length * 15, 1000));
      return;
    }

    var ctrl = new AbortController();
    var frist = setTimeout(function () { ctrl.abort(); }, 45000);

    fetch(C.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: text }),
      signal: ctrl.signal
    })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (raw) {
        var out = raw;
        try {
          var j = JSON.parse(raw);
          if (Array.isArray(j)) j = j[0] || {};
          out = j.output || j.text || j.message || j.answer || j.response ||
                (j.json && (j.json.output || j.json.text)) || raw;
        } catch (e) { /* Klartext */ }
        tippen(false);
        add(typeof out === 'string' ? out : JSON.stringify(out), 'bot');
      })
      .catch(function (err) {
        tippen(false);
        add('Die Verbindung zum Assistenten hat gerade nicht geklappt' +
            (err && err.name === 'AbortError' ? ' (Zeitüberschreitung)' : '') +
            '. Rufen Sie uns gern direkt an: ' + S.kontakt.telefon, 'bot err');
      })
      .finally(function () { clearTimeout(frist); sperren(false); });
  }

  /* ---------- Kompakte Variante fuer schmale Bildschirme ---------------
     Auf dem Handy nimmt das volle Chatfenster im Hero zu viel Raum ein.
     Stattdessen eine Vorschaukarte: sieht nach Chat aus, laedt zum Tippen
     ein und oeffnet das schwebende Fenster. --------------------------- */
  var schmal = window.matchMedia && window.matchMedia('(max-width:620px)').matches;

  function kompaktHtml() {
    var chips = (C.vorschlaege || []).slice(0, 4).map(function (t) {
      return '<button class="chip" type="button" data-ck-frage="' +
        t.replace(/"/g, '&quot;') + '">' + t + '</button>';
    }).join('');

    return '<div class="chatkompakt" id="ck">' +
      '<div class="ck-kopf">' +
        '<span class="cav">' + ICON('chat') + '</span>' +
        '<span class="ctxt"><b>' + C.titel + '</b>' +
          '<span><i class="dotlive"></i>' + C.untertitel + '</span></span>' +
      '</div>' +
      '<p class="ck-text">' + (C.begruessungKurz || C.begruessung) + '</p>' +
      '<div class="ck-chips">' + chips + '</div>' +
      '<button class="ck-feld" type="button">' +
        '<span>Frage stellen oder Termin nennen …</span>' +
        '<span class="ck-send">' + ICON('send') + '</span>' +
      '</button>' +
    '</div>';
  }

  function mountKompakt(host) {
    host.innerHTML = kompaktHtml();
    host.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-ck-frage]');
      schwebendAuf(true);
      if (chip) {
        var text = chip.getAttribute('data-ck-frage');
        setTimeout(function () { frage(text); }, 320);
      }
    });
  }

  /* ---------- Schwebendes Fenster ---------- */
  var fab, floater, offen = false, floatAufgebaut = false;
  var heroSichtbar = true;   // eine Quelle der Wahrheit für beide Fenster

  function schwebendAuf(v) {
    offen = v;
    floater.classList.toggle('open', v);
    fab.classList.toggle('open', v);
    fab.setAttribute('aria-expanded', String(v));
    if (v && !floatAufgebaut) { floatAufgebaut = true; mount(floater, true); }
    if (v) setTimeout(function () {
      var t = floater.querySelector('textarea'); if (t) t.focus();
    }, 260);
  }

  /* ---------- Öffentlicher Einstieg für die Ask-Buttons ---------- */
  window.assistentFragen = function (text) {
    var hero = document.getElementById('chat-hero');
    if (hero && heroSichtbar && !schmal) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { frage(text); }, 260);
    } else {
      schwebendAuf(true);
      setTimeout(function () { frage(text); }, 320);
    }
  };

  /* ---------- Start ---------- */
  function init() {
    var hero = document.getElementById('chat-hero');
    if (hero) { if (schmal) mountKompakt(hero); else mount(hero, false); }

    add(schmal && C.begruessungKurz ? C.begruessungKurz : C.begruessung, 'bot');
    views.forEach(function (v) { v.log.scrollTop = 0; });

    var holder = document.createElement('div');
    holder.innerHTML =
      '<div class="float" id="chat-float" role="dialog" aria-label="Handwerks-Assistent"></div>' +
      '<button class="fab" id="chat-fab" aria-label="Assistent öffnen" aria-expanded="false">' +
        '<span class="pip"></span>' +
        '<span class="ic1">' + ICON('chat') + '</span>' +
        '<span class="ic2">' + ICON('close') + '</span>' +
      '</button>';
    document.body.appendChild(holder);
    fab = document.getElementById('chat-fab');
    floater = document.getElementById('chat-float');

    fab.addEventListener('click', function () { schwebendAuf(!offen); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && offen) schwebendAuf(false);
    });

    // Knopf erscheint, sobald der Hero-Chat aus dem Blick ist
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        heroSichtbar = es[0].isIntersecting;
        fab.classList.toggle('show', !heroSichtbar);
        if (heroSichtbar && offen) schwebendAuf(false);
      }, { threshold: .25 }).observe(hero);
    } else {
      heroSichtbar = false;
      fab.classList.add('show');
    }

    // Ask-Buttons auf der Seite
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-frage]');
      if (b) { e.preventDefault(); window.assistentFragen(b.dataset.frage); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
