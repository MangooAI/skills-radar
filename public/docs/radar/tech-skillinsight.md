# skill-insight

> **分类**: Skill 评测 | **成熟度**: 🟢 成熟期 | **综合评分**: 0.73

---

## 基本信息

**一句话描述**: 给 Agent 装上"后视镜"和"仪表盘"，让每一次 Skill 执行都能被看见、被衡量、被优化。

**来源**:
- 开源项目：openEuler 社区 (witty-skill-insight)
- 发布年份：2026年

**链接**:
- 项目链接：https://atomgit.com/openeuler/witty-skill-insight

---

## 核心技术

### 核心原理

skill-insight 通过透明代理技术拦截 Agent 执行过程，采集多维度数据，实现对 Skill 效果的可观测性。其核心设计包括：

- **透明代理技术**：任何支持 OpenAI SDK 的 Agent，只需配置一个 Base URL，即可无感接入
- **多维度数据采集**：覆盖效果（准确率）、效率（时延）、成本（Token）、安全（Security）四大维度
- **智能归因分析**：自动区分"模型没做好"还是"Skill 没写好"

### 核心创新

- **多维度对比**：同一任务在不同模型（GPT-4、DeepSeek）、不同 Agent（OpenCode、ClaudeCode）上的表现对比
- **智能裁判系统**：自动评分、Skill 召回验证、失败归因
- **统一管理中心**：版本控制、跨框架统一配置、效果对比

---

## 技术细节

### 主要能力

- **数据采集**：透明代理、会话记录、指标追踪
- **Skill 管理**：Skill 仓库、版本控制、启用/禁用
- **评估引擎**：答案准确性、Skill 召回、失败归因
- **可视化**：Dashboard、详情下钻、配置管理

### 适用场景

- 评估 Skill 在不同模型上的表现一致性
- 优化 Skill 后的效果验证
- 团队内部 Skill 质量对比
- 故障定位与归因

### 局限性

- 目前主要支持 OpenAI SDK 兼容的 Agent
- 部分高级功能（Skill 质量评分、相似 Skill 聚类）在 Roadmap 中

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.85 | 0.1版本已完成开发 |
| 创新性 | 0.80 | 归因分析和多维对比的创新设计 |
| 落地程度 | 0.75 | 已在 openEuler 社区实际使用 |
| 生态活跃度 | 0.70 | 活跃的开源社区开发 |

**综合评分**: 0.73

---

## 相关技术

- SkillsBench：技能基准测试
- SkillProbe：技能安全审计

---

## 参考资料

- [skill-insight 项目](https://atomgit.com/openeuler/witty-skill-insight)
- [Agent Skills洞察与实践 - Skill-Insight原文](../tech-blog/Agent%20Skills洞察与实践/【Agent%20Skills洞察与实践】05-Skill-Insight：给%20Agent%20装上后视镜，让Skills开始进化.md)
- [Agent Skills洞察与实践 - Skill-insight量化之路](../tech-blog/Agent%20Skills洞察与实践/【Agent%20Skills洞察与实践】06-Skill-insight：Agent%20skills从"感觉"到"量化"的进化之路.md)
