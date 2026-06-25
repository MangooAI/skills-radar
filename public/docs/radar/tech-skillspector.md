# SkillSpector：NVIDIA开源的Agent技能安全扫描器

> **分类**: Agent安全 / 技能安全扫描 | **成熟度**: 🟡 成长期 | **综合评分**: 0.66

---

## 一句话描述

NVIDIA开源的Agent技能安全扫描器，安装前检测漏洞和恶意模式。覆盖**68种漏洞模式、17个类别**，两阶段管道（静态+LLM语义），风险评分0-100，支持MCP Server模式嵌入Agent运行时当安全护栏。10.5k Stars，Apache 2.0。

**来源**:
- 项目：NVIDIA SkillSpector
- 组织：NVIDIA
- 许可证：Apache 2.0

**链接**:
- GitHub: https://github.com/nvidia/skillspector
- 研究数据基于42,447个技能样本

---

## 核心实现

**1. 两阶段检测管道**

Stage 1 静态分析：11个分析器基于正则做快速模式匹配，AST行为分析检测exec/eval/subprocess等危险调用，YARA签名匹配恶意软件和webshell。SC4模块实时查OSV.dev获取依赖项CVE，缓存1小时，离线自动回退到内置列表。高召回，大多数问题能抓到。

Stage 2 LLM语义分析：评估上下文和意图，滤掉静态阶段的误报，给人类可读的解释。精确度提到约87%。支持openai/anthropic/本地Ollama，prompt带反越狱保护。`--no-llm`可完全本地跑。

**2. 17类漏洞模式**

Prompt注入、Anti-Refusal、数据外泄、权限提升、供应链攻击、过度代理、输出处理、系统提示泄露、记忆投毒、工具滥用、Rogue Agent、触发器滥用、行为AST、污点追踪、YARA签名、MCP最小权限、MCP工具投毒。**带可执行脚本的技能漏洞概率是纯文档的2.12倍**，风险评分乘1.3倍。

**3. MCP Server嵌入式护栏**

作为MCP服务器跑，注册到Claude Code等Agent：`claude mcp add skillspector -- skillspector mcp`。stdio和HTTP/SSE都支持。把安全扫描从安装前检查变成了运行时持续护栏。

**4. 风险评分与多格式输出**

0-100分制：CRITICAL +50、HIGH +25、MEDIUM +10、LOW +5。≤50 SAFE/CAUTION，>50 DO_NOT_INSTALL。终端、JSON、Markdown、SARIF四种输出。基线管理用glob规则或指纹过滤已知误报。

---

## 主要能力

- 68种漏洞模式17个类别：从Prompt注入到MCP工具投毒，覆盖面广
- 两阶段检测：静态快速筛查加可选LLM语义，兼顾速度和精度（精确度87%）
- 多输入多输出：Git/URL/zip/目录/文件入，终端/JSON/Markdown/SARIF出
- MCP Server嵌入式护栏：注册到Agent运行时，从离线检查变运行时持续防护
- 实时CVE查询：SC4查OSV.dev覆盖PyPI和npm数万条通告，离线自动回退

---

## 局限性

- 纯静态分析，不执行技能，跑不了运行时触发的漏洞
- 非英语内容的恶意模式可能漏
- 图像中文本攻击、编译/加密内容搞不了
- LLM分析会发文件内容到配置的提供商，隐私场景用`--no-llm`

---

## 成熟度评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 技术成熟度 | 0.70 | NVIDIA开源产品级扫描器，68种漏洞17类别，两阶段管道+MCP Server模式 |
| 创新性 | 0.60 | MCP嵌入式护栏将离线检查变运行时持续防护，其余属工程化整合 |
| 落地程度 | 0.65 | 10.5k Stars，Apache 2.0开源，可直接集成到Claude Code等Agent运行时 |
| 生态活跃度 | 0.70 | NVIDIA背书，GitHub高Stars，社区持续更新 |

**综合评分**: 0.70×0.3 + 0.60×0.25 + 0.65×0.25 + 0.70×0.2 = **0.66**（🟡 成长期）


---

## 参考资料

- [GitHub仓库](https://github.com/nvidia/skillspector)
- [OSV.dev漏洞数据库](https://osv.dev)
