# PWA Guidelines

> Read this file when mobile = PWA (Progressive Web App).
> Skip this file for React Native or native app projects.

---

## What PWA Can and Cannot Do

### PWA Strengths
- No App Store approval needed — instant deployment
- Works on any device with a browser
- Can be "installed" to home screen
- Offline support via Service Worker

### PWA Limitations (know before you commit)
| Feature | PWA | React Native |
|---------|-----|-------------|
| Background GPS tracking | ❌ iOS limited, Android OK | ✅ |
| Pedometer / step count | ❌ not reliable | ✅ |
| Push notifications | ⚠️ iOS 16.4+ only | ✅ |
| Camera / microphone | ✅ | ✅ |
| Bluetooth / NFC | ❌ | ✅ |
| App Store presence | ❌ | ✅ |
| Offline-first | ✅ with Service Worker | ✅ |

**If the project requires background GPS or step counting → reconsider React Native.**

---

## Required PWA Implementation

### manifest.json (minimum)
```json
{
  "name": "{PROJECT_NAME}",
  "short_name": "{SHORT_NAME}",
  "start_url": "/",
  "display": "standalone",
  "background_color": "{BG_COLOR}",
  "theme_color": "{THEME_COLOR}",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker (minimum)
- Cache static assets on install
- Network-first strategy for API calls
- Fallback offline page for navigation requests

### HTTPS
- PWA requires HTTPS — ensure hosting supports it (XSERVER, Vercel, Netlify all do)

---

## iOS-Specific Gotchas

- Safari does not support Web Push before iOS 16.4 — inform users
- PWA on iOS loses state when removed from memory — design for this
- `<meta name="apple-mobile-web-app-capable" content="yes">` required for standalone mode
- Splash screen requires specific apple-touch-startup-image meta tags

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.0s |
| Lighthouse PWA score | ≥ 90 |
| Offline fallback | must exist |

---

## Checklist

| Code | Rule | Sev |
|------|------|-----|
| `PWA01` | manifest.json present and valid | F |
| `PWA02` | Service Worker registered and caching static assets | F |
| `PWA03` | HTTPS enforced | F |
| `PWA04` | Offline fallback page exists | F |
| `PWA05` | iOS meta tags present | W |
| `PWA06` | Lighthouse PWA score ≥ 90 | W |
