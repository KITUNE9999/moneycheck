# Progress Log — MoneyCheck

## Current Phase
**Phase 0: Planning & Design**

## Completed
- [x] Interview conducted / product-vision.md generated
- [x] Project setup (CLAUDE.md, agents, skills configured)

## Next Actions

### Owner tasks
- [x] Create private GitHub repository "moneycheck"
- [ ] Create Google Spreadsheet

### Claude Code tasks
- [x] Initialize branch structure (main / develop)
- [ ] Create HTML/CSS/JS フロントエンド
- [ ] Create Google Apps Script (バックエンド API)
- [ ] Configure PWA (manifest.json, Service Worker)
- [ ] Implement simple password auth (2 users)
- [ ] Implement basic input form
- [ ] Implement monthly summary view (個人別・合算・カテゴリ別)
- [ ] Deploy to GitHub Pages

## Handoff Notes

### Last Session Summary
- Session: 初回セットアップ
- Task: プロジェクトインタビュー & セットアップ
- Status: 完了

### For Next Session
- オーナーがGoogle Spreadsheetを作成した後、開発開始
- HTML/CSS/JSでフロントエンド作成 → Google Apps ScriptでAPI作成

### Important Context
- 二人専用の家計簿アプリ（収益化なし）
- PWA（スマホ＋PC両対応）
- 温かみのあるUIデザイン
- カテゴリ: 食費・家賃・光熱費・通信費・交通費・日用品・娯楽・医療・衣服・その他

## Decision Log
- 2026-02-27: Project launched, interview complete
- 2026-02-27: Core value confirmed — "簡単入力・見える化・二人で共有"
- 2026-02-27: Primary target confirmed — "同居を始めた共働き夫婦（二人専用）"
- 2026-02-27: Tech stack変更 — HTML + Google Apps Script + GitHub Pages (PWA)
- 2026-02-27: 方針変更 — Next.js/Vercel/サービスアカウント不要のシンプル構成に
- 2026-02-27: Monetization — なし（個人利用）
- 2026-02-27: UI方針 — review.md デフォルト（温かみ重視）を適用

## Notes
- 完全無料で運用（Google Spreadsheet + Apps Script + GitHub Pages）
- ビルドツール不要（HTML + CSS + vanilla JS）
- Google Apps Script はスプレッドシートの「拡張機能」から直接編集
- デフォルトカテゴリはスプレッドシートの初期データとして設定
- データはスプレッドシートで直接確認・編集も可能
