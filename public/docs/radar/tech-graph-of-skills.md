# Graph of Skills

> **分类**: Skill 召回 | **成熟度**: 🟡 成长期 | **综合评分**: 0.70

---

## 基本信息

**一句话描述**: 千级规模 Skill 库的结构感知检索方案，通过构建 Skill 依赖图实现完整的可执行 Skill 包召回。

**来源**:
- 学术论文：宾夕法尼亚大学、马里兰大学等
- 发布年份：2026年

**链接**:
- 论文链接：https://arxiv.org/pdf/2604.05333
- 代码链接：https://github.com/davidliuk/graph-of-skills

---

## 核心技术

### 核心原理

Graph of Skills (GoS) 通过构建**Skill 依赖图**的方式，一次性返回完整的可执行 Skill 包。

**离线建图**：
- 将 Skill 包解析成标准化节点（名称、能力描述、输入输出格式、依赖工具等）
- 自动生成四种类型的边：依赖边、工作流边、语义边、替代边

**在线检索**：
1. 混合语义-词汇种子检索
2. 反向加权个性化 PageRank（沿依赖边反向扩散评分）
3. 预算重排与水化

### 核心创新

- **依赖感知检索**：自动补全所有需要的前置依赖
- **反向扩散算法**：从种子 Skill 找到所有前置依赖
- **完整可执行 Skill 包**：返回的不是孤立的 Skill 列表，而是完整组合

---

## 技术细节

### 主要能力

- 自动生成 Skill 依赖网络
- 依赖感知的结构化检索
- 完整可执行 Skill 包返回

### 实验结果

| 对比方案 | 效果 |
|----------|------|
| vs Vanilla Skills | 奖励+43.6%，Token -37.8% |
| vs Vector Skills | SkillsBench +10.97%，ALFWorld +2.87% |
| 规模鲁棒性 | 200-2000技能范围内始终优于基线 |

### 局限性

- 复杂开放场景效果有限
- 跨领域迁移能力有限
- 安全风险仍存在

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.70 | 有完整论文和代码开源 |
| 创新性 | 0.60 | 依赖图+反向扩散的创新 |
| 落地程度 | 0.65 | 实验验证充分 |
| 生态活跃度 | 0.50 | 有开源代码 |

**综合评分**: 0.70

---

## 相关技术

- SkillRouter：大规模 Skills 选择
- SkillOrchestra：基于技能的 Agent 路由策略

---

## 参考资料

- [Graph of Skills 论文](https://arxiv.org/pdf/2604.05333)
- [Graph of Skills 代码](https://github.com/davidliuk/graph-of-skills)
- [Agent Skills洞察与实践 - Graph of Skills原文](../tech-blog/Agent%20Skills洞察与实践/【Agent%20Skills洞察与实践】21-Graph%20of%20Skills：千级规模Skill库的结构感知检索方案，成功率提升43.6%.md)
