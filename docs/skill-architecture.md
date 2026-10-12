# Skill Architecture

## 推荐结构

使用 1 个总入口 skill + 5 个聚焦执行 skill。

| Skill | 用途 |
|---|---|
| `rutong-working-style` | 总入口、澄清问题、本地优先工作流、质量闸门、反复修正点 |
| `rutong-ai-pmo` | AI PMO、AI Eco、user adoption、delivery planning、向上汇报 |
| `rutong-tactful-comms` | 通用、可分享的催办、追责、任务分配、资源请求、强制动作和敏感职场沟通 |
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

## 2026-07-22 更新

`rutong-ai-pmo` 只保留通用 PMO gate；AI Eco weekly tracker 的详细执行继续路由到 `ai-eco-weekly-update`，Macro 实机验收路由到 `macro-desktop-pmo-audit`。这样能沉淀本周稳定规则，同时避免把总入口 skill 写成 tracker 操作手册。

## 2026-07-27 更新

- `rutong-working-style` 增加 evidence state 和 chat-sample confidence 规则；详细说明继续放在 self-contained reference。
- `rutong-ai-pmo` 增加 enterprise knowledge answer governance，并将 AI Awards / Incentives 评审路由到 `cncb-ai-award-judge`。
- `rutong-ppt-html`、`rutong-script`、`rutong-bi-sql` 本周没有足够稳定的新行为信号，保持不变。

## 2026-08-05 更新

- `rutong-ai-pmo` 补充 tracker 完成态分层：`preflight blocked`、audit、writeback / publication 要分开写。
- `rutong-bi-sql` 补充 impact / adoption 分析规则：解释公式，区分 source vs derived，并把 `/`、`-`、blank 视为 placeholder。
- `rutong-ppt-html` 补充 chart runtime 约束：默认使用 SVG + bundled Node `sharp`，不要假设 Python plotting 可用。

## 2026-08-10 更新

- `rutong-working-style` 补充 outcome-based Skill clustering、implementation-silent naming 和日志证据边界。
- `rutong-bi-sql` 补充 Diana / Data Studio hybrid routing、大结果集交付和 bridge authentication gate。
- `rutong-ai-pmo`、`rutong-ppt-html`、`rutong-script` 没有新增必须进入 `SKILL.md` 的行为；新知识继续放在 docs / references。

## 2026-08-12 更新

- `rutong-ai-pmo` 从固定加载两份 reference 改为按任务加载，减少无关 context。
- 新增 `references/judgment-principles.md`，把重复出现的 PMO 修正提炼为带 tradeoff、边界和反偏见检查的判断原则。
- `SKILL.md` 新增结果导向的完成标准，重点验证 evidence traceability、delivery / usage / impact 分层、confirmation gate 和 writeback readback。
- 已完成 fresh-context forward test、repo/global 同步和双份验证，并发布到 GitHub commit `a2a59cb`。

## 2026-08-17 更新

- `rutong-working-style` references 补充 personal context 的问题触发条件和 private asset boundary，不因外部 framework 自动扩建基础设施。
- `rutong-ai-pmo` 增加 AI Eco workspace maintenance 路由；详细的 candidate adjudication、stable key 和人工决定保护规则留在 self-contained reference。
- `rutong-ppt-html` references 补充 boss-facing evidence 分层、模板跟随、流程图简化和 Google Slides revision/readback/thumbnail 验证。

## 2026-08-20 更新

- 新增 `rutong-tactful-comms`，专门把催办、追责、任务分配、资源请求、强制动作和限制通知改写成尊重、直接且可执行的职场沟通。名称保留 Rutong 标识，但内容可独立分享，不包含个人、AI PMO、内部产品或组织特定信息。
- 委婉表达只软化人际摩擦，不弱化 ownership、deadline、事实和 mandatory action；普通标题、宣传文案和纯语法润色不触发。
- `rutong-working-style` 增加对应路由，具体模板与案例保存在 self-contained reference。

## 2026-08-24 更新

- `rutong-ai-pmo` 补充业务文案与推广话术的结构规则：具体成果 → 趋势/需求 → 请求动作；详细反例沉淀在 `docs/working-style.md` 和 `references/adoption-reporting-playbook.md`。

## 2026-08-25 更新

- `rutong-ppt-html` 新增条件加载的 Shopee template mode，继续保持单一 PPT / HTML 入口。
- 完整 bundle 包含 Shopee internal HTML template、10 个 layouts、browser edit/review/export runtime、packaging/lint/screenshot/runtime validation scripts，以及 55 页脱敏 PPTX style library。
- Rutong 的 source-first、answer-first、evidence boundary 和 visual QA 规则优先于模板默认；固定 presenter tag、市场排序、ask panel 和示例文案不自动继承。
- HTML 与 PPTX 共用 story / evidence map，但分别原生生成。上游 plugin metadata、release ZIP 和模板开发脚本不进入个人 skill。

## 2026-09-07 更新

- `rutong-working-style` 增加职业材料路由；稳定定位与证据边界放在 docs，执行规则放在 self-contained reference。
- `rutong-ai-pmo` 与 `rutong-script` 增加 client-led AI-native onboarding：真实材料、人工范围与验收、Agent 分阶段执行和 review。
- `rutong-bi-sql` 补充 cohort churn 复现规则：固定 grain、去重 M0 / base rows，并区分聚合数据和 seller-level 标签能力。
- `rutong-tactful-comms` 增加通用的数据治理与交接边界表达，内容已泛化，不包含人员、组织、产品、内部系统或真实指标。
- Shopee template 的两份相同 logo 分别服务 canonical packaging 与 self-contained template；保留双副本并用 hash 一致性门禁防止漂移。

## 2026-10-09 更新

- `rutong-working-style` 补充附件 / transcript 优先、bounded edit 和 copy-only 边界。
- `rutong-ai-pmo` 明确 AI Eco Workspace 是产品矩阵外的 PMO operating layer，并保护已确认 decision 的后续一致性。
- `rutong-ppt-html` 补充 canonical terminology、proposal / edited-file 状态与治理页信息层级门禁。
- `rutong-script` 补充 spoken logic、逐页范围和 page-specific timing；`rutong-bi-sql` 补充 submitted SQL 的只读回查及 static / runtime 证据边界。
- `rutong-tactful-comms` 本周没有新的跨公司通用规则，保持不变；全局 skill 继续以 repo 副本为 source of truth。

## 2026-10-12 更新

- `rutong-working-style` 增加会议 follow-up 的 transcript-first 筛选与三类管理动作边界。
- `rutong-ai-pmo` 增加 management tracker admission gate：明确 commitment / next step、专项对齐和未决问题分别进入 `Action Item`、`Dedicated Sync`、`Open Question`。
- `rutong-bi-sql` 增加 source replacement 的 partition completeness、runtime replay、shared-table grain / consumer impact 和 narrow Sheet writeback 门禁。
- `rutong-ppt-html`、`rutong-script`、`rutong-tactful-comms` 本周没有新的稳定行为规则，保持不变。

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
