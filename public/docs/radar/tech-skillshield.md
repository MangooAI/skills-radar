# SKILLSHIELD

> **分类**: Skill管理 | **成熟度**: 🟡 成长期 | **综合评分**: 0.54

---

## 一句话描述

SKILLSHIELD 是面向 **API-only 编码 agent** 的**系统提示词防御方法**，把从攻击数据离线合成的安全技能注入系统提示词，使模型在生成工具调用前就受策略约束，固定预算下 all-classes 把执行 ASR 从 **67.4% 压到 43.6%**、恶意软件严重度从 3.37 降到 **0.58**，且无需运行时分类或路由。

**来源**:
- SKILLSHIELD: Prompt-Space Security Skills for LLM Coding Agents（Xiaodong Wu, Zhimin Zhao, Qi Li, Xiangman Li, Yu Shi, Bram Adams, Jianbing Ni，Queen's University，加拿大）
- 发布年份：2026

**链接**:
- https://arxiv.org/abs/2608.25817

---

## 核心实现

立论：权重对齐排除 API-only 部署方，输入过滤器管不到仓库制品里夹带的指令，运行时验证器在轨迹每步加检查调用。SKILLSHIELD 把安全策略前移到动作生成前——离线合成的技能正文注入系统提示词，模型选工具填参数时就受策略管。

**1. 注入层：策略正文全程激活**

- 输入是编码 agent $A=(M,T,P)$（模型、工具集、系统提示词），防御后变成 $A_s=(M,T,w\oplus s\oplus P)$：在系统提示词前**固定拼接**拒答前导 $w$ 和策略正文 $s$。
- 每步动作由 $a_i=M(w\oplus s\oplus P\oplus h_{<i})$ 生成，策略**全轨迹激活**，无需运行时再调用。
- 正文上限 $|s|\le L=10{,}000$ 字符（约 **2,400 token**），前导 $w$ 不计入预算；前导要求遇恶意请求**整体拒答**、不许改写后部分执行。

**2. 合成层：两条离线路径产策略正文**

- **Proactive mining** 喂攻击语料，抽出**机械可检签名**（`rm -rf` 模式、`/etc/shadow` 路径、库调用序列）——可审计但怕改写。
- **Reactive learning** 先跑 undefended agent，从失败轨迹做 postmortem 蒸馏**意图级原则**（如识别"管理员授权"为社会工程）——跨格式泛化好但难审计。
- 共享 refinement：分块 $C=2000$ 字符、每块 `REFINE` 并入、截断到 $L$、到 0.9L 提前停，控制信息丢失。

**3. 供给层：三种固定预算粒度**

- **All-classes** 一技能覆盖全 27 类，无需先验威胁知识，是通用环境的默认配置。
- **Per-bundle** 按机制族分 4 组（文件系统/网络出口/不安全执行/不安全实现），威胁族已知时用。
- **Per-class** 每类独占预算，威胁类已知时用，是上界参照。
- 三种粒度**全部请求前固定**，不做运行时路由。

**4. 覆盖界：拆清预算容量和合成过程的账**

- 覆盖界刻画合并类的代价，校准反推 $c\approx 2.55$；budget-matched 拼接控制把 gap 根因从预算容量分到合成过程。
- 拼接到 **26.5% ASR**、合成 bundle 到 **36.2% ASR**，六模型赢五——说明广策略弱的主因是 **refinement 丢具体规则**而非预算装不下。

控制要点：粒度越窄防护越强但要求部署前已知威胁类；广策略正文要同时保机械规则和意图级规则。

![alt text](images/skillshield_architecture_overview.png)

---

## 主要能力

- **无运行时组件**：纯 prompt-space 防御，约 **2,400 token** 每会话一次注入，无第二次模型调用、无调度依赖、无阻塞性验证
- **all-classes 比 LG 无 8B 分类器**：执行 ASR **43.6%** vs LG 42.7%，恶意软件 AvgS **0.58** vs LG 1.40
- **粒度可调的强保护**：per-bundle ASR **36.2%**（强 LG 7.3pp）、per-class **14.5%**（强 LG 32pp、六模型全胜）
- **低良性代价**：731 条 SWE-Bench Pro 上 Proactive 配置 **0.11–0.14% FPR**，36 配置里 32 个在 0.68% 及以下
- **离线成本低**：每 class 合成约 **$0.10–0.50**，27 类全做约 **$3–15**，库更新才需重生成

---

## 局限性

- **per-class 强保护要求部署前已知威胁类**：通用环境只能用 all-classes，jailbreak 下广配置在 persona 上会反超 LG（Reactive all-classes 到 47.8% vs 43.2%）
- **非自适应 jailbreak 评估**：白盒优化、针对部署技能的自适应攻击明确在评测范围外
- **Reactive 过拒风险**：Reactive per-bundle 均值 1.49% FPR、Qwen3 B4 单点 16.3%（Proactive 同点 0.27%），意图级信号与良性任务共享
- **端到端良性任务成功未测**：benign 评测只测安全拒答率，不测任务完成率

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.58 | prompt-space 注入 + 两条合成路径 + 三种固定预算粒度 |
| 创新性 | 0.68 | 安全策略前移到动作生成前，纯 prompt 无运行时组件 |
| 落地程度 | 0.46 | ASR 67.4%→43.6%，恶意软件严重度 3.37→0.58，FPR 0.11% |
| 生态活跃度 | 0.42 | 单篇论文，未开源 |

**综合评分**: 0.54

---

## 参考资料

- [SKILLSHIELD: Prompt-Space Security Skills for LLM Coding Agents](https://arxiv.org/abs/2608.25817)
