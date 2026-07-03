import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SCORE_WEIGHTS, getMaturityLevel, MATURITY_META } from '../constants/maturity'

export const useRadarStore = defineStore('radar', () => {
  const categories = ref([])
  const technologies = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch data from static JSON file
  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const basePath = import.meta.env.DEV ? '' : '/skills-radar'
      const response = await fetch(`${basePath}/data/radar-data.json`)
      if (!response.ok) throw new Error('数据加载失败')
      const data = await response.json()
      categories.value = data.categories || []
      // 展平 technologies 并标注 categoryId
      technologies.value = categories.value.flatMap(cat =>
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

  // Calculate overall score (weights from single source of truth)
  function getOverallScore(tech) {
    if (!tech?.scores || tech.scores.length < SCORE_WEIGHTS.length) return 0
    return tech.scores.reduce((sum, score, i) => sum + score * SCORE_WEIGHTS[i], 0)
  }

  // Get maturity status
  function getMaturityStatus(score) {
    const level = getMaturityLevel(score)
    const meta = MATURITY_META[level]
    return { label: meta.label, color: meta.badgeClass.replace('status-', ''), emoji: meta.emoji, level }
  }

  // Stats
  const stats = computed(() => {
    const total = technologies.value.length
    const mature = technologies.value.filter(t => getMaturityLevel(getOverallScore(t)) === 'mature').length
    const growing = technologies.value.filter(t => getMaturityLevel(getOverallScore(t)) === 'growing').length
    const exploring = technologies.value.filter(t => getMaturityLevel(getOverallScore(t)) === 'exploring').length
    return { total, mature, growing, exploring }
  })

  return {
    categories,
    technologies,
    loading,
    error,
    stats,
    fetchData,
    getTechById,
    getCategoryById,
    getTechsByCategory,
    getOverallScore,
    getMaturityStatus
  }
})
