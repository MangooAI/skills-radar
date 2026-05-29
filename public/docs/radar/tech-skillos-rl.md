# SkillOS

> **分类**: Skill 管理 | **成熟度**: 🟡 成长期 | **综合评分**: 0.58

---

## 一句话描述

SkillOS 将 Skill 定义为 Agent 的"程序性记忆"，通过强化学习训练 Skill Curator 自动完成 Skill 的编写、修改和删除，是首个将 Skill 管理从人工维护移交 Agent 自治的系统性方案。

**来源**:
- 学术论文：Google Cloud AI Research + UIUC
- 发布年份：2026年

**链接**:
- 论文链接：https://arxiv.org/abs/2605.06614

---

## 核心实现

SkillOS 由两个核心组件构成，形成"执行-管理"闭环：

**1. Agent Executor（冻结，不训练）**：负责执行任务——从 SkillRepo 中检索相关 Skill，按 Skill 指令执行。模型参数冻结不动，行为完全由 SkillRepo 驱动。

**2. Skill Curator（可训练）**：负责管理 Skill——观察 Executor 执行完一个任务后的轨迹，决定是 insert（新增）、update（修改）还是 delete（删除），更新 SkillRepo。这是通过 RL 训练的长 horizon 决策模型。

**关键设计**

- 任务流分组 + 两阶段评估：将任务按"技能相关性"分组成 stream，前面轨迹更新 SkillRepo，后面相关任务评估更新是否有效——为 Curator 提供延迟奖励信号
- 复合奖励（composite rewards）：设计组合奖励将执行反馈精准归因到 Curator 的某次具体编辑，解决"光看下游对/错没法准确归因"的问题
- Skill 格式固定 Markdown：与 Claude Skills、OpenAI Skills 存储格式一致，方便迁移、人读、LLM 写
- 训练过程中 SkillRepo 自发涌现高层级 meta-skill：Skill 自己发展出层次结构和抽象

---

## 主要能力

- 稳定超过 memory-free baseline 和强 memory-based baseline，又快又准
- Curator 可跨 Executor 主干迁移（换底层模型 Curator 仍可用）
- Curator 可跨任务域迁移
- SkillRepo 自发涌现 meta-skill 层次结构

---

## 局限性

- RL 训练成本未充分展开，工程落地真问题
- "跨任务域迁移"跨度范围待更多对照实验验证
- Skill 间依赖、版本、冲突处理是后续需补的拼图
- 仅论文阶段，无公开代码/开源仓库

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.45 | 论文阶段，无公开代码，实验验证充分但缺工程化 |
| 创新性 | 0.80 | 首个将 Skill 管理形式化为 RL 问题，Curator 架构开创性 |
| 落地程度 | 0.35 | 纯学术研究，无产品/框架落地 |
| 生态活跃度 | 0.70 | Google 背书，Markdown 格式与业界标准收敛，社区高度关注 |

**综合评分**: 0.58

---

## 相关技术

- AgentSkillOS：同为 Skill 操作系统，偏工程实现，SkillOS 偏 RL 管理策略学习
- SkillOS(SkillOS已有条目)：注意重名！已收录的 skillos(SkillOS) 是 SkillOS 偏工程实践，本条目是 Google 论文 SkillOS 偏 RL 管理，需区分
- SkillOpt：微软训练循环优化 Skill 文档，SkillOS 用 RL 训练 Curator 管理 SkillRepo，两者互补
- SLIM：管理框架，偏工程标准化，SkillOS 偏学习管理策略

---

## 参考资料

- [论文](https://arxiv.org/abs/2605.06614)
- [详解](https://cloud.tencent.com/developer/article/2672637)
- [深度拆解](https://blog.csdn.net/qcx23/article/details/160904121)
