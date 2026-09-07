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
