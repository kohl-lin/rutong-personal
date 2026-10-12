# Resource Index

这个文件记录源链接和本地资源。后续做总结、deck、skill 或知识整理时，应先查这里，不要重复找上下文。

## Link Audit

- 2026-07-27：公开 `neat-freak` source 和 Dev product process training HTML 均返回 HTTP 200；本地 Qu Yue PPTX skill zip 仍存在。
- 2026-07-27：下列 Google Docs / Sheets / Slides 在当前未登录请求中返回 HTTP 401；历史读取记录保留，但内容与权限状态均标记为 `blocked/unknown`。
- 2026-07-27：DataSuite、Diana 和 MLP 私有入口返回 HTTP 200，只能证明入口可达；未在已认证业务会话中复核内容，继续标记为 `blocked/unknown`。
- 2026-08-05：当前运行环境 DNS / 外网解析失败，`github.com`、`docs.google.com` 和 GitHub Pages 均无法重新探活；本次只能沿用上次 link audit 结果，状态记为 `blocked/unknown`，不把旧记录当成当次复核。
- 2026-08-10：公开 `neat-freak` source 和 Dev product process training HTML 重新探活均返回 HTTP 200；Google private resource sample 仍返回 HTTP 401；DataSuite 私有入口返回 HTTP 200 只证明入口可达，内容继续标记 `blocked/unknown`；本地 Qu Yue PPTX skill zip 仍存在。
- 2026-08-17：公开 `neat-freak`、training HTML、Context Infrastructure article 和 reference implementation 均返回 HTTP 200；Google private resources 返回 HTTP 401；GitLab demo 和 Diana 入口返回 HTTP 200 只证明入口可达，内容继续标记 `blocked/unknown`；本地 Qu Yue PPTX skill zip 仍存在。
- 2026-08-24：当前运行环境 sandbox 禁用外网（`CODEX_SANDBOX_NETWORK_DISABLED=1`），DNS 无法解析，`github.com`、`docs.google.com` 和 GitHub Pages 均无法重新探活；沿用上次 link audit 结果，状态继续记为 `blocked/unknown`，不把旧记录当成当次复核。
- 2026-08-25：通过企业 Google SSO 验证内部 GitLab `shopee-template-slides` 项目可读，当前账号为 `@rutong.lin01`；下载并核对 `main` commit `0a30c14368d8e83f73d7a9f78b097891c0b9b637`。网页账号未登记 SSH key，因此本次使用 authenticated ZIP，不把 SSH clone 失败视为 project permission failure。
- 2026-09-07：公开 `neat-freak`、training HTML、Context Infrastructure article 和 reference implementation 均返回 HTTP 200；Google private work diary 返回 HTTP 401；DataSuite 与 GitLab 私有入口返回 HTTP 200 只证明入口可达，内容继续标记 `blocked/unknown`；本地 Qu Yue PPTX skill zip 仍存在。
- 2026-10-09：公开 `neat-freak`、training HTML 和 Context Infrastructure reference implementation 返回 HTTP 200；Context Infrastructure article 返回 HTTP 403；Google private work diary 返回 HTTP 401；Diana 与 GitLab 私有入口返回 HTTP 200 只证明入口可达，内容继续标记 `blocked/unknown`；本地 Qu Yue PPTX skill zip 仍存在。
- 2026-10-12：公开 `neat-freak`、training HTML、Context Infrastructure reference implementation 和 Shopee Design 返回 HTTP 200；Context Infrastructure article 返回 HTTP 403；全部已登记 Google private resources 返回 HTTP 401；DataSuite、MLP 与 GitLab 私有入口返回 HTTP 200 只证明入口可达，内容继续标记 `blocked/unknown`；已登记本地资源均存在。

## 培训 Phase 1

