# Product Vision — {PROJECT_NAME}

## Why We Exist
{WHY_WE_EXIST}
— derived from interview Q1

## Core Insight
- {INSIGHT_1} — from existing services or personal experience
- {INSIGHT_2}
- {INSIGHT_3}

## Primary Target
**"{PRIMARY_TARGET_PERSONA}"**
- {TRAIT_1}
- {TRAIT_2}
- Willing to pay ¥{PRICE}/month
- {TRAIT_3}

## Secondary Target
- {SECONDARY_1}
- {SECONDARY_2}

## Core Value (in priority order)
1. **{VALUE_1}** — {VALUE_1_DESC}
2. **{VALUE_2}** — {VALUE_2_DESC}
3. **{VALUE_3}** — {VALUE_3_DESC}

## Differentiation
| Competitor | Weakness | {PROJECT_NAME} Advantage |
|------------|----------|--------------------------|
| {COMPETITOR_1} | {WEAKNESS_1} | {ADVANTAGE_1} |
| {COMPETITOR_2} | {WEAKNESS_2} | {ADVANTAGE_2} |
| {COMPETITOR_3} | {WEAKNESS_3} | {ADVANTAGE_3} |

**Unique position: "{UNIQUE_POSITION}"**

## Feature Priority

### Must (MVP — build first)
- {MUST_1}
- {MUST_2}
- {MUST_3}

### Should (add in beta)
- {SHOULD_1}
- {SHOULD_2}
- {SHOULD_3}

### Could (growth phase)
- {COULD_1}
- {COULD_2}

### Won't (out of scope)
- {WONT_1}
- {WONT_2}

## Monetization
- **Model**: {subscription|ads|one-time} — {reasoning from Q7}
- **Free**: {FREE_FEATURES}
- **Premium ¥{PRICE}/month**: {PREMIUM_FEATURES} *(if subscription)*
- **Ad placement**: {AD_STRATEGY} *(if ads)*
- **Future**: {FUTURE_MONETIZE}

## SaaS Dependency Map
| Service | Purpose | Free tier limit | Monthly cost at scale | Alternative |
|---------|---------|----------------|----------------------|-------------|
| {SERVICE_1} | {PURPOSE} | {FREE_LIMIT} | {COST_AT_SCALE} | {ALT} |

## Roles
| Role | Person |
|------|--------|
| Final decisions & funding | {OWNER_NAME} |
| All design, implementation, improvement proposals | Claude (agent team) |
| External API billing setup | {OWNER_NAME} |

## Claude's Autonomy Level

### Claude can decide independently
- Code implementation details and file structure
- Minor UI improvements within the design system
- Refactoring and code quality improvements
- Test coverage additions
- Bug fixes with clear root cause

### Claude must confirm with owner before proceeding
- Any action that incurs new API or SaaS costs
- Changing the monetization model or pricing
- Removing or significantly changing existing features
- Adding third-party services or SDKs
- Schema changes that require data migration
- Scope changes beyond the current task

### Claude must stop and report immediately
- review.json FAIL after 3 attempts
- Security vulnerability found (S01-S05)
- Conflicting requirements between files
- `{variable}` placeholder found in production code

## KPIs
- 3 months: {KPI_3M}
- 6 months: {KPI_6M}
- 1 year: {KPI_1Y}
