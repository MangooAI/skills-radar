# File-as-State

> **分类**: Skill 执行 | **成熟度**: 🔴 探索期 | **综合评分**: 0.38

---

## 基本信息

**一句话描述**: 基于文件系统的轻量级Agent自动化方案，用文件状态替代重型框架实现可恢复的多步任务执行

**来源**:
- 行业产品/技术文章
- 发布年份：2026年

**链接**:
- 详解：https://cloud.tencent.com/developer/article/2669589
- AGFS理念：https://blog.csdn.net/weixin_43749777/article/details/156836191

---

## 核心技术

### 核心原理

- **四层架构**：编译层（TaskCompiler，自然语言转标准化任务包）→ 编排层（DAGOrchestrator，解析为DAG按依赖调度）→ 执行层（AgentRunner，调用Agent执行单步）→ 状态层（文件系统即状态，每步写入状态文件）
- **文件即状态**：所有状态管理通过文件系统完成，无需数据库/消息队列/容器编排，任何能读写文件的Agent都能接入
- **天然可恢复**：基于文件的状态持久化，任务中断后从状态文件恢复，无需额外检查点机制
- **零重型框架**：不依赖LangGraph/Temporal等，Shell脚本+cron即可实现生产级调度

### 与其他技术的关系

- **SkVM**：SkVM做Skill编译器，File-as-State做执行状态管理，可在不同层面互补
- **Skill Pipeline**：两者都关注多Skill协同调度，但File-as-State侧重文件系统的轻量化，Pipeline侧重并行调度
- **AGFS**：File System as Meta Tool理念的延伸，将Unix"一切皆文件"哲学应用于Agent基础设施

---

## 成熟度评分

| 维度 | 评分 (0.0-1.0) | 说明 |
|------|---------------|------|
| 技术成熟度 | 0.35 | 技术文章+概念验证，尚无开源实现 |
| 创新性 | 0.50 | 文件系统做状态管理并非全新，但"四层架构"的系统化方案有价值 |
| 落地程度 | 0.30 | 仅有技术文章描述，未发现实际产品/框架 |
| 生态活跃度 | 0.35 | AGFS社区有讨论，但独立项目尚未成型 |

**综合评分**: 0.38

---

## 相关技术

- SkVM：Skill编译器 vs File-as-State：执行状态管理器
- Skill Pipeline：并行调度 vs File-as-State：文件系统轻量调度
- Permission Sandboxing：安全隔离 vs File-as-State：状态持久化

---

## 参考资料

- [2026生产级AI Agent自动化](https://cloud.tencent.com/developer/article/2669589)
- [File System as Meta Tool: AI Agent基础设施新思路](https://blog.csdn.net/weixin_43749777/article/details/156836191)
