# What Should a Skill Remember? (Cost-Aware Skill Rewriting)

## 一句话描述
首次系统揭示Skill重写的反直觉现象——短的Skill反而可能让Agent更贵，提出成本感知的Skill重写框架，在质量与成本间寻找最优权衡。

## 核心实现
- **核心发现**：Skill重写常被视为prompt压缩，但移除稀疏操作锚点（如调试步骤、异常恢复路径）会导致Agent探索成本上升，短的Skill不一定省钱
- **质量-成本权衡建模**：将Skill重写建模为多目标优化问题——同时优化任务完成质量和Agent执行成本
- **操作锚点识别**：识别Skill中对Agent行为有关键约束作用的"稀疏操作锚点"，这些锚点看似冗余但能防止Agent进入高成本探索路径
- **成本感知重写策略**：在压缩Skill时保留高价值锚点，移除仅增加token但无行为约束力的内容

## 主要能力
- 首次量化Skill重写的质量-成本Pareto前沿
- 揭示"压缩≠省钱"的反直觉规律
- 为SkillOpt等优化框架提供重写约束的理论基础
- 为Skill生命周期管理中的"何时重写、重写多少"提供决策依据

## 局限性
- 论文发表于2026-06-08，尚无独立复现验证
- 成本建模依赖特定Agent框架的token消耗统计
- 操作锚点的自动识别仍需LLM辅助，引入额外开销

> 论文：arXiv:2606.xxxxx (Qinghua Xing, Yinda Chen, Yaping Jin, Zhenhe Wu, Bohan Lin, Hang Zhou, Xinghao Chen, Hanting Chen, Zhiwei Xiong, 2026-06)
