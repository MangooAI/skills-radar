<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header Navigation -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-medium">返回首页</span>
          </router-link>

          <!-- Category Tabs -->
          <nav class="hidden md:flex items-center gap-1">
            <router-link
              v-for="cat in allCategories"
              :key="cat.id"
              :to="`/category/${cat.id}`"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                cat.id === category?.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              ]">
              {{ cat.label }}
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-32">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"></div>
        <span class="text-slate-500">加载中...</span>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else-if="category" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Category Hero -->
      <section class="mb-8">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <!-- Gradient Header -->
          <div class="relative px-6 py-8 sm:px-8 sm:py-10" :style="{ background: `linear-gradient(135deg, ${category.color}15, ${category.color}08)` }">
            <div class="absolute top-0 right-0 w-32 h-32 opacity-10" :style="{ background: category.color }"></div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center" :style="{ backgroundColor: category.color + '20' }">
                  <span class="text-3xl">{{ getCategoryIcon(category.id) }}</span>
                </div>

                <div>
                  <div class="flex items-center gap-2">
                    <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">{{ category.label }}</h1>
                    <span class="text-slate-500 font-medium">{{ category.label_en }}</span>
                  </div>
                  <p class="text-sm text-slate-500 mt-1">
                    Skill 生命周期 · {{ technologies.length }} 项技术
                  </p>
                </div>
              </div>

              <!-- Score Badge -->
              <div class="flex flex-col items-start sm:items-end">
                <div class="flex items-center gap-2">
                  <span class="text-3xl sm:text-4xl font-bold" :style="{ color: category.color }">{{ categoryScore.toFixed(2) }}</span>
                  <span class="px-3 py-1.5 rounded-full text-sm font-medium" :style="{ backgroundColor: maturityColor + '20', color: maturityColor }">
                    {{ maturityStatus.emoji }} {{ maturityStatus.label }}
                  </span>
                </div>
                <span class="text-xs text-slate-400 mt-1">综合评分</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Navigation -->
      <nav class="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
            activeSection === section.id
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          ]">
          {{ section.label }}
        </button>
      </nav>

      <!-- Section Content -->
      <div class="space-y-6">
        <!-- 一、技术概述 -->
        <section v-show="activeSection === 'overview'" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">一、技术概述</h2>
          </div>

          <div class="prose prose-slate max-w-none">
            <p class="text-slate-700 leading-relaxed text-base">{{ getCategoryDescription(category.id) }}</p>

            <!-- Core Goals -->
            <div class="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-semibold text-slate-800">核心目标</span>
              </div>
              <p class="text-slate-600">{{ getCategoryCoreGoal(category.id) }}</p>
            </div>
          </div>
        </section>

        <!-- 二、核心技术领域 -->
        <section v-show="activeSection === 'areas'" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">二、核心技术领域</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(area, idx) in getTechnicalAreas(category.id)"
              :key="area.title"
              class="group p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-default">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" :style="{ backgroundColor: category.color + '15', color: category.color }">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-800 mb-1">{{ area.title }}</h3>
                  <p class="text-sm text-slate-600 mb-3">{{ area.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="metric in area.metrics" :key="metric"
                      class="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {{ metric }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 三、代表技术与项目 -->
        <section v-show="activeSection === 'techs'" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">三、代表技术与项目</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-for="tech in technologies" :key="tech.id"
              @click="goToTech(tech.id)"
              class="group p-5 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-800 text-lg group-hover:text-teal-600 transition-colors">{{ tech.name }}</h3>
                  <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ tech.description }}</p>
                </div>
                <span :class="getTechStatusClass(tech.status)">
                  {{ tech.status === 'active' ? '活跃' : '研究' }}
                </span>
              </div>

              <!-- Score Bars -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-500">成熟度</span>
                    <span class="text-xs font-medium text-slate-700">{{ tech.scores?.[0]?.toFixed(2) }}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full transition-all" :style="{ width: ((tech.scores?.[0] || 0) * 100) + '%', backgroundColor: category.color }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-500">创新性</span>
                    <span class="text-xs font-medium text-slate-700">{{ tech.scores?.[1]?.toFixed(2) }}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full transition-all" :style="{ width: ((tech.scores?.[1] || 0) * 100) + '%', backgroundColor: category.color }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-500">落地程度</span>
                    <span class="text-xs font-medium text-slate-700">{{ tech.scores?.[2]?.toFixed(2) }}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full transition-all" :style="{ width: ((tech.scores?.[2] || 0) * 100) + '%', backgroundColor: category.color }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-500">生态活跃</span>
                    <span class="text-xs font-medium text-slate-700">{{ tech.scores?.[3]?.toFixed(2) }}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full transition-all" :style="{ width: ((tech.scores?.[3] || 0) * 100) + '%', backgroundColor: category.color }"></div>
                  </div>
                </div>
              </div>

              <!-- Overall Score -->
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <span class="text-sm text-slate-600">综合评分</span>
                <span class="text-lg font-bold" :style="{ color: category.color }">{{ getOverallScore(tech).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 四、技术成熟度分析 -->
        <section v-show="activeSection === 'analysis'" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">四、技术成熟度分析</h2>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200">
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700">技术</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700">成熟度</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700">创新性</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700">落地程度</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700">生态活跃</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700">综合</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tech in technologies" :key="tech.id"
                  @click="goToTech(tech.id)"
                  class="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <td class="px-4 py-3 font-medium text-slate-800">{{ tech.name }}</td>
                  <td class="px-4 py-3 text-center text-slate-600">{{ tech.scores?.[0]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-600">{{ tech.scores?.[1]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-600">{{ tech.scores?.[2]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-600">{{ tech.scores?.[3]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center font-bold" :style="{ color: category.color }">{{ getOverallScore(tech).toFixed(2) }}</td>
                </tr>
                <!-- Summary Row -->
                <tr class="bg-slate-100 font-semibold">
                  <td class="px-4 py-3 text-slate-800">{{ category.label }} 综合</td>
                  <td class="px-4 py-3 text-center text-slate-700">{{ avgScores[0]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-700">{{ avgScores[1]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-700">{{ avgScores[2]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center text-slate-700">{{ avgScores[3]?.toFixed(2) }}</td>
                  <td class="px-4 py-3 text-center font-bold" :style="{ color: category.color }">{{ categoryScore.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 五、学习资源 -->
        <section v-show="activeSection === 'resources'" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">五、学习资源</h2>
          </div>

          <div class="space-y-3">
            <a v-for="resource in getResources(category.id)" :key="resource.url"
              :href="resource.url" target="_blank"
              class="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 transition-all">
              <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                <svg v-if="resource.type === 'paper'" class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else-if="resource.type === 'github'" class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.626-5.373-12-12-12z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div class="flex-1">
                <span class="font-medium text-slate-800 group-hover:text-teal-600 transition-colors">{{ resource.title }}</span>
                <span class="text-sm text-slate-500 block mt-0.5">{{ resource.description }}</span>
              </div>
              <svg class="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </main>

    <!-- Not Found -->
    <div v-else class="flex flex-col items-center justify-center py-32">
      <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-lg font-medium text-slate-800 mb-2">未找到该分类</h2>
      <router-link to="/" class="text-teal-600 hover:text-teal-700 font-medium">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRadarStore } from '../stores/radar'

const route = useRoute()
const router = useRouter()
const store = useRadarStore()

const category = ref(null)
const loading = ref(true)
const activeSection = ref('overview')

const sections = [
  { id: 'overview', label: '技术概述' },
  { id: 'areas', label: '核心技术领域' },
  { id: 'techs', label: '代表技术' },
  { id: 'analysis', label: '成熟度分析' },
  { id: 'resources', label: '学习资源' }
]

const allCategories = computed(() => store.categories)
const technologies = computed(() => category.value?.technologies || [])

async function loadCategory(catId) {
  loading.value = true
  await store.fetchData()
  category.value = store.categories.find(c => c.id === catId)
  activeSection.value = 'overview'
  loading.value = false
}

onMounted(async () => {
  await loadCategory(route.params.id)
})

watch(() => route.params.id, async (newId) => {
  if (newId && newId !== category.value?.id) {
    await loadCategory(newId)
  }
})

const categoryScore = computed(() => {
  if (!technologies.value?.length) return 0
  const scores = technologies.value.map(t => getOverallScore(t))
  return scores.reduce((a, b) => a + b, 0) / scores.length
})

const avgScores = computed(() => {
  if (!technologies.value?.length) return [0, 0, 0, 0]
  const avg = [0, 0, 0, 0]
  technologies.value.forEach(t => {
    t.scores?.forEach((s, i) => avg[i] += s)
  })
  return avg.map(s => s / technologies.value.length)
})

const maturityStatus = computed(() => store.getMaturityStatus(categoryScore.value))

const maturityColor = computed(() => {
  if (categoryScore.value > 0.6) return '#10B981'
  if (categoryScore.value >= 0.4) return '#F59E0B'
  return '#EF4444'
})

function getOverallScore(tech) {
  return store.getOverallScore(tech)
}

function getCategoryIcon(id) {
  const icons = { generation: '🏗️', recall: '🎯', execution: '⚙️', evaluation: '📏', optimization: '🚀', management: '🛡️' }
  return icons[id] || '📦'
}

function getCategoryIndex(id) {
  const order = ['generation', 'recall', 'execution', 'evaluation', 'optimization', 'management']
  return order.indexOf(id) + 1
}

function getCategoryDescription(id) {
  const descriptions = {
    generation: 'Skill 生成是 Skill 全生命周期的起点，是基于用户/场景的确定性任务需求，完成从需求拆解、逻辑定义、开发编码、标准化封装到合规校验的全流程工程化开发体系。',
    recall: 'Skill 召回（也称 Skill 路由/Skill 调度）是智能体基于用户意图、上下文与场景特征，从 Skill 库中精准匹配最优 Skill/Skill 组合，完成从意图到执行的精准映射。',
    execution: 'Skill 执行是 Skill 全生命周期的核心落地环节，是智能体按 Skill 定义的逻辑、规则、调度方案，完成全链路运行、状态管控、数据流转、异常处理与结果输出的全过程。',
    evaluation: 'Skill 评测是贯穿 Skill 全生命周期的量化评估与质量定级体系，核心目标是构建可量化、可复现的多维度指标，以客观数据衡量 Skill 好不好用、稳不稳定、安不安全、有没有价值。',
    optimization: 'Skill 优化是基于执行数据、评测结果与用户反馈的持续迭代优化闭环，核心目标是数据驱动、持续改进，解决性能衰减与场景适配不足，提升任务完成能力与生命周期价值。',
    management: 'Skill 管理是面向大规模 Skill 库的全维度、标准化管控与运营体系，核心目标是实现规范化管控、精细化运营、生态化治理，解决版本混乱、重复开发、权限责任不清等问题。'
  }
  return descriptions[id] || ''
}

function getCategoryCoreGoal(id) {
  const goals = {
    generation: '构建高可用、高适配、低缺陷、可复用的标准化 Skill，实现 Skill "出生即高质量"',
    recall: '实现"需求-场景-Skill"最优匹配，避免错配、漏召、过召，保障执行准确率与体验',
    execution: '高效低延迟、稳定高可用、安全可管控，具备异常自愈与容错能力，确保确定性执行结果',
    evaluation: '构建可量化、可复现的多维度指标，以客观数据衡量 Skill 的效果、效率与安全性',
    optimization: '数据驱动、持续改进，解决性能衰减与场景适配不足，提升任务完成能力与生命周期价值',
    management: '规范化管控、精细化运营、生态化治理，保障生态健康有序可持续运转'
  }
  return goals[id] || ''
}

function getTechnicalAreas(id) {
  const areas = {
    generation: [
      { title: '文档解析', description: '从 PDF、Markdown、URL 等多源文档中提取结构化知识', metrics: ['PDF解析', 'Markdown', '知识抽取'] },
      { title: '语义聚合', description: '去冗余、合相似、抽模式，减少 Skill 膨胀', metrics: ['去冗余', '语义聚类', '模式抽取'] },
      { title: '渐进式生成', description: '从自然语言描述逐步生成结构化 Skill', metrics: ['一句话生成', '人机协作', '自生成'] },
      { title: '批量去重', description: '识别并合并高度相似的 Skills，控制库规模', metrics: ['相似度检测', '智能合并', '模式识别'] }
    ],
    recall: [
      { title: '意图识别', description: '将用户自然语言映射为 Skill 需求', metrics: ['文本分类', '语义匹配', '上下文理解'] },
      { title: '召回算法', description: '从大规模 Skill 库中高效召回相关 Skill', metrics: ['向量检索', '混合检索', '图检索'] },
      { title: '路由策略', description: '大规模 Skill 库下的选择策略', metrics: ['规则路由', '学习路由', 'Pareto优化'] },
      { title: '结构感知检索', description: '利用 Skill 元数据提升检索精度', metrics: ['能力树', 'DAG编排', '元数据增强'] }
    ],
    execution: [
      { title: '渐进式披露', description: '分阶段加载 Skill 内容，控制 Token 消耗', metrics: ['元数据加载', '指令加载', '资源加载'] },
      { title: '执行追踪', description: '记录 Skill 执行全过程，支持回溯分析', metrics: ['操作记录', '执行流图', '偏差标识'] },
      { title: '状态管控', description: '执行过程中的状态保持与恢复', metrics: ['Checkpoint', '状态恢复', '事务支持'] },
      { title: '权限隔离', description: 'Skill 执行时的安全沙箱', metrics: ['沙箱执行', '权限最小化', '操作审计'] }
    ],
    evaluation: [
      { title: '多维评测', description: '从多个维度评估 Skill 效果', metrics: ['准确率', '召回率', 'Token消耗', '执行时延'] },
      { title: '执行追溯', description: '记录每步操作，支持回溯分析', metrics: ['操作记录', '路径回溯', '偏差检测'] },
      { title: '归因分析', description: '区分问题根因，指导优化方向', metrics: ['缺陷定位', '根因分析', '优化建议'] },
      { title: '安全审计', description: '检测 Skill 中的安全漏洞', metrics: ['漏洞扫描', '权限审计', '数据泄露检测'] }
    ],
    optimization: [
      { title: '自优化', description: '基于归因结果自动定位并修复缺陷', metrics: ['缺陷定位', '自动修复', '效果验证'] },
      { title: '迭代优化', description: '多次评测-优化-再评测的闭环', metrics: ['评测闭环', '版本对比', 'A/B测试'] },
      { title: '效果提升', description: '针对性优化缺失步骤、冗余流程', metrics: ['路径优化', 'Token优化', '步骤精简'] },
      { title: '动态适配', description: '根据模型能力动态调整 Skill 策略', metrics: ['模型适配', '场景适配', '动态阈值'] }
    ],
    management: [
      { title: '版本管理', description: 'Skill 的版本控制与回滚', metrics: ['Git版本控制', '语义版本', '版本回滚'] },
      { title: '生命周期管理', description: 'Skill 的上线、迭代、下线全流程', metrics: ['上线审批', '迭代管理', '下线机制'] },
      { title: '权限管控', description: 'Skill 的访问权限与操作权限', metrics: ['RBAC', '最小权限', '操作审计'] },
      { title: '生态治理', description: '解决版本混乱、重复开发等问题', metrics: ['重复检测', '质量评审', '标准化'] }
    ]
  }
  return areas[id] || []
}

function getResources(id) {
  const resources = {
    generation: [
      { type: 'paper', title: 'Trace2Skill 论文', description: '从执行轨迹自动提取可复用技能', url: 'https://arxiv.org/abs/2404.16275' },
      { type: 'paper', title: 'D2Skill 论文', description: '双粒度动态技能库', url: 'https://arxiv.org/abs/2402.09942' },
      { type: 'paper', title: 'SkillX 论文', description: '为 Agent 打造自动化 Skill 库', url: 'https://arxiv.org/abs/2403.04782' },
      { type: 'paper', title: 'Memento-Skills 论文', description: '让 Agent 自主设计 Skill', url: 'https://arxiv.org/abs/2402.15672' }
    ],
    recall: [
      { type: 'paper', title: 'SkillRouter 论文', description: '破解大规模 Skills 选择难题', url: 'https://arxiv.org/abs/2403.04782' },
      { type: 'paper', title: 'Graph of Skills 论文', description: '千级规模 Skill 库检索', url: '#' },
      { type: 'website', title: 'Skill-insight 项目', description: 'openEuler 多维评测平台', url: 'https://atomgit.com/openeuler/witty-skill-insight' }
    ],
    execution: [
      { type: 'paper', title: 'SkVM 论文', description: '给 Skills 做编译器', url: '#' },
      { type: 'website', title: 'Skill-insight 项目', description: '执行流图可视化追踪', url: 'https://atomgit.com/openeuler/witty-skill-insight' }
    ],
    evaluation: [
      { type: 'website', title: 'Skill-insight 项目', description: 'openEuler 多维评测平台', url: 'https://atomgit.com/openeuler/witty-skill-insight' },
      { type: 'paper', title: 'SkillsBench 论文', description: '智能体技能基准测试', url: '#' },
      { type: 'paper', title: 'SkillProbe 论文', description: '用 Skill 审计 Skills 安全漏洞', url: '#' }
    ],
    optimization: [
      { type: 'paper', title: 'SkillForge 论文', description: '企业级 Skills 自主进化', url: '#' },
      { type: 'paper', title: 'SkillReducer 论文', description: '为 Skills 瘦身 40%', url: '#' },
      { type: 'website', title: 'Skill-insight Optimizer', description: '归因结果自动修复', url: 'https://atomgit.com/openeuler/witty-skill-insight' }
    ],
    management: [
      { type: 'paper', title: 'Agent Skills 标准规范', description: '跨平台 Skill 格式标准', url: '#' },
      { type: 'paper', title: 'AgentSkillOS 论文', description: '生态级技能组织与编排', url: '#' },
      { type: 'website', title: 'Skill-insight 项目', description: 'Skill 全生命周期管理', url: 'https://atomgit.com/openeuler/witty-skill-insight' }
    ]
  }
  return resources[id] || []
}

function getTechStatusClass(status) {
  return {
    'px-2.5 py-1 rounded-md text-xs font-medium': true,
    'bg-emerald-50 text-emerald-700 border border-emerald-200': status === 'active',
    'bg-purple-50 text-purple-700 border border-purple-200': status === 'research'
  }
}

function goToTech(id) {
  router.push(`/tech/${id}`)
}
</script>