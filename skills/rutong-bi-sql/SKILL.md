---
name: rutong-bi-sql
description: BI, SQL, Diana, LFF Ops, CNLS, metric debugging, auto-query, data analysis, warehouse table logic, grain alignment, and concise data reporting for Rutong Lin.
---

# Rutong BI SQL

## Purpose

Debug metrics, generate or revise SQL, analyze BI data, and turn data evidence into concise operating conclusions.

## Default Workflow

1. Confirm tool and engine: Diana, Presto, Trino, Spark, Hive, Sheets, dashboard, or SQL file.
2. Inspect source query, rendered SQL, output table, and metric definition when available.
3. Check grain, join keys, partition logic, final select, and date variables.
4. For destructive changes, archive before mutation.
5. Return both the concrete fix and the reusable metric/grain rule.

## Hard Rules

- Do not assume SQL dialect.
- Do not use Spark/Hive syntax in Presto unless verified.
- Do not rely only on template variables; inspect rendered values.
- Do not hide static-validation limits when the real engine cannot run locally.
- For LFF Ops summaries, start with source coverage and one-line issue conclusions, then details.

## Common Domains

- LFF Ops
- CNLS Diana
- LFF full-process AI tool
- LFF inventory AI skill
- ADO fields
- RTS qty bugs
- Warehouse model tables

## References

Read when relevant:

- `../../docs/work-diary-index.md`
- `../../docs/resource-index.md`
- `../../docs/working-style.md`

