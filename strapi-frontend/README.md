# Strapi Article Frontend

Ansprechendes React-Frontend für Strapi-Artikel im Editorial-Magazine-Stil.

## Voraussetzungen
- Node.js 18+
- Strapi läuft auf `localhost:1337`
- Strapi Collection Type: **Article** (slug: `articles`)

## Schnellstart

```bash
npm install
npm run dev
```

→ Öffne http://localhost:5173

## Strapi einrichten

### 1. Collection Type „Article"
Stelle sicher, dass dein Strapi-Projekt einen Collection Type `Article` hat mit folgenden Feldern:

| Feld          | Typ          | Hinweise                     |
|---------------|--------------|------------------------------|
| `title`       | Short Text   | Pflichtfeld                  |
| `description` | Text         | Kurzbeschreibung / Teaser    |
| `content`     | Rich Text    | Vollständiger Artikeltext    |
| `coverImage`  | Single Media | 1 Bild für die Kartenansicht |
| `images`      | Multiple Media | Weitere Bilder (optional)  |

### 2. API-Berechtigungen setzen
In Strapi: **Settings → Roles → Public**

Haken setzen bei:
- `Article` → `find` ✅
- `Article` → `findOne` ✅

### 3. Artikel publizieren
Nur **publizierte** Artikel werden angezeigt (Draft-Einträge werden gefiltert).

## Features
- 📰 Erstes Artikel wird als großes Featured-Card hervorgehoben
- 🖼️ Hover-Effekte auf Bilder
- 🔍 Klick öffnet Modal mit vollem Text + allen Bildern (Lazy Load)
- ⌨️ ESC schließt Modal
- 📱 Responsives Grid-Layout
- 🌙 Dunkles Editorial-Design

## Umgebungsvariablen

Kopiere `.env.example` zu `.env`:

```bash
cp .env.example .env
```

Passe an falls Strapi nicht auf Port 1337 läuft:
```
VITE_STRAPI_URL=http://localhost:1337
```
