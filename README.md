# Movie Watchlist - Übung 6

SvelteKit-Anwendung aus Prototyping mit Bootstrap und MongoDB.
Die eigene Lösung aus Übung 5 wurde für Übung 6 erweitert.

## Starten

1. `npm ci` ausführen.
2. `.env.example` als `.env` kopieren und den eigenen MongoDB-Connection-String als `DB_URI` eintragen.
3. In MongoDB die Datenbank `ScreenStackDB` und die Collection `movies` verwenden.
   Bei einer neuen Datenbank können die Moodle-Demodaten aus `data/movies.json` in Compass importiert werden.
4. `npm run dev` starten und die im Terminal angezeigte lokale Adresse öffnen.

Die persönliche `.env` ist lokal bereits vorhanden. Sie ist aus der Abgabe-ZIP ausgeschlossen.
Für eine andere Installation müssen eigene Datenbank-Zugangsdaten eingetragen werden.
Die Datenbank muss für den jeweiligen Rechner erreichbar sein.

## Umsetzung der Aufgabe

- **a-d:** MongoDB-Datenbank, `DB_URI` in `src/env.js`, MongoDB-Treiber und Datenbankfunktionen.
- **e:** `/movies` lädt die Filme mit einer serverseitigen `load`-Funktion aus MongoDB.
- **f:** Ein Klick auf Filmtitel oder Poster öffnet `/movies/[id]`.
  Die Detailseite lädt den Film über `db.getMovie(params.id)` und zeigt Poster, Titel, Jahr, Dauer und Besetzung.
- **g:** `/movies/create` enthält ein Formular für Titel, Jahr, Dauer und eine optionale Poster-Adresse.
  Die Form Action prüft die Angaben auf dem Server, speichert den Film mit `db.createMovie`
  und leitet mit Status 303 zur Detailseite weiter.
- **h (optional):** Auf der Detailseite kann der Löschbereich aufgeklappt und der Film gelöscht werden.
  Anschließend erfolgt die Weiterleitung nach `/movies`.

Neue Filme erhalten eine leere Besetzung und `watchlist: false`.
Ohne Poster-Adresse verwendet die Anwendung `static/images/placeholder.jpg`.
Ein angegebenes Poster wird beibehalten. Für Demofilme ohne lokal vorhandene Bilddatei
wird ebenfalls der Moodle-Platzhalter angezeigt. Externe Bilder werden über ihre HTTP(S)-Adresse geladen;
ein Bild-Upload ist nicht vorgesehen.

## Wichtige Dateien

- `src/lib/db.js`: MongoDB-Zugriff und Umwandlung von ObjectIds in Strings.
- `src/routes/movies/+page.server.js`: Filmübersicht aus der Datenbank laden.
- `src/routes/movies/[id]/+page.server.js`: Film laden und Löschaktion ausführen.
- `src/routes/movies/create/+page.server.js`: Form Action und Eingabeprüfung.
- `src/lib/components/MovieCard.svelte`: Filmkarte mit Link zur Detailseite.
- `src/lib/components/MoviePoster.svelte`: Wiederverwendbares Poster mit Bildersatz bei Ladefehlern.
- `src/routes/+error.svelte`: Fehlermeldung für unbekannte IDs und andere Fehler.

## Prüfen

```sh
npm run check
npm run build
```

## GitHub und Netlify

Dieses Repository enthält die Movie Watchlist aus Übung 6. Netlify baut den
Branch `main` automatisch mit `npm run build` und veröffentlicht `build/`.
Der Netlify-Adapter erzeugt die Serverfunktion für Datenbankzugriffe und Form Actions.

Auf Netlify muss `DB_URI` als Umgebungsvariable für Builds und Functions
konfiguriert sein. Der Wert gehört niemals ins Repository oder in `netlify.toml`.
Die MongoDB muss vom Deployment aus erreichbar sein.

Die Anwendung ist unter `/` erreichbar; die Filmliste liegt unter `/movies`.
Lokale Poster werden bereits beim Build erfasst, damit die Serverfunktion
keinen Zugriff auf das lokale Verzeichnis `static/images` benötigt.

Manueller Funktionstest: Übersicht öffnen, Filmtitel anklicken, einen Film erfassen,
zur Übersicht zurückgehen und den neuen Film über die Detailseite wieder löschen.

Die Abgabe enthält den Quellcode, die Bilddateien, das Lockfile und die Konfigurationsdateien.
`node_modules`, `.svelte-kit`, Build-Ausgaben und persönliche Zugangsdaten sind nicht enthalten.
