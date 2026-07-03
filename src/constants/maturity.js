// 评分维度与成熟度阈值 —— 全站单一数据源
// 权重与 public/data/radar-data.json 的 dimensions 字段保持一致

export const DIMENSIONS = [
  { key: 'maturity', label: '技术成熟度', short: '成熟度', weight: 0.30, barColor: '#6366F1', description: '概念验证到大规模应用的演进程度' },
  { key: 'innovation', label: '创新性', short: '创新', weight: 0.25, barColor: '#8B5CF6', description: '技术的原创性和前沿程度' },
  { key: 'adoption', label: '落地程度', short: '落地', weight: 0.25, barColor: '#10B981', description: '在实际产品/项目中的应用广度' },
  { key: 'ecosystem', label: '生态活跃度', short: '生态', weight: 0.20, barColor: '#F59E0B', description: '社区贡献者数量、更新频率' }
]

export const SCORE_WEIGHTS = DIMENSIONS.map(d => d.weight)

// 成熟度阈值：> MATURE → 成熟期；>= GROWING → 成长期；否则探索期
export const MATURITY_THRESHOLDS = { mature: 0.6, growing: 0.4 }

// 返回成熟度等级 'mature' | 'growing' | 'exploring'
export function getMaturityLevel(score) {
  if (score > MATURITY_THRESHOLDS.mature) return 'mature'
  if (score >= MATURITY_THRESHOLDS.growing) return 'growing'
  return 'exploring'
}

// 成熟度元信息
export const MATURITY_META = {
  mature: { label: '成熟期', emoji: '🟢', color: '#10B981', badgeClass: 'status-mature' },
  growing: { label: '成长期', emoji: '🟡', color: '#F59E0B', badgeClass: 'status-growing' },
  exploring: { label: '探索期', emoji: '🔴', color: '#EF4444', badgeClass: 'status-exploring' }
}
