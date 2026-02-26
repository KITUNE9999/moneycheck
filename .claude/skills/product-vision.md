# Product Vision — MoneyCheck

## Why We Exist
一緒に暮らし始めた夫婦が、既存アプリやExcelよりもっと簡単に家計を管理できるようにする。
— 同居開始をきっかけに、二人の収支を楽に把握したいという実体験から生まれた。

## Core Insight
- 既存の家計簿アプリは機能が多すぎて操作が面倒
- 二人で共有できるシンプルな家計簿ツールが少ない
- Excelは柔軟だがスマホからの入力が不便

## Primary Target
**"同居を始めた共働き夫婦"**
- スマホメインで使いたいがPCからも見たい
- 細かい設定より「すぐ入力できる」を重視
- 月にいくら使ったか、お互いの把握ができればOK
- 収益化は不要（完全個人利用）

## Secondary Target
- なし（二人専用アプリ）

## Core Value (in priority order)
1. **簡単入力** — 最小限のタップで支出を記録できる
2. **見える化** — 月の収支が個人別・合算・カテゴリ別で一目でわかる
3. **二人で共有** — お互いの入力がリアルタイムに反映される

## Differentiation
| Competitor | Weakness | MoneyCheck Advantage |
|------------|----------|----------------------|
| マネーフォワード | 機能過多で操作が複雑 | 最小限の機能でシンプル |
| Zaim | 操作ステップが多い | 少ないタップで入力完了 |
| Excel/スプレッドシート | スマホからの入力が不便 | モバイル最適化されたPWA |

**Unique position: "二人のための、最もシンプルな家計簿"**

## Feature Priority

### Must (MVP — build first)
- ユーザー認証（二人分のアカウント）
- 収支の簡単入力（金額・カテゴリ・日付・入力者）
- 月別収支一覧（個人別・合算・カテゴリ別）

### Should (add in beta)
- ダッシュボード（月のサマリー・グラフ表示）
- カテゴリのカスタマイズ
- 収入の記録と管理

### Could (growth phase)
- 予算設定と超過アラート
- CSV エクスポート

### Won't (out of scope)
- レシート読み取り（OCR）
- 銀行口座連携

## Monetization
- **Model**: なし — 完全個人利用のため収益化は行わない
- **Free**: 全機能無料
- **Future**: なし

## SaaS Dependency Map
| Service | Purpose | Free tier limit | Monthly cost at scale | Alternative |
|---------|---------|----------------|----------------------|-------------|
| Google Sheets API | DB (データ保存) | 無制限（API 300req/min） | 無料 | Supabase free tier |
| Vercel | Hosting | 100GB bandwidth | $20/mo (Pro) | Cloudflare Pages (free) |

**2人利用の場合、完全無料で運用可能。データはスプレッドシートで直接確認も可。**

## Roles
| Role | Person |
|------|--------|
| Final decisions & funding | KITUNE |
| All design, implementation, improvement proposals | Claude (agent team) |
| External API billing setup | KITUNE |

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
- 3 months: 二人が毎日使い続けている
- 6 months: 月の収支把握が習慣化し、無駄な支出が減っている
- 1 year: 貯蓄目標を設定し達成に向かっている
