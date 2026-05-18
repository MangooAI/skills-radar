<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <router-link to="/" class="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-medium">返回首页</span>
          </router-link>

          <router-link :to="categoryLink" class="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
            {{ category?.label }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <main v-if="loading" class="flex items-center justify-center py-32">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"></div>
        <span class="text-slate-500">加载中...</span>
      </div>
    </main>

    <!-- Tech Detail -->
    <main v-else-if="tech" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <!-- Hero Card -->
        <section class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <!-- Header with color accent -->
          <div class="relative px-6 py-8 sm:px-8" :style="{ background: `linear-gradient(135deg, ${categoryColor}10, ${categoryColor}05)` }">
            <div class="absolute top-0 right-0 w-24 h-24 opacity-5" :style="{ backgroundColor: categoryColor }"></div>

            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">{{ tech.name }}</h1>
                  <span :class="getStatusClass(tech.status)">
                    {{ tech.status === 'active' ? '活跃' : '研究' }}
                  </span>
                </div>
                <p class="text-slate-600 leading-relaxed">{{ tech.description }}</p>
                <p class="text-sm text-slate-500 mt-2">{{ category?.label }} · {{ category?.label_en }}</p>
              </div>

              <!-- Score Display -->
              <div class="flex flex-col items-start sm:items-end">
                <div class="flex items-center gap-2">
                  <span class="text-3xl font-bold" :style="{ color: categoryColor }">{{ overallScore.toFixed(2) }}</span>
                </div>
                <span class="px-3 py-1.5 rounded-full text-sm font-medium mt-2" :style="{ backgroundColor: maturityColor + '20', color: maturityColor }">
                  {{ maturityStatus.emoji }} {{ maturityStatus.label }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 一句话描述 -->
        <section v-if="techContent?.summary" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <p class="text-slate-700 leading-relaxed text-lg">{{ techContent.summary }}</p>
        </section>

        <!-- Core Principles Section -->
        <section v-if="techContent?.principles?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.95-.083-1.85-.548-2.547l-.707-.707z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">核心原理</h2>
          </div>

          <div class="space-y-4">
            <div v-for="(principle, idx) in techContent.principles" :key="idx"
              class="group p-5 rounded-xl border border-slate-200 hover:border-violet-200 hover:bg-violet-50/30 transition-all">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  :style="{ backgroundColor: categoryColor + '15', color: categoryColor }">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-800 text-base mb-2">{{ principle.title }}</h3>
                  <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{{ principle.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Innovation Section -->
        <section v-if="techContent?.innovations?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">核心创新</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="(innovation, idx) in techContent.innovations" :key="idx"
              class="flex items-start gap-3 p-4 rounded-xl bg-cyan-50/50 border border-cyan-100">
              <div class="w-6 h-6 rounded-full flex items-center justify-center bg-cyan-500">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span class="font-semibold text-slate-800 text-sm">{{ innovation.title }}</span>
                <p class="text-sm text-slate-600 mt-1">{{ innovation.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Main Capabilities Section -->
        <section v-if="techContent?.capabilities?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">主要能力</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="(capability, idx) in techContent.capabilities" :key="idx"
              class="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div class="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700">{{ capability }}</span>
            </div>
          </div>
        </section>

        <!-- Applicable Scenarios Section -->
        <section v-if="techContent?.scenarios?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">适用场景</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="(scenario, idx) in techContent.scenarios" :key="idx"
              class="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <div class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">
                {{ idx + 1 }}
              </div>
              <span class="text-sm font-medium text-slate-700">{{ scenario }}</span>
            </div>
          </div>
        </section>

        <!-- Limitations Section -->
        <section v-if="techContent?.limitations?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">局限性</h2>
          </div>

          <div class="space-y-3">
            <div v-for="(limitation, idx) in techContent.limitations" :key="idx"
              class="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-slate-700 leading-relaxed">{{ limitation }}</span>
            </div>
          </div>
        </section>

        <!-- Scores Breakdown -->
        <section class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">成熟度评分</h2>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="(dim, idx) in dimensions" :key="dim.key" class="p-4 rounded-xl bg-slate-50">
              <div class="flex items-center justify-between mb-3">
                <span class="font-medium text-slate-700">{{ dim.label }}</span>
                <span class="text-lg font-bold text-slate-900">{{ tech.scores?.[idx]?.toFixed(2) || '0.00' }}</span>
              </div>

              <div class="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-3 rounded-full transition-all" :style="{ width: ((tech.scores?.[idx] || 0) * 100) + '%', backgroundColor: categoryColor }"></div>
              </div>

              <p class="text-xs text-slate-500 mt-2">权重 {{ dim.weight * 100 }}%</p>
            </div>
          </div>
        </section>

        <!-- Reference Links -->
        <section v-if="techContent?.references?.length" class="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-900">参考资料</h2>
          </div>

          <div class="space-y-3">
            <a v-for="ref in techContent.references" :key="ref.url"
              :href="ref.url" target="_blank"
              class="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 transition-all">
              <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div class="flex-1">
                <span class="font-medium text-slate-800 group-hover:text-teal-600 transition-colors">{{ ref.label }}</span>
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
    <main v-else class="flex flex-col items-center justify-center py-32">
      <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-lg font-medium text-slate-800 mb-2">未找到该技术</h2>
      <router-link to="/" class="text-teal-600 hover:text-teal-700 font-medium">返回首页</router-link>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRadarStore } from '../stores/radar'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const store = useRadarStore()

const tech = ref(null)
const loading = ref(true)
const techContent = ref(null)

const dimensions = [
  { key: 'maturity', label: '技术成熟度', weight: 0.30 },
  { key: 'innovation', label: '创新性', weight: 0.25 },
  { key: 'adoption', label: '落地程度', weight: 0.25 },
  { key: 'ecosystem', label: '生态活跃度', weight: 0.20 }
]

// 技术ID -> 文档文件名映射
const techDocMapping = {
  'trace2skill': 'tech-trace2skill',
  'd2skill': 'tech-d2skill',
  'skillx': 'tech-skillx',
  'memento': 'tech-memento-skills',
  'skillrl': 'tech-skillrl',
  'skill-router': 'tech-skillrouter',
  'graph-of-skills': 'tech-graph-of-skills',
  'skvm': 'tech-skvm',
  'skill-insight': 'tech-skillinsight',
  'skillsbench': 'tech-skillsbench',
  'skillprobe': 'tech-skillprobe',
  'skillforge': 'tech-skillforge',
  'skill-reducer': 'tech-skillreducer'
}

const overallScore = computed(() => store.getOverallScore(tech.value || {}))

const maturityStatus = computed(() => store.getMaturityStatus(overallScore.value))

const maturityColor = computed(() => {
  if (overallScore.value > 0.6) return '#10B981'
  if (overallScore.value >= 0.4) return '#F59E0B'
  return '#EF4444'
})

const category = computed(() => store.getCategoryById(tech.value?.categoryId))

const categoryColor = computed(() => category.value?.color || '#64748B')

const categoryLink = computed(() => `/category/${tech.value?.categoryId}`)

// 解析 markdown 内容
function parseMarkdownContent(markdown) {
  const content = {
    summary: '',
    principles: [],
    innovations: [],
    capabilities: [],
    scenarios: [],
    limitations: [],
    references: []
  }

  if (!markdown) return content

  // 提取一句话描述
  const summaryMatch = markdown.match(/\*\*一句话描述\*\*:\s*(.+)/)
  if (summaryMatch) {
    content.summary = summaryMatch[1].trim()
  }

  // 提取核心原理
  const principlesSection = markdown.match(/### 核心原理\s*\n([\s\S]*?)(?=### 核心创新|---|## 技术细节)/)
  if (principlesSection) {
    const lines = principlesSection[1].trim().split('\n')
    let currentPrinciple = null
    let collectingSubItems = false
    lines.forEach(line => {
      // 匹配带编号和加粗标题的行（有描述在同一行）
      const numberedWithTitleDesc = line.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]\s*(.+)/)
      if (numberedWithTitleDesc) {
        if (currentPrinciple) content.principles.push(currentPrinciple)
        currentPrinciple = { title: numberedWithTitleDesc[1], desc: numberedWithTitleDesc[2].trim() }
        collectingSubItems = false
        return
      }

      // 匹配带编号和加粗标题的行（描述在下一行，以冒号结尾）
      const numberedWithTitleOnly = line.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]?\s*$/)
      if (numberedWithTitleOnly) {
        if (currentPrinciple) content.principles.push(currentPrinciple)
        currentPrinciple = { title: numberedWithTitleOnly[1], desc: '' }
        collectingSubItems = true
        return
      }

      // 匹配子项目列表（以 - 开头）
      if (collectingSubItems && line.match(/^\s*-\s*(.+)/)) {
        const subItem = line.match(/^\s*-\s*(.+)/)
        if (currentPrinciple) {
          currentPrinciple.desc += (currentPrinciple.desc ? '\n' : '') + subItem[1].trim()
        }
        return
      }

      // 匹配普通列表项（带编号）
      const numberedOnly = line.match(/^\d+\.\s*(.+)/)
      if (numberedOnly) {
        if (currentPrinciple) content.principles.push(currentPrinciple)
        content.principles.push({ title: `步骤 ${content.principles.length + 1}`, desc: numberedOnly[1].trim() })
        collectingSubItems = false
        return
      }

      // 其他行
      if (currentPrinciple && line.trim() && !line.startsWith('-') && !collectingSubItems) {
        currentPrinciple.desc += ' ' + line.trim()
      }
    })
    if (currentPrinciple) content.principles.push(currentPrinciple)
  }

  // 提取核心创新
  const innovationsSection = markdown.match(/### 核心创新\s*\n([\s\S]*?)(?=---|## 技术细节|###)/)
  if (innovationsSection) {
    const lines = innovationsSection[1].trim().split('\n')
    lines.forEach(line => {
      const match = line.match(/- \*\*(.+?)\*\*[:：]\s*(.+)/)
      if (match) {
        content.innovations.push({ title: match[1], desc: match[2].trim() })
      }
    })
  }

  // 提取主要能力
  const capabilitiesSection = markdown.match(/### 主要能力\s*\n([\s\S]*?)(?=### 适用场景|### 局限性|---)/)
  if (capabilitiesSection) {
    const lines = capabilitiesSection[1].trim().split('\n')
    lines.forEach(line => {
      const match = line.match(/- \*\*(.+?)\*\*[:：]\s*(.+)/)
      if (match) {
        content.capabilities.push(`${match[1]}：${match[2].trim()}`)
      } else if (line.match(/- (.+)/)) {
        const m = line.match(/- (.+)/)
        content.capabilities.push(m[1].trim())
      }
    })
  }

  // 提取适用场景
  const scenariosSection = markdown.match(/### 适用场景\s*\n([\s\S]*?)(?=### 局限性|---)/)
  if (scenariosSection) {
    const lines = scenariosSection[1].trim().split('\n')
    lines.forEach(line => {
      if (line.match(/- (.+)/)) {
        const m = line.match(/- (.+)/)
        content.scenarios.push(m[1].trim())
      }
    })
  }

  // 提取局限性
  const limitationsSection = markdown.match(/### 局限性\s*\n([\s\S]*?)(?=---|##)/)
  if (limitationsSection) {
    const lines = limitationsSection[1].trim().split('\n')
    lines.forEach(line => {
      if (line.match(/- (.+)/)) {
        const m = line.match(/- (.+)/)
        content.limitations.push(m[1].trim())
      }
    })
  }

  // 提取参考资料
  const referencesSection = markdown.match(/## 参考资料\s*\n([\s\S]*?)$/)
  if (referencesSection) {
    const lines = referencesSection[1].trim().split('\n')
    lines.forEach(line => {
      const match = line.match(/- \[(.+?)\]\((.+?)\)/)
      if (match) {
        content.references.push({ label: match[1], url: match[2] })
      }
    })
  }

  return content
}

async function fetchTechDoc(techId) {
  const docName = techDocMapping[techId]
  if (!docName) return null

  const basePath = import.meta.env.DEV ? '' : '/skills-radar'
  try {
    const response = await fetch(`${basePath}/docs/radar/${docName}.md`)
    if (response.ok) {
      const markdown = await response.text()
      return parseMarkdownContent(markdown)
    }
  } catch (e) {
    console.error('Failed to fetch tech doc:', e)
  }
  return null
}

onMounted(async () => {
  await store.fetchData()
  tech.value = store.getTechById(route.params.id)
  if (tech.value) {
    techContent.value = await fetchTechDoc(tech.value.id)
  }
  loading.value = false
})

function getStatusClass(status) {
  return {
    'px-3 py-1.5 rounded-lg text-sm font-medium': true,
    'bg-emerald-100 text-emerald-700': status === 'active',
    'bg-purple-100 text-purple-700': status === 'research'
  }
}
</script>