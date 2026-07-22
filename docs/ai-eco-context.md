# AI Eco Context

## 最新工作定义

AI Eco 是 CNCB AI 生态体系搭建项目。目标是通过渐进式交付一组互相连接的产品和 workflow assets，提升 AI coverage。

当前 operating model：

- Macro Desktop 是 AI brain 和面向用户的 workbench。
- Knowledge Program 通过 Knowledge product 暴露个人知识和企业知识。
- Atlas 是企业知识治理工具。
- Skill Factory 生产可复用的 atomic AI capability。
- Sentinel 支撑 signal-to-action workflow。
- Diana 是 AI 数据分析和自动取数工具，尤其适合 BI workflow。

## Rutong 的角色

Rutong 的 AI role 更接近 AI strategy PMO + product delivery operator：

- 把模糊业务需求拆成 phased roadmap 和 deliverables。
- 协调 business、BI、DI、data、algorithm、platform 等资源推进 AI project delivery。
- 建立 adoption 和价值追踪机制，包括 ROI 和 coverage。
- 标准化 AI 项目的落地流程、协作规则和可复用知识。
- 把业务愿景转成可执行的 AI 产品、工具、deck 和培训材料。

## 高频工作

- User adoption：让 AI delivery 对目标用户更好理解、更友好、更能用。
- 向上汇报：说明进展、业务价值、coverage、blocker 和 next ask。
- 培训交付：AI@Work 材料、讲稿、现场引导、prompt/KB/tool 教学。
- AI Eco PMO：roadmap、产品边界、workstream tracking、governance、dependency management。
- BI 和 Diana：把业务问题转成数据工具、topic、SQL 和可解释指标。

## PMO Operating Cadence

- Rutong 负责 AI Eco PMO 的 operating cadence、跨模块依赖、验收与向上叙事；product owner 保留详细 implementation ownership。
- Monday catch-up 默认检查：上周 output、本周 priority、blocker、待决策事项。
- 判断 delivery 时先判 ownership，再判 status，避免把同一项能力在 Macro、Atlas、Echo 或其他 Domain 重复计算。

## Tracker Governance

- Current AI Eco Weekly Tracker 的 J 列是 editable `Current PMO Status`；Q:AL 是 Rutong 确认后的周历史，结构调整前必须按 stable ID 保护并恢复。
- 证据优先级：Rutong 人工判断 > Macro live audit > GitLab > Domain PMO Tracker > DI 当前反馈。
- `Progress / Coverage` 只按状态公式生成：待设计 0%、已占位 20%、Dev 40%、SIT 60%、UAT 80%、上线/已修复 100%。
- source `Done`、GitLab commit、可见 UI shell 或单个 connector 成功都不能直接推导 UAT 或上线。
- `上线/已修复` 是 Rutong 确认的 terminal state；保留黄色 review cells 和人工修正，不用低等级 evidence 静默覆盖。

## 当前产品地图

| 模块 | 角色 |
|---|---|
| Macro Desktop | AI brain、interaction layer、workflow workbench |
| Knowledge | 暴露个人知识和企业知识 |
| Echo | Personal memory、Seatalk/Gmail 数据源接入、知识提炼 |
| Atlas | 企业官方知识 inventory、governance、citation、feedback loop |
| Skill Factory | 可复用 skill registry、lifecycle、ownership、testing、publication |
| Sentinel | Alerts、tasks、reminders、signal-to-action loop |
| Diana | AI analytics engine 和 auto-query tool |
| Bedrock | Governance、policy、model routing、audit、cost 和 risk control |
| Synapse | Event、API、webhook、callback 和 workflow integration layer |

## 工作原则

- 不要把 AI Eco 写成泛泛的 AI transformation。要落到 product delivery、workflow coverage、adoption、ROI 和 reusable assets。
- 区分 Macro 作为 interaction layer，和 Diana 作为 analytics engine。
- 区分 personal knowledge 和 enterprise official knowledge。
- 先展示 workflow proof，再讲 operating model。
- 面向老板的页面要说清楚：变了什么、创造了什么价值、还有什么风险、需要什么决策或支持。
