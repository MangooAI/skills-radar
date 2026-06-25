<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 text-teal-300 text-sm mb-6">
            <span class="animate-pulse w-2 h-2 rounded-full bg-teal-400"></span>
            <span>实时追踪 · 自动更新</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-4">
            <img :src="logoPath" alt="Skills Radar" class="h-20 lg:h-28 w-auto" />
          </h1>
          <p class="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
            追踪 Skills 技术，让 Agent 能力进化有迹可循
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div class="group bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
            <div class="text-3xl font-bold text-white group-hover:scale-105 transition-transform">{{ stats.total }}</div>
            <div class="text-sm text-slate-400 mt-1">已收录技术</div>
          </div>
          <div class="group bg-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
            <div class="text-3xl font-bold text-emerald-400 group-hover:scale-105 transition-transform">{{ stats.mature }}</div>
            <div class="text-sm text-emerald-300 mt-1">成熟期</div>
          </div>
          <div class="group bg-amber-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30 hover:bg-amber-500/30 transition-all">
            <div class="text-3xl font-bold text-amber-400 group-hover:scale-105 transition-transform">{{ stats.growing }}</div>
            <div class="text-sm text-amber-300 mt-1">成长期</div>
          </div>
          <div class="group bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30 hover:bg-red-500/30 transition-all">
            <div class="text-3xl font-bold text-red-400 group-hover:scale-105 transition-transform">{{ stats.exploring }}</div>
            <div class="text-sm text-red-300 mt-1">探索期</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Radar Chart Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">技术雷达全景图</h2>
          <p class="text-slate-600 max-w-xl mx-auto">
            六大技术领域的成熟度分布，每个技术点显示名称，悬停查看详情
          </p>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>

        <div v-else class="relative">
          <TechRadarChart :categories="categories" :technologies="technologies" />

          <!-- Legend -->
          <div class="flex justify-center gap-6 flex-wrap mt-8">
            <div v-for="cat in categories" :key="cat.id"
              class="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              @click="scrollToCategory(cat.id)">
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: cat.color }"></span>
              <span class="text-sm font-medium text-slate-700">{{ cat.label }}</span>
              <span class="text-xs text-slate-500">{{ cat.technologies?.length || 0 }}</span>
            </div>
          </div>

          <!-- Maturity Legend -->
          <div class="flex justify-center gap-8 mt-6 pt-6 border-t border-slate-200">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="text-sm text-slate-600">成熟期 &gt; 0.6</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span class="text-sm text-slate-600">成长期 0.4 - 0.6</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500"></span>
              <span class="text-sm text-slate-600">探索期 &lt; 0.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Flow Diagram -->
    <section class="py-16 bg-gradient-to-b from-slate-100 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">技术全景流程</h2>
          <p class="text-slate-600 max-w-xl mx-auto">
            Skill 生命周期六阶段演进路径，点击各阶段查看详细技术
          </p>
        </div>

        <!-- Flow Diagram -->
        <div class="relative">
          <!-- Stage Cards -->
          <div class="grid grid-cols-6 gap-4 relative">
            <div v-for="(cat, index) in flowCategories" :key="cat.id"
              class="group relative cursor-pointer"
              @click="scrollToCategory(cat.id)">
              <!-- Stage Circle -->
              <div class="relative mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl"
                :style="{ backgroundColor: cat.color }">
                <span class="text-2xl">{{ cat.icon }}</span>
              </div>

              <!-- Stage Info -->
              <div class="mt-4 text-center">
                <h3 class="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                  {{ cat.label }}
                </h3>
                <p class="text-xs text-slate-500 mt-1">{{ cat.label_en }}</p>
                <div class="mt-2 flex items-center justify-center gap-1">
                  <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: cat.maturityColor }"></span>
                  <span class="text-xs" :style="{ color: cat.maturityColor }">
                    {{ cat.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Detail Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-8 text-center">技术分类详情</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="category in categories" :key="category.id"
            :id="'category-' + category.id"
            class="card overflow-hidden scroll-mt-20">
            <!-- Category Header -->
            <div class="p-6 border-b border-slate-100"
              :style="{ background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                    :style="{ backgroundColor: category.color + '30' }">
                    <span class="text-2xl">{{ getCategoryIcon(category.id) }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">{{ category.label }}</h3>
                    <p class="text-sm text-slate-500">{{ category.label_en }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold" :style="{ color: category.color }">
                    {{ getCategoryScore(category).toFixed(2) }}
                  </div>
                  <span :class="getMaturityClass(getCategoryScore(category))">
                    {{ getMaturityStatus(getCategoryScore(category)).emoji }} {{ getMaturityStatus(getCategoryScore(category)).label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Technologies Table -->
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="table-header">
                    <th class="px-4 py-3 text-left">技术名称</th>
                    <th class="px-4 py-3 text-left">描述</th>
                    <th class="px-4 py-3 text-center">评分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tech in category.technologies.slice(0, 5)" :key="tech.id"
                    class="table-row cursor-pointer"
                    @click="goToTech(tech.id)">
                    <td class="px-4 py-3">
                      <span class="font-semibold text-slate-800 hover:text-teal-600 transition-colors">
                        {{ tech.name }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-slate-600 text-sm max-w-xs truncate">
                      {{ tech.description }}
                    </td>
                    <td class="px-4 py-3 text-center">
                      <span :class="getScoreBadgeClass(getOverallScore(tech))">
                        {{ getOverallScore(tech).toFixed(2) }}
                      </span>
                    </td>
                  </tr>
                  <!-- More technologies indicator -->
                  <tr v-if="category.technologies.length > 5" class="bg-slate-50">
                    <td colspan="3" class="px-4 py-3 text-center">
                      <router-link :to="`/category/${category.id}`"
                        class="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center justify-center gap-2">
                        <span>还有 {{ category.technologies.length - 5 }} 个技术，点击查看更多</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- View More Link -->
            <div class="px-4 py-3 bg-slate-50 border-t border-slate-100">
              <router-link :to="`/category/${category.id}`"
                class="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">
                <span>查看详细内容</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dimension Explanation -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">评分维度说明</h2>
          <p class="text-slate-600">四大维度加权计算综合评分</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="dim in dimensions" :key="dim.key"
            class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 rounded-full bg-teal-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-xl font-bold text-teal-600">{{ dim.weight * 100 }}%</span>
            </div>
            <h3 class="font-semibold text-slate-800 mb-2">{{ dim.label }}</h3>
            <p class="text-sm text-slate-600">{{ dim.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRadarStore } from '../stores/radar'
import TechRadarChart from '../components/TechRadarChart.vue'

const router = useRouter()
const store = useRadarStore()

const basePath = import.meta.env.DEV ? '' : '/skills-radar'
const logoPath = `${basePath}/skill-radar-logo.svg`

onMounted(async () => {
  await store.fetchData()
})

const categories = computed(() => store.categories)
const technologies = computed(() => store.technologies)
const stats = computed(() => store.stats)
const loading = computed(() => store.loading)

const dimensions = [
  { key: 'maturity', label: '技术成熟度', weight: 0.30, description: '概念验证到大规模应用的演进程度' },
  { key: 'innovation', label: '创新性', weight: 0.25, description: '技术的原创性和前沿程度' },
  { key: 'adoption', label: '落地程度', weight: 0.25, description: '在实际产品/项目中的应用广度' },
  { key: 'ecosystem', label: '生态活跃度', weight: 0.20, description: '社区贡献者数量、更新频率' }
]

// Flow categories with icons
const flowCategories = computed(() => {
  return store.categories.map(cat => {
    const score = getCategoryScore(cat)
    let maturityColor = '#EF4444'
    let status = '探索期'
    if (score > 0.6) {
      maturityColor = '#10B981'
      status = '成熟期'
    } else if (score >= 0.4) {
      maturityColor = '#F59E0B'
      status = '成长期'
    }

    return {
      ...cat,
      icon: getCategoryIcon(cat.id),
      maturityColor,
      status
    }
  })
})

function getOverallScore(tech) {
  return store.getOverallScore(tech)
}

function getCategoryScore(category) {
  if (!category.technologies?.length) return 0
  const scores = category.technologies.map(t => getOverallScore(t))
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

function getMaturityStatus(score) {
  return store.getMaturityStatus(score)
}

function getMaturityClass(score) {
  const status = getMaturityStatus(score)
  return {
    'status-badge': true,
    'status-mature': status.color === 'green',
    'status-growing': status.color === 'yellow',
    'status-exploring': status.color === 'red'
  }
}

function getScoreBadgeClass(score) {
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

function getCategoryNumber(id) {
  const numbers = {
    generation: '01',
    recall: '02',
    execution: '03',
    evaluation: '04',
    optimization: '05',
    management: '06'
  }
  return numbers[id] || '01'
}

function goToTech(id) {
  router.push(`/tech/${id}`)
}

function scrollToCategory(id) {
  const el = document.getElementById('category-' + id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>