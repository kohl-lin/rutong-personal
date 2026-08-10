# BI SQL / Diana Playbook

## 默认判断顺序

1. 先确认工具：Diana、SQL file、dashboard、Sheets、Data Suite、local export。
2. 先确认 engine：Presto、Trino、Spark、Hive。
3. 再看口径：metric definition、grain、join key、date window、partition。
4. 最后看输出：final select、rendered variables、sample rows、duplicate rows。

## SQL 硬规则

- 不要假设 dialect。
- Presto 不要写 Spark/Hive 的 `insert overwrite`、`date_sub`、某些 `to_date` 写法。
- Spark/Hive 不要照搬 Presto 的 `DELETE + INSERT INTO`。
- 日期变量必须看 rendered SQL，不要只看 template。
- destructive SQL 要 archive first，再 delete / insert。
- 如果无法本地跑真实 engine，只能说 static validation。

## 输出方式

Rutong 通常要两层输出：

1. 直接怎么改：SQL / join / grain / partition / logic。
2. 以后怎么判断：可复用的 metric 或 grain rule。

## 数据汇报

结论前置：

- 数据来源。
- 每件事一句话概括。
- 细节后置。
- 字数少，但 issue 覆盖要全。

## Impact / Adoption Analysis

- 先说明公式，再报结果；区分 source value 和 derived value。
- `/`、`-`、blank 视为 placeholder，不能直接参与分母、排序或环比计算。
- 如果 conversion、impact 或 adoption rate 由多个字段推导出来，要写清推导链，不把推导值冒充成源表原生指标。
- 缺少口径定义时，宁可标注 `inferred` / `needs confirmation`，也不要把估算结果写成 authoritative。

## Diana / Data Studio Hybrid Routing

- 已知 SQL、固定模板、scheduled extraction：优先 Data Studio。
- 探索性语义问题、Topic / Skill interaction、multi-turn clarification：优先 Diana。
- SOP、规则和定义：交给 Knowledge / Echo；Sheet、deck、report、email 和 writeback：交给 Macro 上层 artifact / workspace workflow。
- 结果超过约 2k rows 时，优先 materialized table、Data Studio Output、CSV 或 Data Services；LLM 只处理摘要和抽样 QA。
- Data Studio 页面可见或 tab probe 成功不能证明 API 可用；必须用真实 API preflight / execution result 验证 authentication。
- 大范围迁移前，用代表性 case replay 比较 answer consistency、人工补充、端到端耗时、LLM cost 和 failure / permission rate。
