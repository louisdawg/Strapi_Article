# 📰 Strapi Article Frontend

Ein modernes React-Frontend für Strapi-Artikel mit Editorial-Design.

---

## ⚙️ Voraussetzungen

### 1 – PostgreSQL
Datenbank und User anlegen:

```sql
CREATE USER strapi_user WITH PASSWORD 'deinpasswort' LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE DATABASE strapi_db OWNER strapi_user;
GRANT CONNECT ON DATABASE strapi_db TO strapi_user;
\c strapi_db
GRANT ALL ON SCHEMA public TO strapi_user;
```
---

## 📥 Projekt klonen

```bash
git clone https://github.com/louisdawg/Strapi_Article.git
cd Strapi_Article
```

---

## 🔑 .env einrichten

Die `.env` Datei wird **nicht** mit gepusht (enthält Passwörter) – du musst sie selbst anlegen:

```bash
cd my-strapi-project
cp .env.example .env
```

In `my-strapi-project/.env` eintragen:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=deinpasswort
```

Dann `.env` öffnen und die leeren Felder befüllen. Zufällige Strings für die Secrets generieren (5x ausführen):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📁 Projektstruktur

```
Strapi_Article/
├── my-strapi-project/     → Strapi Backend (API + Admin)
└── strapi-frontend/       → React Frontend (Webseite)
```

---

## 🚀 Start

Du brauchst **zwei Terminals gleichzeitig.**

### Terminal 1 – Strapi Backend
```bash
cd my-strapi-project
npm install
npm run develop
```
> ✅ Läuft auf **http://localhost:1337**

### Terminal 2 – React Frontend
```bash
cd strapi-frontend
npm install
npm run dev
```
> ✅ Läuft auf **http://localhost:5173**

---

## 🔧 Strapi Admin einrichten

Öffne **http://localhost:1337/admin** – diese Schritte nur **einmalig** nötig:

### Schritt 1 – API-Berechtigungen setzen
Ohne diesen Schritt bekommst du einen **403 Fehler** im Frontend!

```
Settings → Users & Permissions Plugin → Roles → Public
→ Article → find ✅
→ Article → findOne ✅
→ Save
```

### Schritt 2 – Artikel erstellen
```
Content Manager → Article → + Create new entry
→ Titel & Text eingeben
→ Bild bei coverImage hochladen
→ "Publish" klicken  ←  nicht nur Save!
```

---

## 🌐 URLs

| URL | Beschreibung |
|-----|-------------|
| http://localhost:5173 | React Frontend |
| http://localhost:1337/admin | Strapi Admin Panel |
| http://localhost:1337/api/articles | REST API |

---

## ❗ Häufige Fehler

**„Verbindungsfehler" im Frontend**
→ Strapi läuft nicht, oder API-Berechtigungen fehlen (siehe Schritt 1)

**„403 Forbidden"**
→ Berechtigungen für Public-Rolle nicht gesetzt (siehe Schritt 1)

**„Port 1337 is already used"**
→ Strapi läuft bereits in einem anderen Terminal – dieses schließen oder den Prozess beenden

**„Upgrade Required" im Browser**
→ Anderen Browser verwenden (Firefox empfohlen) oder `Ctrl + Shift + R`

**Frontend zeigt leere Seite**
→ Mindestens einen Artikel **publizieren** (nicht nur speichern)

---

## 📦 Kostenlose Beispielbilder

**https://unsplash.com** – kostenlos herunterladen und in Strapi hochladen
