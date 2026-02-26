# Project Interview Protocol

> **このファイルは初回セッション専用です。**
> インタビュー完了後は使用しません。

## Purpose
When starting a new project, Claude reads this file and conducts an interview.
The owner only needs to answer. Claude will auto-generate `product-vision.md` from the responses.

---

## Phase 1: Uncover the Motivation (required — 2 questions)

**Q1. Why do you want to build this?**
- Goal: Identify whether this is "I was frustrated", "Someone else is struggling", or "I see a business opportunity"
- Follow-up: "When did you notice this?" / "In what situation?"

**Q2. How are you solving this problem today? (Or are you unable to solve it?)**
- Goal: Understand existing alternatives and their limitations
- Follow-up: "What's frustrating about the current solution?"

---

## Phase 2: Define the Target (required — 2 questions)

**Q3. Who is the very first person you want to use this?**
- Goal: Classify target as "myself" or "someone else"
- Follow-up: "Their age, job, lifestyle?" / "Is this person you?"

**Q4. Would they pay for it? How much per month?**
- Goal: Confirm monetization potential and price range
- Follow-up: "Would they use it for free? Would they leave if it became paid?"

---

## Phase 3: Surface Emotions and Experiences (optional — 1-2 questions)

**Q5. Is there a similar service or experience you thought was great?**
- Goal: Extract UI/UX/gamification/emotional hints

**Q6. If this existed, what would "success" look like to you?**
- Goal: Clarify KPIs and success image

---

## Phase 4: Monetization Model (required — 1 question)

**Q7. How do you want to make money from this?**
- Goal: Determine subscription, one-time purchase, or ad-based model

### Monetization Decision Table
| Condition | Recommended model |
|-----------|------------------|
| Users get continuous/daily value | Subscription |
| BtoB / productivity / professional tool | Subscription |
| Ads would damage UX | Subscription |
| Users visit occasionally | Ads |
| Broad free reach creates the value | Ads |
| One-time tool with no ongoing service | One-time purchase |

### SaaS Dependency Policy
The owner prefers to minimize reliance on paid third-party SaaS where possible.
When proposing a tech stack, always flag:
- Which services have free tiers and their limits
- Which services have no viable self-hosted alternative
- Total estimated monthly cost at 1,000 / 10,000 / 100,000 users

---

## Instructions for Claude (execute after interview)

1. Fill in all `{variables}` in `product-vision.md` based on answers
2. Determine monetization model using Q7 + decision table; document reasoning
3. Select and move needed agents from `agents-optional/` → `agents/` using the guide below
4. Select and move needed skills from `skills/optional/` → `skills/`
5. Recommend a tech stack with SaaS cost transparency
6. Fill in `{variables}` in `CLAUDE.md` (including UI Design Override)
7. Rewrite `README.md` and `HOW_TO_USE.md` with project-specific content
8. Initialize `progress.md`
9. Present the completed setup to the owner for confirmation

## Agent Selection Guide
| Project type | Move these agents |
|-------------|-------------------|
| External data ingestion | data-engineer.md |
| Video/media pipeline | video-pipeline-engineer.md |
| Long-term project (3+ months) | strategy-advisor.md |
| Mobile app | mobile-engineer.md |
| User-facing UI | uiux-designer.md |
| Business automation / BtoB | workflow-engineer.md |

## Skill Selection Guide
| Condition | Move these skills |
|-----------|-------------------|
| Project has user-facing UI | accessibility.md |
| Mobile = React Native | app-store.md |
| Mobile = PWA | pwa.md |
| Handles personal data | privacy.md |
