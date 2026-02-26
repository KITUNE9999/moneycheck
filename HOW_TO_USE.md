# HOW TO USE — MoneyCheck

## 開発を始めるとき

```bash
cd C:\project\moneycheck
run.bat
```

Claudeが `progress.md` を読んで次のタスクを自動で進めます。

---

## 日常の開発フロー

`run.bat` を起動するだけ。Claudeが以下を繰り返す:

1. `progress.md` を読んで次のタスクを把握
2. タスクを実行
3. `progress.md` を更新
4. セッション終了 → 自動再起動 → 1に戻る

**Ctrl+C** でいつでも停止できます。

---

## KITUNEがやること

1. GitHubでprivateリポジトリ "moneycheck" を作る
2. Supabaseでプロジェクトを作成する（無料枠）
3. `run.bat` で開発スタート
4. Claudeの質問に答える

---

## ファイル構成

```
moneycheck/
├── CLAUDE.md              ← Claude自動読み込み用
├── README.md              ← プロジェクト概要
├── HOW_TO_USE.md          ← この説明書
├── run.bat                ← 開発時はこれを起動
├── push.bat               ← 手動push用
├── .claude/
│   ├── skills/            ← 常に使うスキル
│   └── agents/            ← 常に使うエージェント
└── docs/
    ├── progress.md        ← セッション管理の中心
    └── setup/
        └── interview.md   ← 初回セットアップ用（完了済み）
```

---

## 困ったとき

| 状況 | 対処 |
|------|------|
| Claude Codeが止まった | Claude.aiに状況を説明 |
| Gitが壊れた | Claude.aiにエラーを貼る |
| 機能追加したい | Claude Code CLIに話しかけるだけ |
| 手動でpushしたい | push.batをダブルクリック |
| セッションが長くなりすぎた | Ctrl+C → run.bat で再起動 |
