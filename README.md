# MoneyCheck

**Concept**: 夫婦で使えるシンプル家計簿PWA

## Overview

MoneyCheckは、一緒に暮らす二人のための家計簿アプリです。
最小限の操作で支出を記録し、月の収支を個人別・合算・カテゴリ別で把握できます。

## Tech Stack

| Layer | Technology |
|-------|-----------|
| BE | Next.js API Routes |
| FE | Next.js + Tailwind CSS |
| DB | Google Spreadsheets (Sheets API) |
| Auth | シンプルパスワード認証 |
| Host | Vercel |
| Mobile | PWA |

## Getting Started

```bash
cd C:\project\moneycheck
run.bat
```

## Project Structure

```
moneycheck/
├── .claude/
│   ├── agents/          # Claude Code用エージェント定義
│   └── skills/          # Claude Code用スキル定義
├── docs/
│   ├── progress.md      # 進捗ログ
│   └── setup/           # 初回セットアップ用
├── CLAUDE.md            # Claude Code設定
├── run.bat              # 自動再起動ラッパー
└── push.bat             # Git push用
```

## Features

- 簡単入力: 最小限のタップで支出を記録
- 月別収支: 個人別・合算・カテゴリ別で一目で把握
- 二人で共有: リアルタイムにお互いの入力を反映
- PWA: スマホでもPCでも快適に利用
