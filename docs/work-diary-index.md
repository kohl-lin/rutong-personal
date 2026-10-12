# 2026 Work Diary Index

来源：https://docs.google.com/spreadsheets/d/1aZ4GTOWWdr9DnHY2S6jTMzJvd2r9vG1qi3KK6vaMdHU/edit?gid=1636212844#gid=1636212844

2026-07-06 已读取 sheet `2026` 的 preview。

2026-07-27：当前未登录请求访问 Google Sheet 返回 HTTP 401，未重新读取原 Sheet；以下新增信号来自近期已完成工作，原 Sheet 当前状态仍属 `blocked/unknown`。

## 7 月当前信号

| 领域 | 状态 | 主题 | 备注 |
|---|---|---|---|
| AI | WIP | OKR dashboard 加字段 | 需要 L30 active users，用于计算 saving time 和 coverage。 |
| AI | WIP | AI OKR target 调整 | Fashion cluster team 减少可能影响 target 可达成性。 |
| AI | WIP | Incentives Q2 | Q2 incentive event 预计 2026-07-06 到 2026-07-20，等待 People briefing。 |
| AI | WIP P0 | AI Knowledge 计划 | UAT route、version route、Atlas、Venda、Echo personal KB。 |
| BI/AI | WIP P0 | CNLS Diana | LFF 全流程 AI tool、Diana 架构、LFF inventory AI skill。 |
| AI | WIP | Route / AIS switch | 通过 AIS switch 配置 Codex/Claude CLI 的模型。 |
| AI | WIP | AI PMO | 2026-07-08 CNCB AI monthly。 |
| BI | WIP | RTS qty bug | 需要 BI debugging path。 |

## 7 月新增稳定信号

- AI Eco PMO 采用 Monday catch-up：上周 output、本周 priority、blocker 和待决策事项。
- Current AI Eco Weekly Tracker 保持单页细项；J 是 editable current status，Q:AL 是 Rutong 确认后的周历史。
- Tracker 判断先确认 ownership，再判断 status；source `Done`、GitLab commit 或可见 UI 不等于 UAT / 上线。
- `上线/已修复` 仅由 Rutong 最终确认；黄色 review cells 和人工修正优先于低等级 evidence。
- Enterprise knowledge 采用 owner-reviewed official answer + permission-filtered RAG：稳定高频答案受 Owner、版本、权限和 expiry 管理，动态与 long-tail 问题走检索证据。
- AI Awards / Incentives 采用 evidence-first review；weak evidence 降低 confidence 或限制推荐强度，不自动否决，同时保留全部评分维度、依据和 caveat。

## 8 月新增稳定信号

- AI Eco weekly update 要明确区分 `preflight blocked`、已完成 source/domain/live audit、已完成 writeback / publication，不能把前一步写成后一步成功。
- PIC reviewed 的 tracker 行需要刷新 O `Last Updated`；未完成项在 L `Latest Evidence` 保留 PIC 的真实原因，不要被模板化表述冲掉。
- impact / adoption 分析要解释公式、区分 source value 和 derived value，并把 `/`、`-`、blank 当 placeholder，而不是有效数值。
- 需要 chart asset 时，不要默认 Python plotting 可用；当前 Codex 运行时优先用 SVG + bundled Node `sharp`，并检查最终 PNG。
- Diana / Data Studio 采用 hybrid routing：固定 SQL 与 scheduled extraction 走 Data Studio；探索性语义、Topic / Skill 和 multi-turn 分析走 Diana；规则定义走 Knowledge / Echo；artifact writeback 留在 Macro 上层。
- Skill inventory 按相同目标、输入、步骤/规则、输出与验收标准聚类；用户侧 Skill entry 保持 implementation-silent，执行 backend 可以替换。
- usage log 的 empty answer 是日志完整性指标；没有 observation-level evidence 时不能当成产品失败率。
- Personal context infrastructure 只在真实任务出现 retrieval、routing、comprehension 或 validation failure 时升级；个人资产默认保持 private，不为假设中的团队共享增加双份维护或自动同步。
- AI Eco workspace 自检要逐条独立判断 candidate signal；证据、scope、authority 或 entity mapping 不足时保留 `review_pending`，并保护 stable issue key 和 Rutong 人工决定。
- Boss-facing deck 区分 observed delivery、observed usage 和 quantified impact；工程流程图压缩为 3-4 步决策链，Google Slides 写入后要做 fresh revision readback 和 rendered-thumbnail verification。

