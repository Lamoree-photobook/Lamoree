# 📖 Photobook Website

A clean, minimal photobook landing page with cart + WhatsApp/Telegram order flow.

---

## 🚀 Run Locally

You only need **Node.js** installed (no npm install required — zero dependencies).

```bash
# 1. Open a terminal in this folder
cd photobook-site

# 2. Start the dev server
node server.js

# 3. Open your browser
# → http://localhost:3000
```

---

## ✏️ How to Edit Content

All text is in **`public/index.html`**. Look for the `<!-- EDIT: ... -->` comments.

### Things to change:
| What | Where in HTML |
|------|---------------|
| Book title | `hero__title` section |
| Description | `hero__desc` |
| Book specs (pages, size) | `hero__meta` |
| Your story/about text | `about` section |
| Product names & prices | `product__cards` section |
| FAQ answers | `faq__list` section |
| Brand name | `nav__logo`, `footer__logo` |
| Social links | `footer__links` |

---

## 📸 Adding Your Images

Drop images into the `public/images/` folder, then replace the placeholder `<div>` tags in the HTML with:

```html
<img src="images/your-file.jpg" alt="Description of image" />
```

### Image slots:
| Slot | Recommended size |
|------|-----------------|
| `cover.jpg` | 600×800px (book cover) |
| `about.jpg` | 800×500px |
| `preview1–5.jpg` | 800×600px each |
| `standard.jpg` | 600×400px |
| `signed.jpg` | 600×400px |
| `bundle.jpg` | 600×400px |

---

## ⚙️ Configure WhatsApp & Telegram

Open **`public/js/main.js`** and edit the `CONFIG` block at the top:

```js
const CONFIG = {
  whatsappNumber: "60123456789",   // ← your number (no + or spaces)
  telegramUsername: "yourusername", // ← your Telegram @handle
  currency: "RM",                   // ← your currency symbol
};
```

---

## 🌐 Deploy to GitHub Pages

1. Push the contents of the `public/` folder to your GitHub repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder (or `/docs` if you rename `public` → `docs`)
4. Your site will be live at `https://yourusername.github.io/repo-name`

> **Note:** GitHub Pages serves static files only — the `server.js` is just for local preview and is not needed for hosting.

---

## 📁 File Structure

```
photobook-site/
├── public/              ← everything in here goes on GitHub Pages
│   ├── index.html       ← main page (all your text edits go here)
│   ├── css/
│   │   └── style.css    ← all styling
│   ├── js/
│   │   └── main.js      ← cart logic, order form, WhatsApp/Telegram
│   └── images/          ← drop your photos here
│       └── (your images)
├── server.js            ← local dev server (not needed for GitHub Pages)
├── package.json
└── README.md
```
