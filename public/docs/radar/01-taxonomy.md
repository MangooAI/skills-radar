---
title: Skills 技术分类体系
---

# Skills 技术分类体系

> **版本**: v1.0.0 | **创建日期**: 2026-05-10 | **状态**: 已完成

---

## 一、概述

Skills 技术分类体系基于 [skill-insight](https://atomgit.com/openeuler/witty-skill-insight) 提出的 Skill 全生命周期管理方法论，将围绕 Agent Skills 的技术分为六大阶段：

| 阶段 | 英文 | 核心问题 |
|------|------|---------|
| Skill 生成 | Generation | 如何高效构建高质量 Skill？ |
| Skill 召回 | Recall/Routing | 如何精准匹配用户意图与 Skill？ |
| Skill 执行 | Execution | 如何高效、稳定、可控地执行 Skill？ |
| Skill 评测 | Evaluation | 如何量化评估 Skill 的效果？ |
| Skill 优化 | Optimization | 如何基于数据持续改进 Skill？ |
| Skill 管理 | Management | 如何治理大规模 Skill 库？ |

---

## 二、技术成熟度总览

| 阶段 | 成熟度 | 综合评分 | 代表技术 |
|------|--------|---------|---------|
| Skill 评测 | 🟢 成熟期 | 0.73 | skill-insight、SkillsBench |
| Skill 召回 | 🟢 成熟期 | 0.66 | SkillRouter、Graph of Skills |
| Skill 执行 | 🟡 成长期 | 0.54 | Progressive Disclosure、SkVM |
| Skill 优化 | 🟡 成长期 | 0.53 | SkillForge、Iterative Optimizer |
| Skill 生成 | 🟡 成长期 | 0.52 | Trace2Skill、Skill Creator 2.0 |
| Skill 管理 | 🔴 探索期 | 0.39 | AgentSkillOS、Skills 标准 |

---

## 三、核心技术详解

### 3.1 Skill 生成技术

**定义**：基于用户/场景的确定性任务需求，完成从需求拆解到标准化封装的全流程工程化开发。

**核心技术领域**：
- 文档解析：从 PDF、Markdown、URL 等多源文档中提取结构化知识
- 语义聚合：去冗余、合相似、抽模式，减少 Skill 膨胀
- 渐进式生成：从自然语言描述逐步生成结构化 Skill
- 自生成：Agent 基于执行经验自主生成新 Skill

**代表项目**：Trace2Skill、D2Skill、SkillX、Memento-Skills、SKILLRL、Skill Creator 2.0

[查看完整技术文档 →](./category-01-generation.md)

### 3.2 Skill 召回技术

**定义**：智能体基于用户意图、上下文与场景特征，从 Skill 库中精准匹配最优 Skill/Skill 组合。

**核心技术领域**：
- 意图识别：将用户自然语言映射为 Skill 需求
- 召回算法：多路召回、混合检索、提升召回率
- 路由策略：大规模 Skill 库下的选择策略
- 结构感知检索：利用 Skill 元数据提升检索精度

**代表项目**：SkillRouter、SkillOrchestra、Graph of Skills、AgentSkillOS、SkillNet

[查看完整技术文档 →](./category-02-recall.md)

### 3.3 Skill 执行技术

**定义**：智能体按 Skill 定义的逻辑、规则、调度方案，完成全链路运行、状态管控与异常处理。

**核心技术领域**：
- 渐进式披露：分阶段加载 Skill 内容，控制 Token 消耗
- 执行流图：可视化 Skill 执行路径追踪
- 状态管控：执行过程中的状态保持与恢复
- 权限隔离：Skill 执行时的安全沙箱

**代表项目**：Progressive Disclosure、SkVM、skill-insight 执行追踪、Permission Sandboxing

[查看完整技术文档 →](./category-03-execution.md)

### 3.4 Skill 评测技术

**定义**：构建可量化、可复现的多维度指标，以客观数据衡量 Skill 的效果、效率与安全性。

**核心技术领域**：
- 多维评测：准确率、召回率、Token、时延等指标
- 执行追溯：记录每步操作，支持回溯分析
- 归因分析：区分 Skill 设计问题与模型能力问题
- 安全审计：检测 Skill 中的安全漏洞

**代表项目**：skill-insight、SkillsBench、SkillProbe、agent-skills-eval、Cross-Evaluation

[查看完整技术文档 →](./category-04-evaluation.md)

### 3.5 Skill 优化技术

**定义**：基于执行数据、评测结果与用户反馈的持续迭代优化闭环。

**核心技术领域**：
- 自优化：基于归因结果自动定位并修复缺陷
- 迭代优化：多次评测-优化-再评测的闭环
- 效果提升：针对性优化缺失步骤、冗余流程
- 动态适配：根据模型能力动态调整 Skill 策略

**代表项目**：skill-insight Optimizer、SkillForge、Iterative Optimizer、SkillReducer、D2Skill

[查看完整技术文档 →](./category-05-optimization.md)

### 3.6 Skill 管理技术

**定义**：面向大规模 Skill 库的全维度、标准化管控与运营体系。

**核心技术领域**：
- 版本管理：Skill 的版本控制与回滚
- 生命周期管理：Skill 的上线、迭代、下线全流程
- 权限管控：Skill 的访问权限与操作权限
- 生态治理：解决版本混乱、重复开发问题

**代表项目**：AgentSkillOS、SkillNet、Skills 标准、RBAC Permission、Git-based Versioning

[查看完整技术文档 →](./category-06-management.md)

---

## 四、技术演进时间线

```
2023        2024          2025           2026
 │           │             │              │
 ├─ API插件 ─┤             │              │
 │           ├─ MCP协议 ───┤              │
 │           │             ├─ Skills标准 ──┤
 │           │             │              │
 │           │    Skill 评测  Skill 召回  │🟢
 │           │    Skill 执行  Skill 优化   │🟡
 │           │    Skill 生成              │🟡
 │           │    Skill 管理             │🔴
```

---

## 五、参考资料

- [Agent Skills洞察与实践 - tech-blog 专栏](https://zhuanlan.zhihu.com/p/2028505867184612884)
- [witty-skill-insight 项目](https://atomgit.com/openeuler/witty-skill-insight)
- [SKILLRL GitHub](https://github.com/aiming-lab/SkillRL)
