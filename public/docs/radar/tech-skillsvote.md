# SkillsVote

> **分类**: Skill 召回 | **成熟度**: 🟡 成长期 | **综合评分**: 0.57

---

## 一句话描述

SkillsVote 提出终极技能网关（Ultimate Skill Gateway）概念，通过 recommend→feedback 双接口闭环实现 Skill 的精准发现、环境适配和持续进化，收录 168 万+ Skills 并投入 20 万美元做 LLM-driven 预处理画像。

**来源**:
- 产品/开源框架：MemTensor 团队
- 发布年份：2026年

**链接**:
- 产品网站：https://skills.vote
- 开源仓库：https://github.com/MemTensor/skills-vote

---

## 核心实现

SkillsVote 的架构核心是两个接口 + 一条闭环：

**接口 1：recommend — Agent 问"我该用什么 Skill"**
- Agent 将用户 query 改写为面向技能检索的请求
- 系统结合 query + 客户端上下文从 168 万+ Skills 中返回最相关候选
- 不只返回 Skill 列表，还附带推荐理由、使用指南和 Skill 间编排建议（RECOMMENDED GUIDE）

**接口 2：feedback — Agent 说"这次用得怎么样"**
- 任务结束后 Agent 回传执行摘要：子任务目标、调用了哪些 Skill、成功/失败、证据、运行环境
- 反馈回流到技能系统，持续优化推荐策略

**Skill 画像构建（核心竞争力）**

SkillsVote 用 GPT-5.4 对每个 Skill 做系统化 LLM-driven 预处理，覆盖三个层面：
1. **环境依赖解析**：支持什么 OS、写入边界、是否需要 sudo/联网/密钥、依赖哪些可执行命令
2. **质量评估**：内容一致性（描述和内容是否讲同一件事）、引用完整性（引用的脚本和资源是否存在）、任务导向性（给 Agent 可执行指引 vs 仅描述知识）
3. **可验证性评估**：从 Skill 反向构造任务（含 Dockerfile + 单元测试 + 验证脚本），用不同 Agent×模型组合验证

**预处理成本**：模型调用费用超过 20 万美元

**对比数据**（真实任务"收集信息→PPTX→HTML部署"）：
| 指标 | SkillsVote Gateway | find-skills 搜索 | 无 Skill |
|------|-------------------|-----------------|---------|
| 耗时 | 26m 29s | 45m 14s | 29m 33s |
| Skill 选择 | 系统推荐+推理+编排指南 | Agent 自行搜索判断 | 无 |
| 反馈回流 | 有 | 无 | 无 |

---

## 主要能力

- 168 万+ Agent Skills 收录（79 万+ 通过格式校验），全球最大
- recommend→feedback 闭环：用得越多推得越准
- LLM-driven Skill 画像：环境适配、质量评估、反向出题验证
- 一行命令接入（npx skills add），支持 Codex/Claude Code/OpenClaw 等主流客户端
- Playground 可视化推理轨迹和反馈详情

---

## 局限性

- 画像构建依赖 GPT-5.4 强模型，成本极高（20万美元+），普通团队难以复现
- 目前推荐策略仍以 LLM 驱动为主，缺乏可解释的规则层
- 反馈闭环的"进化"效果尚无大规模量化验证
- 产品化程度高但学术贡献有限，无同行评审论文

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.60 | 已上线可用，有真实任务对比数据 |
| 创新性 | 0.70 | recommend→feedback闭环+LLM画像+反向出题，工程创新明显 |
| 落地程度 | 0.65 | 一行命令接入，多平台支持，Playground可用 |
| 生态活跃度 | 0.35 | MemTensor 团队产品，社区生态尚在建设 |

**综合评分**: 0.57

---

## 相关技术

- SkillRouter/SkillOrchestra：Skill 路由和编排，偏算法层
- SkillsVote：偏产品层，解决从海量 Skill 中发现和适配的问题
- SkillsBench：评测 Skill 效果，SkillsVote 的画像构建可与 SkillsBench 互补

---

## 参考资料

- [产品网站](https://skills.vote)
- [GitHub 仓库](https://github.com/MemTensor/skills-vote)
- [SkillsVote 深度解析](https://blog.csdn.net/MemTensor/article/details/159996412)