| 资源 | 链接 | 当前记录 |
|---|---|---|
| Training Phase 1 material pack | https://docs.google.com/spreadsheets/d/1vXUiliotf-5ZcvlSk4Px4fRc4oFqTdPIFcyMcNzLjnU/edit?gid=92545783#gid=92545783 | 2026-07-06 已读。Sheet 标题：`[CNCB AI] AI@Work Phase 1 Learning Pack(Online)`。包含 deck link、SMART platform、Seatalk Open Platform、Data Suite API、prompt helper、教程、FAQ 和录屏。 |
| Training Phase 1 script | https://docs.google.com/document/d/1PZeGyLIj7YfmJ6XYV-Z2pwmY-qVZ9LeYHHV2nx3o2MA/edit?tab=t.0#heading=h.dn7z0wcx6jwg | 2026-07-06 已读。Doc 标题：`phase1 online training讲稿`。覆盖 AI Agent 基础、SMART setup、prompt structure、KB、Seatalk Bot、timer、multi-agent/workflow 和 Q&A。 |
| Training Phase 1 PPT | https://docs.google.com/presentation/d/1cMjcX_Tz-Pq053zDz6TQjppuL98v3xqt7gvEoW7uRPA/edit?slide=id.g399066fbcfd_0_193#slide=id.g399066fbcfd_0_193 | 2026-07-06 本地读取时 Slides API 因 `SERVICE_DISABLED` 被拦。需要内容时走 Drive export fallback。 |

## AI Eco 和 Macro

| 资源 | 链接 | 当前记录 |
|---|---|---|
| Macro first report PPT | https://docs.google.com/presentation/d/1DpHBeZrc0dg3VTuAieflfyCE8ZgBMMgNyidycAXVLCU/edit?slide=id.g3d04a25b040_0_87#slide=id.g3d04a25b040_0_87 | 2026-07-06 本地读取时 Slides API 因 `SERVICE_DISABLED` 被拦。需要内容时走 Drive export fallback。 |
| AI Eco report PPT | https://docs.google.com/presentation/d/13i961-OItGmA-Dhf8DxcaEteg1yGJmXSDqFexAcoLl8/edit?slide=id.g3d04a25b040_0_87#slide=id.g3d04a25b040_0_87 | 2026-07-06 本地读取时 Slides API 因 `SERVICE_DISABLED` 被拦。需要内容时走 Drive export fallback。 |
| Knowledge / Echo / Atlas PMO sheet | https://docs.google.com/spreadsheets/d/1m0zrgepYbvKHAJrgtsILqzgTCWyBntATONLG6d-8qts/edit?gid=525686385#gid=525686385 | 2026-07-06 已读。Roadmap 包含 Cross-Knowledge、Macro dependency、Echo、Atlas 和 knowledge quality workstreams。 |
| AI Eco roadmap / archive tracker | https://docs.google.com/spreadsheets/d/1C-DbQoMJA63R1LLu3nWkhKMhMOXjGbusQANQrW2G3KE/edit?gid=231054361#gid=231054361 | 2026-07-06 已读。保留为 quarterly roadmap 与 archive source，不再作为当前 weekly cockpit。 |
| Current AI Eco Weekly Tracker | https://docs.google.com/spreadsheets/d/1A4vHBp1Y-ZmSCEMM15fJwrvf1yv6jrLlCpMg2o5mxug/edit?gid=71307472#gid=71307472 | 2026-07-21 已核对。单页任务细项 tracker；J 是当前 PMO 状态，Q:AL 是 Rutong 确认后的周历史。 |
| 2026 work diary | https://docs.google.com/spreadsheets/d/1aZ4GTOWWdr9DnHY2S6jTMzJvd2r9vG1qi3KK6vaMdHU/edit?gid=1636212844#gid=1636212844 | 2026-07-06 已读 preview。是当前 WIP 和已完成 AI/BI workstream 的来源。 |

## 本地资源

