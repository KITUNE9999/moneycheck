# Privacy Guidelines

> Read this file when the project handles any personal data (names, emails, location, payment info, etc.)

---

## Core Principles

1. **Collect minimum necessary data only** — if you don't need it, don't collect it
2. **Be explicit about purpose** — every data field must have a clear reason
3. **User controls their data** — view, export, delete must always be possible
4. **Secure by default** — encrypt sensitive fields, never log personal data

---

## Data Classification

| Class | Examples | Required handling |
|-------|----------|-------------------|
| **Critical** | passwords, payment info, gov IDs | encrypt at rest + in transit, never log |
| **Sensitive** | location, health, biometrics | encrypt at rest, explicit consent required |
| **Personal** | name, email, phone | store securely, deletable on request |
| **Behavioral** | usage logs, click history | anonymize or aggregate before storing |

---

## Consent Rules

- Obtain explicit consent **before** collecting sensitive data
- Consent UI must be: clear, unticked by default, not buried in terms
- Record consent with timestamp and version
- Allow withdrawal of consent at any time

---

## Data Retention

- Define retention period for every data type at design time
- Implement automated deletion or anonymization at expiry
- User-initiated account deletion must purge all personal data within 30 days

---

## What Claude Must Never Do

- Hardcode personal data in source code or config files
- Log sensitive fields (passwords, tokens, location coordinates)
- Send personal data to third-party services without disclosure
- Use personal data for purposes beyond what was consented to
- Store unnecessary data "just in case"

---

## Checklist (add to review.json for privacy-sensitive tasks)

| Code | Rule | Sev |
|------|------|-----|
| `P01` | Data retention period defined for every personal data type | F |
| `P02` | User consent flow implemented before sensitive data collection | F |
| `P03` | Personal data encrypted at rest | F |
| `P04` | No personal data in logs | F |
| `P05` | User can delete their own data | F |
| `P06` | Third-party data sharing disclosed in privacy policy | W |
