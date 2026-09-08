/* =============================================================================
   KONFIGURATION  -  Die EINZIGE Datei, die pro Kunde angepasst werden muss.
   -----------------------------------------------------------------------------
   Alles zwischen den Anfuehrungszeichen austauschen, Datei speichern, fertig.
   Leistungen/FAQ/Referenzen: Eintraege im Array kopieren, loeschen, umsortieren.
   Bilder: eigene Fotos nach assets/img/ legen und den Pfad hier eintragen.
   ============================================================================= */

window.BETRIEB = {

  /* --- 1. Firma ----------------------------------------------------------- */
  firma: {
    name:        "Muster Handwerk",                 // ANPASSEN
    rechtsform:  "GmbH",
    claim:       "Handwerk, auf das Sie sich verlassen können",
    inhaber:     "Max Mustermann",
    gegruendet:  1998,
    logo:        "",   // optional: "assets/img/logo.png" - leer = Textlogo aus den Initialen
  },

  /* --- 2. Farben ---------------------------------------------------------- */
  design: {
    primaer:    "#0f172a",   // Schwarzblau: Kopfzeile, dunkle Flaechen
    akzent:     "#2563eb",   // Blau: Buttons, Highlights
    akzentDark: "#1d4ed8",
    akzentHell: "#eaf0fe",   // sehr helles Blau: Icon-Flaechen
    akzentText: "#ffffff",   // Schrift auf blauen Buttons
    hell:       "#f6f8fb",   // Seitenhintergrund der hellen Abschnitte
    heroBild:   "assets/img/hero.svg",       // grosses Bild oben - durch Foto ersetzen
    ueberBild:  "assets/img/werkstatt.svg",  // Bild im Abschnitt "Über uns"
  },

  /* --- 3. Kontakt --------------------------------------------------------- */
  kontakt: {
    telefon:       "07431 123456",                  // ANPASSEN
    telefonLink:   "+497431123456",                 // ohne Leerzeichen, mit +49
    notdienst:     "0172 1234567",                  // leer lassen = kein Notdienst-Banner
    notdienstLink: "+491721234567",
    email:         "info@musterbetrieb.de",
    strasse:       "Musterstraße 12",
    plz:           "72458",
    stadt:         "Musterstadt",
    oeffnungszeiten: [
      { tag: "Montag – Donnerstag", zeit: "07:00 – 17:00 Uhr" },
      { tag: "Freitag",             zeit: "07:00 – 13:00 Uhr" },
      { tag: "Samstag / Sonntag",   zeit: "geschlossen (Notdienst erreichbar)" },
    ],
    einsatzgebiet: "Musterstadt und Umkreis von 50 km",
  },

  /* --- 4. Leistungen ------------------------------------------------------ *
   * Bewusst allgemein gehalten - passt auf jedes Gewerk. Fuer den Kunden
   * einfach Titel/Teaser/Punkte austauschen. Zu jeder Leistung sollte eine
   * Markdown-Datei in /wissensbasis/ liegen, damit der Assistent antworten kann. */
  leistungen: [
    {
      icon: "werkzeug",
      titel: "Reparatur & Wartung",
      teaser: "Schnelle Hilfe, wenn etwas nicht mehr läuft – und regelmäßige Wartung, damit es gar nicht erst so weit kommt.",
      punkte: ["Störungssuche und Instandsetzung", "Wartungsverträge mit festen Terminen", "Ersatzteile vom Lager", "Kurzfristige Termine"],
      bild: "assets/img/leistung-1.svg",
      datei: "wissensbasis/03a_leistung_beispiel_reparatur.md",
    },
    {
      icon: "haus",
      titel: "Sanierung & Modernisierung",
      teaser: "Vom einzelnen Raum bis zum kompletten Objekt – geplant, sauber ausgeführt und termintreu übergeben.",
      punkte: ["Beratung und Aufmaß vor Ort", "Festpreisangebot vor Beginn", "Koordination der Gewerke", "Abnahme mit Protokoll"],
      bild: "assets/img/leistung-2.svg",
      datei: "wissensbasis/03b_leistung_beispiel_sanierung.md",
    },
    {
      icon: "plan",
      titel: "Neubau & Montage",
      teaser: "Neue Anlagen und Einbauten – fachgerecht montiert, dokumentiert und übergeben.",
      punkte: ["Planung und Materialauswahl", "Montage nach aktueller Norm", "Inbetriebnahme und Einweisung", "Gewährleistung und Nachbetreuung"],
      bild: "assets/img/leistung-3.svg",
      datei: "wissensbasis/03c_leistung_beispiel_neubau.md",
    },
    // Weitere Leistung? Block oben kopieren und anpassen.
    // Icons: werkzeug, haus, plan, wasser, flamme, blitz, pinsel, lift, baum
  ],

  /* --- 5. Ablauf (3 Schritte) --------------------------------------------- */
  ablauf: [
    { titel: "Anfrage stellen",  text: "Per Telefon, Formular oder direkt im Chat – rund um die Uhr." },
    { titel: "Termin vor Ort",   text: "Wir schauen uns die Sache an und beraten Sie ehrlich." },
    { titel: "Festpreisangebot", text: "Sie bekommen ein klares Angebot – ohne versteckte Kosten." },
  ],

  /* --- 6. Zahlen ---------------------------------------------------------- */
  zahlen: [
    { wert: "25+",    label: "Jahre Erfahrung" },
    { wert: "24",     label: "Mitarbeiter" },
    { wert: "1.800+", label: "abgeschlossene Aufträge" },
    { wert: "48 h",   label: "Reaktionszeit auf Anfragen" },
  ],

  /* --- 7. Über uns -------------------------------------------------------- */
  ueberUns: {
    ueberschrift: "Ein Betrieb, viele Hände – und ein Anspruch",
    text: "Wir sind ein inhabergeführter Handwerksbetrieb aus Musterstadt. Was wir zusagen, halten wir: " +
          "feste Ansprechpartner, saubere Baustellen und Termine, auf die Sie sich einstellen können. " +
          "Unsere Mitarbeiter bilden wir selbst aus – die meisten sind seit über zehn Jahren im Team.",
    punkte: ["Meisterbetrieb mit eigener Ausbildung", "Feste Ansprechpartner statt Callcenter", "Transparente Preise vor Auftragsbeginn"],
  },

  /* --- 8. Referenzen ------------------------------------------------------ */
  referenzen: [
    { titel: "Sanierung Mehrfamilienhaus", text: "Komplette Modernisierung von acht Wohneinheiten im bewohnten Zustand – fertig in zwölf Wochen." },
    { titel: "Wartung Gewerbeobjekt",      text: "Jährliche Wartung für einen Gewerbepark mit 14 Einheiten, inklusive Notdienst-Bereitschaft." },
    { titel: "Neubau Einfamilienhaus",     text: "Komplette Ausführung unseres Gewerks vom Rohbau bis zur Übergabe an die Bauherren." },
  ],

  /* --- 9. Stimmen von Kunden ---------------------------------------------- */
  stimmen: [
    { text: "Termin gehalten, Preis gehalten, Baustelle sauber hinterlassen. Mehr muss man nicht sagen.", autor: "Familie K., Musterstadt" },
    { text: "Wir hatten einen Schaden am Wochenende – zwei Stunden später stand jemand vor der Tür.", autor: "Hausverwaltung M." },
  ],

  /* --- 10. FAQ ------------------------------------------------------------ */
  faq: [
    { frage: "Wie schnell bekomme ich einen Termin?",
      antwort: "Für Wartung und geplante Arbeiten in der Regel innerhalb von zwei Wochen, bei Störungen meist noch am selben oder nächsten Werktag." },
    { frage: "Was kostet ein Termin vor Ort?",
      antwort: "Die Erstberatung vor Ort ist bei uns kostenfrei, wenn daraus ein Angebot entsteht. Reine Reparatureinsätze rechnen wir nach Aufwand ab." },
    { frage: "In welchem Umkreis sind Sie tätig?",
      antwort: "In Musterstadt und im Umkreis von rund 50 km. Für größere Aufträge kommen wir auch weiter." },
    { frage: "Kann ich den Termin auch abends anfragen?",
      antwort: "Ja. Der Assistent auf dieser Seite nimmt Anfragen rund um die Uhr entgegen und trägt den Termin direkt in unseren Kalender ein." },
  ],

  /* --- 11. KI-Assistent (n8n) --------------------------------------------- *
   * webhookUrl: aus dem n8n-Chat-Trigger kopieren (Production/Chat-URL).
   * Solange sie leer ist, laeuft das Widget sichtbar im Demo-Modus.          */
  chat: {
    webhookUrl:  "https://n8n-dev.askconnect.de/webhook/handwerk-website-chat/chat",
    titel:       "Digitaler Assistent",
    untertitel:  "Fragen & Termine – rund um die Uhr",
    begruessung: "Guten Tag! Ich bin der digitale Assistent von Muster Handwerk. Ich beantworte Fragen zu unseren Leistungen und kann Ihnen direkt einen Termin einbuchen. Wie kann ich helfen?",
    vorschlaege: [
      "Welche Leistungen bieten Sie an?",
      "Ich brauche einen Termin vor Ort",
      "Was kostet ein Einsatz?",
    ],
    launcherText: "Frage stellen",
  },

  /* --- 12. Kontaktformular ------------------------------------------------ *
   * Ohne eigenen Endpunkt oeffnet das Formular eine vorbereitete E-Mail.
   * Alternativ: n8n-Webhook-URL eintragen.                                   */
  formular: {
    endpunkt: "",   // z. B. "https://n8n.deinedomain.de/webhook/kontakt"
  },

  /* --- 13. Rechtliches ---------------------------------------------------- */
  rechtliches: {
    handelsregister:   "HRB 000000, Amtsgericht Musterstadt",
    ustId:             "DE000000000",
    geschaeftsfuehrer: "Max Mustermann",
    aufsichtsbehoerde: "Handwerkskammer Musterstadt",
    instagram:         "",   // z. B. "https://instagram.com/musterbetrieb"
    facebook:          "",
  },
};
