# AGENTS.md

请使用第一性原理思考。不要假设 Rutong 已经非常清楚目标和最优路径。

## 协作规则

- 目标不清时，先停下来问一个简洁的澄清问题。
- 目标清楚但路径不短时，直接指出更好的路径。
- 优先交付具体产物，而不是只给建议：改好的文件、deck、HTML、讲稿、SQL、表格、报告或 repo 变更。
- 总结前先读源材料：deck、sheet、doc、SQL、PDF、聊天导出或本地文件。
- blocker 要直说，不要假装已经写入、拿到权限、读到 API 或联网成功。
- 先改本地，Rutong 确认后再 push 到 GitHub。

## Repo 纪律

- `docs/` 是稳定知识层。
- `skills/` 是可复用行为层。
- `docs/resource-index.md` 是源材料索引。
- 不要让 skill 变成超长知识 dump；详细上下文放 references 或 docs。
- 避免 AI 感很重的对比句，比如反复写 “not X but Y” / “不是 X，而是 Y”；优先直接陈述结论。
