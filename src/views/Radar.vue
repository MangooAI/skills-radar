<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-slate-900 mb-4">技术成熟度雷达图</h1>
      <p class="text-slate-600 max-w-2xl mx-auto">
        多维度评估 Skills 技术发展状态，基于四大维度加权计算综合评分
      </p>
    </div>

    <!-- Dimension Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div v-for="dim in dimensions" :key="dim.key" class="card p-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-slate-600">{{ dim.label }}</span>
          <span class="text-xs text-slate-400">{{ dim.weight * 100 }}%</span>
        </div>
        <p class="text-xs text-slate-500">{{ dim.description }}</p>
      </div>
    </div>

    <!-- Radar Chart Section -->
    <div class="card p-8 mb-12">
      <div class="flex justify-center">
        <TechRadarChart :categories="categories" :technologies="technologies" />
      </div>
    </div>

    <!-- Summary Table -->
    <div class="card overflow-hidden mb-8">
      <div class="px-4 py-3 bg-slate-50 border-b border-slate-100">
        <h2 class="text-base font-semibold text-slate-900">各领域综合评分</h2>
      </div>

      <table class="w-full">
        <thead>
          <tr class="table-header">
            <th class="px-4 py-2 text-left text-sm">技术领域</th>
            <th class="px-4 py-2 text-center text-sm">综合评分</th>
            <th class="px-4 py-2 text-center text-sm">技术成熟度</th>
            <th class="px-4 py-2 text-center text-sm">创新性</th>
            <th class="px-4 py-2 text-center text-sm">落地程度</th>
            <th class="px-4 py-2 text-center text-sm">生态活跃度</th>
            <th class="px-4 py-2 text-center text-sm">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="summary in categorySummaries" :key="summary.id" class="table-row">
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: summary.color }"></span>
                <span class="font-medium text-slate-800 text-sm">{{ summary.label }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-center">
              <span class="text-base font-bold" :style="{ color: summary.color }">
                {{ summary.overallScore.toFixed(2) }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <ScoreBar :score="summary.scores[0]" />
            </td>
            <td class="px-4 py-3 text-center">
              <ScoreBar :score="summary.scores[1]" />
            </td>
            <td class="px-4 py-3 text-center">
              <ScoreBar :score="summary.scores[2]" />
            </td>
            <td class="px-4 py-3 text-center">
              <ScoreBar :score="summary.scores[3]" />
            </td>
            <td class="px-4 py-3 text-center">
              <span :class="getStatusBadgeClass(summary.maturityLevel)" class="text-xs">
                {{ summary.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div class="bg-slate-50 rounded-lg p-4 mb-12">
      <h3 class="font-medium text-slate-700 mb-2 text-sm">评分标准说明</h3>
      <div class="grid grid-cols-3 gap-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
          <div>
            <span class="font-medium text-slate-700 text-xs">成熟期</span>
            <span class="text-slate-500 text-xs ml-1">&gt; 0.6</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-amber-500"></span>
          <div>
            <span class="font-medium text-slate-700 text-xs">成长期</span>
            <span class="text-slate-500 text-xs ml-1">0.4 - 0.6</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <div>
            <span class="font-medium text-slate-700 text-xs">探索期</span>
            <span class="text-slate-500 text-xs ml-1">&lt; 0.4</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill 技术演进时间线 -->
    <div class="card p-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-bold text-slate-900">Skill 技术演进时间线</h2>

        <!-- Dimension Toggle -->
        <div class="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
          <button
            @click="timelineDimension = 'overall'"
            :class="timelineDimension === 'overall' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all">
            总体演进
          </button>
          <button
            @click="timelineDimension = 'category'"
            :class="timelineDimension === 'category' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all">
            分类演进
          </button>
        </div>
      </div>

      <!-- Overall Evolution Timeline -->
      <div v-if="timelineDimension === 'overall'" class="relative">
        <!-- Timeline vertical line -->
        <div class="absolute left-3 top-[20px] w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 via-emerald-500 to-amber-500 rounded-full" style="height: calc(100% - 40px)"></div>

        <!-- Timeline events -->
        <div class="space-y-6 ml-10">
          <div v-for="(event, idx) in overallTimelineEvents" :key="idx" class="flex items-start gap-5">
            <!-- Marker with connector line -->
            <div class="relative flex-shrink-0 flex items-center">
              <div class="absolute left-[-22px] top-[20px] w-[22px] h-0.5 rounded-full" :style="{ backgroundColor: event.color + '60' }"></div>
              <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                :style="{ backgroundColor: event.color + '25', border: '3px solid ' + event.color }">
                <svg v-if="event.iconType === 'rocket'" class="w-5 h-5" :style="{ color: event.color }" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C9.24 2 7.35 4.13 6 6c-2 2.67-2 6-2 9l4 5h8l4-5c0-3 0-6.33-2-9-1.35-1.87-3.24-4-6-4zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
                <svg v-else-if="event.iconType === 'star'" class="w-5 h-5" :style="{ color: event.color }" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span v-else class="text-xs font-bold" :style="{ color: event.color }">{{ event.year }}</span>
              </div>
            </div>

            <!-- Content card -->
            <div class="flex-1 p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-base font-bold" :style="{ color: event.color }">{{ event.year }}</span>
                <span v-if="event.milestone" class="px-3 py-1.5 rounded-full text-xs font-medium"
                  :style="{ backgroundColor: event.color + '15', color: event.color, border: '1px solid ' + event.color + '30' }">
                  {{ event.milestone }}
                </span>
              </div>
              <h3 class="font-semibold text-slate-800 text-lg mb-2">{{ event.title }}</h3>
              <p class="text-sm text-slate-600 leading-relaxed">{{ event.description }}</p>

              <!-- Technologies involved -->
              <div v-if="event.technologies?.length" class="mt-4 flex flex-wrap gap-2">
                <span v-for="tech in event.technologies" :key="tech"
                  :class="hasTech(tech) ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 cursor-pointer' : 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed opacity-60'"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  @click="hasTech(tech) && goToTechByName(tech)">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline legend -->
        <div class="mt-10 pt-6 border-t border-slate-200 ml-10">
          <div class="flex items-center justify-between text-xs text-slate-500 max-w-2xl">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span>2023 概念萌芽</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-violet-500"></div>
              <span>2024 技术验证</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>2025 工程落地</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>2026 生态成熟</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Evolution Timeline -->
      <div v-else class="space-y-8">
        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            v-for="cat in categoryTimelineData"
            :key="cat.id"
            @click="selectedCategoryTimeline = cat.id"
            :class="selectedCategoryTimeline === cat.id ? 'text-white shadow-md' : 'text-slate-700 hover:opacity-80'"
            :style="{ backgroundColor: selectedCategoryTimeline === cat.id ? cat.color : cat.color + '20' }"
            class="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all">
            {{ cat.label }}
          </button>
        </div>

        <!-- Selected Category Timeline -->
        <div v-if="currentCategoryTimeline" class="relative">
          <!-- Category Header -->
          <div class="flex items-center gap-4 mb-6 p-4 rounded-xl ml-10" :style="{ backgroundColor: currentCategoryTimeline.color + '10' }">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" :style="{ backgroundColor: currentCategoryTimeline.color + '25' }">
              <svg class="w-6 h-6" :style="{ color: currentCategoryTimeline.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-lg">{{ currentCategoryTimeline.label }} · {{ currentCategoryTimeline.label_en }}</h3>
              <p class="text-sm text-slate-500">技术演进路径 · {{ currentCategoryTimeline.events?.length || 0 }} 个里程碑</p>
            </div>
          </div>

          <!-- Timeline vertical line -->
          <div class="absolute left-3 top-[90px] w-0.5 rounded-full" :style="{ backgroundColor: currentCategoryTimeline.color + '50', height: 'calc(100% - 100px)' }"></div>

          <!-- Events -->
          <div class="space-y-5 ml-10">
            <div v-for="(event, idx) in currentCategoryTimeline.events" :key="idx" class="flex items-start gap-5">
              <!-- Marker with connector line -->
              <div class="relative flex-shrink-0 flex items-center">
                <div class="absolute left-[-22px] top-[18px] w-[22px] h-0.5 rounded-full" :style="{ backgroundColor: currentCategoryTimeline.color + '40' }"></div>
                <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                  :style="{ backgroundColor: currentCategoryTimeline.color + '20', border: '3px solid ' + currentCategoryTimeline.color }">
                  <span class="text-xs font-bold" :style="{ color: currentCategoryTimeline.color }">{{ event.year.slice(-2) }}</span>
                </div>
              </div>

              <!-- Content card -->
              <div class="flex-1 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-semibold text-slate-700">{{ event.year }}</span>
                  <span v-if="event.phase" class="px-2.5 py-1 rounded-full text-xs font-medium"
                    :style="{ backgroundColor: currentCategoryTimeline.color + '15', color: currentCategoryTimeline.color, border: '1px solid ' + currentCategoryTimeline.color + '25' }">
                    {{ event.phase }}
                  </span>
                </div>
                <p class="text-sm text-slate-700 leading-relaxed">{{ event.description }}</p>

                <!-- Technologies -->
                <div v-if="event.technologies?.length" class="mt-3 flex flex-wrap gap-2">
                  <span v-for="tech in event.technologies" :key="tech"
                    :class="hasTech(tech) ? 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 cursor-pointer' : 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed opacity-60'"
                    class="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all"
                    @click="hasTech(tech) && goToTechByName(tech)">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Maturity Assessment Model -->
    <div class="card p-8 mt-8">
      <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">技术成熟度评估模型</h2>
      </div>

      <!-- Section Tabs -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="tab in maturityTabs"
          :key="tab.id"
          @click="activeMaturityTab = tab.id"
          :class="activeMaturityTab === tab.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'"
          class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all">
          {{ tab.label }}
        </button>
      </div>

      <!-- Evaluation Dimensions -->
      <div v-show="activeMaturityTab === 'dimensions'" class="space-y-4">
        <p class="text-slate-600 mb-6">技术成熟度从四个维度综合评估：</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="dim in maturityDimensions" :key="dim.key"
            class="p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ backgroundColor: dim.color + '20' }">
                  <svg class="w-5 h-5" :style="{ color: dim.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="dim.key === 'maturity'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path v-else-if="dim.key === 'innovation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    <path v-else-if="dim.key === 'adoption'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-800">{{ dim.label }}</h3>
              </div>
              <span class="px-3 py-1.5 rounded-full text-sm font-bold" :style="{ backgroundColor: dim.color + '15', color: dim.color }">
                {{ dim.weight * 100 }}%
              </span>
            </div>
            <p class="text-sm text-slate-600 mb-4">{{ dim.description }}</p>

            <!-- Scoring criteria -->
            <div class="space-y-2 pt-4 border-t border-slate-100">
              <div v-for="criteria in dim.criteria" :key="criteria.range"
                class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                <span class="text-xs font-medium text-slate-600 w-20">{{ criteria.range }}</span>
                <span class="text-xs text-slate-700">{{ criteria.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Formula -->
        <div class="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span class="font-semibold text-indigo-700">综合评分计算公式</span>
          </div>
          <p class="text-sm text-indigo-600 font-medium">
            综合评分 = 技术成熟度 × 30% + 创新性 × 25% + 落地程度 × 25% + 生态活跃度 × 20%
          </p>
        </div>
      </div>

      <!-- Maturity Levels -->
      <div v-show="activeMaturityTab === 'levels'" class="space-y-4">
        <p class="text-slate-600 mb-6">根据综合评分区间划分成熟度等级：</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="level in maturityLevels" :key="level.status"
            class="p-5 rounded-xl border-2 transition-all hover:shadow-lg"
            :style="{ borderColor: level.color + '40', backgroundColor: level.color + '08' }">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center" :style="{ backgroundColor: level.color + '20' }">
                <span class="text-2xl">{{ level.emoji }}</span>
              </div>
              <div>
                <h3 class="font-bold text-slate-800">{{ level.label }}</h3>
                <span class="text-sm text-slate-500">{{ level.range }}</span>
              </div>
            </div>

            <!-- Definition -->
            <p class="text-sm text-slate-700 font-medium mb-3">{{ level.definition }}</p>

            <!-- Characteristics -->
            <div class="space-y-2">
              <span class="text-xs text-slate-500 font-medium">典型特征：</span>
              <ul class="text-xs text-slate-600 space-y-1.5">
                <li v-for="char in level.characteristics" :key="char" class="flex items-start gap-1.5">
                  <span class="w-1 h-1 rounded-full mt-1.5" :style="{ backgroundColor: level.color }"></span>
                  <span>{{ char }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRadarStore } from '../stores/radar'
import ScoreBar from '../components/ScoreBar.vue'
import TechRadarChart from '../components/TechRadarChart.vue'

const router = useRouter()
const store = useRadarStore()
const categorySummaries = ref([])
const timelineDimension = ref('overall')
const selectedCategoryTimeline = ref('generation')

const dimensions = [
  { key: 'maturity', label: '技术成熟度', weight: 0.30, description: '概念验证到大规模应用的演进程度' },
  { key: 'innovation', label: '创新性', weight: 0.25, description: '技术的原创性和前沿程度' },
  { key: 'adoption', label: '落地程度', weight: 0.25, description: '在实际产品/项目中的应用广度' },
  { key: 'ecosystem', label: '生态活跃度', weight: 0.20, description: '社区贡献者数量、更新频率' }
]

// 总体演进时间线 - 静态数据
const overallTimelineEvents = [
  {
    year: '2023',
    color: '#6366F1',
    iconType: 'dot',
    title: 'API 插件时代',
    description: 'ChatGPT Plugins 发布开创 LLM 工具调用插件范式。需要服务代码、中心化审核，非技术人员难以封装复杂工作流。',
    milestone: '插件范式',
    technologies: ['ChatGPT Plugins', 'OpenAPI Schema']
  },
  {
    year: '2024',
    color: '#8B5CF6',
    iconType: 'rocket',
    title: 'MCP 协议时代',
    description: 'Anthropic 发布 MCP 协议统一工具调用协议，解决 M×N 集成难题。支持本地运行和远程部署，去中心化审核。',
    milestone: '协议统一',
    technologies: ['MCP Protocol']
  },
  {
    year: '2025',
    color: '#10B981',
    iconType: 'star',
    title: 'Skill 时代',
    description: 'Anthropic Claude Skills 发布开创第三代能力扩展。一句话生成 Skill，生态爆发式增长达 11.8 万个。自然语言定义 Skill，非技术人员可上手。',
    milestone: '生态爆发',
    technologies: ['skill-insight', 'SkillRouter', 'Skill Creator 2.0', 'Graph of Skills']
  },
  {
    year: '2026',
    color: '#F59E0B',
    iconType: 'rocket',
    title: 'Skill 技术深化',
    description: 'Skill 自进化研究火热，标准化进程加速。企业级 SkillForge 实现自主进化，skill-insight 多维评测体系成熟。',
    milestone: '深化演进',
    technologies: ['SKILLRL', 'Memento-Skills', 'SkillForge']
  }
]

// 分类演进时间线 - 静态数据
const categoryTimelineData = [
  {
    id: 'generation',
    label: 'Skill 生成',
    label_en: 'Generation',
    color: '#FF6B6B',
    events: [
      { year: '2025.03', phase: '轨迹提取', description: 'Trace2Skill：从执行轨迹中自动提取可复用技能', technologies: ['Trace2Skill'] },
      { year: '2025.06', phase: '双粒度', description: 'D2Skill：双粒度动态技能库，驱动策略-技能协同进化', technologies: ['D2Skill'] },
      { year: '2025.12', phase: '人机协作', description: 'Skill Creator 2.0：人机协作持续优化，Agent 能加载专业技能', technologies: ['Skill Creator 2.0'] },
      { year: '2026.01', phase: '自进化', description: 'Memento-Skills：让 Agent 自主设计 Skill，实现自我进化', technologies: ['Memento-Skills'] },
      { year: '2026.01', phase: '强化学习', description: 'SKILLRL：通过技能的强化学习促进 Agent 自进化', technologies: ['SKILLRL'] }
    ]
  },
  {
    id: 'recall',
    label: 'Skill 召回',
    label_en: 'Recall/Routing',
    color: '#4ECDC4',
    events: [
      { year: '2025.02', phase: '路由突破', description: 'SkillRouter：破解大规模 Skills 选择难题的新范式', technologies: ['SkillRouter'] },
      { year: '2025.08', phase: '策略优化', description: 'SkillOrchestra：基于技能的 Agent 路由策略，提升 22.5%', technologies: ['SkillOrchestra'] },
      { year: '2025.09', phase: '生态编排', description: 'AgentSkillOS：生态级规模下技能的组织、编排与基准测试', technologies: ['AgentSkillOS'] },
      { year: '2025.11', phase: '结构检索', description: 'Graph of Skills：千级规模 Skill 库的结构感知检索方案', technologies: ['Graph of Skills'] }
    ]
  },
  {
    id: 'execution',
    label: 'Skill 执行',
    label_en: 'Execution',
    color: '#45B7D1',
    events: [
      { year: '2025.01', phase: 'Token 控制', description: 'Progressive Disclosure：渐进式披露，分阶段加载控制 Token 消耗', technologies: ['渐进式披露'] },
      { year: '2025.09', phase: '执行追踪', description: 'skill-insight 执行追踪：可视化 Skill 执行路径追踪', technologies: ['skill-insight'] },
      { year: '2025.10', phase: '跨平台', description: 'SkVM：给 Skills 做编译器，一次编写到处运行', technologies: ['SkVM'] }
    ]
  },
  {
    id: 'evaluation',
    label: 'Skill 评测',
    label_en: 'Evaluation',
    color: '#96CEB4',
    events: [
      { year: '2025.05', phase: '基准测试', description: 'SkillsBench：衡量智能体技能在多样化任务中的表现', technologies: ['SkillsBench'] },
      { year: '2025.07', phase: '安全审计', description: 'SkillProbe：用 Skill 审计 Skills 安全漏洞', technologies: ['SkillProbe'] },
      { year: '2025.09', phase: '多维评测', description: 'skill-insight：多维评测、执行追溯、归因分析能力落地', technologies: ['skill-insight'] },
      { year: '2026.04', phase: '评测成熟', description: 'skill-insight 成熟：多维评测体系完整，支持 OpenCode/Claude Code', technologies: ['skill-insight'] }
    ]
  },
  {
    id: 'optimization',
    label: 'Skill 优化',
    label_en: 'Optimization',
    color: '#DDA0DD',
    events: [
      { year: '2025.11', phase: '迭代闭环', description: 'Iterative Optimizer：多次评测-优化-再评测闭环', technologies: ['Iterative Optimizer'] },
      { year: '2026.01', phase: '自优化', description: 'SKILLRL、Memento-Skills 等自进化论文发表', technologies: ['SKILLRL', 'Memento-Skills'] },
      { year: '2026.03', phase: '企业进化', description: 'SkillForge：让企业级 Agent Skills 实现自主进化', technologies: ['SkillForge'] }
    ]
  },
  {
    id: 'management',
    label: 'Skill 管理',
    label_en: 'Management',
    color: '#B8B8B8',
    events: [
      { year: '2025.01', phase: '标准诞生', description: 'Skills 标准诞生：跨平台的 Skill 格式与协议标准', technologies: ['Agent Skills 标准'] },
      { year: '2025.09', phase: '生命周期', description: 'AgentSkillOS：生态级技能的组织、编排与生命周期管理', technologies: ['AgentSkillOS'] },
      { year: '2026', phase: '权限研究', description: 'RBAC Permission：基于角色的 Skill 权限管控（研究中）', technologies: ['RBAC Permission'] }
    ]
  }
]

onMounted(async () => {
  await store.fetchData()
  calculateSummaries()
})

const categories = computed(() => store.categories)
const technologies = computed(() => store.technologies)

const currentCategoryTimeline = computed(() => {
  return categoryTimelineData.find(cat => cat.id === selectedCategoryTimeline.value)
})

function calculateSummaries() {
  const summaries = store.categories.map(cat => {
    const techs = cat.technologies || []
    if (!techs.length) {
      return {
        id: cat.id,
        label: cat.label,
        color: cat.color,
        overallScore: 0,
        scores: [0, 0, 0, 0],
        maturityLevel: 'exploring',
        status: '探索期'
      }
    }

    const avgScores = [0, 0, 0, 0].map((_, idx) => {
      const scores = techs.map(t => t.scores?.[idx] || 0)
      return scores.reduce((a, b) => a + b, 0) / scores.length
    })

    const weights = [0.30, 0.25, 0.25, 0.20]
    const overallScore = avgScores.reduce((sum, s, i) => sum + s * weights[i], 0)

    let maturityLevel = 'exploring'
    let status = '探索期'
    if (overallScore > 0.6) {
      maturityLevel = 'mature'
      status = '成熟期'
    } else if (overallScore >= 0.4) {
      maturityLevel = 'growing'
      status = '成长期'
    }

    return {
      id: cat.id,
      label: cat.label,
      color: cat.color,
      overallScore,
      scores: avgScores,
      maturityLevel,
      status
    }
  })

  categorySummaries.value = summaries
}

function getStatusBadgeClass(level) {
  return {
    'status-badge': true,
    'status-mature': level === 'mature',
    'status-growing': level === 'growing',
    'status-exploring': level === 'exploring'
  }
}

function goToTechByName(name) {
  const tech = store.technologies.find(t => t.name === name || t.name.includes(name) || name.includes(t.name))
  if (tech) {
    router.push(`/tech/${tech.id}`)
  }
}

function hasTech(name) {
  return store.technologies.some(t => t.name === name || t.name.includes(name) || name.includes(t.name))
}

// 技术成熟度评估模型 - 静态数据
const activeMaturityTab = ref('dimensions')

const maturityTabs = [
  { id: 'dimensions', label: '评估维度' },
  { id: 'levels', label: '成熟度等级' }
]

const maturityDimensions = [
  {
    key: 'maturity',
    label: '技术成熟度',
    weight: 0.30,
    color: '#6366F1',
    description: '概念验证到大规模应用的演进程度',
    criteria: [
      { range: '0.0-0.25', desc: '仅论文或概念，无实现' },
      { range: '0.25-0.50', desc: '有原型，实验性使用' },
      { range: '0.50-0.75', desc: '成熟开源项目，实际应用案例' },
      { range: '0.75-1.0', desc: '稳定版本、大规模应用、文档完善' }
    ]
  },
  {
    key: 'innovation',
    label: '创新性',
    weight: 0.25,
    color: '#8B5CF6',
    description: '技术的原创性和前沿程度',
    criteria: [
      { range: '0.0-0.25', desc: '增量改进，无原创性突破' },
      { range: '0.25-0.50', desc: '有一定的技术创新' },
      { range: '0.50-0.75', desc: '显著创新，被引用较多' },
      { range: '0.75-1.0', desc: '开创性工作，引领方向' }
    ]
  },
  {
    key: 'adoption',
    label: '落地程度',
    weight: 0.25,
    color: '#10B981',
    description: '在实际产品/项目中的应用广度',
    criteria: [
      { range: '0.0-0.25', desc: '仅实验室测试' },
      { range: '0.25-0.50', desc: '小范围试点使用' },
      { range: '0.50-0.75', desc: '多个实际产品采用' },
      { range: '0.75-1.0', desc: '行业标准，大规模部署' }
    ]
  },
  {
    key: 'ecosystem',
    label: '生态活跃度',
    weight: 0.20,
    color: '#F59E0B',
    description: '社区贡献者数量、GitHub Star、更新频率',
    criteria: [
      { range: '0.0-0.25', desc: '无社区、很少更新' },
      { range: '0.25-0.50', desc: '小社区、低频更新' },
      { range: '0.50-0.75', desc: '中等社区、稳定维护' },
      { range: '0.75-1.0', desc: '活跃社区、高频更新、大量贡献者' }
    ]
  }
]

const maturityLevels = [
  {
    status: 'exploring',
    label: '探索期',
    emoji: '🔴',
    color: '#EF4444',
    range: '0.0 - 0.35',
    definition: '概念验证阶段，无成熟产品',
    characteristics: ['论文发表', '早期原型', '无商业落地']
  },
  {
    status: 'growing',
    label: '成长期',
    emoji: '🟡',
    color: '#F59E0B',
    range: '0.35 - 0.60',
    definition: '有原型实现，开始落地应用',
    characteristics: ['1-2 个开源项目', '少量实际使用', '早期采用者']
  },
  {
    status: 'mature',
    label: '成熟期',
    emoji: '🟢',
    color: '#10B981',
    range: '0.60 - 1.0',
    definition: '已有成熟产品，大规模应用',
    characteristics: ['多个成熟开源项目', '大规模实际应用', '稳定迭代']
  },
  {
    status: 'declining',
    label: '衰退期',
    emoji: '⚫',
    color: '#64748B',
    range: '维护减少',
    definition: '已过时或被新技术取代',
    characteristics: ['维护减少', '无新特性', '社区转移']
  }
]
</script>