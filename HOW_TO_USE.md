# HOW TO USE — Claude Project Template v2

## 新しいプロジェクトを始めるとき

### 1. テンプレートをクローン
```bat
C:\project\setup-project.bat
```
プロジェクト名を入力するだけでOK。

### 2. Claude Code で初回セットアップ
```bash
cd C:\project\{プロジェクト名}
run.bat
```

Claudeが自動でインタビューを開始します。質問に答えるだけ。

---

## Claudeが初回セッションで自動でやること

1. インタビュー（最大7問）
2. `product-vision.md` を生成
3. 必要なagents/skillsを `optional/` から移動
4. `CLAUDE.md` の変数をすべて埋める
5. `README.md` / `HOW_TO_USE.md` をプロジェクト固有の内容に書き換え
6. `progress.md` を初期化
7. GitHubリポジトリ作成の指示を出す

---

## KITUNEがやること（これだけ）

1. Claudeの質問に答える
2. GitHubでprivateリポジトリを作る
3. 必要な外部APIキーを取得する（プロジェクトによる）
4. `run.bat` で開発スタート

---

## 日常の開発フロー

`run.bat` を起動するだけ。Claudeが以下を繰り返す:

1. `progress.md` を読んで次のタスクを把握
2. タスクを実行
3. `progress.md` を更新
4. セッション終了 → 自動再起動 → 1に戻る

**Ctrl+C** でいつでも停止できます。

---

## ファイル構成

```
template/
├── CLAUDE.md              ← Claude自動読み込み用（触らなくてOK）
├── README.md              ← 初回セッションで自動書き換え
├── HOW_TO_USE.md          ← この説明書
├── run.bat                ← 開発時はこれを起動
├── push.bat               ← 手動push用
├── .claude/
│   ├── skills/            ← 常に使うスキル
│   │   └── optional/      ← 必要に応じて skills/ に移動
│   ├── agents/            ← 常に使うエージェント
│   └── agents-optional/   ← 必要に応じて agents/ に移動
└── docs/
    ├── progress.md        ← セッション管理の中心
    └── setup/
        └── interview.md   ← 初回セットアップ用
```

---

## v1からの変更点

| 変更 | 理由 |
|------|------|
| `run.bat` 追加 | セッション自動再起動（Compacting対策） |
| skills/agents を optional に分離 | 不要ファイル削減 |
| progress.md に申し送り欄 | セッション間の情報引き継ぎ強化 |
| Geminiをオプション化 | Claude単独開発をデフォルトに |
| interview.md を docs/setup/ に移動 | 初回専用であることを明示 |

---

## 困ったとき

| 状況 | 対処 |
|------|------|
| Claude Codeが止まった | Claude.aiに状況を説明 |
| Gitが壊れた | Claude.aiにエラーを貼る |
| 機能追加したい | Claude Code CLIに話しかけるだけ |
| 手動でpushしたい | push.batをダブルクリック |
| セッションが長くなりすぎた | Ctrl+C → run.bat で再起動 |
