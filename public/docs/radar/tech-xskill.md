# XSkill

> **分类**: Skill 召回 | **成熟度**: 🟡 成长期 | **综合评分**: 0.66

---

## 一句话描述

**XSkill** 提出双流知识架构——"肌肉记忆"（Skill库：结构化工作流和工具模板）与"程序性记忆"（Experience库：上下文相关的战术洞察）协同进化，通过视觉接地从Agent轨迹自动提取知识，无需参数训练即可实现持续学习与零样本跨任务迁移，ICML 2026收录，在5个多模态benchmark上平均提升11%。

**来源**:
- 开发者：香港科技大学 (Zhaochen Su)、浙江大学、华中科技大学 (Guanyu Jiang, Xiaoye Qu, Yi R. Fung)
- 发布年份：**2026 年 3 月**（ICML 2026 收录）

**链接**:
- 论文：arXiv:2603.12056
- GitHub：https://github.com/XSkill-Agent/XSkill (216⭐)
- 官网：https://xskill-agent.github.io/xskill_page/

---

## 核心实现

**1. 双流知识架构：Skill + Experience**

传统Agent只用Skill（结构化工作流），XSkill首次引入Experience（动作级战术洞察）作为互补知识流。Skill是"怎么做"的模板（步骤、工具调用序列），Experience是"在这种具体情况下该怎么调整"的上下文敏感记录。两者从同一轨迹中自动提取，互相增强：Skill提供结构化框架，Experience填补执行细节。

**2. Phase I 积累：视觉接地轨迹提炼**

每批rollout后，XSkill通过三个步骤提炼知识：
1. **轨迹摘要**（Trajectory Summary）：视觉接地的方式将Agent行为序列压缩为可复用知识条目，保留关键视觉线索而非纯文本描述
2. **跨rollout批评**（Cross-Rollout Critique）：比较多次执行结果，识别成功vs失败的关键差异，提取经验教训
3. **层次化整合**（Hierarchical Consolidation）：将零散经验整合为结构化Skill文档，消除冗余，保持知识库精简

**3. Phase II 推理：分解-检索-适配-注入**

对每个测试任务：
1. **任务分解**：将复杂任务拆解为子目标
2. **知识检索**：从双流记忆库中检索相关Skill和Experience
3. **视觉适配**：将检索到的知识适配到当前视觉上下文（而非简单文本拼接）
4. **Prompt注入**：将适配后的知识注入系统提示词，引导Agent执行

**关键设计**

- 零参数训练：所有知识以文档形式存储和检索，不修改模型权重
- 视觉接地：知识提取和适配均以视觉信息为锚点，适配多模态Agent场景
- 在线积累：随执行批次持续积累，知识库动态增长

![架构图](images/tech-xskill_architecture_overview.png)

---

## 主要能力

- **双流协同进化**：Skill库提供"怎么做的模板" + Experience库提供"具体怎么调的经验"，两者从同一轨迹自动提取互相增强
- **零样本跨任务迁移**：在一个任务上积累的知识可直接迁移到新任务，平均性能提升11%
- **多模态benchmark验证**：在VisualToolBench、TIR-Bench、MMSearch-Plus、AgentVista、MMBrowseComp五个benchmark上超越强基线

---

## 局限性

- 知识提取依赖高质量轨迹，失败轨迹过多时会引入噪声Experience
- 视觉接地机制需要多模态LLM支持，对纯文本Agent场景适配性待验证
- 记忆库规模增长后的检索效率问题未深入讨论

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.75 | ICML 2026收录 + 开源代码(216⭐) + 详细文档 |
| 创新性 | 0.80 | 双流知识架构+视觉接地+零参数持续学习，新范式 |
| 落地程度 | 0.55 | 学术验证阶段，5个多模态benchmark |
| 生态活跃度 | 0.50 | 216⭐，港科大/浙大/华科团队，社区活跃度尚可 |

**综合评分**: 0.66

---

## 相关技术

- **skill-rag** (SRA)：同为Skill检索范式，但SRA聚焦检索-融合-应用三阶段诊断，XSkill聚焦Skill+Experience双流协同
- **skill-router**：路由技术决定调用哪个Skill，XSkill决定检索并注入哪段经验
- **muse-autoskill-gen**：也做Skill自动创建，但MUSE是五阶段生命周期管理，XSkill是双流知识积累

---

## 参考资料

- [论文 (arXiv:2603.12056)](https://arxiv.org/abs/2603.12056)
- [代码 (GitHub)](https://github.com/XSkill-Agent/XSkill)
- [项目主页](https://xskill-agent.github.io/xskill_page/)
- [Hugging Face](https://huggingface.co/papers/2603.12056)
