# Knowledge Repo 规则

## Repo

Rutong 的长期知识沉淀放在 GitHub repo：`kohl-lin/rutong-personal`。

默认本地路径：

`/Users/rutong.lin01/Documents/Codex/2026-07-06/zong/work/rutong-personal`

## 工作流

1. 先在本地 repo 修改。
2. 给 Rutong 看摘要或关键 diff。
3. Rutong 确认后再 commit / push。
4. 需要 Codex 全局可用的 skill，必须同步到 `~/.codex/skills/<skill-name>/`。

## Neatness Scan

定期检查：

- `docs/resource-index.md` 是否新增了资源链接。
- `skills/*/SKILL.md` 是否太长。
- skill references 是否自包含，不能依赖 repo 外的相对路径。
- GitHub、本地 repo、`~/.codex/skills` 三处是否一致。
- blocked private resources 要标记，不要假装读过。

