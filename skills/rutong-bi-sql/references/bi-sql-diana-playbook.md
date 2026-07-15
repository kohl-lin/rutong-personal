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

