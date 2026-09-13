/* Demoseite Handwerk - baut die Seite aus config.js auf und betreibt das Chat-Widget.
   In der Regel muss hier NICHTS angepasst werden. */

(function () {
  "use strict";

  var C = window.BETRIEB;
  if (!C) { console.error("config.js wurde nicht geladen."); return; }

  /* ---------------------------------------------------------------- Helfer */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Icons fuer die Leistungs-Kacheln. Neue Icons hier ergaenzen und in
     config.js unter "icon" referenzieren. */
  var ICONS = {
    lift: '<path d="M3 21h18M6 21V6l6-3 6 3v15M9 21v-5h6v5M9 10h6"/>',
    haus: '<path d="M3 11l9-7 9 7M5 10v11h14V10M10 21v-6h4v6"/>',
    baum: '<path d="M12 22v-5M12 17c-4 0-6-2.5-6-5.5S8 6 12 3c4 3 6 5.5 6 8.5S16 17 12 17z"/>',
    plan: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M14 13h7M14 17h7"/>',
    werkzeug: '<path d="M14.7 6.3a4 4 0 015.4 5.2l-8.6 8.6a2.1 2.1 0 01-3-3l8.6-8.6M6 6l3 3M4 8l3 3"/>',
    wasser: '<path d="M12 3s6 6.4 6 10.4A6 6 0 016 13.4C6 9.4 12 3 12 3z"/>',
    flamme: '<path d="M12 22a6 6 0 006-6c0-5-6-10-6-10S6 11 6 16a6 6 0 006 6zM12 22a3 3 0 003-3c0-2-3-4-3-4s-3 2-3 4a3 3 0 003 3z"/>',
    blitz: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    pinsel: '<path d="M4 20l4-1 9-9-3-3-9 9-1 4zM14 5l3-3 3 3-3 3"/>',
    frage: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
    kalender: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
    warnung: '<path d="M10.3 4.3L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'
  };
  function iconSvg(name) {
    var d = ICONS[name] || ICONS.werkzeug;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>";
  }

  /* ------------------------------------------------------- Design & Texte */
  function designAnwenden() {
    var r = document.documentElement.style;
    r.setProperty("--primaer", C.design.primaer);
    r.setProperty("--akzent", C.design.akzent);
    r.setProperty("--akzent-dark", C.design.akzentDark || C.design.akzent);
    if (C.design.akzentHell) r.setProperty("--akzent-hell", C.design.akzentHell);
    if (C.design.akzentText) r.setProperty("--akzent-text", C.design.akzentText);
    r.setProperty("--hell", C.design.hell);

    var heroBild = $("#hero-bild");
    if (heroBild && C.design.heroBild) { heroBild.src = C.design.heroBild; heroBild.alt = C.firma.name; }
    var ueberBild = $("#ueber-bild");
    if (ueberBild && C.design.ueberBild) { ueberBild.src = C.design.ueberBild; ueberBild.alt = C.firma.name; }

    document.title = C.firma.name + " - " + C.firma.claim;
  }

  /* Fuellt alle Elemente mit data-cfg="pfad.zum.wert" */
  function texteFuellen() {
    $$("[data-cfg]").forEach(function (node) {
      var wert = node.getAttribute("data-cfg").split(".").reduce(function (o, k) {
        return o == null ? null : o[k];
      }, C);
      if (wert == null || wert === "") return;
      if (node.tagName === "A" && node.hasAttribute("data-cfg-href")) {
        node.setAttribute("href", node.getAttribute("data-cfg-href").replace("{wert}", wert));
      }
      if (node.hasAttribute("data-cfg-attr")) node.setAttribute(node.getAttribute("data-cfg-attr"), wert);
      else node.textContent = wert;
    });
    // Telefon-, Notdienst- und E-Mail-Links
    $$("[data-tel]").forEach(function (a) { a.href = "tel:" + C.kontakt.telefonLink; });
    $$("[data-tel-notdienst]").forEach(function (a) { a.href = "tel:" + (C.kontakt.notdienstLink || C.kontakt.telefonLink); });
    $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + C.kontakt.email; });

    // Logo: Bild statt Text, falls hinterlegt
    if (C.firma.logo) {
      $$(".logo").forEach(function (l) {
        l.innerHTML = '<img src="' + C.firma.logo + '" alt="' + escapeHtml(C.firma.name) + '">';
      });
    } else {
      $$(".logo__mark").forEach(function (m) {
        m.textContent = C.firma.name.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
      });
    }
  }

  /* ---------------------------------------------------------- Bausteine */
  function leistungenBauen() {
    var ziel = $("#leistungen-raster");
    if (!ziel) return;
    C.leistungen.forEach(function (l) {
      var karte = el("article", "karte");
      karte.innerHTML =
        (l.bild ? '<img class="karte__bild" src="' + escapeHtml(l.bild) + '" alt="' + escapeHtml(l.titel) + '" loading="lazy">' : "") +
        '<div class="karte__inhalt">' +
        '<div class="karte__icon">' + iconSvg(l.icon) + "</div>" +
        "<h3>" + escapeHtml(l.titel) + "</h3>" +
        "<p>" + escapeHtml(l.teaser) + "</p>" +
        "<ul>" + (l.punkte || []).map(function (p) { return "<li>" + escapeHtml(p) + "</li>"; }).join("") + "</ul>" +
        "</div>";
      var frage = el("button", "karte__frage", "Frage dazu stellen →");
      frage.addEventListener("click", function () {
        Chat.oeffnen("Ich habe eine Frage zum Thema " + l.titel + ": ");
      });
      $(".karte__inhalt", karte).appendChild(frage);
      ziel.appendChild(karte);
    });
  }

  /* Drei Klick-Beispiele: ein Klick schickt die Frage direkt an den Assistenten. */
  function testfaelleBauen() {
    var abschnitt = $("#demo");
    if (!abschnitt) return;
    if (!C.demo || C.demo.aktiv === false) {
      abschnitt.remove();
      $$('a[href="#demo"]').forEach(function (a) { a.remove(); });
      return;
    }

    $("#demo-ueberschrift").textContent = C.demo.ueberschrift;
    $("#demo-text").textContent = C.demo.text;

    var ziel = $("#demo-raster");
    (C.demo.faelle || []).forEach(function (f) {
      var karte = el("button", "demo-karte");
      karte.type = "button";
      karte.innerHTML =
        '<div class="demo-karte__icon">' + iconSvg(f.icon) + "</div>" +
        "<h3>" + escapeHtml(f.titel) + "</h3>" +
        "<p>" + escapeHtml(f.text) + "</p>" +
        '<div class="demo-karte__frage">„' + escapeHtml(f.frage) + '"</div>' +
        '<div class="demo-karte__start">Im Chat stellen →</div>';
      karte.addEventListener("click", function () { Chat.frageStellen(f.frage); });
      ziel.appendChild(karte);
    });
  }

  function listenBauen() {
    var ablauf = $("#ablauf-schritte");
    if (ablauf) C.ablauf.forEach(function (s) {
      var d = el("div", "schritt");
      d.innerHTML = "<h3>" + escapeHtml(s.titel) + "</h3><p class=\"lead\">" + escapeHtml(s.text) + "</p>";
      ablauf.appendChild(d);
    });

    var fakten = $("#fakten");
    if (fakten) C.zahlen.slice(0, 4).forEach(function (z) {
      var d = el("div", "fakt");
      d.innerHTML = "<b>" + escapeHtml(z.wert) + "</b><span>" + escapeHtml(z.label) + "</span>";
      fakten.appendChild(d);
    });

    var ueberPunkte = $("#ueber-punkte");
    if (ueberPunkte) ((C.ueberUns && C.ueberUns.punkte) || []).forEach(function (p) {
      ueberPunkte.appendChild(el("li", null, p));
    });

    var refs = $("#referenzen-raster");
    if (refs) C.referenzen.forEach(function (r) {
      var d = el("article", "ref");
      d.innerHTML = "<h3>" + escapeHtml(r.titel) + "</h3><p class=\"lead\">" + escapeHtml(r.text) + "</p>";
      refs.appendChild(d);
    });

    var stimmen = $("#stimmen-raster");
    if (stimmen) (C.stimmen || []).forEach(function (s) {
      var d = el("blockquote", "stimme");
      d.innerHTML = "<p>„" + escapeHtml(s.text) + "“</p><cite>" + escapeHtml(s.autor) + "</cite>";
      stimmen.appendChild(d);
    });

    var zeiten = $("#oeffnungszeiten");
    if (zeiten) C.kontakt.oeffnungszeiten.forEach(function (z) {
      var li = el("li");
      li.innerHTML = "<span>" + escapeHtml(z.tag) + "</span><span>" + escapeHtml(z.zeit) + "</span>";
      zeiten.appendChild(li);
    });

    var faq = $("#faq-liste");
    if (faq) (C.faq || []).forEach(function (f) {
      var d = el("details");
      d.innerHTML = "<summary>" + escapeHtml(f.frage) + "</summary><p>" + escapeHtml(f.antwort) + "</p>";
      faq.appendChild(d);
    });

    var auswahl = $("#formular-leistung");
    if (auswahl) C.leistungen.forEach(function (l) {
      auswahl.appendChild(new Option(l.titel, l.titel));
    });

    // Notdienst-Banner nur zeigen, wenn eine Nummer hinterlegt ist
    if (!C.kontakt.notdienst) {
      var nd = $("#notdienst");
      if (nd) nd.remove();
    }
  }

  /* ------------------------------------------------------ Kontaktformular */
  function formularAktivieren() {
    var form = $("#kontaktformular");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $("#formular-status");
      var daten = {};
      new FormData(form).forEach(function (v, k) { daten[k] = v; });

      if (!C.formular.endpunkt) {
        // Kein Endpunkt konfiguriert -> vorbereitete E-Mail oeffnen
        var text = Object.keys(daten).map(function (k) { return k + ": " + daten[k]; }).join("\n");
        window.location.href = "mailto:" + C.kontakt.email +
          "?subject=" + encodeURIComponent("Anfrage ueber die Website") +
          "&body=" + encodeURIComponent(text);
        status.textContent = "Ihr E-Mail-Programm wurde geoeffnet.";
        return;
      }
      status.textContent = "Wird gesendet ...";
      fetch(C.formular.endpunkt, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daten)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        status.textContent = "Vielen Dank! Wir melden uns innerhalb eines Werktags.";
      }).catch(function () {
        status.textContent = "Das hat leider nicht geklappt. Bitte rufen Sie uns an: " + C.kontakt.telefon;
      });
    });
  }

  /* ------------------------------------------------------------- Navigation */
  function navAktivieren() {
    var burger = $("#burger"), nav = $("#nav");
    if (burger && nav) {
      burger.addEventListener("click", function () { nav.classList.toggle("offen"); });
      $$("a", nav).forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("offen"); });
      });
    }
    $$("[data-chat-oeffnen]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); Chat.oeffnen(); });
    });
  }

  /* =========================================================== Chat-Widget =
     Spricht den n8n-Chat-Trigger direkt an:
       POST <webhookUrl>  {action:"sendMessage", sessionId, chatInput}
       Antwort            {output:"..."}                                     */
  var Chat = (function () {
    var offen = false, laeuft = false, gestartet = false;
    var verlauf, eingabe, senden, fenster, knopf, vorschlaege;

    function sessionId() {
      var key = "handwerk-chat-session";
      var id = null;
      try { id = sessionStorage.getItem(key); } catch (e) { /* Private Mode */ }
      if (!id) {
        id = "web-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
        try { sessionStorage.setItem(key, id); } catch (e) { /* egal */ }
      }
      return id;
    }

    /* Minimal-Markdown: **fett**, Zeilenumbrueche, - Listen, Links */
    function formatieren(text) {
      var html = escapeHtml(text)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
        .replace(/(^|\n)[-*]\s+/g, "$1• ");
      return html.split(/\n{2,}/).map(function (p) {
        return "<p>" + p.replace(/\n/g, "<br>") + "</p>";
      }).join("");
    }

    function blase(text, art) {
      var b = el("div", "blase blase--" + art);
      if (art === "hinweis") b.textContent = text;
      else b.innerHTML = formatieren(text);
      verlauf.appendChild(b);
      verlauf.scrollTop = verlauf.scrollHeight;
      return b;
    }

    function tipptAn() {
      var t = el("div", "tippt");
      t.innerHTML = "<i></i><i></i><i></i>";
      verlauf.appendChild(t);
      verlauf.scrollTop = verlauf.scrollHeight;
      return t;
    }

    function vorschlaegeZeigen(zeigen) {
      if (vorschlaege) vorschlaege.style.display = zeigen ? "flex" : "none";
    }

    function senderSperren(sperren) {
      laeuft = sperren;
      senden.disabled = sperren;
    }

    function abschicken(text) {
      text = (text || eingabe.value).trim();
      if (!text || laeuft) return;
      eingabe.value = "";
      eingabe.style.height = "auto";
      blase(text, "ich");
      vorschlaegeZeigen(false);
      senderSperren(true);

      if (!C.chat.webhookUrl) {   // Demo-Modus ohne n8n
        var t0 = tipptAn();
        setTimeout(function () {
          t0.remove();
          blase("Demo-Modus: Es ist noch kein n8n-Assistent verbunden. " +
            "Sobald die Webhook-URL in config.js eingetragen ist, beantwortet der Assistent " +
            "hier Fragen aus der Wissensbasis und bucht Termine direkt in den Google Kalender.", "hinweis");
          senderSperren(false);
        }, 700);
        return;
      }

      var t = tipptAn();
      fetch(C.chat.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: sessionId(), chatInput: text })
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      }).then(function (roh) {
        var daten;
        try { daten = JSON.parse(roh); } catch (e) { daten = { output: roh }; }
        if (Array.isArray(daten)) daten = daten[0] || {};
        var antwort = daten.output || daten.text || daten.response || daten.message ||
          (typeof daten === "string" ? daten : "");
        t.remove();
        blase(antwort || "Dazu habe ich gerade keine Antwort. Rufen Sie uns gerne an: " + C.kontakt.telefon, "bot");
      }).catch(function (err) {
        t.remove();
        console.warn("Chat-Fehler:", err);
        blase("Die Verbindung zum Assistenten klappt gerade nicht. Erreichen Sie uns bitte " +
          "telefonisch unter " + C.kontakt.telefon + " oder per E-Mail an " + C.kontakt.email + ".", "bot");
      }).then(function () { senderSperren(false); eingabe.focus(); });
    }

    function starten() {
      if (gestartet) return;
      gestartet = true;
      blase(C.chat.begruessung, "bot");
      if (!C.chat.webhookUrl) {
        blase("Vorschau ohne n8n-Verbindung - Antworten sind noch nicht aktiv.", "hinweis");
      }
    }

    function aufbauen() {
      fenster = $("#chat");
      knopf = $("#chat-knopf");
      verlauf = $("#chat-verlauf");
      eingabe = $("#chat-eingabe");
      senden = $("#chat-senden");
      vorschlaege = $("#chat-vorschlaege");
      if (!fenster) return;

      $("#chat-titel").textContent = C.chat.titel;
      $("#chat-untertitel").textContent = C.chat.untertitel;
      $("#chat-avatar").textContent = C.firma.name.slice(0, 1).toUpperCase();
      $("#chat-knopf-text").textContent = C.chat.launcherText || "Frage stellen";

      (C.chat.vorschlaege || []).forEach(function (v) {
        var b = el("button", null, v);
        b.addEventListener("click", function () { abschicken(v); });
        vorschlaege.appendChild(b);
      });

      knopf.addEventListener("click", function () { oeffnen(); });
      $("#chat-zu").addEventListener("click", schliessen);
      senden.addEventListener("click", function () { abschicken(); });
      eingabe.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); abschicken(); }
      });
      eingabe.addEventListener("input", function () {
        eingabe.style.height = "auto";
        eingabe.style.height = Math.min(eingabe.scrollHeight, 110) + "px";
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && offen) schliessen();
      });
    }

    function oeffnen(vorbelegung) {
      if (!fenster) return;
      offen = true;
      fenster.hidden = false;
      knopf.hidden = true;
      starten();
      if (vorbelegung) eingabe.value = vorbelegung;
      setTimeout(function () { eingabe.focus(); }, 60);
    }

    function schliessen() {
      offen = false;
      fenster.hidden = true;
      knopf.hidden = false;
    }

    // Chat oeffnen und die Frage sofort abschicken (Testfall-Kacheln)
    function frageStellen(text) {
      oeffnen();
      setTimeout(function () { abschicken(text); }, 120);
    }

    return { aufbauen: aufbauen, oeffnen: oeffnen, schliessen: schliessen,
             frageStellen: frageStellen };
  })();

  /* --------------------------------------------------------------- Start */
  document.addEventListener("DOMContentLoaded", function () {
    designAnwenden();
    texteFuellen();
    leistungenBauen();
    listenBauen();
    testfaelleBauen();
    formularAktivieren();
    navAktivieren();
    Chat.aufbauen();
    $$("[data-jahr]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
    // Link mit ?chat=1 oeffnet den Assistenten sofort - praktisch fuer Demo-Links
    if (/[?&]chat=1/.test(window.location.search)) Chat.oeffnen();
  });
})();
