# Darwin-Skill

> **分类**: Skill 优化 | **成熟度**: 🟡 成长期 | **综合评分**: 0.58

---

## 一句话描述

darwin-skill 是受 Karpathy autoresearch 启发的开源 Skill 自主优化系统，采用9维评分+HITL三层守关+git ratchet棘轮机制，只保留可测量的改进并自动回滚退步，v2.0系统性吸收微软SkillLens和SkillOpt论文后结构升级。

**来源**:
- 开发者：花叔 Alchain（alchaincyf）
- 开源协议：MIT
- GitHub Stars：3286+
- 发布年份：2026年

**链接**:
- 开源仓库：https://github.com/alchaincyf/darwin-skill

---

## 核心实现

**autoresearch 映射**

| autoresearch | darwin-skill | 说明 |
|-------------|-------------|------|
| program.md | SKILL.md（本文件） | 定义评估标准和约束规则 |
| train.py | 每个待优化的 SKILL.md | 被优化的资产，每次实验只改它 |
| val_bpb | 9维加权总分（满分100） | 可量化的优化目标 |
| git ratchet | keep / revert 机制 | 只保留有改进的 commit |
| test set | test-prompts.json | 验证改进是否真的有效 |
| 全自主运行 | 人在回路 | Skill好坏比loss更微妙，需人判断 |

**v2.0 五大升级（吸收微软SkillLens+SkillOpt论文）**
1. **评分标准 8维→9维**：吸收SkillLens实证73.8% rubric药方
   - 「错误处理」→ 失败模式编码（Failure Mechanism Encoding）：显式编码已知失败路径
   - 「明确性」→ 可执行具体性（Actionable Specificity）：禁用"建议/可以考虑/灵活把握"等模糊词
   - 新增第九维：高风险行动黑名单（rm/git reset --hard/force push等破坏性操作必须明文列禁）
2. **验证机制对齐SkillOpt的validation-gated设计**
   - 多评委独立审查：每轮启动2个独立评委
   - 评委不复用：下一轮换全新评委，避免锚定效应
   - 早停机制：单轮涨幅>30%自动告警
3. **Human-in-the-Loop三层守关**（与SkillOpt全自动的核心区别）
   - Phase 1 基线评估：自动+人工审报告
   - Phase 2 单维度优化：🔴 CHECKPOINT 强制暂停，等用户确认
   - Phase 3 回归测试：🛑 STOP 涨幅低于阈值强制停手
4. **反例黑名单8条**（明文禁止的反模式）
   - 同一个AI又改又评（SkillLens实证：LLM自评准确率仅46.4%）
   - 用git reset --hard当回滚（应用git revert）
   - 为凑分而堆冗余 / 跳过测试直接评分 / 一轮内改多个维度 / 干跑比例>30% / 静默跳过异常 / 忽视维度相关簇
5. **实测验证**
   - huashu-gpt-image skill：80.8→91.5→91.65（+10.85，6个独立评委共识）
   - darwin-skill自评：86.05→92.05→92.7

**棘轮机制**

分数只能上升，每一轮要么改进要么干净回滚（git revert，禁用git reset --hard），不会积累局部退化。

---

## 主要能力

- 一行安装：`npx skills add alchaincyf/darwin-skill`
- 9维加权评分（满分100），结构评分+效果验证双重评估
- git ratchet棘轮：只保留改进，自动回滚退步
- HITL三层守关，关键阶段强制暂停等用户确认
- 一轮只改一个维度，变量可控改进可归因
- 评委不复用，避免锚定效应

---

## 局限性

- 仅支持SKILL.md格式（Claude Code/Codex/OpenClaw等），不覆盖其他Skill格式
- 9维评分中部分维度仍需LLM判断，存在主观性
- HITL机制依赖用户参与，大规模部署时人工审核成本高
- 无学术论文支撑，工程实践为主
- 与SkillOpt功能高度重叠，核心差异仅在HITL vs全自动

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.60 | v2.0已发布，有实测数据，3286+ Stars |
| 创新性 | 0.55 | autoresearch思路迁移，v2.0吸收学术成果但非原创 |
| 落地程度 | 0.70 | 一行安装，支持主流Agent工具 |
| 生态活跃度 | 0.45 | 单人项目，社区贡献有限 |

**综合评分**: 0.58

---

## 相关技术

- SkillOpt：微软全自主Skill优化框架，darwin-skill的HITL对标对象
- SkillLens：9维评分中3个维度直接来自SkillLens实证rubric
- autoresearch（Karpathy）：darwin-skill的原始灵感来源

---

## 参考资料

- [GitHub仓库](https://github.com/alchaincyf/darwin-skill)
- [SkillLens论文](https://arxiv.org/abs/2605.23899)
- [SkillOpt论文](https://arxiv.org/abs/2605.23904)
- [autoresearch](https://github.com/karpathy/autoresearch)
