<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-slate-900 mb-8">技术分类目录</h1>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.id"
        class="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToCategory(category.id)">
        <!-- Header with gradient -->
        <div class="p-6"
          :style="{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)` }">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center"
                :style="{ backgroundColor: category.color + '30' }">
                <span class="text-2xl">{{ getCategoryIcon(category.id) }}</span>
              </div>
              <div>
                <h2 class="text-lg font-bold text-slate-900">{{ category.label }}</h2>
                <p class="text-sm text-slate-500">{{ category.label_en }}</p>
              </div>
            </div>

            <!-- Score Badge -->
            <div class="text-right">
              <div class="text-2xl font-bold" :style="{ color: category.color }">
                {{ getCategoryScore(category).toFixed(2) }}
              </div>
              <span :class="getMaturityBadgeClass(getCategoryScore(category))">
                {{ getMaturityStatus(getCategoryScore(category)).emoji }}
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p class="text-sm text-slate-600">{{ getCategoryDescription(category.id) }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 py-4 border-t border-slate-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-slate-500">{{ category.technologies?.length || 0 }} 个技术</span>
            <span class="text-xs text-slate-400">{{ getCategoryScore(category).toFixed(2) }} / 1.00</span>
          </div>
          <div class="score-bar w-full h-2">
            <div class="score-bar-fill"
              :style="{ width: (getCategoryScore(category) * 100) + '%', backgroundColor: category.color }">
            </div>
          </div>
        </div>

        <!-- Tech Preview -->
        <div v-if="category.technologies?.length" class="px-6 py-4 border-t border-slate-100">
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in category.technologies.slice(0, 4)" :key="tech.id"
              class="px-2 py-1 bg-white rounded-md text-xs font-medium text-slate-700 border border-slate-200">
              {{ tech.name }}
            </span>
            <span v-if="category.technologies.length > 4"
              class="px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-500">
              +{{ category.technologies.length - 4 }} 更多
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRadarStore } from '../stores/radar'

const router = useRouter()
const store = useRadarStore()

onMounted(() => {
  store.fetchData()
})

const categories = computed(() => store.categories)

function getCategoryScore(category) {
  if (!category.technologies?.length) return 0
  const scores = category.technologies.map(t => store.getOverallScore(t))
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

function getMaturityStatus(score) {
  return store.getMaturityStatus(score)
}

function getMaturityBadgeClass(score) {
  const status = getMaturityStatus(score)
  return {
    'status-badge': true,
    'status-mature': status.color === 'green',
    'status-growing': status.color === 'yellow',
    'status-exploring': status.color === 'red'
  }
}

function getCategoryIcon(id) {
  const icons = {
    generation: '🏗️',
    recall: '🎯',
    execution: '⚙️',
    evaluation: '📏',
    optimization: '🚀',
    management: '🛡️'
  }
  return icons[id] || '📦'
}

function getCategoryDescription(id) {
  const descriptions = {
    generation: '从执行轨迹和经验中自动提取、构建可复用的技能',
    recall: '从海量技能库中精准匹配最适配的技能',
    execution: '跨模型、跨框架的可移植执行与环境适配',
    evaluation: '多维度量化评估，驱动持续优化',
    optimization: '基于评测结果的自动修复与迭代进化',
    management: '版本控制、权限管控与生命周期管理'
  }
  return descriptions[id] || ''
}

function goToCategory(id) {
  router.push(`/category/${id}`)
}
</script>

<style scoped>
.score-bar {
  height: 8px;
  border-radius: 4px;
  background: #E2E8F0;
}

.score-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>