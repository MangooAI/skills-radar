# SkillsMetric

> **分类**: Skill评测 | **成熟度**: 🟡 成长期 | **综合评分**: 0.56

---

## 一句话描述

SkillsMetric 是一个**五阶段静态分析框架 + 16 攻击类型分类法**，扫描 Agent Skill 包给加权风险分，AUC **0.93**、5 折 F1 73.4%，标出结构性盲点——**宿主破坏 0%**、prompt injection **42%**，动机纵深防御：静态预筛 + LLM 语义审查 + 沙箱分层。

**来源**:
- SkillsMetric: Mapping the Detection Boundary of Static Analysis for Malicious Agent Skills（Xinze Chen 等，CUNY 研究中心 / Hunter College / 俄亥俄州立大学）
- 发布年份：2026

**链接**:
- https://arxiv.org/abs/2608.08468

---

## 核心实现

威胁分三层 16 类：代码级 8（明文命令 / 编码载荷 / 数据外泄 / 隐写 / RSA / XOR / 远程脚本 / 二进制）、系统级 4（宿主破坏 / 持久后门 / 环境操纵 / 资源滥用）、语义级 4（prompt injection / 社会工程 / 拆分模块 / 供应链）。信任提升问题：skill runner 把 SKILL.md 当 user 级消息注入，第三方指令拿用户命令同等权限。

**1. 五阶段扫描层：从不同角度留信号**

skill 包内容过五道分析，每道产出归一化分 $\hat{s}_i$：
- **S1 Pattern Density**：50+ 加权正则扫危险关键词 / 代码构造（exec / curl / 凭据路径 / YAML 反序列化），跨 Python/Bash/JS/Ruby，按长度归一；
- **S2 Statistical Anomaly**：Shannon 熵 / 压缩比 / 卡方 / 序列相关 vs 良性基线 z-score，检异常字节分布（编码 / 加密载荷）；
- **S3 Dataflow Taint**：三阶段污点链（source → transform → sink，如读凭据 → base64 → HTTP 发送）完整链满分。**权重最高**，因完整链在良性代码罕见、判别最清；
- **S4 Import Anomaly**：标安全包异常组合（urllib+base64+os）对良性依赖基线；
- **S5 Capability Mismatch**：比声称能力 vs 实际代码行为，检声称良性却访问网络 / 文件系统。**权重最低**，因元数据声明不一致噪声大。

**2. 聚合层：加权求和 + 交互奖励，而非乘法**

最终分 $S=\sum_{i=1}^{5}w_i\hat{s}_i+\text{bonus}$，权重 $w=(0.15,0.20,0.30,0.15,0.10)$ 和 0.90，余下 0.10 资金交互奖励（≥2 阶段同发 +5 / ≥3 同发 +10，S2 不计奖因其统计特征与 S1 不独立）。**用加法而非乘法**：很多攻击只在子集阶段留信号（宿主破坏甚至 0 阶段触发），乘法遇零即灭会丢大批恶意样本；加法还让 reviewer 能逐阶段读出贡献。

**3. 阈值与风险分级层：用良性分布而非恶意分布定阈值**

阈值 $\tau=25$ 参照良性语料 95 分位（16.77）设，不依赖对抗数据集组成。138K 全扫 142/秒、1.75% 被标，82.4% SAFE。风险分级 SAFE(<10) / LOW(10-24) / MEDIUM(25-44) / HIGH(45-69) / CRITICAL(≥70)，$\tau=45$ 作 auto-block 层。

控制要点：盲点结构性非调参可补（标准库破坏宿主如 shutil.rmtree 语法上不可分，宿主破坏 0% 检测）；静态抓结构性痕迹、LLM 抓意图（Claude 69.3% 安全意识 vs Gemini 29.6%、canary 泄露 0.7% vs 5.1%），互补。

![alt text](images/skillsmetric_architecture_overview.png)

---

## 主要能力

- **代码级检测强**：数据外泄 93%、隐写 93%、RSA 89%、明文 83%，AUC 0.93
- **标出结构性盲点**：宿主破坏 0%、prompt injection 42%、环境操纵 22%
- **生态级扫描**：138K 全扫 142/秒，1.75% 被标，82.4% SAFE
- **跨模型对照**：Claude 金丝雀泄露 0.7% vs Gemini 5.1%（7×），静态 67.5% 与 LLM 69.3% 互补
- **纵深防御架构**：静态预筛+语义审查+沙箱分层，贵 LLM 集中 2% 省 50× 成本

---

## 局限性

- **盲点结构性**：宿主破坏用标准库调用（shutil.rmtree）语法不可分，调参补不了
- **合成对抗数据**：266 恶意样本注入真实宿主，未抓真实攻击者混淆深度，是下限
- **只扫 SKILL.md**：受 API 限未扫配套脚本，恶意逻辑常在那，1.75% 是下限
- **权重经验赋值**：非学习，保解释性防过拟合，小样本未做 head-to-head baseline

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.60 | 五阶段静态分析 + 16 攻击分类法 + 加权求和聚合 |
| 创新性 | 0.70 | 静态分析检测边界刻画 + 加法聚合防乘法遇零即灭 |
| 落地程度 | 0.48 | AUC 0.93，138K 全扫 142/秒，但宿主破坏 0% 结构盲点 |
| 生态活跃度 | 0.45 | 单篇论文，HuggingFace 语料 |

**综合评分**: 0.56

---

## 参考资料

- [SkillsMetric: Mapping the Detection Boundary of Static Analysis for Malicious Agent Skills](https://arxiv.org/abs/2608.08468)
- [SkillMD-138K 评测语料](https://huggingface.co/datasets/FayeZC/SkillMD-138K)
