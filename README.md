# Rutong Personal Knowledge Base

这个 repo 是 Rutong 的个人工作知识库，用来沉淀 AI PMO、AI Eco、deck/html、讲稿和 BI 分析相关材料。

## 使用规则

- 先改本地，Rutong 确认结构或效果后再 push 到 GitHub。
- 稳定知识放在 `docs/`。
- 可复用的 agent 行为放在 `skills/`。
- 链接和源材料统一登记在 `docs/resource-index.md`。
- 定期做 neatness scan，避免失效链接、重复 notes 和过长 skill 文件堆积。

## 当前结构

| 路径 | 用途 |
|---|---|
| `docs/working-style.md` | Rutong 的协作规则和反复纠正点 |
| `docs/ai-eco-context.md` | AI Eco、Macro、Knowledge、Atlas、Skill Factory、Sentinel 上下文 |
| `docs/resource-index.md` | 链接和资源索引 |
| `docs/work-diary-index.md` | 2026 工作日记 preview 和任务路由提示 |
| `docs/neatness-governance.md` | 从 neat-freak 改造来的 repo 整洁规则 |
| `docs/skill-architecture.md` | skill 架构和演进计划 |
| `skills/` | 待安装或继续打磨的 Codex skill 草案 |

## 第一版 Skill Set

- `rutong-working-style`：总入口，负责目标澄清、执行偏好和质量闸门。
- `rutong-ai-pmo`：AI PMO、user adoption、delivery、ROI、AI Eco 汇报。
- `rutong-ppt-html`：PPT 和 HTML deck 工作流。
- `rutong-script`：speaker notes、培训讲稿、受众适配。
- `rutong-bi-sql`：SQL、Diana、LFF Ops、CNLS、指标诊断。
