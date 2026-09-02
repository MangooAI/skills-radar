<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section — 左右结构：左边标题文字，右边统计 -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#04211F] via-[#062B28] to-[#0a3a36]">
      <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <!-- 装饰性光晕 -->
      <div class="absolute -top-20 -left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-10">
          <!-- 左侧：标题文字（颜色与 lockup-dark.svg 一致） -->
          <div class="text-center lg:text-left flex-shrink-0">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 text-[#9FF7EA] text-sm mb-6 border border-teal-400/20">
              <span class="animate-pulse w-2 h-2 rounded-full bg-[#3DE0CE]"></span>
              <span>实时追踪 · 自动更新</span>
            </div>
            <h1 class="text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-none" style="font-family:'Space Grotesk','Inter',system-ui,sans-serif">
              <span class="font-medium text-[#9FF7EA]">Skill</span><span class="font-bold text-[#3DE0CE] ml-1">Radar</span>
            </h1>
            <p class="text-base lg:text-lg text-[#83D9CE] max-w-xl tracking-wide">
              追踪 Skills 技术，让 Agent 能力进化有迹可循
            </p>
          </div>

          <!-- 右侧：统计数字卡片 -->
          <div class="flex items-center gap-3">
            <div class="group bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10 hover:bg-white/10 transition-all min-w-[96px]">
              <div class="text-3xl font-bold text-[#9FF7EA] group-hover:scale-105 transition-transform">{{ stats.total }}</div>
              <div class="text-xs text-slate-400 mt-1">已收录技术</div>
            </div>
            <div class="group bg-emerald-500/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-emerald-400/20 hover:bg-emerald-500/15 transition-all min-w-[96px]">
              <div class="text-3xl font-bold text-emerald-300 group-hover:scale-105 transition-transform">{{ stats.mature }}</div>
              <div class="text-xs text-emerald-300/70 mt-1">成熟期</div>
            </div>
            <div class="group bg-amber-500/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-amber-400/20 hover:bg-amber-500/15 transition-all min-w-[96px]">
              <div class="text-3xl font-bold text-amber-300 group-hover:scale-105 transition-transform">{{ stats.growing }}</div>
              <div class="text-xs text-amber-300/70 mt-1">成长期</div>
            </div>
            <div class="group bg-red-500/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-red-400/20 hover:bg-red-500/15 transition-all min-w-[96px]">
              <div class="text-3xl font-bold text-red-300 group-hover:scale-105 transition-transform">{{ stats.exploring }}</div>
              <div class="text-xs text-red-300/70 mt-1">探索期</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 雷达图 Section -->
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
          <TechRadarChart :categories="categories" :technologies="technologies" @tech-click="openDrawerByRadarId"/>

          <!-- Legend -->
          <div class="flex justify-center gap-6 flex-wrap mt-8">
            <div v-for="cat in categories" :key="cat.id"
              class="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              @click="filterCategory=cat.id; scrollToTechList()">
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: cat.color }"></span>
              <span class="text-sm font-medium text-slate-700">{{ cat.label }}</span>
              <span class="text-xs text-slate-500">{{ cat.technologies?.length || 0 }}</span>
            </div>
          </div>

          <!-- Maturity Legend -->
          <div class="flex justify-center gap-8 mt-6 pt-6 border-t border-slate-200">
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500"></span><span class="text-sm text-slate-600">成熟期 > 0.6</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500"></span><span class="text-sm text-slate-600">成长期 0.4 - 0.6</span></div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span><span class="text-sm text-slate-600">探索期 < 0.4</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术全景流程 Section -->
    <section class="py-16 bg-gradient-to-b from-slate-100 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">技术全景流程</h2>
          <p class="text-slate-600 max-w-xl mx-auto">Skill 生命周期六阶段演进路径，点击各阶段筛选对应技术</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="cat in flowCategories" :key="cat.id" class="group relative cursor-pointer" @click="filterCategory=cat.id; scrollToTechList()">
            <div class="relative mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl" :style="{ backgroundColor: cat.color }">
              <svg-icon :name="cat.id" class="w-8 h-8" color="#fff"/>
            </div>
            <div class="mt-4 text-center">
              <h3 class="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">{{ cat.label }}</h3>
              <p class="text-xs text-slate-500 mt-1">{{ cat.label_en }}</p>
              <div class="mt-2 flex items-center justify-center gap-1">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: cat.maturityColor }"></span>
                <span class="text-xs" :style="{ color: cat.maturityColor }">{{ cat.status }}</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">{{ cat.technologies?.length || 0 }} 项技术</p>
            </div>
          </div>
        </div>

        <!-- 评分维度说明已移至页面底部 -->
      </div>
    </section>

    <!-- Tech List Section -->
    <section id="tech-list" class="scroll-mt-20 bg-slate-50">
      <!-- Filter Panel — 大而美观的筛选面板 -->
      <div class="sticky top-20 z-20 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <!-- 第一行：技术领域筛选 -->
          <div class="flex items-center gap-2.5 flex-wrap mb-3">
            <button @click="filterCategory='all'"
              :class="filterCategory==='all'?'bg-slate-900 text-white shadow-md':'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'"
              class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              全部 <span class="ml-0.5 opacity-70">{{ stats.total }}</span>
            </button>
            <button v-for="cat in categories" :key="cat.id" @click="filterCategory=cat.id"
              :class="filterCategory===cat.id?'shadow-md':'border hover:opacity-90'"
              :style="filterCategory===cat.id?{backgroundColor:cat.color,color:'#fff',borderColor:cat.color}:{backgroundColor:cat.color+'08',color:cat.color,borderColor:cat.color+'30'}"
              class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2">
              <svg-icon :name="cat.id" class="w-4 h-4" :color="filterCategory===cat.id?'#fff':cat.color"/>
              {{ cat.label }} <span class="ml-0.5 opacity-70">{{ cat.technologies?.length || 0 }}</span>
            </button>
          </div>

          <!-- 第二行：成熟度 + 排序 + 视图切换 -->
          <div class="flex items-center gap-2.5 flex-wrap">
            <button @click="filterMaturity='all'" :class="filterMaturity==='all'?'bg-slate-800 text-white shadow-sm':'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'" class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all">成熟度</button>
            <button @click="filterMaturity='mature'" :class="filterMaturity==='mature'?'bg-emerald-600 text-white shadow-sm':'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'" class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all">🟢 成熟期</button>
            <button @click="filterMaturity='growing'" :class="filterMaturity==='growing'?'bg-amber-600 text-white shadow-sm':'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'" class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all">🟡 成长期</button>
            <button @click="filterMaturity='exploring'" :class="filterMaturity==='exploring'?'bg-red-600 text-white shadow-sm':'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'" class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all">🔴 探索期</button>

            <div class="w-px h-6 bg-slate-200 mx-1"></div>

            <!-- 视图切换 + 综合评分排序 — 推到最右 -->
            <div class="ml-auto flex items-center gap-2.5">
            <div class="flex items-center bg-slate-100 rounded-xl p-1">
              <button @click="viewMode='card'" :class="viewMode==='card'?'bg-white shadow-sm text-slate-900':'text-slate-500'" class="p-2 rounded-lg transition-all" title="卡片视图">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </button>
              <button @click="viewMode='list'" :class="viewMode==='list'?'bg-white shadow-sm text-slate-900':'text-slate-500'" class="p-2 rounded-lg transition-all" title="列表视图">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>

            <!-- 综合评分排序 — 最右边 -->
            <select v-model="sortBy" class="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-teal-400 cursor-pointer">
              <option value="overall-desc">综合评分 ↓</option>
              <option value="overall-asc">综合评分 ↑</option>
              <option value="maturity-desc">成熟度 ↓</option>
              <option value="innovation-desc">创新性 ↓</option>
              <option value="adoption-desc">落地程度 ↓</option>
              <option value="ecosystem-desc">生态活跃 ↓</option>
              <option value="name-asc">名称排序</option>
            </select>
            </div>
          </div>

          <!-- Results count -->
          <div class="mt-3 text-xs text-slate-500">共 {{ filteredTechs.length }} 项技术</div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-16">
          <div class="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"></div>
        </div>
        <!-- Empty -->
        <div v-else-if="filteredTechs.length===0" class="flex flex-col items-center justify-center py-16">
          <svg class="w-12 h-12 text-slate-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p class="text-slate-500">没有找到匹配的技术</p>
          <button @click="filterCategory='all';filterMaturity='all'" class="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium">重置筛选</button>
        </div>

        <!-- Card View — 更美观的卡片 -->
        <div v-else-if="viewMode==='card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="tech in filteredTechs" :key="tech.id" @click="openDrawer(tech)"
            class="group bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:border-teal-300/50 transition-all cursor-pointer overflow-hidden">
            <!-- Top color accent bar -->
            <div class="h-1.5 rounded-t-2xl" :style="{backgroundColor:getCategoryColor(tech.categoryId)}"></div>

            <div class="p-5">
              <!-- Name + badge -->
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-bold text-slate-900 text-base group-hover:text-teal-600 transition-colors leading-snug">{{ tech.name }}</h3>
                <span :class="getMaturityBadgeClass(getOverallScore(tech))" class="flex-shrink-0 ml-2 text-xs">{{ getMaturityEmoji(getOverallScore(tech)) }} {{ getMaturityLabel(getOverallScore(tech)) }}</span>
              </div>

              <!-- Category tag -->
              <div class="flex items-center gap-1.5 mb-3">
                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium" :style="{backgroundColor:getCategoryColor(tech.categoryId)+'12',color:getCategoryColor(tech.categoryId)}">
                  <svg-icon :name="tech.categoryId" class="w-3.5 h-3.5" :color="getCategoryColor(tech.categoryId)"/>
                  {{ getCategoryShortLabel(tech.categoryId) }}
                </span>
                <span :class="tech.status==='active'?'bg-emerald-50 text-emerald-600 border-emerald-200':'bg-purple-50 text-purple-600 border-purple-200'" class="px-2 py-1 rounded-lg text-xs font-medium border">{{ tech.status==='active'?'活跃':'研究' }}</span>
              </div>

              <!-- Description -->
              <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">{{ tech.description }}</p>

              <!-- Overall score -->
              <div class="flex items-center gap-3 mb-3">
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-2 rounded-full transition-all duration-300" :style="{width:(getOverallScore(tech)*100)+'%',backgroundColor:getCategoryColor(tech.categoryId)}"></div>
                </div>
                <span class="text-base font-bold" :style="{color:getCategoryColor(tech.categoryId)}">{{ getOverallScore(tech).toFixed(2) }}</span>
              </div>

              <!-- Dimension bars — 等宽对齐 -->
              <div class="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100">
                <div v-for="(dim,idx) in dimensionLabels" :key="dim.key" class="flex flex-col items-center">
                  <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div class="h-1.5 rounded-full" :style="{width:((tech.scores?.[idx]||0)*100)+'%',backgroundColor:dim.barColor}"></div>
                  </div>
                  <div class="w-full flex items-center justify-between mt-1.5">
                    <span class="text-[11px] text-slate-500">{{ dim.short }}</span>
                    <span class="text-[11px] font-semibold text-slate-700">{{ (tech.scores?.[idx]||0).toFixed(1) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table class="w-full">
            <thead><tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 w-8">#</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">技术名称</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">描述</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">领域</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">成熟度</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">创新性</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">落地</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">生态</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">综合</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600">状态</th>
            </tr></thead>
            <tbody>
              <tr v-for="(tech,idx) in filteredTechs" :key="tech.id" class="border-b border-slate-100 hover:bg-teal-50/30 cursor-pointer transition-colors" @click="openDrawer(tech)">
                <td class="px-4 py-2.5 text-xs text-slate-400">{{ idx+1 }}</td>
                <td class="px-4 py-2.5"><span class="font-semibold text-slate-800 hover:text-teal-600 transition-colors">{{ tech.name }}</span></td>
                <td class="px-4 py-2.5 text-sm text-slate-600 max-w-xs truncate">{{ tech.description }}</td>
                <td class="px-4 py-2.5 text-center"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium" :style="{backgroundColor:getCategoryColor(tech.categoryId)+'15',color:getCategoryColor(tech.categoryId)}">{{ getCategoryShortLabel(tech.categoryId) }}</span></td>
                <td class="px-4 py-2.5 text-center text-sm text-slate-700">{{ tech.scores?.[0]?.toFixed(2) }}</td>
                <td class="px-4 py-2.5 text-center text-sm text-slate-700">{{ tech.scores?.[1]?.toFixed(2) }}</td>
                <td class="px-4 py-2.5 text-center text-sm text-slate-700">{{ tech.scores?.[2]?.toFixed(2) }}</td>
                <td class="px-4 py-2.5 text-center text-sm text-slate-700">{{ tech.scores?.[3]?.toFixed(2) }}</td>
                <td class="px-4 py-2.5 text-center"><span class="font-bold text-sm" :style="{color:getCategoryColor(tech.categoryId)}">{{ getOverallScore(tech).toFixed(2) }}</span></td>
                <td class="px-4 py-2.5 text-center"><span :class="getMaturityBadgeClass(getOverallScore(tech))">{{ getMaturityEmoji(getOverallScore(tech)) }} {{ getMaturityLabel(getOverallScore(tech)) }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Tech Detail Drawer -->
    <div v-if="drawerOpen" class="drawer-overlay" @click="closeDrawer"></div>
    <div :class="drawerOpen?'translate-x-0':'translate-x-full'" class="drawer-panel w-full sm:w-[560px] lg:w-[640px]">
      <div class="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3 min-w-0" v-if="drawerTech">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" :style="{backgroundColor:getCategoryColor(drawerTech.categoryId)+'15'}">
            <svg-icon :name="drawerTech.categoryId" class="w-5 h-5" :color="getCategoryColor(drawerTech.categoryId)"/>
          </div>
          <div class="min-w-0"><h2 class="font-bold text-slate-900 text-lg truncate">{{ drawerTech.name }}</h2><p class="text-xs text-slate-500">{{ getCategoryLabel(drawerTech.categoryId) }} · {{ getCategoryLabelEn(drawerTech.categoryId) }}</p></div>
        </div>
        <button @click="closeDrawer" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors flex-shrink-0">
          <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div v-if="drawerTech" class="drawer-scroll overflow-y-auto px-6 py-5" style="height:calc(100vh - 65px)">
        <!-- Score & Maturity — 更醒目的头部 -->
        <div class="flex items-center gap-4 mb-6 p-5 rounded-2xl" :style="{background:`linear-gradient(135deg,${getCategoryColor(drawerTech.categoryId)}15,${getCategoryColor(drawerTech.categoryId)}05)`}">
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold" :style="{color:getCategoryColor(drawerTech.categoryId)}">{{ getOverallScore(drawerTech).toFixed(2) }}</span>
            <span class="px-2.5 py-1 rounded-full text-sm font-medium" :style="{backgroundColor:getMaturityColor(getOverallScore(drawerTech))+'20',color:getMaturityColor(getOverallScore(drawerTech))}">{{ getMaturityEmoji(getOverallScore(drawerTech)) }} {{ getMaturityLabel(getOverallScore(drawerTech)) }}</span>
          </div>
          <span :class="drawerTech.status==='active'?'bg-emerald-100 text-emerald-700':'bg-purple-100 text-purple-700'" class="px-2.5 py-1 rounded-md text-xs font-medium">{{ drawerTech.status==='active'?'活跃':'研究' }}</span>
        </div>
        <p class="text-slate-700 leading-relaxed text-base mb-5">{{ drawerTech.description }}</p>

        <!-- 加载中 / 无详细文档占位 -->
        <div v-if="drawerLoading" class="mb-5 flex justify-center py-8">
          <div class="w-8 h-8 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"></div>
        </div>
        <div v-else-if="!drawerContent" class="mb-5 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <svg class="w-8 h-8 text-slate-300 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <p class="text-sm text-slate-500">该技术暂无详细文档</p>
        </div>

        <!-- Drawer sections — 更醒目的标题 -->
        <div v-if="drawerContent?.summary" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><svg class="w-4 h-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">一句话描述</h3></div>
          <p class="text-slate-700 leading-relaxed" v-html="parseInlineMarkdown(drawerContent.summary)"></p>
          <img v-if="drawerContent?.summaryImage" :src="imagePath(drawerContent.summaryImage)" :alt="drawerTech.name+' overview'" class="w-full rounded-xl shadow-lg mt-3 cursor-zoom-in hover:opacity-90 transition-opacity" @click="openEnlargedImage(drawerContent.summaryImage)"/>
        </div>

        <div v-if="drawerContent?.principles?.length||drawerContent?.coreImplementationHtml" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center"><svg class="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.95-.083-1.85-.548-2.547l-.707-.707z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">核心实现</h3></div>
          <div v-if="drawerContent?.coreImplementationHtml" class="core-implementation-content" v-html="drawerContent.coreImplementationHtml" @click="handleContentClick"></div>
          <div v-else class="space-y-3">
            <div v-for="(principle,idx) in drawerContent.principles" :key="idx" class="p-4 rounded-xl border border-slate-200 hover:border-violet-200 transition-all">
              <div class="flex items-start gap-3"><div class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" :style="{backgroundColor:getCategoryColor(drawerTech.categoryId)+'15',color:getCategoryColor(drawerTech.categoryId)}">{{ idx+1 }}</div><div class="flex-1"><h4 class="font-semibold text-slate-800 text-sm mb-1">{{ principle.title }}</h4><p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line" v-html="parseInlineMarkdown(principle.desc)"></p></div></div>
            </div>
            <div v-if="drawerContent?.images?.length" class="space-y-3"><img v-for="img in drawerContent.images" :key="img.filename" :src="imagePath(img.filename)" :alt="img.alt" class="w-full rounded-xl shadow-lg cursor-zoom-in hover:opacity-90 transition-opacity" @click="openEnlargedImage(img.filename)"/></div>
          </div>
        </div>

        <div v-if="drawerContent?.innovations?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><svg class="w-4 h-4 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">核心创新</h3></div>
          <div class="grid grid-cols-1 gap-2">
            <div v-for="(innovation,idx) in drawerContent.innovations" :key="idx" class="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-50/50 border border-cyan-100"><div class="w-5 h-5 rounded-full flex items-center justify-center bg-cyan-500 flex-shrink-0 mt-0.5"><svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></div><div><span class="font-semibold text-slate-800 text-sm">{{ innovation.title }}</span><p class="text-sm text-slate-600 mt-0.5" v-html="parseInlineMarkdown(innovation.desc)"></p></div></div>
          </div>
        </div>

        <div v-if="drawerContent?.capabilities?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">主要能力</h3></div>
          <div class="grid grid-cols-1 gap-2">
            <div v-for="(capability,idx) in drawerContent.capabilities" :key="idx" class="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"><div class="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500 flex-shrink-0"><svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm font-medium text-slate-700" v-html="parseInlineMarkdown(capability)"></span></div>
          </div>
        </div>

        <div v-if="drawerContent?.scenarios?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div><h3 class="font-bold text-slate-900 text-lg">适用场景</h3></div>
          <div class="grid grid-cols-1 gap-2">
            <div v-for="(scenario,idx) in drawerContent.scenarios" :key="idx" class="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-100"><div class="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold flex-shrink-0">{{ idx+1 }}</div><span class="text-sm font-medium text-slate-700" v-html="parseInlineMarkdown(scenario)"></span></div>
          </div>
        </div>

        <div v-if="drawerContent?.limitations?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><svg class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">局限性</h3></div>
          <div class="space-y-2">
            <div v-for="(limitation,idx) in drawerContent.limitations" :key="idx" class="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/50 border border-amber-100"><svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm text-slate-700 leading-relaxed" v-html="parseInlineMarkdown(limitation)"></span></div>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></div><h3 class="font-bold text-slate-900 text-lg">成熟度评分</h3></div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="(dim,idx) in dimensionLabels" :key="dim.key" class="p-3 rounded-xl bg-slate-50">
              <div class="flex items-center justify-between mb-2"><span class="font-medium text-slate-700 text-sm">{{ dim.label }}</span><span class="text-base font-bold text-slate-900">{{ drawerTech.scores?.[idx]?.toFixed(2)||'0.00' }}</span></div>
              <div class="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden"><div class="h-2.5 rounded-full transition-all" :style="{width:((drawerTech.scores?.[idx]||0)*100)+'%',backgroundColor:getCategoryColor(drawerTech.categoryId)}"></div></div>
              <p class="text-xs text-slate-500 mt-1">权重 {{ dim.weight*100 }}%</p>
            </div>
          </div>
        </div>

        <div v-if="drawerContent?.references?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200"><div class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><svg class="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div><h3 class="font-bold text-slate-900 text-lg">参考资料</h3></div>
          <div class="space-y-2">
            <a v-for="ref in drawerContent.references" :key="ref.url" :href="ref.url" target="_blank" class="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 transition-all">
              <svg class="w-4 h-4 text-slate-500 group-hover:text-teal-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              <span class="font-medium text-slate-800 group-hover:text-teal-600 transition-colors text-sm">{{ ref.label }}</span>
              <svg class="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
        <div class="h-8"></div>
      </div>
    </div>

    <!-- 评分维度说明 — 放在页面最后面 -->
    <section class="py-12 bg-white border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">评分维度说明</h2>
          <p class="text-sm text-slate-500">四大维度加权计算综合评分</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          <div v-for="dim in dimensionLabels" :key="dim.key" class="p-5 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow" :style="{borderColor:dim.barColor+'30'}">
            <div class="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" :style="{ backgroundColor: dim.barColor + '15' }">
              <span class="text-base font-bold" :style="{ color: dim.barColor }">{{ dim.weight * 100 }}%</span>
            </div>
            <h4 class="font-semibold text-slate-800">{{ dim.label }}</h4>
            <p class="text-xs text-slate-500 mt-1">{{ dim.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 友情链接 — 与评分维度同级 -->
    <section class="py-12 bg-slate-50 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">友情链接</h2>
          <p class="text-sm text-slate-500">相关项目与生态</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <!-- Agent Insight -->
          <a href="https://atomgit.com/openeuler/agent-insight" target="_blank"
            class="group flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all">
            <img :src="agentInsightLogoPath" alt="Agent Insight" class="h-9 w-auto"/>
          </a>
          <!-- AET -->
          <a href="https://atomgit.com/leon-wang2021/aet" target="_blank"
            class="group flex items-center px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all">
            <span class="font-bold text-slate-700 group-hover:text-teal-600 transition-colors text-lg">AET</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Image enlargement modal -->
    <div v-if="enlargedImage" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out" @click="closeEnlargedImage">
      <img :src="enlargedImage" class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"/>
      <button class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors" @click="closeEnlargedImage">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRadarStore } from '../stores/radar'
import { marked } from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import SvgIcon from '../components/SvgIcon.vue'
import TechRadarChart from '../components/TechRadarChart.vue'
import { DIMENSIONS, getMaturityLevel, MATURITY_META } from '../constants/maturity'

const store = useRadarStore()
const route = useRoute()
const basePath = import.meta.env.DEV ? '' : '/skills-radar'
const agentInsightLogoPath = `${basePath}/agent-insight-logo.svg`
const loading = computed(() => store.loading)
const categories = computed(() => store.categories)
const technologies = computed(() => store.technologies)
const stats = computed(() => store.stats)

const viewMode = ref('card')
const filterCategory = ref('all')
const filterMaturity = ref('all')
const sortBy = ref('overall-desc')
const drawerOpen = ref(false)
const drawerTech = ref(null)
const drawerContent = ref(null)
const drawerLoading = ref(false)
let closeTimer = null  // 抽屉关闭定时器，打开新抽屉时取消，避免竞态
const enlargedImage = ref(null)

// 评分维度（来自单一数据源 constants/maturity.js）
const dimensionLabels = DIMENSIONS

const flowCategories = computed(() => {
  return store.categories.map(cat => {
    const techs = cat.technologies || []
    const score = techs.length ? techs.map(t=>getOverallScore(t)).reduce((a,b)=>a+b,0)/techs.length : 0
    let maturityColor='#EF4444',status='探索期'
    if(score>0.6){maturityColor='#10B981';status='成熟期'} else if(score>=0.4){maturityColor='#F59E0B';status='成长期'}
    return {...cat,maturityColor,status}
  })
})

const filteredTechs = computed(() => {
  let techs = [...technologies.value]
  if(filterCategory.value!=='all') techs=techs.filter(t=>t.categoryId===filterCategory.value)
  if(filterMaturity.value!=='all'){techs=techs.filter(t=>{const s=getOverallScore(t);if(filterMaturity.value==='mature')return s>0.6;if(filterMaturity.value==='growing')return s>=0.4&&s<=0.6;if(filterMaturity.value==='exploring')return s<0.4;return true})}
  const k=sortBy.value
  if(k==='overall-desc')techs.sort((a,b)=>getOverallScore(b)-getOverallScore(a))
  else if(k==='overall-asc')techs.sort((a,b)=>getOverallScore(a)-getOverallScore(b))
  else if(k==='maturity-desc')techs.sort((a,b)=>(b.scores?.[0]||0)-(a.scores?.[0]||0))
  else if(k==='innovation-desc')techs.sort((a,b)=>(b.scores?.[1]||0)-(a.scores?.[1]||0))
  else if(k==='adoption-desc')techs.sort((a,b)=>(b.scores?.[2]||0)-(a.scores?.[2]||0))
  else if(k==='ecosystem-desc')techs.sort((a,b)=>(b.scores?.[3]||0)-(a.scores?.[3]||0))
  else if(k==='name-asc')techs.sort((a,b)=>a.name.localeCompare(b.name))
  return techs
})

function scrollToTechList(){const el=document.getElementById('tech-list');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}

function getOverallScore(tech){return store.getOverallScore(tech)}
function getMaturityLabel(s){return MATURITY_META[getMaturityLevel(s)].label}
function getMaturityEmoji(s){return MATURITY_META[getMaturityLevel(s)].emoji}
function getMaturityColor(s){return MATURITY_META[getMaturityLevel(s)].color}
function getMaturityBadgeClass(s){const m=MATURITY_META[getMaturityLevel(s)];return{'status-badge':true,[m.badgeClass]:true}}
function getCategoryColor(id){return store.getCategoryById(id)?.color||'#64748B'}
function getCategoryLabel(id){return store.getCategoryById(id)?.label||''}
function getCategoryLabelEn(id){return store.getCategoryById(id)?.label_en||''}
function getCategoryShortLabel(id){return{generation:'生成',recall:'召回',execution:'执行',evaluation:'评测',optimization:'优化',management:'管理'}[id]||''}

async function openDrawer(tech){
  // 取消挂起的关闭定时器，避免关闭回调把新抽屉数据清空
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  drawerTech.value = tech
  drawerContent.value = null
  drawerLoading.value = true
  drawerOpen.value = true
  drawerContent.value = await fetchTechDoc(tech.id)
  drawerLoading.value = false
}
function openDrawerByRadarId(id){const tech=store.getTechById(id);if(tech)openDrawer(tech)}
function closeDrawer(){
  drawerOpen.value = false
  closeTimer = setTimeout(() => { drawerTech.value = null; drawerContent.value = null; closeTimer = null }, 300)
}

function renderLatexInHtml(html){if(!html)return'';html=html.replace(/\$\$([^$]+)\$\$/g,(m,f)=>{try{let d=f.trim().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');return katex.renderToString(d,{displayMode:true,throwOnError:false,output:'html'})}catch(e){return m}});html=html.replace(/\$([^$\n]+?)\$/g,(m,f)=>{try{let d=f.trim().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');return katex.renderToString(d,{displayMode:false,throwOnError:false,output:'html'})}catch(e){return m}});return html}
function renderLatex(text){if(!text)return'';text=text.replace(/\$\$([^$]+)\$\$/g,(m,f)=>{try{return katex.renderToString(f.trim(),{displayMode:true,throwOnError:false,output:'html'})}catch(e){return m}});text=text.replace(/\$([^$\n]+?)\$/g,(m,f)=>{try{return katex.renderToString(f.trim(),{displayMode:false,throwOnError:false,output:'html'})}catch(e){return m}});return text}
function parseInlineMarkdown(text){if(!text)return'';text=renderLatex(text);const lexer=new marked.Lexer();const tokens=lexer.inlineTokens(text);const parser=new marked.Parser();return parser.parseInline(tokens)}
function imagePath(fn){const bp=import.meta.env.DEV?'':'/skills-radar';return`${bp}/docs/radar/images/${fn}`}
function openEnlargedImage(fn){enlargedImage.value=imagePath(fn)}
function closeEnlargedImage(){enlargedImage.value=null}
function handleContentClick(e){if(e.target.tagName==='IMG'){const m=e.target.getAttribute('src').match(/\/docs\/radar\/images\/(.+)$/);if(m)openEnlargedImage(m[1])}}

const techDocMapping={'trace2skill':'tech-trace2skill','d2skill':'tech-d2skill','skillx':'tech-skillx','memento':'tech-memento-skills','skillrl':'tech-skillrl','skillsynth':'tech-skillsynth','adareasoner':'tech-adareasoner','skillgen':'tech-skillgen','skill-router':'tech-skillrouter','skillorchestra':'tech-skillorchestra','graph-of-skills':'tech-graph-of-skills','agentskillos':'tech-agentskillos','skillnet':'tech-skillnet','grasp':'tech-grasp','ssl':'tech-ssl','goskills':'tech-goskills','skillgraph':'tech-skillgraph','skillrae':'tech-skillrae','progressive-disclosure':'tech-progressive-disclosure','skvm':'tech-skvm','fileasstate':'tech-fileasstate','skill-insight':'tech-skillinsight','skillsbench':'tech-skillsbench','skillprobe':'tech-skillprobe','agent-skills-eval':'tech-agent-skills-eval','skillflow':'tech-skillflow','skill-insight-optimizer':'tech-skillinsight-optimizer','skillforge':'tech-skillforge','skill-reducer':'tech-skillreducer','dual-mcts':'tech-mcts','skillclaw':'tech-skillclaw','skillos':'tech-skillos','slim':'tech-slim','skillevolver':'tech-skillevolver','embodiskill':'tech-embodiskill','autoskill':'tech-autoskill','skillopt':'tech-skillopt','muse-autoskill':'tech-muse-autoskill','skilllens':'tech-skilllens','skillsvote':'tech-skillsvote','darwin-skill':'tech-darwin-skill','skill-rag':'tech-skill-rag','codeskill':'tech-codeskill','reskill':'tech-reskill','skilldag':'tech-skilldag','skillpyramid':'tech-skillpyramid','skill1':'tech-skill1','sap':'tech-sap','skillsinjector':'tech-skillsinjector','optskills':'tech-optskills','mindskill':'tech-mindskill','skillmaster':'tech-skillmaster','skillbrew':'tech-skillbrew','skillmas':'tech-skillmas','skillgrad':'tech-skillgrad','skillc':'tech-skillc','hisme':'tech-hisme','skill0.5':'tech-skill0.5','skillsmith':'tech-skillsmith','skillsafetybench':'tech-skillsafetybench','skillgenbench':'tech-skillgenbench','skillevolbench':'tech-skillevolbench','r3-skill':'tech-r3-skill','skill-ee':'tech-skill-ee','xskill':'tech-xskill','skillcomposer':'tech-skillcomposer','anything2skill':'tech-anything2skill','colleague-skill':'tech-colleague-skill','mmg2skill':'tech-mmg2skill','sapo':'tech-sapo','evods':'tech-evods','w2s':'tech-w2s','aip':'tech-aip','notes2skills':'tech-notes2skills','skilljuror':'tech-skilljuror','skillpager':'tech-skillpager','skillaxe':'tech-skillaxe','selskill':'tech-selskill','masa':'tech-masa','skilladaptor':'tech-skilladaptor','federatedskill':'tech-federatedskill','openskill':'tech-openskill','skillhone':'tech-skillhone','skillreact':'tech-skillreact','skillguard':'tech-skillguard','malskillbench':'tech-malskillbench','rsa':'tech-rsa','skill-rm':'tech-skill-rm','eval-skill':'tech-eval-skill','openclaw-skill':'tech-openclaw-skill','skillchain':'tech-skillchain','skillaudit':'tech-skillaudit','skillcat':'tech-skillcat','scr':'tech-scr','skillvetbench':'tech-skillvetbench','visualskill':'tech-visualskill','skillweaver':'tech-skillweaver','skillaudit-assessment':'tech-skillaudit-assessment','skill-coverage':'tech-skill-coverage','tessl-skill-evaluation':'tech-tessl-skill-evaluation','skill-mas-opt':'tech-skill-mas','skillwiki':'tech-skillwiki','locate-and-judge':'tech-locate-and-judge','skillspector':'tech-skillspector','ucob':'tech-ucob','skill-collision':'tech-skill-collision','skill-composer':'tech-skill-composer','skillfuzz':'tech-skillfuzz','skillcoach':'tech-skillcoach','metaskill-evolve':'tech-metaskill-evolve','resource2skill':'tech-resource2skill','skillfab':'tech-skillfab','skillcenter':'tech-skillcenter','skillreranker':'tech-skillreranker','geis':'tech-geis','skillsight':'tech-skillsight','openskillrisk':'tech-openskillrisk','skillsect-eval':'tech-skillsect-eval','msce':'tech-msce','spyce':'tech-spyce','skillcorpus':'tech-skillcorpus','skill-kd':'tech-skill-kd','sigil':'tech-sigil','sigleak':'tech-sigleak','skillgate':'tech-skillgate','flowevo':'tech-flowevo','skillrise':'tech-skillrise','skill-sp':'tech-skill-sp','veriskill':'tech-veriskill','killer':'tech-killer','search2skill':'tech-search2skill','caskg':'tech-caskg','emotion2skill':'tech-emotion2skill','hierarchicalskillretrieval':'tech-hierarchicalskillretrieval','optimalskillselection':'tech-optimalskillselection','skillgate2':'tech-skillgate2','skillreason':'tech-skillreason','skilltrace':'tech-skilltrace','skt':'tech-skt','agenticcontinuouseval':'tech-agenticcontinuouseval','continualskillbench':'tech-continualskillbench','maliciousskillbench':'tech-maliciousskillbench','skillconsist':'tech-skillconsist','skilleval':'tech-skilleval','skillsafety':'tech-skillsafety','skillsmetric':'tech-skillsmetric','skillsreusable':'tech-skillsreusable','skilltvbench':'tech-skilltvbench','branch2skill':'tech-branch2skill','skillforge2':'tech-skillforge2','skillhex':'tech-skillhex','skillprox':'tech-skillprox','surrogateskill':'tech-surrogateskill','trace':'tech-trace','wikiskill':'tech-wikiskill','skillaligner':'tech-skillaligner','skillsentry':'tech-skillsentry','colluskill':'tech-colluskill','evoskillinjection':'tech-evoskillinjection','skilljack':'tech-skilljack','skillshield':'tech-skillshield','skillzip':'tech-skillzip'}

function parseMarkdownContent(md){
  const c={summary:'',summaryImage:'',principles:[],coreImplementationHtml:'',images:[],innovations:[],capabilities:[],scenarios:[],limitations:[],references:[]}
  if(!md)return c
  const n=md.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
  const ss=n.match(/## 一句话描述\s*\n([\s\S]*?)(?=\n---|\n## )/)
  if(ss){let t='';ss[1].trim().split('\n').forEach(l=>{const im=l.match(/!\[.*\]\(images\/(.+_overview\.png)\)/);if(im){c.summaryImage=im[1];return}if(l.match(/!\[.*\]\(images\/.*\.png\)/&&!l.includes('_overview')))return;if(l.startsWith('**来源**:')||l.startsWith('**链接**:')||l.startsWith('- ')||l.trim()==='')return;t+=l.trim()+' '});c.summary=t.trim()}
  if(!c.summary){const m=n.match(/\*\*一句话描述\*\*[：:]\s*(.+)/);if(m)c.summary=m[1].trim()}
  const is=n.match(/## 核心实现\s*\n([\s\S]*?)(?=\n---|\n## 主要能力|\n## 局限性)/)
  if(is){is[1].matchAll(/!\[([^\]]*)\]\(images\/([^)]+)\)/g).forEach(m=>c.images.push({alt:m[1],filename:m[2]}));let h=marked.parse(is[1].trim());const bp=import.meta.env.DEV?'':'/skills-radar';h=h.replace(/src="images\/([^"]+)"/g,`src="${bp}/docs/radar/images/$1"`);h=renderLatexInHtml(h);c.coreImplementationHtml=h;const lines=is[1].trim().split('\n');let cp=null,ci=false;lines.forEach(l=>{if(l.match(/!\[.*\]\(.*\)/))return;const bm=l.match(/^\*\*(\d+)\.\s*(.+?)\*\*\s*[:：]?\s*(.*)/);if(bm){if(cp)c.principles.push(cp);cp={title:bm[2],desc:bm[3].trim()};ci=false;return}const sm=l.match(/^\*\*阶段\s*(\d+)[：:]\s*(.+?)\*\*\s*[:：]?\s*(.*)/);if(sm){if(cp)c.principles.push(cp);cp={title:`阶段 ${sm[1]}：${sm[2]}`,desc:sm[3].trim()};ci=false;return}const pm=l.match(/^\*\*(.+?)\*\*[：:]\s*(.+)$/);if(pm&&!l.match(/^\*\*阶段/)&&!l.match(/^\*\*\d+\./)){if(cp)c.principles.push(cp);cp={title:pm[1],desc:pm[2].trim()};ci=false;return}const po=l.match(/^\*\*(.+?)\*\*\s*$/);if(po&&!l.match(/^\*\*阶段/)&&!l.match(/^\*\*\d+\./)){if(cp)c.principles.push(cp);cp={title:po[1],desc:''};ci=true;return}const nm=l.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]\s*(.+)/);if(nm){if(ci&&cp)cp.desc+=(cp.desc?'\n':'')+'**'+nm[1].trim()+'**：'+nm[2].trim();else{if(cp)c.principles.push(cp);cp={title:nm[1],desc:nm[2].trim()};ci=false}return}const no=l.match(/^\d+\.\s+(.+)/);if(no&&!l.includes('**')){if(ci&&cp)cp.desc+=(cp.desc?'\n':'')+no[1].trim();else{if(cp)c.principles.push(cp);cp={title:`步骤 ${c.principles.length+1}`,desc:no[1].trim()};ci=false}return}const li=l.match(/^\s*-\s*(.+)/);if(li){if(cp)cp.desc+=(cp.desc?'\n':'')+li[1].trim();return}if(cp&&l.trim()){cp.desc+=(cp.desc?' ':'')+l.trim();ci=false}});if(cp)c.principles.push(cp)}
  if(c.principles.length===0){const ps=n.match(/### 核心原理\s*\n([\s\S]*?)(?=### 核心创新|---|## 技术细节)/);if(ps){const lines=ps[1].trim().split('\n');let cp=null,csi=false;lines.forEach(l=>{const nm=l.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]\s*(.+)/);if(nm){if(cp)c.principles.push(cp);cp={title:nm[1],desc:nm[2].trim()};csi=false;return}const no=l.match(/^\d+\.\s*\*\*(.+?)\*\*[:：]?\s*$/);if(no){if(cp)c.principles.push(cp);cp={title:no[1],desc:''};csi=true;return}if(csi&&l.match(/^\s*-\s*(.+)/)){if(cp)cp.desc+=(cp.desc?'\n':'')+l.match(/^\s*-\s*(.+)/)[1].trim();return}const nn=l.match(/^\d+\.\s*(.+)/);if(nn){if(cp)c.principles.push(cp);c.principles.push({title:`步骤 ${c.principles.length+1}`,desc:nn[1].trim()});csi=false;return}if(cp&&l.trim()&&!l.startsWith('-')&&!csi)cp.desc+=' '+l.trim()});if(cp)c.principles.push(cp)}}
  const iv=n.match(/### 核心创新\s*\n([\s\S]*?)(?=---|## 技术细节|###)/);if(iv)iv[1].trim().split('\n').forEach(l=>{const m=l.match(/- \*\*(.+?)\*\*[:：]\s*(.+)/);if(m)c.innovations.push({title:m[1],desc:m[2].trim()})})
  let cs=n.match(/## 主要能力\s*\n([\s\S]*?)(?=\n---|\n## 局限性|\n## 成熟度)/);if(!cs)cs=n.match(/### 主要能力\s*\n([\s\S]*?)(?=### 适用场景|### 局限性|---)/);if(cs)cs[1].trim().split('\n').forEach(l=>{if(l.match(/!\[.*\]\(.*\)/)||l.trim()==='')return;const m=l.match(/- \*\*(.+?)\*\*[:：]\s*(.+)/);if(m)c.capabilities.push(`${m[1]}：${m[2].trim()}`);else if(l.match(/- (.+)/))c.capabilities.push(l.match(/- (.+)/)[1].trim())})
  const sc=n.match(/### 适用场景\s*\n([\s\S]*?)(?=### 局限性|---)/);if(sc)sc[1].trim().split('\n').forEach(l=>{if(l.match(/- (.+)/))c.scenarios.push(l.match(/- (.+)/)[1].trim())})
  let ls=n.match(/## 局限性\s*\n([\s\S]*?)(?=\n---|\n## 成熟度)/);if(!ls)ls=n.match(/### 局限性\s*\n([\s\S]*?)(?=---|##)/);if(ls)ls[1].trim().split('\n').forEach(l=>{if(l.match(/- (.+)/))c.limitations.push(l.match(/- (.+)/)[1].trim())})
  const rs=n.match(/## 参考资料\s*\n([\s\S]*?)$/);if(rs)rs[1].trim().split('\n').forEach(l=>{const m=l.match(/- \[(.+?)\]\((.+?)\)/);if(m)c.references.push({label:m[1],url:m[2]})})
  return c
}

async function fetchTechDoc(id){const dn=techDocMapping[id];if(!dn)return null;const bp=import.meta.env.DEV?'':'/skills-radar';try{const r=await fetch(`${bp}/docs/radar/${dn}.md`);if(r.ok)return parseMarkdownContent(await r.text())}catch(e){console.error('Failed to fetch tech doc:',e)}return null}

onMounted(async()=>{await store.fetchData();handleQuery(route.query)})

// 监听路由 query：?tech=id 打开抽屉，?category=id 筛选并滚动
watch(() => route.query, (q) => { if(store.technologies.length) handleQuery(q) })

function handleQuery(q) {
  if (!q) return
  if (q.tech) {
    const tech = store.getTechById(q.tech)
    if (tech) openDrawer(tech)
  }
  if (q.category) {
    const exists = store.categories.some(c => c.id === q.category)
    if (exists) { filterCategory.value = q.category; nextTickScroll() }
  }
}
function nextTickScroll() { setTimeout(() => scrollToTechList(), 100) }

</script>

<style scoped>
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2zm-2 2v2h-2v-2h2zm0-2v2h-2v-2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
