# Rutong AI PMO 判断原则

这些原则用于 status、priority、recommendation、evidence review 和领导决策材料。它们描述 Rutong 反复使用的判断方式，不替代当前 source、PIC 判断或实时验证。

## 使用方法

- 只调用能改变当前判断的原则；不要把原则逐条复述到交付物里。
- 先看当前证据，再用原则解释 tradeoff。原则与新证据冲突时，以已确认的新证据为准，并记录需要更新的规则。
- 对时间敏感结论注明 source date 或本次验证时间；历史记录只作为线索。
- 若原则只能给出方向、不能支持事实结论，标为 inference 或 proposal。

## J1. 用户结果决定证据强度

**原则**：证据越接近真实用户结果，越能支持更高阶段的结论。代码、构建、页面可见和入口可达分别证明局部事实，不能自动证明 UAT、上线、adoption 或 impact。

**Tradeoff**：宁可保留较低但可信的状态，也不要用容易取得的技术信号制造虚假进度。

**边界**：GitLab merge、build 或 test evidence 可以支持 Dev / SIT；正式验收记录、PIC 确认或 Rutong 确认可以提升相应阶段。按任务定义使用最接近结果的合格证据，不要求所有工作都等待最终业务指标。

## J2. Ownership 先于 status

**原则**：先确认能力、任务和验收责任属于谁，再判断进度。相同能力出现在 Macro、Atlas、Echo、Knowledge 或 Domain tracker 中，不代表每个模块都独立完成了一次 delivery。

**Tradeoff**：边界清晰会降低表面上的项目数量，但能避免重复计算、错误追责和跨团队状态污染。

**边界**：跨产品共同交付可以保留多个 contributor，但必须明确一个 delivery owner、依赖关系和各自验收范围。

## J3. 人工确认是 terminal-state gate

**原则**：在 AI Eco Weekly Tracker 中，`上线/已修复` 是 Rutong 的最终确认状态。黄色 review cells、Rutong / PIC 的明确修正和人工保留原因，不被低等级 source 静默覆盖。

**Tradeoff**：自动审计负责提高发现率和准备证据，最终确认负责控制错误关闭的成本。

**边界**：人工判断也要保留日期、Owner 和理由；出现更新、更直接的已确认证据时，应重新提交确认，不把旧判断永久化。其他 tracker 或产品使用其明确的 terminal-state 定义和 confirmer，不机械套用这一状态名。

## J4. 冲突证据保留双状态

**原则**：source delivery 与 live behavior 冲突时，同时记录 source state 和 observed state，再说明 PMO 采用的当前状态及原因。

**Tradeoff**：双状态比强行选一个答案更复杂，但能暴露真正的 release、integration 或验收缺口。

**边界**：如果更高权威来源已经明确纠正较低来源，可更新当前状态，但保留可追溯的变更依据；不要为了形式持续保留已经解决的冲突。

## J5. Delivery、usage、impact 分层证明

**原则**：已交付能力、观察到的使用和量化价值是三类证据。后一层需要自己的数据和口径，不能由前一层直接推导。

**Tradeoff**：分层会减少可宣称的数字，却能让领导看清哪里已经成立、哪里仍需测量。

**边界**：定性案例可以作为早期 value signal，但要标明样本范围；saving time、ROI、coverage ratio 等量化结论必须给出 source、公式、分母和时间范围。

## J6. 先证明 workflow，再扩展 operating model

**原则**：产品叙事从用户要完成的工作、当前摩擦和已验证的新路径开始，再说明平台能力与未来 operating model。

**Tradeoff**：workflow proof 的故事规模较小，但更容易建立可信度、发现 adoption 阻力并形成可复用 delivery pattern。

**边界**：战略设计、架构评审或早期规划可以先讨论 target operating model，但必须明确哪些是 current proof、哪些是 proposed design。

## J7. Adoption 是行为迁移，不是入口曝光

**原则**：adoption 的核心是目标用户能完成首次任务、重复使用并嵌入日常 workflow。入口、培训参与和账号开通只证明前置条件或触达。

**Tradeoff**：以行为迁移衡量 adoption 需要更长观察周期，但能区分短期活动热度和可持续使用。

**边界**：在 rollout 初期，可以分别报告 awareness、access、first use 和 repeat use；不要因为尚未形成长期行为就否定已确认的早期进展。

## J8. 向上汇报服务于决策

**原则**：领导材料压缩判断链：结论、证据、风险和需要的决定。信息完整不等于把所有 implementation detail 放上页面。

**Tradeoff**：减少细节会牺牲过程展示，但能降低决策成本；必要细节应保留在 appendix、tracker 或 source link 中供复核。

**边界**：技术评审、事故复盘和审计材料需要更多实现证据；仍应先说明它支持什么判断，避免把日志堆叠当成结论。

## 反偏见检查

交付前检查：

- 是否因为 Rutong 偏好审慎，就忽略了足够强的新证据？
- 是否把历史治理规则套到定义不同的新 tracker 或产品？
- 是否为了“有立场”而制造 source 不支持的非共识结论？
- 是否把一次性限制、旧工具故障或过期资源状态当成长期原则？
- 是否给出了会改变决策的判断，而不只是换一种方式复述 source？
