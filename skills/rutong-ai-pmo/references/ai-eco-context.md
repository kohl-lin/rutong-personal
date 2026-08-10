# AI Eco Context

## 当前定义

AI Eco 是 CNCB AI 生态体系搭建项目。目标是通过渐进式交付一组互相连接的产品和 workflow assets，提升 AI coverage。

当前 operating model：

- Macro Desktop：AI brain 和用户侧 workbench。
- Knowledge Program：通过 Knowledge product 暴露个人知识和企业知识。
- Atlas：企业知识治理工具。
- Echo：personal memory、Seatalk/Gmail 数据源接入、知识提炼。
- Skill Factory：生产可复用 atomic AI capability。
- Sentinel：支撑 signal-to-action workflow。
- Diana：AI 数据分析和自动取数工具，尤其适合 BI workflow。

## Rutong 的 AI Role

Rutong 的角色接近 AI strategy PMO + product delivery operator：

- 把复杂业务需求结构化拆解为 roadmap 和分阶段 deliverables。
- 协调 business、BI、DI、data、algorithm、platform 资源推进 AI 项目落地。
- 建立 adoption、ROI、coverage、saving time 等价值追踪机制。
- 标准化 AI 项目的落地流程、协作标准和知识积累。
- 把业务愿景翻译成可执行的 AI 产品、工具、deck、培训和 PMO tracker。

## PMO Cadence 与 Tracker Governance

- Rutong 管理 operating cadence、跨模块依赖、验收与向上叙事；product owner 保留详细 implementation ownership。
- Monday catch-up 默认覆盖上周 output、本周 priority、blocker 和待决策事项。
- 先判 ownership，再判 status；避免在 Macro、Atlas、Echo 或其他 Domain 重复计算同一能力。
- Current AI Eco Weekly Tracker 的 J 是 editable `Current PMO Status`；Q:AL 是 Rutong 确认后的周历史，结构调整时按 stable ID 保护。
- 证据优先级：Rutong 人工判断 > Macro live audit > GitLab > Domain PMO Tracker > DI 当前反馈。
- 报告进度时区分 `preflight blocked`、完成 source/domain/live audit、完成 writeback / publication；不要把前序检查写成最终完成。
- `Progress / Coverage` 只按状态公式生成：待设计 0%、已占位 20%、Dev 40%、SIT 60%、UAT 80%、上线/已修复 100%。
- source `Done`、GitLab commit、可见 UI 或单个 connector 成功不能直接推导 UAT / 上线；`上线/已修复` 仅由 Rutong 最终确认。
- 保留黄色 review cells 和人工修正，不用低等级 evidence 静默覆盖。
- PIC reviewed 的行刷新 O `Last Updated`；若仍未完成，在 L `Latest Evidence` 保留 PIC 的真实 blocker / reason。

## Enterprise Knowledge Answer Governance

- 团队内动态、历史和探索性问题以 permission-filtered RAG 为主；稳定高频 SOP、FAQ 和 onboarding 使用 owner-reviewed official answer。
- 跨团队场景先命中 official answer，再用 permission-filtered RAG 补充动态证据和 long-tail synthesis。
- Official answer 至少携带 source、Owner、version / update time、scope、permission 和 expiry。
- 证据冲突时并列展示；证据不足时拒答或路由给 Owner；反复出现且完成 review 的问题可沉淀为 official answer。
- `PREG` 不是统一标准缩写；使用前先确认具体含义。

## 工作原则

- AI Eco 不要写成泛泛 AI transformation。
- 必须落到 product delivery、workflow coverage、user adoption、ROI 和 reusable assets。
- 先展示 workflow proof，再讲 operating model。
- 向上汇报要明确 progress、value、blocker、risk、next ask。
- 数据工作采用 hybrid routing：固定 SQL、模板化或 scheduled extraction 走 Data Studio；探索性语义、Topic / Skill 和 multi-turn clarification 走 Diana；SOP、定义和规则走 Knowledge / Echo；Sheet、deck、report 和 writeback 留在 Macro 上层。
- 超过约 2k rows 的结果优先交付 materialized table、Data Studio Output、CSV 或 Data Services；LLM 只接收摘要和抽样 QA。
