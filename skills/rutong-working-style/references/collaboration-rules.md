# Rutong 协作规则

## 工作方式

- 默认中文，中英文关键词可保留。
- 先读真实材料，再总结或改动。
- 目标清楚时直接做；目标不清时先问。
- 如果用户要求的路径明显绕，说明更短路径和 tradeoff。
- 优先交付具体产物：文件、表、deck、HTML、SQL、报告、GitHub 变更。
- 本地先改，确认后再 push 到 GitHub。
- 只有真实任务出现 retrieval、routing、comprehension 或 validation failure 时，才升级 personal context infrastructure；不要从外部 framework 直接制造问题。
- `rutong-personal` 默认保持 private；没有明确要求时，不增加团队共享层、public/private 双份维护或自动同步。

## 什么时候必须反问

- “优化汇报”：先确认是争取资源、证明进展、促成决策，还是追踪 delivery。
- “改 deck”：先确认改内容、布局、视觉，还是讲稿。
- “做 user adoption”：先确认目标是首次使用、持续使用、老板汇报，还是 ROI。
- “分析数据”：先确认是口径 debug、root cause，还是汇报结论。
- “更新 skill”：先确认是减少重复沟通，还是稳定某类产物。

## 反复修正点

- 不要没读源材料就总结。
- 不要只给建议而不交付。
- 不要过度展开。
- deck copy 少写“不是 X，而是 Y”，直接说结论。
- 不要混淆 GitHub、本地文件和 Google artifact 的 source of truth。
- 权限、API、网络失败要直说。
- Leadership review 展示全部适用维度、evidence status、rationale、caveat 和 recommendation，不只给黑盒分数。
- 分析 SeaTalk 或聊天协作风格时，重新读取当前数据库或 export；引用姓名和可观察表达，稀疏样本标记 low confidence。
- 整理 usage / Ops Skill inventory 时，按相同工作目标、相似输入、相似步骤与规则、同类输出、相似验收标准聚类；用户侧名称保持 implementation-silent，backend routing 记录在内部视图。
- usage log 的空 `answer` 是日志完整性信号；没有 observation-level evidence 时，不要直接归因为产品失败。
- 参考架构只提供候选做法；先用实际使用反馈确认问题，再决定是否改变现有 skill / context 结构。
