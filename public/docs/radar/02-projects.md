# Skills 技术领域代表项目调研

> **版本**: v1.0.0
> **创建日期**: 2026-05-10
> **Story**: R-002
> **状态**: 初稿

---

## 概述

本目录调研 Skills 技术六大阶段的代表项目/论文，覆盖生成、召回、执行、评测、优化、管理领域。每个技术领域至少 3 个代表项目。

---

## 2.1 Skill 生成（Generation）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **Trace2Skill** | 学术 | 从执行轨迹中自动提取可复用技能 | - |
| **D2Skill** | 学术 | 双粒度动态技能库，驱动策略-技能协同进化 | - |
| **SkillX** | 学术 | 为 Agent 打造自动化构建、可复用的 Skill 库 | - |
| **Memento-Skills** | 学术 | 让 Agent 自主设计 Skill，实现自我进化 | - |
| **Skill Creator 2.0** | Anthropic | 人机协作持续优化，使 Agent 能加载专业技能 | - |
| **SKILLRL** | 学术 | 通过技能的强化学习促进 Agent 自进化 | [GitHub](https://github.com/aiming-lab/SkillRL) |
| **Trace** | 学术 | 将成功执行经验固化到 Skill | - |

---

## 2.2 Skill 召回（Recall/Routing）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **SkillRouter** | 学术 | 破解大规模 Skills 选择难题的新范式 | - |
| **SkillOrchestra** | 学术 | 基于技能的 Agent 路由策略，提升 22.5% | - |
| **Graph of Skills** | 学术 | 千级规模 Skill 库的结构感知检索方案 | - |
| **AgentSkillOS** | 学术 | 生态级规模下技能的组织、编排与基准测试 | - |
| **SkillNet** | 学术 | 创建、评估与连接 AI 技能 | - |
| **Pareto 验证** | 学术 | 性能与成本间的原理性平衡选择 | - |

---

## 2.3 Skill 执行（Execution）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **Progressive Disclosure** | Anthropic | 渐进式披露，分阶段加载 Skill 内容 | - |
| **SkVM** | 学术 | 给 Skills 做个编译器，一次编写，到处运行 | - |
| **渐进式加载** | 框架特性 | 元数据→指令→资源三阶段加载 | - |
| **执行流图** | skill-insight | 可视化 Skill 执行路径追踪 | - |
| **Permission Sandboxing** | 安全研究 | Skill 执行时的安全沙箱隔离 | - |
| **Skill Pipeline** | 学术 | 多 Skill 协同的并行调度 | - |

---

## 2.4 Skill 评测（Evaluation）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **skill-insight** | openEuler | 多维评测、执行追溯、归因分析 | [AtomGit](https://atomgit.com/openeuler/witty-skill-insight) |
| **SkillsBench** | 学术 | 衡量智能体技能在多样化任务中的表现的基准测试 | - |
| **SkillProbe** | 学术 | 用"魔法"打败"魔法"——用 Skill 审计 Skills | - |
| **Cross-Evaluation** | 学术 | 多 Skill、多模型、多任务横向对比 | - |
| **AgentOps** | 学术 | AI Agent 系统的可观测性研究 | - |
| **agent-skills-eval** | 社区开源 | Agent Skills评测框架，基于with_skill vs without_skill 对比测试 | [GitHub](https://github.com/darkrishabh/agent-skills-eval) |

---

## 2.5 Skill 优化（Optimization）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **Skill-insight Optimizer** | openEuler | 基于归因结果的自动修复 | - |
| **SkillForge** | 学术 | 让企业级 Agent Skills 实现自主进化 | - |
| **Iterative Optimizer** | openEuler | 多次评测-优化-再评测闭环 | - |
| **SkillReducer** | 学术 | 为 Skills 瘦身 40%，破解 Token 低效难题 | - |
| **Recursive Skill Evolution** | 学术 | 递归式技能进化机制 | - |
| **D2Skill** | 学术 | 根据模型能力动态调整 Skill 策略 | - |

---

## 2.6 Skill 管理（Management）代表项目

| 项目/论文 | 来源 | 核心技术 | 链接 |
|---------|------|---------|------|
| **AgentSkillOS** | 学术 | 生态级技能的组织、编排与生命周期管理 | - |
| **SkillNet** | 学术 | 创建、评估与连接 AI 技能 | - |
| **RBAC Permission** | 安全研究 | 基于角色的 Skill 权限管控 | - |
| **Git-based Versioning** | 社区实践 | 基于 Git 的 Skill 版本控制 | - |
| **Skills 标准** | Anthropic | 跨平台的 Skill 格式与协议标准 | - |

---

## 三、技术领域分布图

```
Skill 生成     ████████░░░░  7 个项目
Skill 召回     ████████████  6 个项目
Skill 执行     ██████░░░░░░  6 个项目
Skill 评测     ██████░░░░░░  5 个项目
Skill 优化     ████████░░░░  6 个项目
Skill 管理     ██████░░░░░░  5 个项目
```

---

## 四、关键论文与技术来源

### 4.1 学术论文

| 论文 | 年份 | 机构 | 核心贡献 |
|------|------|------|---------|
| When Single-Agent with Skills Replace Multi-Agent Systems and When They Fail | 2026 | 研究机构 | Skills 消除多智能体通信开销 |
| SkillOrchestra: Learning to Route Agents via Skill Transfer | 2026 | - | 技能感知路由，提升 22.5% |
| SKILLRL: Evolving Agents via Recursive Skill-Augmented Reinforcement Learning | 2026 | aiming-lab | 技能增强递归强化学习 |
| AgentOps: Observability for AI Agent Systems | 2026 | CSIRO Data61 | Agent 可观测性研究 |

### 4.2 开源项目

| 项目 | 平台 | 核心技术 |
|------|------|---------|
| skill-insight | AtomGit | 多维评测、执行追踪、归因分析 |
| SKILLRL | GitHub | 技能强化学习 |

### 4.3 工业实现

| 产品 | 公司 | 核心贡献 |
|------|------|---------|
| Claude Skills | Anthropic | Skills 开放标准和生态 |
| skills.sh | Vercel | 一键安装 Skills 平台 |
| Skill Creator 2.0 | Anthropic | 人机协作 Skill 生成 |

---

## 五、参考资料

- [Agent Skills洞察与实践 - tech-blog 专栏](https://zhuanlan.zhihu.com/p/2028505867184612884)
- [witty-skill-insight 项目](https://atomgit.com/openeuler/witty-skill-insight)
- [SKILLRL GitHub](https://github.com/aiming-lab/SkillRL)
