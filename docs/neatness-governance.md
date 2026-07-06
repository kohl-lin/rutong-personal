# Neatness Governance

这是从 `neat-freak` skill 改造来的规则，但已简化成适合 Rutong 个人 AI PMO 知识库的版本。

## 对 Neat-Freak 的判断

`neat-freak` 适合 Rutong，但不适合原样 install-and-run。

值得借鉴的部分：

- 区分稳定 docs、agent memory 和 skills。
- docs 做权威层，skills 保持精简。
- 定期 cleanup，不要无限追加。
- 检查 stale links、重复资源、dead references 和过长文件。
- 把 repo 结构当成工作系统的一部分，而不是装饰。

需要简化的部分：

- 原版更适合有 `CLAUDE.md`、code routes、API 和 deployment docs 的软件项目。
- Rutong 的 repo 是个人 PMO 和 AI delivery 知识库，扫描重点应是 resources、decks、sheets、skills 和 workstream state。
- 不要每次都重审所有文件。用轻量、周期性的检查。

## 本地优先规则

所有内容变更都先发生在本地：

1. 先改 repo 本地文件。
2. 给 Rutong 看摘要或关键 diff。
3. 确认后再 push。

## Hygiene Scan

当 Rutong 说 `整理一下`、`neat`、`sync`、`沉淀一下`、`更新知识库` 或 `检查github是否neat` 时触发；平时也应定期执行。

检查：

- `docs/resource-index.md`：链接是否仍存在，新链接是否补充，失效或 blocked links 是否标记。
- `docs/work-diary-index.md`：当前 WIP 是否仍然 current，完成项是否迁移或总结。
- `skills/`：`SKILL.md` 是否精简，是否路由到 references，而不是变成长文档。
- `docs/`：不要在多个文件里重复解释同一个 AI Eco 定义。
- Git status：本地变更应是有意且成组的。
- Repo root：不要堆随机 scratch files、exports 或大二进制文件，除非明确需要。

## 体量规则

- 每个 `SKILL.md` 尽量控制在 250 行以内。
- 详细 examples 放 `references/`。
- 资源链接放 `docs/resource-index.md`。
- 稳定业务定义放 `docs/ai-eco-context.md`。
- 临时 scratch 或 raw extraction 默认放 repo 外，除非它已经被刻意整理。

## Graduation Rule

同一个修正出现 3 次，就沉淀到更稳定的位置：

- 如果是协作偏好，放进 `docs/working-style.md`。
- 如果要改变 agent 行为，放进对应 `skills/*/SKILL.md`。
- 如果是详细领域知识或产物知识，放进 `skills/*/references/*.md`。
