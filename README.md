# Protect Us With Love — Web App 💝

**A simple, accessible web app for seniors to stay connected with their families.**

🌐 **Live Demo**: https://yourusername.github.io/protectusafewithlove

---

## Features

- 📱 **Mobile-First Design** — Optimized for phones and tablets
- ♿ **Senior-Friendly UI** — Large buttons, big text, high contrast
- 🌍 **Multi-Language** — English, Chinese, Burmese supported
- 🆘 **SOS Emergency Button** — Hold for 1.5 seconds to alert family
- ❤️ **Daily Check-In** — Let family know you're okay
- 💊 **Medication Tracking** — Mark medications as taken
- 💬 **Family Messages** — Read aloud feature for easy listening
- 📊 **Health Vitals** — Track blood pressure, heart rate, and more
- 📍 **Location Sharing** — Optional location sharing with family
- 🔤 **Adjustable Text Size** — Normal, Large, Extra-Large
- 💾 **Offline Support** — Data stored locally, works without internet
- 🔊 **Text-to-Speech** — Listen to messages instead of reading

---

## Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/protectusafewithlove.git
cd protectusafewithlove-web

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Deploy to GitHub Pages

### Option 1: Automatic (Recommended)

1. **Fork this repository**
2. **Go to Settings → Pages**
3. **Under "Source", select "GitHub Actions"**
4. **Push to `main` branch**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/protectusafewithlove
```

### Option 2: Manual

```bash
# Build the app
npm run build

# Install gh-pages
npm install gh-pages

# Deploy to GitHub Pages
npm run deploy
```

---

## Customization

### Change App Name

Edit `index.html`:
```html
<title>Your App Name 💝</title>
```

### Update Colors

Edit `src/index.css` — change the CSS variables:
```css
:root {
  --color-primary: #E8735A;
  --color-secondary: #4E9F9F;
  /* ... */
}
```

### Change User Name

The app uses local storage. To change the user's name:
1. Open the app in your browser
2. Go to Settings (⚙️)
3. Click "Edit Name"

---

## How It Works

### Data Storage

All data is stored in the browser's **localStorage**:
- User profile (name, phone)
- Check-ins
- Medications
- Messages
- Health vitals
- Settings

**No server required!** Perfect for testing or small family use.

### For Production Use

For a real production app with multiple users:

1. **Add Firebase** — See the main `protectusafewithlove` project
2. **Enable Auth** — Phone authentication for seniors
3. **Real-time sync** — Family sees updates instantly
4. **Push notifications** — Get alerted for SOS, missed check-ins

---

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Safari (iOS)
- ✅ Chrome for Android

---

## Accessibility

This app is designed for seniors with accessibility in mind:

- **WCAG 2.1 AA compliant**
- **Touch targets ≥ 64px**
- **Color contrast ≥ 4.5:1**
- **Keyboard navigation support**
- **Screen reader friendly**
- **Text resizable up to 200%**
- **Reduced motion support**

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast builds
- **CSS Variables** — Easy theming
- **Web Speech API** — Text-to-speech
- **LocalStorage** — Data persistence

---

## Project Structure

```
protectusafewithlove-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── CheckIn.tsx
│   │   ├── Medications.tsx
│   │   ├── Messages.tsx
│   │   ├── Health.tsx
│   │   ├── Settings.tsx
│   │   └── SOS.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Contributing

Contributions welcome! Please read the main project's [CONTRIBUTING.md](../docs/CONTRIBUTING.md).

---

## License

MIT — See [LICENSE](../LICENSE)

---

*Built with ❤️ for families everywhere.*
