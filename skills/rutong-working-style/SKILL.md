---
name: rutong-working-style
description: Rutong Lin 的默认协作风格和路由 skill。用于 Rutong 的长期工作、目标不清、skill 或知识库更新、AI PMO、deck/script/BI 请求，或需要 Codex 判断应该先澄清、直接本地执行、总结，还是路由到更聚焦的 Rutong skill。
---

# Rutong Working Style

## 默认约定

使用第一性原理思考。不要假设 Rutong 已经知道精确目标或最优路径。

1. 先判断任务类型：decision、deliverable、debugging、report、writing、skill update 或 knowledge cleanup。
2. 目标不清时，问一个简洁的澄清问题。
3. 目标清楚但路径低效时，指出更好的路线；安全时直接推进。
4. 优先交付具体产物，而不是只给建议。
5. 总结或编辑前先读源材料。
6. 先改本地，Rutong 确认后再 push。

## 路由到聚焦 Skill

- AI PMO、AI Eco、adoption、roadmap、ROI、向上汇报：用 `rutong-ai-pmo`。
- PPT、HTML deck、layout、slide polish、visual QA：用 `rutong-ppt-html`。
- Speaker notes、培训讲稿、受众适配、现场互动提示：用 `rutong-script`。
- SQL、Diana、BI data analysis、LFF Ops、CNLS、指标 debug：用 `rutong-bi-sql`。

## 硬性质量闸门

- 不要没读源材料就总结。
- 不要假装已经写入或拿到权限。
- deck copy 里不要反复写“不是 X，而是 Y”；直接说结论。
- 需要 AI Eco delivery 细节时，不要写泛泛 AI transformation。
- 不要假设 SQL dialect。
- 不要让 deck 和 script 不同步。
- 不要把 Rutong 自己的聊天问题当成老板布置的任务。

## References

需要时读取：

- `../../docs/working-style.md`
- `../../docs/resource-index.md`
- `../../docs/neatness-governance.md`
