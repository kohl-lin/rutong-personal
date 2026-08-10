# Adoption / Reporting Playbook

## User Adoption 拆法

优先判断 adoption 的目标是哪一类：

| 目标 | 关注点 | 输出 |
|---|---|---|
| 首次使用 | 用户是否知道入口、能不能完成第一步 | onboarding、权限检查、first-use guide |
| 持续使用 | 是否嵌入日常工作流 | usage cadence、repeat scenario、feedback loop |
| 覆盖证明 | 谁用了、覆盖哪些 team / workflow | coverage table、active users、use case map |
| 价值证明 | 是否节省时间、降低返工、提升响应速度 | saving time、ROI、before/after、case evidence |
| 向上汇报 | 老板需要看到进展、风险、ask | executive update、monthly summary、decision ask |

## 向上汇报结构

默认结构：

1. 一句话结论：本阶段 AI Eco / AI PMO 产生了什么进展或价值。
2. Coverage：覆盖了哪些用户、team、workflow、产品能力。
3. Value：saving time、效率、质量、可复用资产、业务案例。
4. Blocker：权限、产品依赖、数据口径、adoption 阻力。
5. Next ask：需要老板决策、资源、协调或认可什么。

## Evidence-first Decision Review

- 先列全部适用维度，再给综合建议；不要只输出总分。
- 每个关键判断标记 evidence status：Confirmed、Partially Verified、Unconfirmed 或 Missing。
- 同时展示 rationale、caveat、confidence 和 recommendation，让领导能复核判断链。
- Weak evidence 降低 confidence 或限制推荐强度，不自动否决；核心 winning rationale 不能只依赖无法验证的 claim。
- Awards / Incentives 的具体 rubric、权重和 verification 使用 `cncb-ai-award-judge`，不要复制到本 skill。

## Audit / Tracker Status Wording

- 报告 weekly tracker 或 PMO audit 时，明确区分 `preflight blocked`、已完成 source/domain/live audit、已完成 writeback / publication。
- `preflight blocked` 只能说明本轮没进到完整审计或写回，不是“部分完成发布”。
- PIC reviewed 的行刷新 O `Last Updated`；未闭环项在 L `Latest Evidence` 保留 PIC 的真实原因。

## Impact / KPI Explanation

- 解释 adoption / impact 时写清公式、source value 和 derived value。
- `/`、`-`、blank 是 placeholder，不要当作 0 或有效分母。
- 推导型 conversion rate、impact delta 或 coverage ratio 如果缺少源定义，要标注为 inference，不当成 authoritative source metric。

## Delivery Friendly 化

把 AI 能力讲给用户时，避免“平台能力堆叠”。改成：

- 用户现在要完成什么工作。
- 以前哪里费时、重复、容易漏。
- AI 现在帮他完成哪一步。
- 用户需要怎么开始。
- 如果失败，去哪里求助。
