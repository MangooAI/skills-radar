import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRadarStore = defineStore('radar', () => {
  const categories = ref([])
  const technologies = ref([])
  const loading = ref(false)
  const error = ref(null)
  const metadata = ref(null)

  // Fetch data from static JSON file
  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      // 开发模式用根路径，生产模式用 GitHub Pages 路径
      const basePath = import.meta.env.DEV ? '' : '/skills-radar'
      const response = await fetch(`${basePath}/data/radar-data.json`)
      if (!response.ok) throw new Error('数据加载失败')
      const data = await response.json()
      metadata.value = data.metadata
      categories.value = data.categories || []
      // 提取 technologies 并添加 categoryId（JSON 数据中 technologies 嵌套在 categories 内）
      technologies.value = data.categories?.flatMap(cat =>
        (cat.technologies || []).map(tech => ({ ...tech, categoryId: cat.id }))
      ) || []
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch radar data:', e)
    } finally {
      loading.value = false
    }
  }

  // Get technology by ID
  function getTechById(id) {
    return technologies.value.find(t => t.id === id)
  }

  // Get category by ID
  function getCategoryById(id) {
    return categories.value.find(c => c.id === id)
  }

  // Get technologies for a category
  function getTechsByCategory(categoryId) {
    return technologies.value.filter(t => t.categoryId === categoryId)
  }

  // Calculate overall score
  function getOverallScore(tech) {
    if (!tech.scores || tech.scores.length < 4) return 0
    const weights = [0.30, 0.25, 0.25, 0.20]
    return tech.scores.reduce((sum, score, i) => sum + score * weights[i], 0)
  }

  // Get maturity status
  function getMaturityStatus(score) {
    if (score > 0.6) return { label: '成熟期', color: 'green', emoji: '🟢' }
    if (score >= 0.4) return { label: '成长期', color: 'yellow', emoji: '🟡' }
    return { label: '探索期', color: 'red', emoji: '🔴' }
  }

  // Stats
  const stats = computed(() => {
    const total = technologies.value.length
    const mature = technologies.value.filter(t => getOverallScore(t) > 0.6).length
    const growing = technologies.value.filter(t => getOverallScore(t) >= 0.4 && getOverallScore(t) <= 0.6).length
    const exploring = technologies.value.filter(t => getOverallScore(t) < 0.4).length
    return { total, mature, growing, exploring }
  })

  return {
    categories,
    technologies,
    loading,
    error,
    metadata,
    stats,
    fetchData,
    getTechById,
    getCategoryById,
    getTechsByCategory,
    getOverallScore,
    getMaturityStatus
  }
})