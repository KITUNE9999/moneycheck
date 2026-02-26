# App Store Guidelines

> Read this file when mobile = React Native (iOS App Store + Google Play Store).
> Skip this file for PWA projects.

---

## Submission Checklist

### Both Stores
- [ ] App icon: 1024×1024px, no transparency, no rounded corners (stores apply their own)
- [ ] Screenshots: required for every device size category
- [ ] Privacy policy URL: required if app collects any data
- [ ] Age rating: set accurately — wrong rating = rejection
- [ ] All external links working at time of submission

### iOS App Store (Apple)
- [ ] No mention of Android or Google Play in the app
- [ ] No external payment links (must use Apple IAP for digital goods)
- [ ] Location permission string is descriptive ("Used to track your walking route")
- [ ] All requested permissions are actually used — unused = rejection
- [ ] App must function without account creation for basic features
- [ ] Minimum iOS version declared in Xcode matches actual support

### Google Play Store
- [ ] Target SDK = latest required Android version
- [ ] Data safety form completed accurately
- [ ] If app targets children: COPPA compliance required
- [ ] Permissions declared in AndroidManifest match actual usage

---

## Common Rejection Reasons

| Reason | How to avoid |
|--------|-------------|
| Broken links or placeholder content | Test every screen before submission |
| Misleading app description | Match description to actual features |
| Requesting excessive permissions | Only request what you actually use |
| Crashes on review device | Test on clean install, not just dev build |
| Payment outside Apple IAP | Use IAP for all in-app purchases |
| Privacy policy missing or vague | Write a real policy, not a template |
| App too similar to built-in apps | Ensure clear value differentiation |

---

## Review Timeline

| Store | Typical first review | Expedited option |
|-------|---------------------|-----------------|
| Apple App Store | 1–3 business days | Yes (request via App Store Connect) |
| Google Play | A few hours to 3 days | No |

**Plan for at least 2 weeks from first submission to public release (rejections + fixes).**

---

## In-App Purchase Rules

- Digital goods and subscriptions **must** use platform IAP (Apple / Google)
- Physical goods and services (e.g. taxi, food delivery) are exempt
- Apple takes 30% (15% for small developers / subscriptions after year 1)
- Google takes 30% (15% for first $1M/year)

---

## Checklist

| Code | Rule | Sev |
|------|------|-----|
| `AS01` | All permissions strings are descriptive and accurate | F |
| `AS02` | App functions without mandatory account creation | F |
| `AS03` | Privacy policy URL is live and accurate | F |
| `AS04` | No placeholder content or broken links | F |
| `AS05` | IAP used for all digital purchases | F |
| `AS06` | Screenshots prepared for all required device sizes | W |
| `AS07` | App tested on clean install (not just dev build) | W |
