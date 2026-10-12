# LFF / CNLS / Diana Context

## 常见主题

- LFF Ops daily summary。
- CNLS Diana topic。
- LFF full-process AI tool。
- LFF inventory AI skill。
- ADO fields。
- RTS qty bug。
- warehouse model tables。

## 工作日记中出现过的资源

- Diana CNLS / LFF topic: `https://datasuite.shopee.io/diana2/topic/10526`
- LFF public opinion phase 1: `https://datasuite.shopee.io/studio?project_code=cncbbi_general&asset_id=11724992`
- LFF ops diagnosis sheet: `https://docs.google.com/spreadsheets/d/1142Y36DPFAEA4umaVEAcZAymCR71n6gfp-r9bew3A4o/edit?usp=sharing`

## 典型检查点

- shop / item / warehouse / region grain 是否一致。
- B2B / non-B2B 是否由正确字段判断。
- `merchant_region`、`shipment_type`、stage logic 是否混淆。
- leadtime 表是否因为 grain 不齐导致 duplicate rows。
- output summary table 是否和 corrected forecast output 对齐。

## FBS Churn / Cohort 复现

- 先确认 cohort grain、base month 和 weighting metric，再解释 churn 或 FBS Type 分布。
- `Current` 是相对每个 cohort 的当前状态，不能当成同一个 calendar month 的静态标签。
- 聚合 cohort 总量前去重重复的 M0 / base rows，避免 base seller 或 MP ADO 被重复计入分母。
- `months_since_cohort` 用于对齐不同起始月份的 cohort 生命周期；calendar month 与 cohort age 需要分开分析。
- 聚合后的 `Raw_v2` 可以支持规则化 churn decomposition；需要 seller-level 历史标签或迁移路径时，必须取得 seller-grain source。

## FBS Source Replacement

- 替换敏感或不可用 source 时，明确列出 source-to-target field mapping，并保持业务 grain 和 date window 一致。
- L30D backfill 先检查目标 30 个 distinct partitions；`available_days < 30` 时列出 missing dates，补齐后再解释 before / after diff。
- MP-side model classification 使用与 inventory MP model key 对齐的字段；MT-SKU key 只用于对应的 MT-SKU grain。
- 完成 SQL 更新后，用实际 Diana replay 和 output 证明 runtime；saved SQL、syntax check 或 Topic source list 只支持局部证据。

## Bundle / Shared DWS Grain

- Bundle parent / child attribution 要在 production join grain 上核对 sales 与 DOC；warehouse-grain table 可能保留 parent sales 并丢失 child 行。
- Shared DWS 的 mixed grain 会导致 row multiplication。先用 producer lineage 找到 root source，定义安全唯一 key，再盘点下游 consumer；IPI、dashboard 或其他 downstream 只作为 symptom evidence。
