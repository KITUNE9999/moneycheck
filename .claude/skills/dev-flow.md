# Dev Flow — Claude Code

## Task Classification

| Size | Condition | Executor |
|------|-----------|----------|
| **S** | ≤3 files, minor logic change | Claude direct |
| **L** | ≥4 files, new feature, DB change | Claude direct (spec.json → impl → review) |
| **Check** | review/confirm keyword | Claude review only |

## Flow
- **S** → impl (Claude) → review → report
- **L** → spec.json → impl (Claude) → review → report
- **Check** → review only → report

Progress display: `[S:Mobile]` `[L:BE]` `[L:Full]` `[Check]` — single line only

## Session Completion Flow
タスク完了後、セッションを終了する前に必ず以下を実行:
1. `docs/progress.md` の Handoff Notes を更新
2. `git add . → commit → push origin feature/{task-id}`
3. 完了報告を出力
4. `/exit` でセッション終了

## Troubleshooting
| Problem | Action |
|---------|--------|
| spec.json validation error | Ask spec-writer to regenerate |
| review.json FAIL 3 times | Stop, report to owner with specific issue |
| Git push rejected | Check branch name, never force-push |
| `{variable}` found in code | Stop immediately, run first-session setup |

## Cost Policy
- Claude: Claude MAX plan via CLI — no API key required
- Avoid API billing; maximize CLI plan usage at all times

---

## Optional: Gemini Integration

> **この セクションは Gemini CLI を使用する場合のみ適用。**
> CLAUDE.md の Stack に `Gemini CLI` が含まれている場合に読む。

### Task Classification Override (Gemini mode)
| Size | Condition | Executor |
|------|-----------|----------|
| **L** | ≥4 files, new feature, DB change | Gemini (LEP) |

### Gemini Invocation
```bash
gemini -p "Impl per spec.json. Follow LEP Protocol.
$(cat docs/specs/{task-id}-spec.json)
Output changed files as JSON array." -y
```
Timeout: 300s / Retry on fail / Max 3 review cycles

### Gemini Fallback
If Gemini CLI is unavailable (not installed, quota exceeded, or Pro not active):
- Treat all tasks as Claude direct implementation
- Note in `docs/progress.md`: `[Gemini unavailable — implemented with Claude]`

### Gemini Cost Policy
- Gemini: Google AI Pro plan via CLI — no API key required, Auto mode enabled

---

## spec.json Schema
```json
{
  "v": 1,
  "task": "kebab-case-id",
  "goal": "one line purpose",
  "ctx": ["existing file paths (max 10)"],
  "db":  [{"op":"CF|MF","table":"","cols":[{"n":"","t":"","ref":"?","default":"?"}],"idx":[]}],
  "api": [{"op":"CF|MF|AR","method":"GET|POST|PUT|DELETE","path":"","layer":{"C":"","S":"","R":"","M":""},"req":[{"n":"","t":"","v":""}],"res":{"shape":""}}],
  "ui":  [{"op":"CF|MF","path":"","layer":"V|CO|RN|RNH","props":[{"n":"","t":""}],"emits":[],"deps":[]}],
  "files": [{"op":"CF|MF|DF","path":"","layer":"sym","desc":"5words"}],
  "constraints": []
}
```

### spec.json Real Example
```json
{
  "v": 1,
  "task": "user-auth-api",
  "goal": "implement email/password login and JWT token issuance",
  "ctx": ["app/Models/User.php", "routes/api.php", "app/Http/Controllers/AuthController.php"],
  "db": [{"op":"MF","table":"users","cols":[{"n":"last_login_at","t":"dt?","default":"null"}],"idx":[]}],
  "api": [{
    "op": "CF",
    "method": "POST",
    "path": "/api/auth/login",
    "layer": {"C": "AuthController", "S": "AuthService", "R": "UserRepository", "M": "User"},
    "req": [{"n": "email", "t": "s", "v": "required|email"}, {"n": "password", "t": "s", "v": "required|min:8"}],
    "res": {"shape": "{token:s, user:{id:i, email:s, name:s}}"}
  }],
  "ui": [],
  "files": [
    {"op": "CF", "path": "app/Services/AuthService.php", "layer": "S", "desc": "login logic and JWT issue"},
    {"op": "MF", "path": "app/Http/Controllers/AuthController.php", "layer": "C", "desc": "add login endpoint"}
  ],
  "constraints": ["S01", "S02", "S03"]
}
```

### Constraint Codes by Task Type
- UI task → `U01`, `U02`, `U05`
- Mobile task → `M01`, `M02`
- Privacy/location task → `P01`, `P02`
- Security-sensitive task → `S01`, `S02`, `S03`

## review.json Schema
```json
{
  "v": 1,
  "task": "task-id",
  "status": "P|F",
  "stats": {"files":0,"errors":0,"warnings":0},
  "issues": [{"code":"","sev":"F|W","file":"","line":0,"span":[0,0],"fix":""}],
  "missing": [{"code":"","ref":"","desc":""}]
}
```

## Report Format (Japanese output)
```
## 完了: {タスク名}
### 変更内容
- {箇条書き}
### ファイル変更
| 操作 | ファイル | 説明 |
|------|----------|------|
### レビュー結果
- 分類: {S:Mobile / L:BE / etc.}
- エラー: 0件 / 警告: 0件
- ステータス: PASS
### 申し送り
- {次セッションで必要な情報}
```
