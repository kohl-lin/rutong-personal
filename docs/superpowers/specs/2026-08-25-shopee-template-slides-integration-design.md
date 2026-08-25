# Shopee Template Slides Integration Design

## 目标

把内部 `shopee-template-slides` 的 Shopee 模板能力整合进 `rutong-ppt-html`，形成一个统一入口：

- Rutong 原有 deck 偏好、AI PMO 证据规则和 source-following 逻辑继续作为默认行为。
- Shopee 内部汇报场景可选择完整模板模式，支持 native PPTX 与 browser-editable HTML。
- HTML 模式保留编辑、批注、导出、lint、截图和视觉 QA。
- PPTX 模式保留 55 页脱敏视觉参考与 native editable 生成规则。

源材料来自内部 GitLab project `shopee-template-slides` 的 `main` 分支归档，源 commit 为 `0a30c14368d8e83f73d7a9f78b097891c0b9b637`。

## 方案

采用精选式完整整合。

`rutong-ppt-html` 继续作为唯一入口。Shopee 模板作为 skill 内可选 bundle 存在，只有用户明确要求 Shopee 风格、内部业务汇报模板，或内容形态明显匹配 weekly/monthly/quarterly review、OKR、运营诊断、决策汇报时才加载。

不新增第二个可调用 PPT skill，避免 `rutong-ppt-html` 与 `shopee-template-slides` 发生路由竞争。

## 目录结构

```text
skills/rutong-ppt-html/
|-- SKILL.md
|-- references/
|   |-- deck-quality-playbook.md
|   |-- ai-pmo-deck-patterns.md
|   |-- shopee-template-mode.md
|   `-- shopee-template/
|       |-- consulting-storyline.md
|       |-- content-patterns.md
|       |-- html-workflow.md
|       |-- internal-visual-assets.md
|       |-- pptx-workflow.md
|       |-- shopee-brand.md
|       |-- shopee-dual-format-style.md
|       |-- shopee-slide-design-system.md
|       |-- slide-mapping-plan.md
|       |-- source-deck-patterns.md
|       |-- template-strategy.md
|       |-- visual-element-library.md
|       `-- visual-review.md
|-- assets/
|   `-- shopee-template/
|       |-- brand/
|       |-- reference-decks/
|       |-- shared/
|       `-- templates/shopee-internal-report/
`-- scripts/
    `-- shopee-template/
        |-- lint-deck.mjs
        |-- package-deck.mjs
        |-- screenshot-deck.mjs
        |-- test-runtime.mjs
        `-- validate-template.mjs
```

模板内现有 `deck-stage.js` 与 `review-annotations.js` 继续随模板保留。脚本按 skill 内的新相对路径调整，确保 repo copy 与 `~/.codex/skills/` runtime copy 都能独立运行。

## 保留内容

- 10 个 Shopee internal report HTML layouts。
- Browser text editing、layout editing、review annotations、autosave 与 HTML export runtime。
- `lint-deck`、`package-deck`、`screenshot-deck`、`test-runtime`、`validate-template`。
- Shopee logo、shared CSS、template metadata 和 layout catalog。
- 55 页脱敏 Shopee reference PPTX、contact sheet、preview 与 manifest。
- Storyline、evidence、brand、dual-format、visual element 和 visual review references。

## 排除内容

- `.codex-plugin/plugin.json` 和上游 `agents/openai.yaml`。
- 上游 release ZIP。
- 上游 README、AGENTS、Git metadata 和 package-plugin 脚本。
- 只服务上游插件发布、索引重建或新模板开发的脚本。
- 未被模板或保留脚本引用的重复文件。

## 路由规则

### 默认模式

继续执行现有 `rutong-ppt-html`：

- 先读 source deck 或 source material。
- answer-first title。
- 每页一个主结论和一个 dominant visual。
- AI PMO / AI Eco 任务加载 `ai-pmo-deck-patterns.md`。
- 用户提供模板时优先跟随该模板。

### Shopee Template Mode

以下情况加载 `references/shopee-template-mode.md`：

- 用户明确说 Shopee template、Shopee internal report、Shopee monthly/weekly/quarterly review。
- 用户要求 browser-editable HTML、批注、export 或模板 runtime。
- 用户明确要求使用新整合的 Shopee 模板。

该模式下：

1. 先确认输出为 HTML、PPTX 或两者。
2. 用统一 story/evidence map 规划内容。
3. HTML 与 PPTX 原生生成，不互相转换。
4. 保留 Rutong 的直接结论、证据边界、source fidelity 和视觉 QA 规则。
5. 只有用户明确要求 exact template reuse 时才复制参考 PPTX 页面；默认把参考 deck 作为 style library。

## 冲突处理

规则优先级：

1. 用户当前明确指令。
2. 用户提供的 source deck / template。
3. Rutong 专属内容与证据规则。
4. Shopee template 的 layout、brand 和 runtime 规则。

Shopee 模板示例中的营销式文案、固定 presenter tag、固定市场排序和未经用户要求的 ask panel 不自动继承。它们只在当前 deck 内容需要时使用。

## 验证

实施完成后必须通过：

- `quick_validate.py` 验证 repo 与 global 两份 `rutong-ppt-html`。
- `git diff --check`。
- `diff -qr` 验证 repo/global skill 完全一致。
- `validate-template.mjs` 验证模板结构、runtime 一致性和 reference PPTX hash。
- `test-runtime.mjs` 验证浏览器编辑、批注和 packaging runtime。
- 至少生成一个最小 HTML smoke deck，执行 package、lint 和 screenshot。
- 检查 screenshot 中 1280x720 canvas、header、footer、toolbar、编辑与批注区域无重叠。

## 发布边界

先修改 `rutong-personal` 本地 checkout，再同步到 `~/.codex/skills/rutong-ppt-html/` 并验证。只有 Rutong 明确确认发布后才 commit implementation 并 push GitHub。

