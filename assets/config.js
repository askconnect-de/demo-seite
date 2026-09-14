/* =========================================================================
   Muster Handwerk – Demoseite für ASK Connect
   Eine Datei für alle Inhalte. Für einen neuen Kunden nur hier anpassen.

   ACHTUNG: Alle Preise, Zeiten und Terminarten hier stammen 1:1 aus der
   Wissensbasis hinter dem Chat-Webhook (siehe wissensbasis/). Wer hier
   etwas ändert, muss die Wissensbasis neu hochladen – sonst widerspricht
   der Assistent der Seite, auf der er sitzt.
   ========================================================================= */

window.SITE = {

  /* --- Betrieb (Kulisse) ----------------------------------------------- */
  betrieb: {
    name:     'Muster Handwerk',
    nameLang: 'Muster Handwerk GmbH',
    claim:    'Ein Ansprechpartner. Alle Gewerke.',
    seit:     2004
  },

  kontakt: {
    strasse:     'Musterstraße 12',
    plz:         '72458',
    stadt:       'Musterstadt',
    telefon:     '07431 987650',
    telefonHref: '+497431987650',
    notdienst:   '0172 1234567',
    mail:        'info@musterhandwerk-demo.de'
  },

  zeiten: [
    { tag: 'Mo – Do',   zeit: '07:00 – 17:00' },
    { tag: 'Freitag',   zeit: '07:00 – 13:00' },
    { tag: 'Sa & So',   zeit: 'Büro geschlossen', zu: true },
    { tag: 'Notdienst', zeit: 'rund um die Uhr' }
  ],

  gebiet: 'Musterstadt und rund 50 km Umkreis – unter anderem Musterhausen, Musterdorf, Musterbach, Musterberg, Beispielstadt, Beispielheim, Beispieltal und Beispielau.',

  /* --- Leistungen ------------------------------------------------------
     frage = wird beim Klick auf den Ask-Knopf direkt an den Bot geschickt.
     Maximal rund 35 Zeichen, sonst wird sie in der Karte abgeschnitten.
     -------------------------------------------------------------------- */
  leistungen: [
    { id:'reparatur', titel:'Reparatur & Störung', icon:'wrench', bild:'sanitaer',
      kurz:'Tropfender Hahn, klemmende Tür, Abfluss dicht – meist noch in derselben Woche.',
      preis:'78 €/Std. netto',
      frage:'Wann könnt ihr vorbeikommen?' },

    { id:'heizung', titel:'Heizung & Wartung', icon:'flame', bild:'heizung',
      kurz:'Wartung, Störungssuche und Austausch – auf Wunsch mit festem Wartungsvertrag.',
      preis:'ab 180 €/Jahr',
      frage:'Was kostet die Wartung?' },

    { id:'bad', titel:'Bad & Sanitär', icon:'droplet', bild:'bad',
      kurz:'Vom einzelnen Waschtisch bis zum kompletten Bad – Planung, Fliesen, Montage.',
      preis:'nach Aufmaß',
      frage:'Was kostet ein neues Bad?' },

    { id:'elektro', titel:'Elektro & Wallbox', icon:'plug', bild:'elektro',
      kurz:'Steckdosen, Verteiler, Beleuchtung – und die Wallbox für die Garage.',
      preis:'nach Aufwand',
      frage:'Bekomme ich eine Wallbox?' },

    { id:'sanierung', titel:'Sanierung & Umbau', icon:'hammer', bild:'putz',
      kurz:'Trockenbau, Boden, Türen, Maler. Wir koordinieren die Gewerke, nicht Sie.',
      preis:'Aufmaß kostenfrei',
      frage:'Termin für ein Aufmaß?' },

    { id:'notdienst', titel:'Notdienst', icon:'alert', bild:'rohre',
      kurz:'Wasseraustritt, Heizungsausfall im Winter, Gasgeruch – rund um die Uhr erreichbar.',
      preis:'24/7 erreichbar',
      frage:'Wasserrohrbruch – was tun?' }
  ],

  weitere: 'Außerdem: Planung und Koordination der beteiligten Gewerke · Neubau und Montage · barrierefreier Umbau · Prüfprotokoll nach jeder Wartung',

  /* --- Der Assistent (unser Produkt) ------------------------------------ */
  chat: {
    webhookUrl:  'https://n8n-dev.askconnect.de/webhook/handwerk-website-chat/chat',
    titel:       'Handwerks-Assistent',
    untertitel:  'Antwortet sofort · 24/7',
    begruessung: 'Guten Tag! Ich bin der digitale Assistent von Muster Handwerk. Ich kenne unsere Leistungen, Stundensätze, Terminarten und den Betriebskalender – fragen Sie mich einfach, oder lassen Sie sich direkt einen Termin einbuchen.',
    begruessungKurz: 'Guten Tag! Ich kenne Stundensätze, Terminarten und den Kalender – fragen Sie mich einfach.',
    vorschlaege: [
      'Was kostet die Wartung?',
      'Termin für ein Aufmaß',
      'Kommt ihr nach Musterbach?',
      'Wasserrohrbruch – was tun?'
    ]
  },

  /* --- Was der Assistent kann (Abschnitt „In Aktion“) -------------------- */
  funktionen: [
    { icon:'clock',    titel:'Antwortet rund um die Uhr',
      text:'Abends, am Wochenende, während alle auf der Baustelle sind – genau dann, wenn im Büro niemand ans Telefon geht.' },
    { icon:'calendar', titel:'Bucht selbstständig Termine',
      text:'Er kennt Ihre Terminarten samt Dauer – Aufmaß 60 Minuten, Störung 120 – prüft den Kalender und trägt verbindlich ein.' },
    { icon:'phone',    titel:'Vergibt Rückruf-Zeitfenster',
      text:'Gehört ein Anliegen ans Telefon, bietet er kurze Fenster an, zu denen Sie laut Kalender wirklich können.' },
    { icon:'shield',   titel:'Erfindet keine Preise',
      text:'Er antwortet nur aus Ihrer freigegebenen Wissensbasis. Für ein neues Bad nennt er keine Summe, sondern schlägt ein Aufmaß vor.' },
    { icon:'database', titel:'Nimmt alles vollständig auf',
      text:'Name, Telefon, Einsatzadresse, Anliegen – kein Zettel mehr, auf dem die Hausnummer fehlt.' },
    { icon:'alert',    titel:'Erkennt Notfälle',
      text:'Bei Wasseraustritt oder Gasgeruch bucht er nichts, sondern nennt sofort Ihre Notdienstnummer.' }
  ],

  /* --- Bilder (Unsplash-IDs, einzeln abgerufen und angesehen) ------------ */
  bilder: {
    hero:        'photo-1426927308491-6380b6a9936f',
    meister:     'photo-1713652425093-47778c267769',
    werkzeug:    'photo-1505495533616-ed5f6ce6d4f9',
    sanitaer:    'photo-1676210134188-4c05dd172f89',
    heizung:     'photo-1676210132787-7ed33de174d6',
    heizkoerper: 'photo-1599028274511-e02a767949a3',
    elektro:     'photo-1621905251189-08b45d6a269e',
    bad:         'photo-1763485956310-55f3c0e822d5',
    putz:        'photo-1768839725085-829e6ac7ac26',
    rohbau:      'photo-1768321901750-f7b96d774456',
    baustelle:   'photo-1694521787799-ad4ad241cb39',
    holz:        'photo-1687422810663-c316494f725a',
    dach:        'photo-1780445392484-5fb7d5610708',
    rohre:       'photo-1748442001865-5583ec02ae22',
    abend:       'photo-1776222075392-f84395eff09c'
  },

  /* --- Anbieter --------------------------------------------------------- */
  anbieter: {
    name:  'ASK Connect',
    claim: 'KI-Assistenten für Handwerksbetriebe',
    mail:  'info@askconnect.de'
  },

  /* --- Pakete -----------------------------------------------------------
     Vier eigenständige Angebote, keine Stufenleiter.
     spanne = einmalige Einrichtung · monat = laufender Betrieb
     -------------------------------------------------------------------- */
  pakete: [
    {
      name:   'Social-Media-Autopilot',
      fuer:   'Nur Marketing – auch ohne Assistent buchbar.',
      spanne: '399 – 599 €',
      monat:  '34,99 €',
      top:    false,
      punkte: [
        'Beiträge für Instagram und Facebook',
        'Vorher-nachher vom Bad, ohne Textarbeit',
        'Ein Foto von der Baustelle genügt',
        'Freigabe vor jeder Veröffentlichung'
      ]
    },
    {
      name:   'Website-Assistent',
      fuer:   'Der Einstieg: Fragen und Termine auf Ihrer Seite.',
      spanne: '399 – 599 €',
      monat:  '39,99 €',
      top:    false,
      punkte: [
        'Assistent in Ihrem Erscheinungsbild',
        'Antworten nur aus Ihrer Wissensbasis',
        'Termine direkt in Google Kalender',
        'Wahlweise nur Rückruf-Zeitfenster'
      ]
    },
    {
      name:   'Assistent + WhatsApp',
      fuer:   'Erreichbar auf dem Kanal, den Ihre Kunden nutzen.',
      spanne: '699 – 999 €',
      monat:  '49,99 €',
      top:    true,
      punkte: [
        'Alles aus dem Website-Assistenten',
        'Ihre Büronummer wird angebunden',
        'Erinnerung an Wartung und Prüftermine',
        'Terminerinnerung am Vortag'
      ]
    },
    {
      name:   'All-in',
      fuer:   'Alles zusammen – Anfragen und Marketing.',
      spanne: '1.099 – 1.399 €',
      monat:  '69,99 €',
      top:    false,
      punkte: [
        'Alles aus „Assistent + WhatsApp“',
        'Plus kompletter Social-Media-Autopilot',
        'Günstiger als beide Pakete einzeln',
        'Quartalsgespräch zur Feinjustierung'
      ]
    }
  ],

  /* --- Ablauf der Zusammenarbeit ---------------------------------------- */
  ablauf: [
    { titel:'Kostenloses Erstgespräch',
      text:'20 bis 30 Minuten am Telefon oder bei Ihnen im Büro. Sie erzählen, wie Anfragen hereinkommen und was am meisten Zeit frisst. Danach wissen Sie, ob sich das für Ihren Betrieb lohnt – unverbindlich und ohne Kosten.' },
    { titel:'Wir schauen uns Ihren Alltag an',
      text:'Welche Fragen kommen jeden Tag? Wie viele Anrufe gehen verloren, während alle auf der Baustelle sind? Wir suchen die zwei, drei Stellen mit dem größten Hebel – statt Ihren ganzen Betrieb umzukrempeln.' },
    { titel:'Sie bekommen ein festes Angebot',
      text:'Ein Vorschlag mit klarem Umfang, festem Preis und benannten laufenden Kosten. Keine Stundenzettel, keine Überraschungen auf der Rechnung.' },
    { titel:'Wir richten alles ein',
      text:'Wir sammeln Ihre Unterlagen ein – Stundensätze, Terminarten, Einsatzgebiet, häufige Fragen –, bauen den Assistenten und binden ihn in Ihre Website ein. Ihr Aufwand: ein bis zwei Termine, den Rest machen wir.' },
    { titel:'Zwei Wochen testen – das Risiko liegt bei uns',
      hervor: true,
      text:'Sie und Ihr Team probieren alles in Ruhe aus und sagen uns, wo die Antworten noch nicht passen. Überzeugt es Sie nicht, geben Sie es zurück – vom Einrichtungspreis zahlen Sie dann keinen Cent. Offen bleiben nur die Kosten, die im Testbetrieb wirklich angefallen sind, etwa für Hosting und KI-Nutzung.' },
    { titel:'Wir bleiben erreichbar',
      text:'Nach dem Start schauen wir gemeinsam, was gut läuft und was noch fehlt. Wenn etwas hakt, sind wir kurzfristig für Sie da – und erweitern die Lösung, wenn Ihr Betrieb wächst.' }
  ]
};
