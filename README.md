# 📰 Strapi Article Frontend

Ein modernes React-Frontend für Strapi-Artikel mit Editorial-Design.

---

## ⚙️ Voraussetzungen

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| npm | kommt mit Node.js | – |

---

## 📁 Projektstruktur

```
Strapi_Article/
├── my-strapi-project/     → Strapi Backend (API + Admin)
└── strapi-frontend/       → React Frontend (Webseite)
```

---

## 🚀 Installation & Start

Du brauchst **zwei Terminals gleichzeitig** – eines für Strapi, eines für das Frontend.

---

### Terminal 1 – Strapi Backend starten

```bash
cd my-strapi-project
npm run develop
```

> ✅ Strapi läuft auf **http://localhost:1337**

---

### Terminal 2 – React Frontend starten

```bash
cd strapi-frontend
npm install
npm run dev
```

> ✅ Frontend läuft auf **http://localhost:5173**

---

## 🔧 Strapi Admin einrichten

Öffne **http://localhost:1337/admin** und mache folgende Schritte **einmalig**:

### Schritt 1 – API-Berechtigungen setzen
Ohne diesen Schritt bekommst du einen **403 Fehler** im Frontend!

```
Settings → Users & Permissions Plugin → Roles → Public
→ Article → find ✅
→ Article → findOne ✅
→ Save klicken
```

### Schritt 2 – Artikel erstellen
```
Content Manager → Article → + Create new entry
→ Titel eingeben
→ Bild bei coverImage hochladen
→ "Publish" klicken (nicht nur Save!)
```

---

## 🌐 Übersicht der URLs

| URL | Beschreibung |
|-----|-------------|
| http://localhost:5173 | React Frontend (Webseite) |
| http://localhost:1337/admin | Strapi Admin Panel |
| http://localhost:1337/api/articles | REST API direkt |

---

## ❗ Häufige Fehler

**„Verbindungsfehler" im Frontend**
→ Strapi läuft nicht, oder API-Berechtigungen fehlen (siehe Schritt 1)

**„403 Forbidden" in der Strapi-Konsole**
→ Berechtigungen für Public-Rolle nicht gesetzt (siehe Schritt 1)

**„Port 1337 is already used"**

Windows:
```bash
netstat -ano | findstr :1337
taskkill /PID <die-angezeigte-PID> /F
```

Arch Linux:
```bash
lsof -i :1337
kill -9 <die-angezeigte-PID>
```

**„Upgrade Required" im Browser**
→ Anderen Browser verwenden (Firefox empfohlen), oder `Ctrl + Shift + R`

**Frontend zeigt leere Seite**
→ Prüfen ob mindestens ein Artikel **publiziert** (nicht nur gespeichert) ist

---

## 📦 Kostenlose Beispielbilder

Auf **https://unsplash.com** findest du kostenlose Bilder zum Herunterladen und in Strapi hochladen.

---

## 🛠️ Arch Linux – Node.js installieren

Falls Node.js noch nicht installiert ist:

```bash
sudo pacman -S nodejs npm
```

Version prüfen:
```bash
node --version   # sollte 18+ sein
npm --version
```
