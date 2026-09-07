# Shopee Template Mode

## 用途

为 Shopee 内部业务汇报提供完整模板能力：

- Native editable PPTX。
- Browser-editable HTML。
- Review annotations、local autosave 与 HTML export。
- Packaging、lint、screenshot 和 runtime validation。
- 55 页脱敏 Shopee PPTX 作为 style library。

Skill root 是 `rutong-ppt-html/`。所有路径均从 skill root 解析，不能依赖 `rutong-personal` repo 外部文件。

源 bundle 来自内部 GitLab `shopee-template-slides`，整合基线为 commit `0a30c14368d8e83f73d7a9f78b097891c0b9b637`。保留资产仅供 Shopee 内部工作使用。

## 规则优先级

1. 用户当前明确指令。
2. 用户提供的 source deck 或 template。
3. Rutong 的 source fidelity、answer-first、evidence boundary 和 visual QA 规则。
4. 本 Shopee template 的 layout、brand 与 runtime 规则。

用户提供模板时跟随用户模板。Shopee bundle 是可选模板，不覆盖更具体的 source-of-truth。

## 先规划

先读：

- `shopee-template/slide-mapping-plan.md`

根据任务按需加载：

- 管理层判断、诊断、策略或决策汇报：`shopee-template/consulting-storyline.md`
- 粗笔记、表格、截图和混合素材：`shopee-template/content-patterns.md`
- 综合已有 Shopee deck：`shopee-template/source-deck-patterns.md`

计划至少明确 audience、decision、core conclusion、storyline、每页 claim、proof object、evidence gap 和 exclusions。除非用户明确跳过确认，生成前先让用户确认 storyline 和 page plan。

## 生成

两种格式都先读：

- `shopee-template/internal-visual-assets.md`
- `shopee-template/shopee-dual-format-style.md`
- `shopee-template/shopee-slide-design-system.md`

需要 analytical visual 时读：

- `shopee-template/visual-element-library.md`

需要品牌资产时读：

- `shopee-template/shopee-brand.md`

### HTML

读 `shopee-template/html-workflow.md`。

模板：

- `../assets/shopee-template/templates/shopee-internal-report/`

工具：

- `../scripts/shopee-template/package-deck.mjs`
- `../scripts/shopee-template/lint-deck.mjs`
- `../scripts/shopee-template/screenshot-deck.mjs`

生成的 deck 必须保留 `contenteditable`、`deck-stage.js`、`review-annotations.js` 和本地 Shopee logo。先 package，再 lint 和 screenshot。

`assets/shopee-template/brand/logos/` 是 packaging 的 canonical logo source；template 内的 `assets/brand/logos/` 是可直接打开的 self-contained copy。两份文件必须保留相同 hash，并由 `validate-template.mjs` 检查一致性。

### PPTX

读 `shopee-template/pptx-workflow.md`，并调用 `presentations` skill。

视觉参考：

- `../assets/shopee-template/reference-decks/shopee-monthly-reference/reference.pptx`
- `../assets/shopee-template/reference-decks/shopee-monthly-reference/contact-sheet.png`

默认把 reference deck 当作 style library。只有用户明确要求 exact template reuse 时才复制 source slides 或保留 master/layout hierarchy。

## Rutong 覆盖规则

- 标题直接写业务结论。
- 页面只有一个主结论和一个 dominant proof object。
- 不自动继承上游示例里的 presenter tag、固定市场顺序、ask panel 或营销式文案。
- Status color、箭头、checkmark 和数字必须有证据支持。
- 用户说内容不改时，只调整 layout 和 visual。
- Speaker notes、prompt residue 和 implementation notes 不进入可见页面。

## 验证

完整 bundle 验证：

```bash
node <skill-root>/scripts/shopee-template/validate-template.mjs
node <skill-root>/scripts/shopee-template/test-runtime.mjs
```

单个 HTML deck：

```bash
node <skill-root>/scripts/shopee-template/package-deck.mjs <output>/index.html --single-file
node <skill-root>/scripts/shopee-template/lint-deck.mjs <output>/index.html
node <skill-root>/scripts/shopee-template/screenshot-deck.mjs <output>/index.html <output>/screenshots
```

最后读 `shopee-template/visual-review.md`，检查每页 rendered pixels 后再交付。
