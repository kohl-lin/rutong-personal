# Skill Architecture

## 推荐结构

使用 1 个总入口 skill + 4 个聚焦执行 skill。

| Skill | 用途 |
|---|---|
| `rutong-working-style` | 总入口、澄清问题、本地优先工作流、质量闸门、反复修正点 |
| `rutong-ai-pmo` | AI PMO、AI Eco、user adoption、delivery planning、向上汇报 |
| `rutong-ppt-html` | PPT 和 HTML deck 生产、layout、visual QA、source sync |
| `rutong-script` | Speaker notes、培训讲稿、facilitation、受众适配 |
| `rutong-bi-sql` | SQL、Diana、BI analysis、LFF Ops、CNLS、指标诊断 |

## 2026-07-15 更新

这 5 个 skill 已从“只有 `SKILL.md` 的草案”升级为“`SKILL.md` + 自包含 references”的结构。

原因：skill 安装到 `~/.codex/skills/` 后，不能依赖 repo 内 `../../docs/...` 这种相对路径；否则 Codex 触发全局 skill 时会找不到上下文。现在每个 skill 都把必要上下文放进自己的 `references/`，例如：

- `rutong-ai-pmo/references/ai-eco-context.md`
- `rutong-ai-pmo/references/adoption-reporting-playbook.md`
- `rutong-ppt-html/references/deck-quality-playbook.md`
- `rutong-script/references/script-style-playbook.md`
- `rutong-bi-sql/references/bi-sql-diana-playbook.md`
- `rutong-working-style/references/collaboration-rules.md`

## 为什么不做一个大 Skill

一个大 skill 会混在一起：

- 协作风格，
- AI PMO domain context，
- deck rendering rules，
- 讲稿语气，
- SQL debugging rules。

这样会让 skill 变长且不稳定。更好的方式是：小入口 skill 负责路由，具体任务交给聚焦 skill。

## 从 Qu Yue PPTX Skill 借鉴什么

- 精简的 `SKILL.md`，但 description 触发条件要写清楚。
- `Read First` references，用来承载 design system 和 playbook。
- 按任务类型区分 modes。
- 具体 page archetypes 和 quality gates。
- Output contract 和 final QA checklist。
- 只有在需要 deterministic output 时才放 assets 和 scripts。

## 从 Neat-Freak 借鉴什么

- 定期做 repo hygiene checks。
- Docs 是稳定知识，skills 是行为规则。
- 避免无限 append-only notes。
- 把反复出现的修正沉淀成规则。
- 私有资源 blocked 时要标记，不要假装读过。

## 安装说明

这些 skills 的源头在本 repo。更新流程：

1. 先改本地 repo。
2. 跑 `quick_validate.py` 验证每个 skill。
3. 同步到 `~/.codex/skills/<skill-name>/`。
4. 再 commit / push 到 GitHub。
