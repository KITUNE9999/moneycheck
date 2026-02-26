# Accessibility Guidelines

> Read this file when the project has any user-facing UI (web, mobile, PWA).

---

## Core Principles

Accessibility is not optional polish — it is basic respect for users.
A product that is hard to use for someone with a visual or motor impairment
is also hard to use for someone in bright sunlight, on a small screen, or in a hurry.

---

## Visual

| Rule | Standard | Sev |
|------|----------|-----|
| Text contrast ratio (normal text) | ≥ 4.5:1 against background | F |
| Text contrast ratio (large text ≥18px) | ≥ 3:1 against background | F |
| Never convey information by color alone | add icon or text label | F |
| Font size minimum | 14px body, 12px captions | W |
| Don't rely on placeholder text as labels | use visible labels | W |

---

## Touch / Interaction

| Rule | Standard | Sev |
|------|----------|-----|
| Minimum tap target size | 44×44px (Apple) / 48×48dp (Google) | F |
| Adequate spacing between tap targets | ≥ 8px gap | W |
| No actions triggered on hover only | must work on tap/click too | F |
| Swipe gestures must have button alternatives | | W |

---

## Content

| Rule | Sev |
|------|-----|
| All images have meaningful alt text (or empty alt="" if decorative) | F |
| Error messages explain what went wrong and how to fix it | F |
| Loading states are communicated (spinner, skeleton, message) | W |
| Destructive actions require confirmation | W |

---

## Forms

| Rule | Sev |
|------|-----|
| Every input has a visible label | F |
| Validation errors appear next to the relevant field | F |
| Required fields are clearly marked | W |
| Autocomplete attributes set where appropriate | W |

---

## Checklist (add to review.json for UI tasks)

| Code | Rule | Sev |
|------|------|-----|
| `AC01` | Text contrast ratio meets minimum | F |
| `AC02` | Tap targets are at least 44×44px | F |
| `AC03` | Color is not the sole indicator of meaning | F |
| `AC04` | All images have alt text | F |
| `AC05` | Error messages are descriptive and actionable | F |
| `AC06` | Loading states are communicated | W |
