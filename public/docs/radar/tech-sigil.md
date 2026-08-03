# SIGIL

> **分类**: Skill执行 | **成熟度**: 🟡 成长期 | **综合评分**: 0.49

---

## 一句话描述

SIGIL 是一个**将 prose skill 编译为可执行 agent harness 的编译器**，通过一个**类型化的 agentic 中间表示 AG-IR** 将技能中的确定性步骤转化为代码结构、开放判断保留为 typed model slot，使 compiled harness 执行了 **86% 的规定步骤（vs prose 的 56%）、完整程序执行率 2.3 倍、token 消耗 0.58×**，且保证与模型无关。

**来源**:
- SIGIL: Compiling Agent Skills into Typed Harnesses
- 密歇根大学
- 发布年份：2026

**链接**:
- （Jac 语言实现，开源仓库见论文）

---

## 核心实现

SIGIL 的核心链路是：**prose SKILL.md → AG-IR → executable harness**，分两层编译。

**1. AG-IR：类型化的 Agentic 中间表示**

AG-IR 由四族节点构成：
- **Mind 族**：model-owned，从 Gen-Enum（固定集选择）到 Gen-Raw（自由文本），输出空间宽度是显式的工程决策
- **Flow 族**：携带控制流，Route（子节点+dispatch）、Loop（有界 walker 迭代）、Spawn（并行子 walker）
- **Boundary 族**：Sense（读/grep/fetch）与 Act（写文件/发出交付物）分离
- **Code 族**：纯函数，确定性且自由

每个节点记录 **owner**（code 或 model）和 **modality**（mandatory/forbidden/discretionary）。

**2. Owner Test：分离机制与判断**

核心判断规则：**这一步的输出是否是其输入的函数？** 是则 code 拥有，编译为无条件执行的结构；否则 model 拥有，编译为 typed slot。Code-owned 步骤无法被跳过、重排或替换——模型不被询问是否执行该步。

**3. Extraction：从 prose 到 AG-IR**

唯一包含模型判断的阶段。核心原则是"**模型提案，代码裁决**"：
- 每条候选规则必须携带 verbatim quotation，引文在源文件中找不到则被机械丢弃
- 六道 compile gate：G1 拒绝引用外部内容；G4 让真实 Lowering 和 type checker 验证 IR；G5 STRUCT-COV 静态分析每条 mandatory rule 的实现方式，**monolithic（折叠到其他 slot）和 missing 触发 gate failure，而非 warning**

**4. Lowering：确定性地翻译 AG-IR**

不含模型调用，不做任何选择。每个 AG-IR primitive 有固定 OSP 翻译。Forbidden 变成无节点——无路径就是 guarantee。编译后的 harness 是自包含单文件，运行时选择模型。


---

## 主要能力

- **模型无关的 guarantee**：compiled harness gpt-4o 86% → gpt-5 86%，而 prose 从 56% 跃升到 68%
- **完整程序执行 2.3 倍**：28% → 65%，消除了"声称执行"冒充"实际执行"的 failure mode
- **token 消耗 0.58×**：机制密集型 skill 降幅最大（using-git-worktrees 仅 0.02×）
- **可审计溯源**：从 SKILL.md 原文→规则→节点→编译函数→node-path trace，全链路可追溯

---

## 局限性

- 实验中 30 个 skill 偏向文档生产、软件流程和合规领域，其他领域机制-判断比例可能不同
- 能力轴仅跨两个模型（gpt-4o 和 gpt-5），更宽范围内的 prose 曲线形状未知
- 编译后更贵的 skill（如 using-superpowers 7.64×）集中在 Invoke-Unit 类自适应循环，忠实运行而非跳过
- 依赖 Jac 语言和 OSP 编程模型，生态相对小众

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.50 | AG-IR 类型化中间表示与编译门禁设计完整，30 个 skill 实验验证 |
| 创新性 | 0.75 | 首次将 prose skill 编译为模型无关的可执行 harness，Owner Test 机制原创 |
| 落地程度 | 0.35 | 学术原型，依赖 Jac 语言生态，未在工业产品中部署 |
| 生态活跃度 | 0.30 | Jac 语言生态小众，开源仓库见论文，社区规模有限 |

**综合评分**: **0.49**

---

## 参考资料

- [论文](https://arxiv.org/abs/2607.27309)

