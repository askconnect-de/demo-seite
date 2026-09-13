/* =========================================================================
   Muster Handwerk – Seitenlogik, Navigation und Use-Case-Demos
   ========================================================================= */
(function () {
  'use strict';

  var S = window.SITE;
  if (!S) { console.error('config.js fehlt.'); return; }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- Icons ---------- */
  var ICONS = {
    gear:     '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.34.4.62.73.79H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    wrench:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    shield:   '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    tyre:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v5.8M12 15.2V21M3 12h5.8M15.2 12H21"/>',
    disc:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    snow:     '<path d="M12 2v20M4.9 6.5 19.1 17.5M19.1 6.5 4.9 17.5"/><path d="M12 7 9.4 4.9M12 7l2.6-2.1M12 17l-2.6 2.1M12 17l2.6 2.1"/>',
    chip:     '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    chat:     '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
    send:     '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    close:    '<path d="M18 6 6 18M6 6l12 12"/>',
    phone:    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    check:    '<path d="M20 6 9 17l-5-5"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3.2"/><path d="M4 5.5v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/><path d="M4 11.5v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/>',
    sparkle:  '<path d="M12 2.8 13.9 9l6.2 1.9-6.2 1.9L12 19l-1.9-6.2L3.9 10.9 10.1 9z"/><path d="M19 3v3.4M17.3 4.7h3.4"/>',
    whatsapp: '<path d="M3 21l1.65-4.8A8.6 8.6 0 1 1 8 20.1z"/><path d="M8.6 9.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.7c0 .2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.3c.3.1.4 0 .6-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4s0 .9-.3 1.2c-.3.3-.9.7-1.5.7-1.6 0-3.7-1.2-5-2.5a9 9 0 0 1-2-3.3c-.2-.9 0-1.6.3-2z"/>',
    mic:      '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0M12 17.5V21"/>',
    heart:    '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/>',
    bookmark: '<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    refresh:  '<path d="M3 12a9 9 0 0 1 15.2-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16"/><path d="M3 21v-5h5"/>',
    trend:    '<path d="M22 7 13.5 15.5l-4-4L2 19"/><path d="M16 7h6v6"/>',
    star:     '<path d="m12 2.5 2.95 5.98 6.6.96-4.78 4.65 1.13 6.57L12 17.56l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96z"/>',
    eye:      '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',

    /* --- fuer das Handwerk ergaenzt (Lucide-Stil, 24er Raster) --------- */
    droplet:  '<path d="M12 2.7 6.9 8.3a7.2 7.2 0 1 0 10.2 0z"/><path d="M12 18a3.6 3.6 0 0 1-3.6-3.6"/>',
    flame:    '<path d="M12 2.5s5.5 4.2 5.5 9.2a5.5 5.5 0 0 1-11 0c0-2 1-3.6 2-4.8.3 1.4 1.1 2.3 2 2.3 1.4 0 2-1.6 1.5-6.7z"/><path d="M12 21a2.6 2.6 0 0 1-2.6-2.6c0-1.6 2.6-3.4 2.6-3.4s2.6 1.8 2.6 3.4A2.6 2.6 0 0 1 12 21z"/>',
    plug:     '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z"/><path d="M12 17v5"/>',
    hammer:   '<path d="m14.5 6.5 3-3 4 4-3 3z"/><path d="m13 8-9.2 9.2a2 2 0 0 0 0 2.8 2 2 0 0 0 2.8 0L16 10.5"/><path d="m11.5 5 4.5 4.5"/>',
    alert:    '<path d="M10.3 3.6 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    pin:      '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/>',
    doc:      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>'
  };

  function icon(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || ICONS.gear) + '</svg>';
  }
  window.icon = icon;

  function bild(key, w) {
    return 'https://images.unsplash.com/' + S.bilder[key] + '?auto=format&fit=crop&w=' + w + '&q=72';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var kiflag = function (txt, rechts) {
    return '<span class="kiflag' + (rechts ? ' rechts' : '') + '">' + icon('bolt') + (txt || 'ASK Connect') + '</span>';
  };
  window.kiflag = kiflag;

  /* =======================================================================
     Bereiche rendern
     ======================================================================= */
  function renderLeistungen() {
    var el = document.getElementById('leistungs-grid');
    if (!el) return;
    el.innerHTML = S.leistungen.map(function (l) {
      // svctop wird auf dem Handy zur Zeile (Miniaturbild links),
      // svcask bleibt darunter über die volle Kartenbreite.
      return '<article class="svc rv">' +
        '<div class="svctop">' +
          '<div class="svcimg">' +
            '<img src="' + bild(l.bild, 640) + '" alt="' + esc(l.titel) + '" loading="lazy" decoding="async">' +
            '<span class="svcico">' + icon(l.icon) + '</span>' +
            '<span class="svcpreis">' + esc(l.preis) + '</span>' +
          '</div>' +
          '<div class="svctxt">' +
            '<span class="svcpreis-m">' + esc(l.preis) + '</span>' +
            '<h3>' + esc(l.titel) + '</h3>' +
            '<p>' + esc(l.kurz) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="svcask">' +
          '<span class="asklabel">' + icon('bolt') + 'Direkt fragen</span>' +
          '<button class="ask" type="button" data-frage="' + esc(l.frage) + '">' +
            '<span class="q">„' + esc(l.frage) + '"</span>' +
            '<span class="go">' + icon('arrow') + '</span>' +
          '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderZeiten() {
    var el = document.getElementById('zeiten');
    if (!el) return;
    el.innerHTML = S.zeiten.map(function (z) {
      return '<li><b>' + esc(z.tag) + '</b><span' + (z.zu ? ' class="zu"' : '') + '>' + esc(z.zeit) + '</span></li>';
    }).join('');
  }

  function renderPakete() {
    var el = document.getElementById('pakete');
    if (!el) return;
    el.innerHTML = S.pakete.map(function (p) {
      return '<div class="pak rv' + (p.top ? ' empfohlen' : '') + '">' +
        (p.top ? '<span class="paktag">Unsere Empfehlung</span>' : '') +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="pakfuer">' + esc(p.fuer) + '</p>' +
        '<div class="pakp">' + esc(p.spanne) + '</div>' +
        '<div class="pakmeta">einmalig, je nach Umfang<br>' +
          '<b>danach ' + esc(p.monat) + ' im Monat</b></div>' +
        '<ul class="tick">' + p.punkte.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<a class="btn ' + (p.top ? 'b-pri' : 'b-gho') + '" href="#gespraech">Unverbindlich anfragen</a>' +
      '</div>';
    }).join('');
  }

  function renderFunktionen() {
    var el = document.getElementById('funktionen');
    if (!el) return;
    el.innerHTML = S.funktionen.map(function (f) {
      return '<div class="fnk rv">' +
        '<span class="fnk-ic">' + icon(f.icon) + '</span>' +
        '<b>' + esc(f.titel) + '</b>' +
        '<span>' + esc(f.text) + '</span>' +
      '</div>';
    }).join('');
  }

  function renderAblauf() {
    var el = document.getElementById('ablauf');
    if (!el) return;
    el.innerHTML = S.ablauf.map(function (a, i) {
      return '<div class="schritt rv' + (a.hervor ? ' hervor' : '') + '">' +
        '<span class="schritt-nr">' + (i + 1) + '</span>' +
        '<div class="schritt-txt">' +
          '<b>' + esc(a.titel) + '</b>' +
          '<p>' + esc(a.text) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function fuellePlatzhalter() {
    var k = S.kontakt;
    var map = {
      'txt-tel': k.telefon, 'txt-mail': k.mail,
      'txt-adresse': k.strasse + ', ' + k.plz + ' ' + k.stadt,
      'txt-weitere': S.weitere, 'txt-anbieter': S.anbieter.name,
      'txt-notdienst': k.notdienst, 'txt-gebiet': S.gebiet
    };
    Object.keys(map).forEach(function (id) {
      var e = document.getElementById(id); if (e) e.textContent = map[id];
    });
    document.querySelectorAll('[data-tel]').forEach(function (a) { a.href = 'tel:' + k.telefonHref; });
    document.querySelectorAll('[data-mailto]').forEach(function (a) {
      a.href = 'mailto:' + S.anbieter.mail +
        '?subject=' + encodeURIComponent('KI-Assistent für meinen Handwerksbetrieb') +
        '&body=' + encodeURIComponent('Guten Tag,\n\nich habe die Demo gesehen und möchte wissen, wie das für meinen Betrieb aussehen würde.\n\nBetrieb:\nOrt:\nRückruf am liebsten:\n\nViele Grüße\n');
    });
  }

  /* =======================================================================
     Navigation
     ======================================================================= */
  function navigation() {
    var top = document.querySelector('.top');
    if (top) {
      var onScroll = function () { top.classList.toggle('scr', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Jede Leiste (Kopfzeile und mobile Pills) getrennt behandeln –
    // sonst vermischen sich die Indizes beider Listen.
    var leisten = [].slice.call(document.querySelectorAll('[data-nav]')).map(function (box) {
      var links = [].slice.call(box.querySelectorAll('a'));
      return {
        box: box,
        links: links,
        ziele: links.map(function (a) { return document.querySelector(a.getAttribute('href')); })
      };
    });

    function markiere() {
      var y = window.scrollY + window.innerHeight * .32;
      leisten.forEach(function (l) {
        var akt = -1;
        l.ziele.forEach(function (z, i) {
          if (z && z.getBoundingClientRect().top + window.scrollY <= y) akt = i;
        });
        if (akt < 0) akt = 0;
        l.links.forEach(function (a, i) { a.classList.toggle('on', i === akt); });

        if (l.box.classList.contains('pills')) {
          var pill = l.links[akt];
          if (pill) {
            var soll = pill.offsetLeft - l.box.clientWidth / 2 + pill.clientWidth / 2;
            l.box.scrollTo({ left: Math.max(0, soll), behavior: 'smooth' });
          }
        }
      });
    }
    markiere();
    window.addEventListener('scroll', markiere, { passive: true });

    // Die Ankerleiste weicht beim Runterscrollen, kommt beim Hochscrollen zurueck.
    // Spart auf dem Handy dauerhaft rund 54 Pixel Bildschirm.
    var pills = document.querySelector('.pills');
    if (pills) {
      var letzteY = window.scrollY, weg = false;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (Math.abs(y - letzteY) < 10) return;
        var runter = y > letzteY;
        if (runter && y > 300 && !weg) { pills.classList.add('weg'); weg = true; }
        else if (!runter && weg)       { pills.classList.remove('weg'); weg = false; }
        letzteY = y;
      }, { passive: true });
    }
  }

  /* =======================================================================
     Markierungs-Schalter
     ======================================================================= */
  function schalter() {
    var an = true;
    try { an = localStorage.getItem('mw_marks') !== 'aus'; } catch (e) {}
    document.body.classList.toggle('plain', !an);

    document.querySelectorAll('[data-marks]').forEach(function (box) {
      var cb = box.querySelector('input');
      cb.checked = an;
      cb.addEventListener('change', function () {
        document.body.classList.toggle('plain', !cb.checked);
        document.querySelectorAll('[data-marks] input').forEach(function (o) { o.checked = cb.checked; });
        try { localStorage.setItem('mw_marks', cb.checked ? 'an' : 'aus'); } catch (e) {}
      });
    });
  }

  /* =======================================================================
     Reveal + Puls auf markierten Bereichen
     ======================================================================= */
  function beobachte() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, Math.min(i * 60, 240));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .08 });
    document.querySelectorAll('.rv').forEach(function (e) { io.observe(e); });

    if (reduce) return;
    var ip = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('puls');
        ip.unobserve(e.target);
      });
    }, { threshold: .35 });
    document.querySelectorAll('.kizone').forEach(function (e) { ip.observe(e); });
  }

  /* =======================================================================
     ABSCHNITT „IN AKTION" – Chat und Kalender, zwei Szenarien

     WICHTIG: Die Zeiten, die der Assistent im Chat vorschlaegt, muessen
     echte Luecken in KAL_BASIS sein. Sonst behauptet die Demo etwas,
     das die Darstellung daneben widerlegt.
     ======================================================================= */

  /* Belegter Wochenplan der Monteure. tag 0 = Mo … 4 = Fr,
     start als Dezimalstunde. Freitags schliesst das Buero um 13:00 –
     deshalb steht nach 13 Uhr dort nichts mehr. */
  var KAL_BASIS = [
    { tag:0, start:8,    dauer:2,   titel:'Badmontage',      unter:'Fam. Weber · Ringstr. 8' },
    { tag:0, start:10,   dauer:1,   titel:'Aufmaß Küche',    unter:'Fam. Sander · Talweg 3' },
    { tag:0, start:13,   dauer:2,   titel:'Heizungstausch',  unter:'Fam. Ritter · Sonnenstr. 5' },
    { tag:0, start:15.5, dauer:1,   titel:'Wartung Therme',  unter:'Fam. Löw · Kirchgasse 2' },

    { tag:1, start:8.5,  dauer:1,   titel:'Störung Therme',  unter:'Fam. Braun · Lindenweg 6' },
    { tag:1, start:10.5, dauer:2,   titel:'Abfluss verstopft',unter:'Bäckerei Horn · Marktplatz' },
    { tag:1, start:13,   dauer:2,   titel:'E-Check',         unter:'Hausverwaltung Kern' },
    { tag:1, start:15.5, dauer:1,   titel:'Aufmaß Bad',      unter:'Fam. Yilmaz · Poststr. 12' },

    { tag:2, start:8,    dauer:2,   titel:'Fliesenarbeiten', unter:'Bad Schmitt · Gartenstr.' },
    { tag:2, start:10.25,dauer:1,   titel:'Wallbox-Montage', unter:'Fam. Dorn · Blumenstr. 9' },
    { tag:2, start:12,   dauer:3,   titel:'Rohbau Sanitär',  unter:'Neubau Fichtenweg 4' },
    { tag:2, start:15.5, dauer:1.5, titel:'Trockenbau',      unter:'Dachausbau Müller' },

    { tag:3, start:8,    dauer:2,   titel:'Wartung, 3 Anlagen', unter:'WEG Ahornweg' },
    { tag:3, start:11,   dauer:2,   titel:'Störung Elektrik',unter:'Fam. Klein · Bergstr. 1' },
    { tag:3, start:14,   dauer:2.5, titel:'Badsanierung',    unter:'Fam. Weber · Ringstr. 8' },

    { tag:4, start:8,    dauer:3,   titel:'Badsanierung',    unter:'Fam. Weber · Ringstr. 8' },
    { tag:4, start:12,   dauer:1,   titel:'Kleinreparatur',  unter:'Fam. Sahin · Poststr. 4' }
  ];

  /* Freie Luecken, die daraus entstehen und im Chat genannt werden.
     Die Dauern stammen aus der Wissensbasis: Wartung 60 Minuten,
     Rueckruf 15 Minuten.

       Di 09:30 – 10:30  (Störung endet, Abfluss beginnt)   ← Wartung, gebucht
       Do 10:00 – 11:00  (nach der Wartungsserie)
       Fr 11:00 – 12:00  (zwischen Badsanierung und Kleinreparatur)
       Mo 11:00 – 13:00  (nach dem Aufmaß)
       Mi 10:00 – 10:15  (Fliesen enden, Wallbox beginnt)   ← Rueckruf, gebucht
       Do 10:30 – 11:00  (Rest der Vormittagsluecke)                       */

  var SZENARIEN = [
    {
      tab: 'Termin buchen',
      hinweis: 'Der Assistent kennt die Terminarten samt Dauer, liest den Kalender, nennt nur tatsächlich freie Zeiten und trägt passgenau in die Lücke ein – mit Einsatzadresse und Anliegen.',
      chat: [
        { s:'me',  t:'Guten Abend, ich bräuchte einen Termin für die Heizungswartung.' },
        { s:'bot', t:'Sehr gern. Handelt es sich um eine Gastherme oder eine Ölheizung – und in welcher Straße sind Sie?', d:1300 },
        { s:'me',  t:'Gastherme, Poststraße 12 in Musterstadt.' },
        { s:'bot', t:'Danke. Für die Wartung plane ich 60 Minuten ein.\n\nFrei wäre diese Woche:\n• Di, 09:30\n• Do, 10:00\n• Fr, 11:00', d:1800 },
        { s:'me',  t:'Dienstag 9:30 passt.' },
        { s:'bot', t:'Eingetragen ✅\n\nDi, 14.10. · 09:30 – 10:30 Uhr\nWartung Gastherme · Poststraße 12\n78 €/Std. netto + 35 € Anfahrt', d:2000 }
      ],
      termin: { tag:1, start:9.5, dauer:1, art:'service',
                titel:'Wartung Gastherme', unter:'Fam. Yilmaz · Poststr. 12' }
    },
    {
      tab: 'Rückruf statt Termin',
      hinweis: 'Nicht jedes Anliegen gehört in den Betriebskalender. Der Assistent vergibt stattdessen ein 15-Minuten-Fenster aus Ihrem eigenen Kalender – Sie rufen zurück, alles Weitere klären Sie am Telefon.',
      chat: [
        { s:'me',  t:'Bei uns ist im Bad die Wand feucht. Was würde eine Sanierung kosten?' },
        { s:'bot', t:'Eine Summe nenne ich Ihnen dafür bewusst nicht – feuchte Wände haben sehr unterschiedliche Ursachen. Das schaut sich Herr Bauer lieber selbst an und ruft Sie vorab an.\n\nEr hat Zeit:\n• Mo, 11:00\n• Mi, 10:00\n• Do, 10:30', d:1700 },
        { s:'me',  t:'Mittwoch um 10 wäre gut.' },
        { s:'bot', t:'Notiert ✅\n\nHerr Bauer ruft Sie Mi, 15.10. um 10:00 Uhr an.\nUnter welcher Nummer erreicht er Sie?', d:1600 },
        { s:'me',  t:'0170 1234567' },
        { s:'bot', t:'Danke, ist hinterlegt. Bis Mittwoch!', d:1300 }
      ],
      termin: { tag:2, start:10, dauer:0.25, art:'call',
                titel:'Rückruf · Fam. Sander', unter:'0170 1234567' }
    }
  ];

  var KAL_START = 8, KAL_ENDE = 18;
  var KAL_TAGE = [['Mo', 13], ['Di', 14], ['Mi', 15], ['Do', 16], ['Fr', 17]];

  function kalPos(t) {
    var spanne = KAL_ENDE - KAL_START;
    return {
      oben:  ((t.start - KAL_START) / spanne) * 100,
      hoehe: (t.dauer / spanne) * 100,
      links: t.tag * 20
    };
  }

  function terminHtml(t, neu) {
    var p = kalPos(t);
    return '<div class="kal-ev ' + (t.art || 'alt') + (neu ? ' neu' : '') +
      (t.dauer <= 0.5 ? ' kurz' : '') + '" ' +
      'style="left:' + p.links + '%;top:' + p.oben + '%;height:' + p.hoehe + '%">' +
      '<b>' + esc(t.titel) + '</b><span>' + esc(t.unter) + '</span></div>';
  }

  /* Gestrichelter Platzhalter, der die Luecke vor dem Eintrag markiert */
  function lueckeHtml(t) {
    var p = kalPos(t);
    return '<div class="kal-luecke" style="left:' + p.links + '%;top:' + p.oben +
      '%;height:' + p.hoehe + '%"><span>frei</span></div>';
  }

  function kalenderHtml() {
    var kopf = '<span class="kal-ecke"></span>' + KAL_TAGE.map(function (d) {
      return '<span class="kal-tag">' + d[0] + '<i>' + d[1] + '</i></span>';
    }).join('');

    var zeilen = '';
    for (var h = KAL_START; h < KAL_ENDE; h++) {
      zeilen += '<span class="kal-zeit">' + (h < 10 ? '0' : '') + h + '</span>';
      for (var d = 0; d < 5; d++) zeilen += '<span class="kal-zelle"></span>';
    }

    return '<div class="kal-top">' +
        '<span class="kal-ampel"><i></i><i></i><i></i></span>' +
        '<b>Betriebskalender</b>' +
        '<span class="kal-monat">Oktober 2026 · KW 42</span>' +
      '</div>' +
      '<div class="kal-body">' +
        '<div class="kal-grid">' + kopf + zeilen + '</div>' +
        '<div class="kal-layer">' +
          KAL_BASIS.map(function (t) { return terminHtml(t, false); }).join('') +
        '</div>' +
      '</div>';
  }

  function demoBuehne(root) {
    // Tabs und Hinweiszeile liegen ausserhalb der Buehne, im selben Abschnitt
    var abschnitt = root.closest('section') || document;
    var chatEl = root.querySelector('.bchat-log');
    var kalEl  = root.querySelector('.bkal');
    var tabsEl = abschnitt.querySelector('.sz-tabs');
    var noteEl = abschnitt.querySelector('.sz-note');
    if (!chatEl || !kalEl || !tabsEl || !noteEl) return;
    var aktiv = 0;

    /* --- Ablaufsteuerung -------------------------------------------------
       Die Animation haengt an verketteten Timern. "plane" merkt sich den
       laufenden Timer, damit "stop" ihn abraeumen kann, sobald die Buehne
       aus dem Sichtbereich scrollt. Angehalten wird sonst nie. --------- */
    var timerId = null;

    function plane(fn, ms) {
      timerId = setTimeout(fn, ms);
    }

    function stop() {
      clearTimeout(timerId);
      timerId = null;
    }

    /* Lesezeit richtet sich nach der Laenge der Nachricht */
    function lesezeit(m) {
      var n = m.t.length;
      return m.s === 'bot'
        ? Math.min(900 + n * 22, 2900)
        : Math.min(550 + n * 14, 1250);
    }


    function nachricht(m) {
      var d = document.createElement('div');
      d.className = 'bmsg ' + m.s;
      d.textContent = m.t;
      chatEl.appendChild(d);
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    function tippt(an) {
      var t = chatEl.querySelector('.btyp');
      if (an && !t) {
        t = document.createElement('div');
        t.className = 'bmsg bot btyp';
        t.innerHTML = '<i></i><i></i><i></i>';
        chatEl.appendChild(t);
        chatEl.scrollTop = chatEl.scrollHeight;
      } else if (!an && t) { t.remove(); }
    }

    function eintragen(t) {
      var layer = kalEl.querySelector('.kal-layer');
      if (!layer) return;
      // Schritt 1: die Luecke sichtbar machen
      layer.insertAdjacentHTML('beforeend', lueckeHtml(t));
      kalEl.classList.add('fokus');
      // Schritt 2: Termin faellt hinein
      plane(function () {
        var l = layer.querySelector('.kal-luecke');
        if (l) l.remove();
        layer.insertAdjacentHTML('beforeend', terminHtml(t, true));
        plane(function () { kalEl.classList.remove('fokus'); }, 2600);
      }, 950);
    }

    function spiele(i) {
      var sz = SZENARIEN[aktiv];
      if (i >= sz.chat.length) {
        plane(function () {
          eintragen(sz.termin);
          plane(function () { starte(aktiv); }, 9000);
        }, 700);
        return;
      }
      var m = sz.chat[i];
      function rein() {
        nachricht(m);
        plane(function () { spiele(i + 1); }, lesezeit(m));
      }
      if (m.s === 'bot') {
        tippt(true);
        plane(function () { tippt(false); rein(); }, (m.d || 1400) * 0.72);
      } else { rein(); }
    }

    function starte(i) {
      stop();
      aktiv = i;
      chatEl.innerHTML = '';
      kalEl.classList.remove('fokus');
      kalEl.innerHTML = kalenderHtml();
      noteEl.textContent = SZENARIEN[i].hinweis;
      [].forEach.call(tabsEl.children, function (b, n) { b.classList.toggle('on', n === i); });

      if (reduce) {
        SZENARIEN[i].chat.forEach(nachricht);
        eintragen(SZENARIEN[i].termin);
        return;
      }
      plane(function () { spiele(0); }, 700);
    }

    tabsEl.innerHTML = SZENARIEN.map(function (s, i) {
      return '<button class="sz-tab' + (i ? '' : ' on') + '" type="button" data-sz="' + i + '">' +
        esc(s.tab) + '</button>';
    }).join('');

    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.sz-tab');
      if (b) starte(parseInt(b.dataset.sz, 10));
    });

    kalEl.innerHTML = kalenderHtml();
    noteEl.textContent = SZENARIEN[0].hinweis;
    sicht(root, function () { starte(aktiv); }, stop);
  }

  /* =======================================================================
     DEMO 1 – WhatsApp
     ======================================================================= */
  var WA = [
    { s:'out', t:'Guten Abend – bei uns tropft es unter der Spüle. Könnt ihr diese Woche kommen?', z:'21:47' },
    { s:'in',  t:'Guten Abend! Läuft das Wasser noch, oder tropft es nur? Und in welcher Straße sind Sie?', z:'21:47', d:1400 },
    { s:'out', t:'Nur ein Tropfen alle paar Sekunden. Poststraße 4, Musterstadt.', z:'21:48' },
    { s:'in',  t:'Danke, dann hat das bis morgen Zeit – ein Eimer darunter genügt.\n\nFür eine Störung plane ich 120 Minuten ein. Frei wäre:\n• Mi, 08:00\n• Do, 14:00\n• Fr, 08:00', z:'21:48', d:1900 },
    { s:'out', t:'Donnerstag 14 Uhr bitte', z:'21:49' },
    { s:'in',  t:'Eingetragen ✅\n\n📅 Do, 16.10. um 14:00\n🔧 Störung Abfluss · Poststraße 4\n⏱ 120 Min. · 78 €/Std. netto + 35 € Anfahrt\n\nBis Donnerstag!', z:'21:49', d:2200 }
  ];

  function demoWhatsApp(root) {
    var body = root.querySelector('.wabody'), timer = [];
    function stop() { timer.forEach(clearTimeout); timer = []; }

    function zeige(i) {
      if (i >= WA.length) {
        timer.push(setTimeout(function () { body.innerHTML = ''; zeige(0); }, 5000));
        return;
      }
      var m = WA[i];
      function rein() {
        var d = document.createElement('div');
        d.className = 'wamsg ' + m.s;
        d.innerHTML = esc(m.t) + '<span class="watime">' + m.z + (m.s === 'out' ? '<span class="ck">✓✓</span>' : '') + '</span>';
        body.appendChild(d);
        while (body.children.length > 5) body.removeChild(body.firstChild);
        timer.push(setTimeout(function () { zeige(i + 1); }, m.s === 'out' ? 850 : 2400));
      }
      if (m.s === 'in') {
        var t = document.createElement('div');
        t.className = 'wamsg in';
        t.innerHTML = '<span class="typ" style="padding:1px 2px"><i></i><i></i><i></i></span>';
        body.appendChild(t);
        timer.push(setTimeout(function () { t.remove(); rein(); }, m.d || 1300));
      } else rein();
    }

    if (reduce) {
      body.innerHTML = WA.slice(-3).map(function (m) {
        return '<div class="wamsg ' + m.s + '">' + esc(m.t) + '<span class="watime">' + m.z + '</span></div>';
      }).join('');
      return;
    }
    sicht(root, function () { body.innerHTML = ''; zeige(0); }, stop);
  }

  /* =======================================================================
     DEMO 2 – Angebotskalkulator vor Ort

     Zwei Ablaeufe in einer Buehne, die gleichzeitig laufen:

       A  Rechner   – Standardauftrag. Die Felder fuellen sich, der Knopf
                      wird gedrueckt, das Ergebnis rastet ein und die
                      Positionen laufen einzeln ein.
       B  KI-Chat   – Sonderauftrag. Der Monteur diktiert, der Assistent
                      schlaegt echte Anbieterpreise nach (sichtbarer
                      Recherchestreifen) und nennt die Quellen.

     Beide Ablaeufe haengen an verketteten Timern. "plane" sammelt sie,
     "stop" raeumt sie ab, sobald die Buehne aus dem Sichtbereich scrollt.
     ======================================================================= */
  var KALK_FELDER = [
    { l:'Zaunart',            v:'Doppelstabmatte' },
    { l:'Material',           v:'Anthrazit RAL 7016' },
    { l:'Laufende Meter',     v:'40 m' },
    { l:'Höhe',               v:'180 cm' },
    { l:'Pfostenabstand',     v:'2,5 m' },
    { l:'Untergrund',         v:'Erde / Rasen' },
    { l:'Tor',                v:'1 × Doppeltor (Einfahrt)' },
    { l:'Anfahrt',            v:'18 km' },
    { l:'Arbeitsstunden',     v:'22 h' }
  ];

  var KALK_CHIPS = ['40 m', '180 cm', '17 Pfosten', 'Erde', '22 h'];

  var KALK_ZEILEN = [
    { p:'Zaunfelder (40 m, 180 cm)', b:'2.016,00 €' },
    { p:'Pfosten (17 Stück)',        b:'408,00 €' },
    { p:'Tor (1 × Doppeltor)',       b:'480,00 €' },
    { p:'Materialaufschlag / Marge', b:'726,00 €' },
    { p:'Lohn (22 h × 55 €)',        b:'1.210,00 €' },
    { p:'Anfahrt (18 km)',           b:'18,00 €' }
  ];

  var KALK_ZIEL = 5781.02;

  var KALK_CHAT = [
    { s:'bot', t:'Servus! Standardzäune rechnest du links im Formular.\nFür Sonderteile beschreib einfach, was du brauchst – ich frage nach, was fehlt, und schlage die Preise nach.' },
    { s:'me',  t:'Sonderanfertigung Metalltor, 3 m breit, Cortenstahl – was kostet das ungefähr?' },
    { s:'rech' },
    { s:'bot', t:'Vier Händlerseiten gelesen:\nMedian 1.180 € · Spanne 940 – 1.510 €\n\nMit Montage und deiner Marge: rund 1.790 € brutto. Pfosten sind noch nicht drin.' },
    { s:'me',  t:'Passt so.' },
    { s:'bot', t:'Alles klar – die vier Quellen liegen im Angebotsordner. Du kannst heute Abend am Rechner nachsehen, woher jede Zahl kommt.' }
  ];

  var KALK_QUELLEN = ['zaun-shop.de', 'metallbau-x.de', 'corten-direkt.de', 'baustoffe-y.de'];

  function demoKalkulator(root) {
    var felderEl = root.querySelector('.kfelder');
    var btn      = root.querySelector('.kbtn');
    var erg      = root.querySelector('.kerg');
    var logEl    = root.querySelector('.kchat-log');
    var micEl    = root.querySelector('.kchat-mic');
    if (!felderEl || !btn || !erg || !logEl) return;

    /* Grundgeruest einmal aufbauen ------------------------------------- */
    felderEl.innerHTML = KALK_FELDER.map(function (f, i) {
      return '<div class="kfeld' + (i >= 6 ? ' weit' : '') + '">' +
        '<i>' + esc(f.l) + '</i><b>' + esc(f.v) + '</b></div>';
    }).join('');

    erg.innerHTML =
      '<div class="kerg-kopf">' +
        '<span><b>Doppelstabmattenzaun</b><span>anthrazit · 40 m</span></span>' +
        '<span class="kerg-tag">Standardpreis</span>' +
      '</div>' +
      '<div class="kpreis"><i>Verkaufspreis inkl. MwSt.</i>' +
        '<b class="kpreis-wert">0,00 €</b>' +
        '<span>netto 4.858,00 € · zzgl. 19 % MwSt.</span></div>' +
      '<div class="kchips">' + KALK_CHIPS.map(function (c) {
        return '<span class="kchip">' + esc(c) + '</span>';
      }).join('') + '</div>' +
      '<div class="kzeilen">' + KALK_ZEILEN.map(function (z) {
        return '<div class="kzeile"><span>' + esc(z.p) + '</span><b>' + esc(z.b) + '</b></div>';
      }).join('') + '</div>';

    var felder = root.querySelectorAll('.kfeld');
    var chips  = root.querySelectorAll('.kchip');
    var zeilen = root.querySelectorAll('.kzeile');
    var wertEl = root.querySelector('.kpreis-wert');

    var timer = [];
    function plane(fn, ms) { timer.push(setTimeout(fn, ms)); }
    function stop() { timer.forEach(clearTimeout); timer = []; }

    function euroText(n) {
      return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }

    function zaehleHoch(ms) {
      var t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
        wertEl.textContent = euroText(KALK_ZIEL * e);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }

    /* --- A · der Rechner ---------------------------------------------- */
    function laufRechner() {
      felder.forEach(function (f) { f.classList.remove('da', 'neu'); });
      chips.forEach(function (c) { c.classList.remove('da'); });
      zeilen.forEach(function (z) { z.classList.remove('da'); });
      erg.classList.remove('da');
      btn.classList.remove('druck');
      wertEl.textContent = '0,00 €';

      felder.forEach(function (f, i) {
        plane(function () {
          f.classList.add('da', 'neu');
          plane(function () { f.classList.remove('neu'); }, 520);
        }, 700 + i * 520);
      });

      var nachFeldern = 700 + felder.length * 520 + 400;

      plane(function () {
        btn.classList.add('druck');
        plane(function () { btn.classList.remove('druck'); }, 320);
      }, nachFeldern);

      plane(function () {
        erg.classList.add('da');
        zaehleHoch(1200);
      }, nachFeldern + 420);

      chips.forEach(function (c, i) {
        plane(function () { c.classList.add('da'); }, nachFeldern + 1700 + i * 130);
      });
      zeilen.forEach(function (z, i) {
        plane(function () { z.classList.add('da'); }, nachFeldern + 2400 + i * 200);
      });
    }

    /* --- B · der Chat -------------------------------------------------- */
    function rechercheHtml() {
      return '<div class="krech">' +
          '<div class="krech-kopf"><span class="krech-spin"></span>' +
            '<b>KI recherchiert</b> · liest die Preisseiten der Händler …</div>' +
          '<div class="krech-bar"><i></i></div>' +
          '<div class="krech-quellen">' + KALK_QUELLEN.map(function (q) {
            return '<span class="kquelle">' + esc(q) + '</span>';
          }).join('') + '</div>' +
        '</div>';
    }

    function zeigeChat(i) {
      if (i >= KALK_CHAT.length) return;
      var m = KALK_CHAT[i];

      if (m.s === 'rech') {
        logEl.insertAdjacentHTML('beforeend', rechercheHtml());
        kuerze();
        var bar = logEl.querySelector('.krech:last-child .krech-bar i');
        var qs  = logEl.querySelectorAll('.krech:last-child .kquelle');
        plane(function () { if (bar) bar.style.width = '100%'; }, 80);
        qs.forEach(function (q, n) {
          plane(function () { q.classList.add('da'); }, 700 + n * 480);
        });
        plane(function () {
          var sp = logEl.querySelector('.krech:last-child .krech-spin');
          var kopf = logEl.querySelector('.krech:last-child .krech-kopf');
          if (sp) sp.remove();
          if (kopf) kopf.innerHTML = '<b>4 Quellen gefunden</b> · Median 1.180 € je Tor';
        }, 2700);
        plane(function () { zeigeChat(i + 1); }, 3400);
        return;
      }

      if (m.s === 'me' && micEl) {
        micEl.classList.add('an');
        plane(function () { micEl.classList.remove('an'); }, 900);
      }

      logEl.insertAdjacentHTML('beforeend',
        '<div class="kmsg ' + m.s + '">' + esc(m.t) + '</div>');
      kuerze();

      var n = m.t.length;
      var warte = m.s === 'bot'
        ? Math.min(1000 + n * 24, 3400)
        : Math.min(700 + n * 16, 1600);
      plane(function () { zeigeChat(i + 1); }, warte);
    }

    /* Der Verlauf ist kurz gehalten – aeltere Nachrichten fallen raus,
       damit nichts aus dem Kasten laeuft. */
    function kuerze() {
      while (logEl.children.length > 3) logEl.removeChild(logEl.firstChild);
    }

    function lauf() {
      stop();
      logEl.innerHTML = '';
      laufRechner();
      plane(function () { zeigeChat(0); }, 600);
      plane(lauf, 23000);
    }

    if (reduce) {
      felder.forEach(function (f) { f.classList.add('da'); });
      chips.forEach(function (c) { c.classList.add('da'); });
      zeilen.forEach(function (z) { z.classList.add('da'); });
      erg.classList.add('da');
      wertEl.textContent = euroText(KALK_ZIEL);
      logEl.innerHTML = KALK_CHAT.filter(function (m) { return m.s !== 'rech'; })
        .slice(-3).map(function (m) {
          return '<div class="kmsg ' + m.s + '">' + esc(m.t) + '</div>';
        }).join('');
      return;
    }

    sicht(root, lauf, stop);
    var b = root.querySelector('.replay');
    if (b) b.addEventListener('click', lauf);
  }

  /* =======================================================================
     DEMO 3 – Social-Media-Autopilot
     ======================================================================= */
  var POSTS = [
    { bild:'bad',        a:'Bad in neun', b:'Tagen fertig', likes:214,
      cap:'Vorher Eiche rustikal, nachher bodengleiche Dusche. Die Familie hat währenddessen im Haus gewohnt.', tags:'#badsanierung #musterstadt', zeit:'vor 2 Stunden' },
    { bild:'heizkoerper',a:'Heizung an?', b:'Erst warten.', likes:91,
      cap:'Jetzt ist die richtige Zeit für die Wartung. Im Januar ruft jeder gleichzeitig an.', tags:'#heizungswartung #handwerk', zeit:'vor 1 Tag' },
    { bild:'elektro',    a:'Verteiler von 1974,', b:'Technik von heute', likes:138,
      cap:'Aus Schraubsicherungen wird ein Verteiler mit FI-Schutz. Ein Tag Arbeit, danach dreißig Jahre Ruhe.', tags:'#elektro #echeck', zeit:'vor 2 Tagen' },
    { bild:'putz',       a:'Der Unterschied', b:'ist die Kante', likes:176,
      cap:'Sauber gespachtelt sieht man später nicht. Schlecht gespachtelt sieht man für immer.', tags:'#trockenbau #handwerkskunst', zeit:'vor 4 Tagen' },
    { bild:'dach',       a:'Nach dem Sturm:', b:'kurzer Check', likes:263,
      cap:'Drei Anrufe am Montagmorgen, alle dasselbe. Lose Bleche melden sich meist erst beim nächsten Regen.', tags:'#sturmschaden #dach', zeit:'vor 5 Tagen' },
    { bild:'werkzeug',   a:'Neu im Bus:', b:'Kernbohrgerät', likes:84,
      cap:'Durchbrüche bis 200 mm, ohne dass die halbe Wohnung hinterher grau ist.', tags:'#werkzeug #baustelle', zeit:'vor 6 Tagen' }
  ];

  function postHtml(p) {
    return '<article class="igpost">' +
      '<div class="igbar"><span class="igav"><i>MH</i></span>' +
        '<span><b>musterhandwerk</b><span>' + p.zeit + '</span></span></div>' +
      '<div class="igimg"><img src="' + bild(p.bild, 520) + '" alt="" loading="lazy" decoding="async">' +
        '<div class="igov"><b>' + p.a + ' <em>' + p.b + '</em></b><span>Muster Handwerk · Musterstadt</span></div></div>' +
      '<div class="igacts">' + icon('heart') + icon('chat') + icon('send') +
        '<span class="last">' + icon('bookmark') + '</span></div>' +
      '<div class="iglikes">' + p.likes + ' Gefällt mir</div>' +
      '<div class="igcap"><b>musterhandwerk</b> ' + p.cap + ' <span class="tags">' + p.tags + '</span></div>' +
    '</article>';
  }

  function demoInsta(root) {
    var track = root.querySelector('.igtrack');
    track.innerHTML = POSTS.map(postHtml).join('') + POSTS.map(postHtml).join('');
    if (reduce) return;

    var y = 0, an = false, raf = null, letzte = 0;
    function tick(now) {
      if (!an) return;
      var dt = letzte ? now - letzte : 16;
      letzte = now;
      y += dt * 0.024;
      var h = track.scrollHeight / 2;
      if (h > 0 && y >= h) y -= h;
      track.style.transform = 'translateY(' + -y + 'px)';
      raf = requestAnimationFrame(tick);
    }
    function start() { if (an) return; an = true; letzte = 0; raf = requestAnimationFrame(tick); }
    function stop() { an = false; if (raf) cancelAnimationFrame(raf); }

    sicht(root, start, stop);
  }

  /* Startet/stoppt eine Animation je nach Sichtbarkeit */
  function sicht(el, start, stop) {
    if (!('IntersectionObserver' in window)) { start(); return; }
    var laeuft = false;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !laeuft) { laeuft = true; start(); }
        else if (!e.isIntersecting && laeuft) { laeuft = false; if (stop) stop(); }
      });
    }, { threshold: .3 }).observe(el);
  }

  /* =======================================================================
     Start
     ======================================================================= */
  function init() {
    renderLeistungen();
    renderFunktionen();
    renderAblauf();
    renderZeiten();
    renderPakete();
    fuellePlatzhalter();
    navigation();
    schalter();
    beobachte();

    var bu = document.getElementById('demo-buehne'); if (bu) demoBuehne(bu);
    var wa = document.getElementById('demo-wa');   if (wa) demoWhatsApp(wa);
    var ka = document.getElementById('demo-kalk'); if (ka) demoKalkulator(ka);
    var ig = document.getElementById('demo-ig');   if (ig) demoInsta(ig);

    var jahr = document.getElementById('jahr');
    if (jahr) jahr.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
