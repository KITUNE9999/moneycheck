# Review Checklist

Severity: **F** = FAIL (must fix before merge) / **W** = WARN (recommended)

---

## UI Design Philosophy

> **Override Check**: CLAUDE.md に `## UI Design Override` セクションが設定されている場合、
> そちらの方針を優先する。このセクションのデフォルトルールは無視してよい。

### Default: Warmth over Polish
The owner's baseline preference is **warmth over polish**.
Every UI should feel human-made, not AI-generated.

### Core Principles (default)
- Prioritize **warmth and approachability** over sleekness or minimalism
- Information should feel **spacious**, not packed
- Interactions should feel **tactile** — buttons should look pressable

### Always Avoid (F-level — unless overridden in CLAUDE.md)
| Pattern | Why it fails |
|---------|-------------|
| Glassmorphism (frosted blur panels) | Feels cold, trendy, soulless |
| Blue-purple gradients | The "ChatGPT aesthetic" — immediately feels AI-generated |
| Font weight 300 or below | Too thin, feels clinical |
| Pure white backgrounds (#FFFFFF) | Harsh, sterile — use off-white (#FAFAF8 or similar) |
| Pure black text (#000000) | Too stark — use dark brown or dark gray |
| Full dark theme with glowing accents | Feels like a developer tool, not a warm product |

### Recommended Defaults (W-level — unless overridden in CLAUDE.md)
| Element | Guideline |
|---------|-----------|
| Border radius | 12px minimum; prefer 16px+ for cards and buttons |
| Button style | Slightly raised (subtle shadow + soft gradient), scale 0.97 on active |
| Color tone | Warm neutrals, earth tones, muted pastels — avoid cold grays |
| Font weight | 400–600 range; 700 for emphasis only |
| Animation easing | ease-out or spring — never linear |
| Background | Off-white or warm light tone as base |

---

## Architecture (A) — always apply
| Code | Rule | Sev |
|------|------|-----|
| `A01` | No business logic in Controller | F |
| `A02` | No direct Model access from Controller | F |
| `A03` | Service layer exists | F |
| `A04` | Repository layer exists | F |

## Security (S) — always apply
| Code | Rule | Sev |
|------|------|-----|
| `S01` | No SQL injection risk | F |
| `S02` | No XSS risk | F |
| `S03` | No mass assignment vulnerability | F |
| `S04` | Authorization checks present | W |
| `S05` | Personally identifiable data is encrypted | F |

## Quality (Q) — always apply
| Code | Rule | Sev |
|------|------|-----|
| `Q01` | No function/class exceeds 500 lines | F |
| `Q02` | No DRY violations | W |
| `Q03` | No dead code | W |
| `Q04` | Validation is sufficient | W |

## UI (U) — apply only when UI files are changed
| Code | Rule | Sev |
|------|------|-----|
| `U01` | Project design system colors used (no arbitrary colors) | F |
| `U02` | Project design system fonts used | F |
| `U03` | Framework conventions followed | F |
| `U04` | Page title styling matches design system | W |
| `U05` | Design system utility classes used | W |
| `U06` | No "AI aesthetic" patterns (see UI Design Philosophy) — **skip if CLAUDE.md overrides** | F |
| `U07` | Warmth principles followed — **skip if CLAUDE.md overrides** | W |

## Mobile (M) — apply only when mobile files are changed
| Code | Rule | Sev |
|------|------|-----|
| `M01` | Location/camera permissions requested correctly | F |
| `M02` | Both iOS and Android verified | F |
| `M03` | Offline behavior considered | W |

## Privacy (P) — apply when handling personal or location data
| Code | Rule | Sev |
|------|------|-----|
| `P01` | Data retention period and deletion policy defined | F |
| `P02` | User consent flow implemented | F |