## 9 月新增稳定信号

- 1v1 AI-native onboarding 用客户自己的真实材料完成一次工作流迁移：先找可复用 Skill，再与 AI 澄清和比较路径，由人确认范围与验收标准，Agent 分阶段执行并接受 review。成功标准是客户能把这套起手方式迁移到下一个复杂任务。
- LFF FBS churn 分析中，`Current` 是 cohort-relative 状态；复现 cohort 总量时要先固定 grain，并去重重复的 M0 / base rows。聚合后的 `Raw_v2` 可以支持规则拆解，不能补出 seller-level 历史标签。
- 履历材料先维护 evidence-rich inventory，再按目标岗位压缩。HR 正式职位、功能定位、个人可归因机制、组织 adoption / impact 和 Portfolio scope 分开表达。
- 管理层交流总结以附件、文字稿和会议 transcript 为主证据，deck 只校准项目名、结构和数字；来源或时间窗不同的指标保持 source-qualified。
- AI Eco Workspace 是 PMO operating layer，放在产品矩阵之外；治理页先查 canonical repo / product-catalog 用词，保留清晰层级和留白，不用额外指标填空。
- 讲稿修改保留 Rutong 的口语逻辑和已确认页面，只改指定页；时间按页验证，并把讲稿、deck copy 建议和实际文件编辑分开报告。
- 已提交的 Data Studio SQL 先只读回查 saved definition 和依赖链；未经授权不保存、重跑或重提。Static validation 与 runtime result / persistence proof 分开报告。

## 10 月新增稳定信号

- 会议 follow-up 用 transcript 逐项复核候选清单：明确承诺或具体 next step 进入 `Action Item`，需要专项对齐的原则或治理议题进入 `Dedicated Sync`，未决 operating-model 设计进入 `Open Question`；项目进展、roadmap 和 housekeeping 留在 workstream tracker。
- 替换敏感或不可用数据源时，先验证目标时间窗的 partition 完整性，再在相同业务 grain 比较 key、metric 和 residual diff；saved SQL 只证明定义，实际 replay 成功才是 runtime proof。
- 共享 DWS 出现重复或指标放大时，先证明唯一 grain、producer lineage 和 downstream consumers；下游 IPI 或 dashboard 只负责暴露症状，production change 等 consumer impact 明确后再推进。
- Sheet 写入前确认输入值是 increment 还是 final total，先读 header 与样例，再做 narrow-range batch update；readback 同时覆盖写入范围和相邻保护范围。
- Curated Workbench 用 metadata 决定可见资源，完整 catalog 与 publish 由 canonical owner 承接；syntax / diff 检查只支持 static validation，浏览器交互、角色可见性和 copy flow 需要独立验证。

## 6 月已完成 / 活跃主题

- AI Knowledge plan：Knowledge、Echo、Atlas、AI Eco PMO tracker、enterprise knowledge governance、Q2 update。
- CNLS Diana：LFF full-process AI tool 和 inventory AI skill。
- AI PMO：CNCB AI Monitor 和 monthly meeting materials。
- Training：dev-product-process training、AI training tracking、SMART visit。
- BI：BI monthly updates、VISMIN deepdive、RTS qty issue、LFF ops diagnosis。
- Diana / LFF：ADO fields 和 CNLS/LFF warehouse model tables。

## 路由提示

- AI OKR、user adoption、monthly reporting、incentive tracking：用 `rutong-ai-pmo`。
- AI Knowledge、Echo、Atlas、Macro、Skill Factory、Sentinel：用 `rutong-ai-pmo`，并读 `docs/ai-eco-context.md`。
- Deck 或 HTML 材料：用 `rutong-ppt-html`。
- 讲稿或培训 facilitation：用 `rutong-script`。
- CNLS Diana、LFF skill、RTS qty、ADO、warehouse tables：用 `rutong-bi-sql`。
