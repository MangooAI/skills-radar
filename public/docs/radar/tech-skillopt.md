# SkillOpt

> **分类**: Skill 优化 | **成熟度**: 🟢 成熟期 | **综合评分**: 0.64

---

## 一句话描述

SkillOpt 将 Skill 文档视为 Agent 的可变外部状态并作为「权重」进行训练，通过 rollout、reflection、edit、validation gating 四步闭环自动优化 Skill，在 52 个测试组合中全部取得最优或并列最优，平均提升 **23.5 分**，碾压人类手写 Skill。

**来源**:
- 学术论文：微软研究院（Microsoft Research）
- 发布年份：2026年

**链接**:
- GitHub：https://github.com/microsoft/SkillOpt

---

## 核心实现

SkillOpt 将深度学习训练循环一比一翻译为文本编辑循环，核心映射：前向传播→rollout、梯度计算→reflection、权重更新→edit、验证集检查点→validation gating：

**1. Rollout（前向传播）**：目标模型（如 GPT-5.5）携带当前 Skill 文档执行一批任务，收集完成情况作为训练信号。模型参数冻结不动，Skill 文档是唯一可变状态。

**2. Reflection（梯度计算）**：优化器模型分析哪些任务失败及原因，提炼改进方向，生成结构化编辑建议。两个模型分工——target model 执行任务，optimizer model 观察分析。

**3. Edit（权重更新）**：对 Skill 文档做 add、delete、replace 三种结构化编辑，每轮最多改 L_t 条规则（默认 4 条），附带 cosine decay 衰减，类比文本学习率。rejected-edit buffer 保存被否决的修改供后续反思避免重犯。

**4. Validation Gating（检查点保存）**：修改后在验证集上评估，分数没涨则不接受本次修改。slow/meta update 类比 momentum，跨 epoch 做纵向更新，内容受保护不被 step 级编辑覆盖。

**关键设计**

- 克制优于激进：L_t=4 的限制编辑效果优于无限制重写 2-3 分，与神经网络学习率过大导致震荡同理
- slow/meta update 是关键组件：消融实验去掉后 SpreadsheetBench 从 77.5 暴跌至 55.0（-22.5分）
- 同级别优化器也能工作：用 GPT-5.4 优化 GPT-5.4 自身的 Skill，可恢复强优化器 56%-74% 的增益
- 优化后 Skill 紧凑高效：中位数约 920 tokens，有的 benchmark 仅需一条被接受的修改就涨 39 分

---

## 主要能力

- 全面碾压：52 个测试组合全部最优或并列最优，6 个 benchmark 平均提升 23.5 分（SpreadsheetBench +39.0, OfficeQA +39.0）
- 跨模型跨环境迁移：GPT-5.4→GPT-5.4-mini 仍提升 +9.4，Codex→Claude Code 跨执行环境 +59.7
- 部署零开销：训练成本一次性付出（离线完成），优化后 Skill 文件即纯文本，部署时无额外成本

---

## 局限性

- 依赖可自动评估的验证集，开放性任务暂不适用
- 训练需要两个模型（target + optimizer），同级别优化器效果打折扣
- 复杂轨迹类 benchmark 训练 token 消耗较高（37.9-46.4M），但仅需训练一次

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.70 | 有论文+开源代码（MIT 协议），6 基准 52 组合充分验证 |
| 创新性 | 0.85 | 首次将 Skill 文档视为可训练权重，深度学习训练循环到文本编辑的范式映射 |
| 落地程度 | 0.55 | 开源可用，Codex/ClaudeCode 已验证，但实际企业部署案例少 |
| 生态活跃度 | 0.45 | 微软背书+开源，2026年5月发布，社区关注度快速上升 |

**综合评分**: 0.64

---

## 相关技术

- SkillEvolver：同为 Skill 自进化，采用元技能+独立审计路线，SkillOpt 为训练循环路线
- SkillForge：企业场景自进化，聚焦业务工单闭环
- TextGrad：梯度风格文本优化，SkillOpt 的对比基线之一

---

## 参考资料

- [GitHub](https://github.com/microsoft/SkillOpt)
- [详解](https://www.sohu.com/a/1028036081_122189055)