| 资源 | 路径 | 当前记录 |
|---|---|---|
| Qu Yue PPTX deck skill zip | `/Users/rutong.lin01/Downloads/quyue-pptx-deck-share-20260703.zip` | 2026-07-06 已检查。可借鉴结构：精简 `SKILL.md`、references、script、template asset、quality gates。 |
| Neat-freak skill source | https://github.com/KKKKhazix/khazix-skills/tree/main/neat-freak | 2026-07-06 已检查。适合借鉴定期 hygiene、resource cleanup、docs-memory 分层；不宜原样照搬。 |
| Shopee template slides | https://gitlab-saas.shopeemobile.com/shopee-cncb/cncb-bi/seller-ops/skill/yuna/shopee-template-slides | 2026-08-25 已认证读取。精选整合进 `rutong-ppt-html`：Shopee internal HTML template、browser edit/review/export runtime、QA scripts、55 页脱敏 PPTX style library；上游 release/plugin packaging 未纳入。 |
| AI-first Codex onboarding session design | `/Users/rutong.lin01/Documents/AI PMO/docs/superpowers/specs/2026-09-01-ai-first-codex-onboarding-session-design.md` | 2026-09-07 已读。沉淀 client-led 1v1 onboarding：真实材料、Skill-first、人工范围与验收、Agent 分阶段执行和 review。 |
| Resume career inventory 2022-2026 | `/Users/rutong.lin01/Documents/rutong个人/resume-career-inventory-2022-2026.md` | 2026-09-07 已读。作为完整履历事实库；正式简历只使用已确认事实，并保持个人机制、组织结果和当前 live 状态的证据边界。 |
| CNCB BI monthly meeting transcript | `/Users/rutong.lin01/Documents/CNCB BI monthly meeting 2026-09-10 09:56(GMT+8:00).txt` | 2026-10-10 已复核。用于区分 Action Item、Dedicated Sync、Open Question，并把 project status / housekeeping 留在 workstream tracker。 |
| CENO Knowledge Workbench demo | `/Users/rutong.lin01/Documents/ChatGPT/latam/ceno-knowledge-workbench-demo` | 2026-10-10 已读。Curated MCP & Skills、Loop canonical catalog 和 bundle publish 模型已确认；browser regression 与 scoped commit 证据仍是 `partial`。 |
| CNLS FBS events replacement artifact | `/Users/rutong.lin01/Documents/ChatGPT/LFF/cnls-fbs-sku-monthly-inbound-pipeline-updated.md` | 2026-10-09 已读。记录 source mapping、30/30 partition gate、model/rank reconciliation 和 Diana runtime replay。 |

## Context Infrastructure 和 Workspace Governance

| 资源 | 链接 | 当前记录 |
|---|---|---|
| Context Infrastructure article | https://www.superlinear.academy/c/ai-resources/context-infrastructure | 2026-08-12 已读。可借鉴 conditional loading 和 human-confirmed learning；不据此推定当前存在 context 问题。 |
| Context Infrastructure reference implementation | https://github.com/grapeot/context-infrastructure | 2026-08-12 已检查。作为分层 context / rules / skill 的参考实现，不直接复制其完整架构。 |
| BI Workspace workshop deck | https://docs.google.com/presentation/d/1Ak_D8fCYpdR-2U_U2vlwZaxVBDBADVfodOZtZrqEh5w/edit?slide=id.g3f6cb820b7a_0_346 | 2026-08-12 已读；2026-08-17 未登录请求返回 HTTP 401。个人资产默认保持 private，不自动引入 Team Workspace 同步。 |
| BI Workspace demo repo | https://gitlab-saas.shopeemobile.com/cncb-ai-workspace/cncb-bi-ai-workspace-demo | 2026-08-12 未通过登录验证；2026-08-17 入口 HTTP 200 只证明可达，实际实现继续标记 `blocked/unknown`。 |

## 工作日记 Preview 中出现的其他链接

| 资源 | 链接 | 备注 |
|---|---|---|
| Diana CNLS / LFF topic | https://datasuite.shopee.io/diana2/topic/10526 | 2026 工作日记中归在 CNLS Diana。 |
| AIS switch guide | https://doc.mlp.shopee.io/AIP/MAAS/CQP/ais_switch_guide_cn/ | 2026 工作日记中归在 route / model configuration。 |
| Dev product process training HTML | https://kohl-lin.github.io/AI-Eco---Knowledge/document/dev-product-process-training/ | 2026 工作日记中记录为已完成培训材料。 |
| LFF public opinion phase 1 | https://datasuite.shopee.io/studio?project_code=cncbbi_general&asset_id=11724992 | 2026 工作日记中出现。 |
| LFF ops diagnosis sheet | https://docs.google.com/spreadsheets/d/1142Y36DPFAEA4umaVEAcZAymCR71n6gfp-r9bew3A4o/edit?usp=sharing | 2026 工作日记中出现。 |
