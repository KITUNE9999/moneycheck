# MoneyCheck

**Concept**: 夫婦で使えるシンプル家計簿PWA
**Core Value**: 簡単入力・見える化・二人で共有

## Stack
| Layer | Tech |
|-------|------|
| FE | HTML + CSS + vanilla JS |
| BE | Google Apps Script |
| DB | Google Spreadsheet |
| Host | GitHub Pages |
| Mobile | PWA |
| Dev | Antigravity + Claude Code CLI |

## Session Start (run at the beginning of every session)

### First session only (product-vision.md still contains {variables})
1. Read `docs/setup/interview.md`
2. Conduct the interview with the owner
3. Fill in all `{variables}` in the following files:
   - `.claude/skills/product-vision.md`
   - `docs/progress.md`
   - `CLAUDE.md` (Stack, Agents, Git Rules, UI Design Override)
4. Select and move needed agents from `agents-optional/` → `agents/`
5. Select and move needed skills from `skills/optional/` → `skills/`
6. Rewrite `README.md` and `HOW_TO_USE.md` with project-specific content
7. Present the completed project setup to the owner for confirmation

### Every session (after first session)
1. Read `.claude/skills/product-vision.md`
2. Check `docs/progress.md` for last session status and Handoff Notes
3. Present today's top priority to the owner before starting work

## Session Management

### Session Rules
- **1 session = 1 task** を原則とする
- タスク完了時は以下を必ず実行してからセッションを終了する:
  1. `docs/progress.md` の Completed / Handoff Notes を更新
  2. 変更したファイルを commit & push
  3. 完了報告をオーナーに出力
  4. `/exit` でセッション終了

### Auto-Restart Rule
- タスク完了時は `/exit` で終了する
- `run.bat` が `/exit` を検知して3秒後に新しいセッションを自動起動する
- 新セッションではCLAUDE.md → product-vision.md → progress.md を再読み込みする
- **オーナーの操作は不要** — run.batが回り続ける限り自動でループする
- Ctrl+C で停止

### Compacting Prevention
- コンテキストが大きくなりCompactingが発生しそうな場合、タスク途中でも区切る
- その場合は progress.md の Handoff Notes に作業途中の状態を詳細に書き出してから `/exit`
- 次セッションで Handoff Notes を読んで作業を再開する

### Why This Matters
Claude Code のコンテキストウィンドウには上限があり、長いセッションでは
Compacting（会話の圧縮）が発生して重要な情報が失われる可能性がある。
1タスクごとにセッションを区切ることで、毎回 CLAUDE.md と progress.md を
クリーンに読み直せる。

### File Persistence Rule
重要な判断や設計方針は、会話内で合意するだけでなく、
必ず以下のいずれかのファイルに書き出すこと:
- `docs/progress.md`（Decision Log / Handoff Notes）
- 該当する skill / agent ファイル
- コード内のコメント

**会話の中だけで合意した内容は、Compacting後に消える。ファイルに書けば永続する。**

## Skills (always read)
| File | Purpose |
|------|---------|
| `.claude/skills/product-vision.md` | Why, Who, priorities, KPIs |
| `.claude/skills/dev-flow.md` | Task classification, spec/review schema |
| `.claude/skills/symbol-table.md` | AI-to-AI communication symbols |
| `.claude/skills/review.md` | Review checklist |
| `.claude/skills/pwa.md` | PWA guidelines and checklist |
| `.claude/skills/accessibility.md` | Accessibility guidelines |
| `.claude/skills/privacy.md` | Privacy and personal data handling |

## Agents
| Agent | Role | Model |
|-------|------|-------|
| spec-writer | Spec docs, spec.json generation | haiku |
| security-reviewer | Read-only code review | haiku |
| design-reviewer | URL/image design feedback | sonnet |
| uiux-designer | UI/UX design and review | sonnet |

## Optional Agents (move to agents/ when applicable)
| File | When to use |
|------|-------------|
| `agents-optional/data-engineer.md` | External data ingestion / ETL |
| `agents-optional/video-pipeline-engineer.md` | Video generation pipeline |
| `agents-optional/strategy-advisor.md` | Periodic improvement proposals |
| `agents-optional/mobile-engineer.md` | Mobile app development |
| `agents-optional/workflow-engineer.md` | Business automation / BtoB |

## Git Rules
- Repository: https://github.com/KITUNE9999/moneycheck.git
- Branches: `main` (production) / `develop` (development) / `feature/{task-id}`
- **Auto-commit after every completed task**: `git add . → commit → push origin feature/{task-id}`
- Commit message format: `[S/L] task-id: description`
- Merge flow: feature → develop → (release only) main
- Owner must never push directly to `main` or `develop`
- Claude pushes to `feature/{task-id}` only — never to `develop` or `main` directly

## Owner's North Star
- The owner builds products **to generate revenue**
- When in doubt, prioritize: **ship fast → validate → monetize**
- A perfect product that never ships earns nothing
- Minimize SaaS dependencies — flag costs early, prefer self-hosted or free-tier alternatives
- Monetization model is decided at project start — see `product-vision.md`

## UI Design Override
なし（review.md のデフォルトUIルールを適用 — 温かみ重視）

## Routing Rules
**Parallel**: 3+ independent tasks, no shared files, clear boundaries
**Sequential**: dependencies exist / shared files / unclear scope
**Background (Ctrl+B)**: research, data fetching, non-blocking tasks
