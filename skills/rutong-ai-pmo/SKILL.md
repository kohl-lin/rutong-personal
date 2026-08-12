---
name: rutong-ai-pmo
description: 处理 Rutong Lin 的 AI PMO、AI Eco、user adoption、delivery planning、向上汇报、OKR、ROI、AI training、Macro、Knowledge、Atlas、Echo、Skill Factory、Sentinel、Diana integration 和 CNCB AI ecosystem 相关工作。
---

# Rutong AI PMO

## 目的

把 AI strategy、roadmap、adoption 和 delivery 工作转成清晰产物：executive summary、PMO tracker、user adoption plan、rollout plan、OKR/ROI 逻辑、会议材料和 decision-ready update。

## 核心定义

AI Eco 是 CNCB AI 生态体系搭建项目。它通过渐进式 delivery 提升 AI coverage：以 Macro Desktop 作为 AI brain，整合 Knowledge Program、Knowledge product、Atlas、Skill Factory、Sentinel、Diana 和相关 workflow assets。

## 按任务加载

- 做 status、priority、recommendation、evidence review 或处理证据冲突时，读 `references/judgment-principles.md`。
- 涉及 AI Eco 产品边界、operating model、tracker governance 或 enterprise knowledge 时，读 `references/ai-eco-context.md`。
- 涉及 adoption、KPI / impact、领导汇报或 decision ask 时，读 `references/adoption-reporting-playbook.md`。
- 需要定位历史材料或链接时，读 `references/resource-map.md`；不要默认把历史已读状态当作本次验证。

## 默认流程

1. 明确受众：boss、PMO team、BI/DI、business user、AI Eco participant 或 training audience。
2. 明确输出：update、roadmap、adoption plan、decision ask、tracker structure 或 slide/storyline。
3. 基于源材料：PMO tracker、工作日记、培训材料、linked decks、sheets、docs。
4. 区分 confirmed fact、inference、proposal、missing evidence、risk 和 ask。
5. 产出简洁、可复用的 artifact。

## 内容规则

- 重点放在 user adoption、friendly delivery、coverage、workflow assets、ROI 和 measurable value。
- 向上汇报要说清 progress、value、blocker、risk 和 next ask。
- 做 product framing 时，先给 workflow proof，再讲 target operating model。
- 区分 Macro、Diana、Knowledge、Atlas、Echo、Skill Factory 和 Sentinel。
- 涉及 AI Eco weekly tracker 时，优先使用 `ai-eco-weekly-update`；涉及 Macro 实机验收时，优先使用 `macro-desktop-pmo-audit`。
- 涉及 CNCB AI Awards / AI Incentives 评审时，优先使用 `cncb-ai-award-judge`；本 skill 只保留 PMO context 和 leadership summary。
- 先判断 ownership，再判断 status；不要用 source `Done`、GitLab commit 或可见 UI 直接推导 UAT / 上线。
- 在 AI Eco Weekly Tracker 中，把 `上线/已修复` 保留为 Rutong 最终确认的 terminal state。
- Enterprise knowledge 采用 owner-reviewed official answer + permission-filtered retrieval；使用 `PREG` 前先确认具体含义。
- 避免泛泛 AI slogans。

## 完成标准

- 结论能追溯到 source；无法验证的内容明确标为 inference、proposal 或 `blocked/unknown`。
- Delivery proof、observed usage 和 quantified impact 分开表达；缺少后一层证据时不向上推导。
- Status 使用当前最高等级证据；证据冲突时保留冲突和双状态，不静默覆盖人工判断。
- `上线/已修复`、UAT 或价值结论满足各自 confirmation gate；没有用 commit、可见 UI 或入口可达替代验收。
- 面向领导的产物结论前置，并包含适用的 progress、value、blocker / risk 和明确 next ask。
- 若执行了写回或发布，完成 readback / verification；若受权限或工具限制，准确说明停在哪个 gate。

只应用与当前任务有关的标准，不为凑齐结构添加空洞章节。
