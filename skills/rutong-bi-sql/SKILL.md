---
name: rutong-bi-sql
description: 处理 Rutong Lin 的 BI、SQL、Diana、LFF Ops、CNLS、metric debugging、auto-query、data analysis、warehouse table logic、grain alignment 和简洁数据汇报。
---

# Rutong BI SQL

## 目的

debug 指标、生成或修改 SQL、分析 BI 数据，并把数据证据转成简洁的运营结论。

## 先读

总是先读：

- `references/bi-sql-diana-playbook.md`

## 默认流程

1. 先确认工具和引擎：Diana、Presto、Trino、Spark、Hive、Sheets、dashboard 或 SQL file。
2. 如可获得，检查 source query、rendered SQL、output table 和 metric definition。
3. 检查 grain、join keys、partition logic、final select 和 date variables。
4. 涉及 destructive changes 时，先 archive，再 mutation。
5. 同时返回具体修法和可复用 metric/grain rule。

## 硬规则

- 不要假设 SQL dialect。
- 未验证前，不要在 Presto 里使用 Spark/Hive syntax。
- 不要只看 template variables；必须检查 rendered values。
- 本地无法运行真实 engine 时，要说明 static-validation 的限制。
- LFF Ops summary 先写 source coverage 和每个 issue 的一句话结论，再写细节。

## 常见领域

- LFF Ops
- CNLS Diana
- LFF full-process AI tool
- LFF inventory AI skill
- ADO fields
- RTS qty bugs
- Warehouse model tables

## References

涉及 LFF Ops / CNLS / Diana 时，也读：

- `references/lff-cnls-context.md`
