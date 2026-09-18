# Agent logs (submission)

This folder contains **prompt + final response** logs for the 8x assignment.

## How these logs are produced

Logs are **exported from Cursor’s session transcript** (JSONL on disk), not typed by hand.

Regenerate after more agent work:

```powershell
cd "d:\8x assignment"
node scripts/export-agent-log-from-transcript.mjs
```

Default session id: `e65c822d-309d-4f80-83fb-947b669fe7d1`  
Transcript path: `%USERPROFILE%\.cursor\projects\d-8x-assignment\agent-transcripts\<session-id>\<session-id>.jsonl`

The export script keeps **user prompts** and the **last assistant text** per turn. It does **not** include tool calls or thinking blocks.

**Do not** add `.agent-logs/` to `.gitignore`. Commit logs with your code.
