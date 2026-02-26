# Progress Log — MoneyCheck

## Current Phase
**Phase 0: Planning & Design**

## Completed
- [x] Interview conducted / product-vision.md generated
- [x] Project setup (CLAUDE.md, agents, skills configured)

## Next Actions

### Owner tasks
- [x] Create private GitHub repository "moneycheck"
- [ ] Create Google Cloud project and enable Sheets API (free)
- [ ] Create service account and share key JSON
- [ ] Create Google Spreadsheet and share with service account

### Claude Code tasks (after owner tasks complete)
- [ ] Clone repository and initialize branch structure (develop / feature)
- [ ] Initialize Next.js project with Tailwind CSS
- [ ] Configure PWA (manifest.json, Service Worker)
- [ ] Set up Google Sheets API connection
- [ ] Design spreadsheet structure (sheets: transactions, categories, users)
- [ ] Implement simple password auth (2 users)
- [ ] Implement basic input form
- [ ] Implement monthly summary view

## Handoff Notes

### Last Session Summary
- Session: 初回セットアップ
- Task: プロジェクトインタビュー & セットアップ
- Status: 完了

### For Next Session
- オーナーがGitHubリポジトリとGoogle Sheets APIのセットアップを完了した後、開発開始
- まずNext.jsプロジェクトの初期化から着手

### Important Context
- 二人専用の家計簿アプリ（収益化なし）
- PWA（スマホ＋PC両対応）
- 温かみのあるUIデザイン
- カテゴリ: 食費・家賃・光熱費・通信費・交通費・日用品・娯楽・医療・衣服・その他

## Decision Log
- 2026-02-27: Project launched, interview complete
- 2026-02-27: Core value confirmed — "簡単入力・見える化・二人で共有"
- 2026-02-27: Primary target confirmed — "同居を始めた共働き夫婦（二人専用）"
- 2026-02-27: Tech stack confirmed — Next.js + Google Sheets + Vercel (PWA)
- 2026-02-27: Monetization — なし（個人利用）
- 2026-02-27: UI方針 — review.md デフォルト（温かみ重視）を適用

## Notes
- 全機能を完全無料で運用（Google Sheets API + Vercel Free）
- デフォルトカテゴリはスプレッドシートの初期データとして設定
- データはGoogle Spreadsheetで直接確認・編集も可能
