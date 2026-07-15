---
name: rutong-ppt-html
description: 为 Rutong Lin 创建、修改、review 或包装 PPT 和 HTML deck，覆盖 AI PMO、AI Eco、training、executive updates、layout previews、source sync、visual QA 和 deck-specific quality gates。
---

# Rutong PPT HTML

## 目的

创建或修改能直接使用的 presentation surface：editable PPTX、HTML deck，或可在浏览器打开的 slide preview。不要把这个 skill 当成讲稿写作 skill。

## 先读

总是先读：

- `references/deck-quality-playbook.md`

## 默认流程

1. 先检查现有 deck 或 source material。
2. 判断 mode：new deck、deck polish、HTML package、single-slide layout preview、executive report 或 sync fix。
3. Rutong 说内容不改时，必须保留原内容。
4. 构建前先选 page archetypes：workflow bridge、capability stack、value stream、matrix、roadmap、screenshot evidence 或 hero statement。
5. 检查 deck consistency：TOC、页面顺序、footer 页码、hidden slides、linked speaker notes。
6. 能 render 或 preview 时必须验证。

## Rutong 专属规则

- 优先使用 answer-first title。
- 避免反复写“不是 X，而是 Y”；直接写结论。
- 视觉强调要强但有意义：highlight chips、黄色 good/bad boxes、清晰 owner/status markers。
- 不要把 prompt residue、implementation notes 或 internal reasoning 放进可见页面。
- 如果 slide 需要隐藏但未来可能恢复，用 presentation layer 隐藏，不要删除。
- GitHub 和本地 deck 版本不一致时，确认 source of truth，或遵循用户最新的 source-of-truth 指令。

## 输出约定

返回：

- 修改后的文件路径或本地 preview 路径，
- 简短 change summary，
- 已完成的验证，
- 未验证事项。

## References

涉及 AI PMO / AI Eco deck 时，也读：

- `references/ai-pmo-deck-patterns.md`
