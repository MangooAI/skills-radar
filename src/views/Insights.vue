<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-slate-900 mb-4">演进洞察</h1>
      <p class="text-slate-600 max-w-2xl mx-auto">
        各领域综合评分、技术演进时间线与成熟度评估模型
      </p>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="flex justify-center py-24">
      <div class="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"></div>
    </div>
    <!-- Error -->
    <div v-else-if="store.error" class="text-center py-24">
      <p class="text-slate-500 mb-2">数据加载失败</p>
      <p class="text-xs text-slate-400">{{ store.error }}</p>
    </div>

    <!-- ===== 各领域综合评分（融合卡片） ===== -->
    <div v-else class="mb-8">
      <div class="flex items-center gap-2.5 mb-5">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">各领域综合评分</h2>
      </div>

      <!-- 表格：各领域对比总览，点击行展开详情 -->
      <div class="card overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="table-header">
              <th class="px-4 py-3 text-left text-sm w-8"></th>
              <th class="px-4 py-3 text-left text-sm">技术领域</th>
              <th class="px-4 py-3 text-center text-sm">综合评分</th>
              <th class="px-4 py-3 text-center text-sm">技术成熟度</th>
              <th class="px-4 py-3 text-center text-sm">创新性</th>
              <th class="px-4 py-3 text-center text-sm">落地程度</th>
              <th class="px-4 py-3 text-center text-sm">生态活跃度</th>
              <th class="px-4 py-3 text-center text-sm">状态</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="summary in categorySummaries" :key="summary.id">
              <!-- 数据行 -->
              <tr class="table-row cursor-pointer hover:bg-teal-50/40 transition-colors" @click="toggleRow(summary.id)">
                <td class="px-4 py-3 text-center">
                  <svg class="w-4 h-4 text-slate-400 transition-transform inline-block" :class="expandedRow===summary.id?'rotate-90':''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <svg-icon :name="summary.id" class="w-5 h-5" :color="summary.color"/>
                    <span class="font-semibold text-slate-800 text-sm">{{ summary.label }}</span>
                    <span class="text-xs text-slate-400">{{ summary.label_en }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="text-base font-bold" :style="{color:summary.color}">{{ summary.overallScore.toFixed(2) }}</span>
                </td>
                <td class="px-4 py-3 text-center"><score-bar :score="summary.scores[0]"/></td>
                <td class="px-4 py-3 text-center"><score-bar :score="summary.scores[1]"/></td>
                <td class="px-4 py-3 text-center"><score-bar :score="summary.scores[2]"/></td>
                <td class="px-4 py-3 text-center"><score-bar :score="summary.scores[3]"/></td>
                <td class="px-4 py-3 text-center">
                  <span :class="getStatusBadgeClass(summary.maturityLevel)" class="text-xs">{{ summary.status }}</span>
                </td>
              </tr>
              <!-- 展开详情行 -->
              <tr v-if="expandedRow===summary.id">
                <td colspan="8" class="px-4 py-5 bg-slate-50/60">
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <!-- 概述 -->
                    <div>
                      <div class="flex items-center gap-1.5 mb-2">
                        <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="text-sm font-semibold text-slate-600">领域概述</span>
                      </div>
                      <p class="text-sm text-slate-600 leading-relaxed">{{ getCategoryDescription(summary.id) }}</p>
                    </div>
                    <!-- 核心目标 -->
                    <div class="p-4 rounded-xl" :style="{backgroundColor:summary.color+'0a',borderLeft:`3px solid ${summary.color}`}">
                      <div class="flex items-center gap-1.5 mb-2">
                        <svg class="w-4 h-4" :style="{color:summary.color}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        <span class="text-sm font-semibold" :style="{color:summary.color}">核心目标</span>
                      </div>
                      <p class="text-sm text-slate-700 leading-relaxed">{{ getCategoryCoreGoal(summary.id) }}</p>
                    </div>
                  </div>
                  <!-- 跳转链接 -->
                  <div class="mt-4 flex justify-start">
                    <button @click.stop="goToCategoryTech(summary.id)" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-teal-600 hover:bg-teal-50 transition-colors">
                      查看该领域技术
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Legend -->
    <div class="bg-slate-50 rounded-lg p-4 mb-12">
      <h3 class="font-medium text-slate-700 mb-2 text-sm">评分标准说明</h3>
      <div class="grid grid-cols-3 gap-2">
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500"></span><div><span class="font-medium text-slate-700 text-xs">成熟期</span><span class="text-slate-500 text-xs ml-1">> 0.6</span></div></div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500"></span><div><span class="font-medium text-slate-700 text-xs">成长期</span><span class="text-slate-500 text-xs ml-1">0.4 - 0.6</span></div></div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span><div><span class="font-medium text-slate-700 text-xs">探索期</span><span class="text-slate-500 text-xs ml-1">< 0.4</span></div></div>
      </div>
    </div>

    <!-- ===== Skill 技术演进时间线 ===== -->
    <div v-if="!store.loading && !store.error" class="card p-8">
      <div class="mb-8 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Skill 技术演进时间线</h2>
      </div>

      <!-- Overall Evolution -->
      <div class="relative">
        <div class="absolute left-3 top-[20px] w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 via-emerald-500 to-amber-500 rounded-full" style="height:calc(100% - 40px)"></div>
        <div class="space-y-6 ml-10">
          <div v-for="(event, idx) in overallTimelineEvents" :key="idx" class="flex items-start gap-5">
            <div class="relative flex-shrink-0 flex items-center">
              <div class="absolute left-[-22px] top-[20px] w-[22px] h-0.5 rounded-full" :style="{ backgroundColor: event.color + '60' }"></div>
              <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-md" :style="{ backgroundColor: event.color + '25', border: '3px solid ' + event.color }">
                <svg v-if="event.iconType==='rocket'" class="w-5 h-5" :style="{ color: event.color }" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.24 2 7.35 4.13 6 6c-2 2.67-2 6-2 9l4 5h8l4-5c0-3 0-6.33-2-9-1.35-1.87-3.24-4-6-4zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                <svg v-else-if="event.iconType==='star'" class="w-5 h-5" :style="{ color: event.color }" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span v-else class="text-xs font-bold" :style="{ color: event.color }">{{ event.year }}</span>
              </div>
            </div>
            <div class="flex-1 p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-base font-bold" :style="{ color: event.color }">{{ event.year }}</span>
                <span v-if="event.milestone" class="px-3 py-1.5 rounded-full text-xs font-medium" :style="{ backgroundColor: event.color + '15', color: event.color, border: '1px solid ' + event.color + '30' }">{{ event.milestone }}</span>
              </div>
              <h3 class="font-semibold text-slate-800 text-lg mb-2">{{ event.title }}</h3>
              <p class="text-sm text-slate-600 leading-relaxed">{{ event.description }}</p>
              <div v-if="event.technologies?.length" class="mt-4 flex flex-wrap gap-2">
                <span v-for="tech in event.technologies" :key="tech"
                  :class="hasTech(tech)?'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 cursor-pointer':'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed opacity-60'"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  @click="hasTech(tech)&&goToTechByName(tech)">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 pt-6 border-t border-slate-200 ml-10">
          <div class="flex items-center justify-between text-xs text-slate-500 max-w-2xl">
            <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-indigo-500"></div><span>2023 概念萌芽</span></div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-violet-500"></div><span>2024 技术验证</span></div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-emerald-500"></div><span>2025 工程落地</span></div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-amber-500"></div><span>2026 生态成熟</span></div>
          </div>
        </div>
      </div>

    </div>

    <!-- ===== 技术成熟度评估模型 ===== -->
    <div v-if="!store.loading && !store.error" class="card p-8 mt-8">
      <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">技术成熟度评估模型</h2>
      </div>

      <!-- Section Tabs -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button v-for="tab in maturityTabs" :key="tab.id" @click="activeMaturityTab=tab.id"
          :class="activeMaturityTab===tab.id?'bg-slate-900 text-white shadow-sm':'text-slate-600 hover:bg-slate-100'"
          class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all">{{ tab.label }}</button>
      </div>

      <!-- Evaluation Dimensions -->
      <div v-show="activeMaturityTab==='dimensions'" class="space-y-4">
        <p class="text-slate-600 mb-6">技术成熟度从四个维度综合评估：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="dim in maturityDimensions" :key="dim.key" class="p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ backgroundColor: dim.color+'20' }">
                  <svg class="w-5 h-5" :style="{ color: dim.color }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path v-if="dim.key==='maturity'" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else-if="dim.key==='innovation'" stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    <path v-else-if="dim.key==='adoption'" stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-800">{{ dim.label }}</h3>
              </div>
              <span class="px-3 py-1.5 rounded-full text-sm font-bold" :style="{ backgroundColor: dim.color+'15', color: dim.color }">{{ dim.weight*100 }}%</span>
            </div>
            <p class="text-sm text-slate-600 mb-4">{{ dim.description }}</p>
            <div class="space-y-2 pt-4 border-t border-slate-100">
              <div v-for="criteria in dim.criteria" :key="criteria.range" class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                <span class="text-xs font-medium text-slate-600 w-20">{{ criteria.range }}</span>
                <span class="text-xs text-slate-700">{{ criteria.desc }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span class="font-semibold text-indigo-700">综合评分计算公式</span>
          </div>
          <p class="text-sm text-indigo-600 font-medium">综合评分 = 技术成熟度 × 30% + 创新性 × 25% + 落地程度 × 25% + 生态活跃度 × 20%</p>
        </div>
      </div>

      <!-- Maturity Levels -->
      <div v-show="activeMaturityTab==='levels'" class="space-y-4">
        <p class="text-slate-600 mb-6">根据综合评分区间划分成熟度等级：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="level in maturityLevels" :key="level.status" class="p-5 rounded-xl border-2 transition-all hover:shadow-lg" :style="{ borderColor: level.color+'40', backgroundColor: level.color+'08' }">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center" :style="{ backgroundColor: level.color+'20' }">{{ level.emoji }}</div>
              <div><h3 class="font-bold text-slate-800">{{ level.label }}</h3><span class="text-sm text-slate-500">{{ level.range }}</span></div>
            </div>
            <p class="text-sm text-slate-700 font-medium mb-3">{{ level.definition }}</p>
            <div class="space-y-2"><span class="text-xs text-slate-500 font-medium">典型特征：</span>
              <ul class="text-xs text-slate-600 space-y-1.5">
                <li v-for="char in level.characteristics" :key="char" class="flex items-start gap-1.5"><span class="w-1 h-1 rounded-full mt-1.5" :style="{ backgroundColor: level.color }"></span><span>{{ char }}</span></li>
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
import SvgIcon from '../components/SvgIcon.vue'
import ScoreBar from '../components/ScoreBar.vue'

const router = useRouter()
const store = useRadarStore()
const activeMaturityTab = ref('dimensions')
const expandedRow = ref(null)
function toggleRow(id) { expandedRow.value = expandedRow.value === id ? null : id }

const maturityTabs = [{ id:'dimensions', label:'评估维度' }, { id:'levels', label:'成熟度等级' }]
// 各领域概述（来自原 CategoryDetail.vue）
function getCategoryDescription(id) {
  const m = {
    generation:'Skill 生成是 Skill 全生命周期的起点，是基于用户/场景的确定性任务需求，完成从需求拆解、逻辑定义、开发编码、标准化封装到合规校验的全流程工程化开发体系。',
    recall:'Skill 召回（也称 Skill 路由/Skill 调度）是智能体基于用户意图、上下文与场景特征，从 Skill 库中精准匹配最优 Skill/Skill 组合，完成从意图到执行的精准映射。',
    execution:'Skill 执行是 Skill 全生命周期的核心落地环节，是智能体按 Skill 定义的逻辑、规则、调度方案，完成全链路运行、状态管控、数据流转、异常处理与结果输出的全过程。',
    evaluation:'Skill 评测是贯穿 Skill 全生命周期的量化评估与质量定级体系，核心目标是构建可量化、可复现的多维度指标，以客观数据衡量 Skill 好不好用、稳不稳定、安不安全、有没有价值。',
    optimization:'Skill 优化是基于执行数据、评测结果与用户反馈的持续迭代优化闭环，核心目标是数据驱动、持续改进，解决性能衰减与场景适配不足，提升任务完成能力与生命周期价值。',
    management:'Skill 管理是面向大规模 Skill 库的全维度、标准化管控与运营体系，核心目标是实现规范化管控、精细化运营、生态化治理，解决版本混乱、重复开发、权限责任不清等问题。'
  }
  return m[id] || ''
}
// 各领域核心目标（来自原 CategoryDetail.vue）
function getCategoryCoreGoal(id) {
  const m = {
    generation:'构建高可用、高适配、低缺陷、可复用的标准化 Skill，实现 Skill "出生即高质量"',
    recall:'实现"需求-场景-Skill"最优匹配，避免错配、漏召、过召，保障执行准确率与体验',
    execution:'高效低延迟、稳定高可用、安全可管控，具备异常自愈与容错能力，确保确定性执行结果',
    evaluation:'构建可量化、可复现的多维度指标，以客观数据衡量 Skill 的效果、效率与安全性',
    optimization:'数据驱动、持续改进，解决性能衰减与场景适配不足，提升任务完成能力与生命周期价值',
    management:'规范化管控、精细化运营、生态化治理，保障生态健康有序可持续运转'
  }
  return m[id] || ''
}
const maturityDimensions = [
  { key:'maturity', label:'技术成熟度', weight:0.30, color:'#6366F1', description:'概念验证到大规模应用的演进程度', criteria:[{range:'0.0-0.25',desc:'仅论文或概念，无实现'},{range:'0.25-0.50',desc:'有原型，实验性使用'},{range:'0.50-0.75',desc:'成熟开源项目，实际应用案例'},{range:'0.75-1.0',desc:'稳定版本、大规模应用、文档完善'}] },
  { key:'innovation', label:'创新性', weight:0.25, color:'#8B5CF6', description:'技术的原创性和前沿程度', criteria:[{range:'0.0-0.25',desc:'增量改进，无原创性突破'},{range:'0.25-0.50',desc:'有一定的技术创新'},{range:'0.50-0.75',desc:'显著创新，被引用较多'},{range:'0.75-1.0',desc:'开创性工作，引领方向'}] },
  { key:'adoption', label:'落地程度', weight:0.25, color:'#10B981', description:'在实际产品/项目中的应用广度', criteria:[{range:'0.0-0.25',desc:'仅实验室测试'},{range:'0.25-0.50',desc:'小范围试点使用'},{range:'0.50-0.75',desc:'多个实际产品采用'},{range:'0.75-1.0',desc:'行业标准，大规模部署'}] },
  { key:'ecosystem', label:'生态活跃度', weight:0.20, color:'#F59E0B', description:'社区贡献者数量、GitHub Star、更新频率', criteria:[{range:'0.0-0.25',desc:'无社区、很少更新'},{range:'0.25-0.50',desc:'小社区、低频更新'},{range:'0.50-0.75',desc:'中等社区、稳定维护'},{range:'0.75-1.0',desc:'活跃社区、高频更新、大量贡献者'}] }
]
const maturityLevels = [
  { status:'exploring', label:'探索期', emoji:'🔴', color:'#EF4444', range:'0.0 - 0.35', definition:'概念验证阶段，无成熟产品', characteristics:['论文发表','早期原型','无商业落地'] },
  { status:'growing', label:'成长期', emoji:'🟡', color:'#F59E0B', range:'0.35 - 0.60', definition:'有原型实现，开始落地应用', characteristics:['1-2 个开源项目','少量实际使用','早期采用者'] },
  { status:'mature', label:'成熟期', emoji:'🟢', color:'#10B981', range:'0.60 - 1.0', definition:'已有成熟产品，大规模应用', characteristics:['多个成熟开源项目','大规模实际应用','稳定迭代'] },
  { status:'declining', label:'衰退期', emoji:'⚫', color:'#64748B', range:'维护减少', definition:'已过时或被新技术取代', characteristics:['维护减少','无新特性','社区转移'] }
]

// Overall timeline
const overallTimelineEvents = [
  { year:'2023', color:'#6366F1', iconType:'dot', title:'API 插件时代', description:'ChatGPT Plugins 发布开创 LLM 工具调用插件范式。需要服务代码、中心化审核，非技术人员难以封装复杂工作流。', milestone:'插件范式', technologies:['ChatGPT Plugins','OpenAPI Schema'] },
  { year:'2024', color:'#8B5CF6', iconType:'rocket', title:'MCP 协议时代', description:'Anthropic 发布 MCP 协议统一工具调用协议，解决 M×N 集成难题。支持本地运行和远程部署，去中心化审核。', milestone:'协议统一', technologies:['MCP Protocol'] },
  { year:'2025', color:'#10B981', iconType:'star', title:'Skill 时代', description:'Anthropic Claude Skills 发布开创第三代能力扩展。一句话生成 Skill，生态爆发式增长达 11.8 万个。自然语言定义 Skill，非技术人员可上手。', milestone:'生态爆发', technologies:['Skill-insight','SkillRouter','Skill Creator 2.0','Graph of Skills'] },
  { year:'2026', color:'#F59E0B', iconType:'rocket', title:'Skill 技术深化', description:'Skill 自进化研究火热，标准化进程加速。企业级 SkillForge 实现自主进化，Skill-insight 多维评测体系成熟。', milestone:'深化演进', technologies:['SKILLRL','Memento-Skills','SkillForge'] }
]

// Category timeline data removed — only overall timeline retained


onMounted(async () => {
  await store.fetchData()
})

// 各领域综合评分 — computed，数据变化时自动重算
const categorySummaries = computed(() => store.categories.map(cat => {
  const techs = cat.technologies || []
  if (!techs.length) return { id:cat.id, label:cat.label, color:cat.color, overallScore:0, scores:[0,0,0,0], maturityLevel:'exploring', status:'🔴 探索期' }
  const avgScores = [0,0,0,0].map((_,idx) => techs.map(t => t.scores?.[idx]||0).reduce((a,b)=>a+b,0)/techs.length)
  const weights = [0.30,0.25,0.25,0.20]
  const overallScore = avgScores.reduce((sum,s,i)=>sum+s*weights[i],0)
  let maturityLevel='exploring', status='🔴 探索期'
  if (overallScore>0.6){maturityLevel='mature';status='🟢 成熟期'} else if(overallScore>=0.4){maturityLevel='growing';status='🟡 成长期'}
  return { id:cat.id, label:cat.label, color:cat.color, overallScore, scores:avgScores, maturityLevel, status }
}))

function getStatusBadgeClass(level) {
  return { 'status-badge':true, 'status-mature':level==='mature', 'status-growing':level==='growing', 'status-exploring':level==='exploring' }
}

function hasTech(name) { return store.technologies.some(t => t.name === name) }
function goToTechByName(name) {
  const tech = store.technologies.find(t => t.name === name)
  if (tech) router.push({ path:'/', query:{ tech: tech.id, category: tech.categoryId } })
}
function goToCategoryTech(categoryId) { router.push({ path:'/', query:{ category: categoryId } })
}
</script>
