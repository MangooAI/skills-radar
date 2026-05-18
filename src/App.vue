<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Skills Radar</span>
              <span class="text-xs text-slate-500 hidden sm:block">技术收录与演进地图</span>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-1">
            <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
              首页
            </router-link>
            <router-link to="/radar" class="nav-link" :class="{ 'active': $route.path === '/radar' }">
              雷达图
            </router-link>
            <router-link to="/categories" class="nav-link" :class="{ 'active': $route.path === '/categories' }">
              分类
            </router-link>
          </div>

          <!-- GitHub Link -->
          <a href="https://github.com/wldandan/skills-radar" target="_blank"
            class="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:bg-slate-50 transition-colors">
            <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.835 1.305 3.51.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden pb-3 flex gap-2">
          <router-link to="/" class="flex-1 text-center py-2 rounded-lg text-sm font-medium"
            :class="$route.path === '/' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'">
            首页
          </router-link>
          <router-link to="/radar" class="flex-1 text-center py-2 rounded-lg text-sm font-medium"
            :class="$route.path === '/radar' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'">
            雷达图
          </router-link>
          <router-link to="/categories" class="flex-1 text-center py-2 rounded-lg text-sm font-medium"
            :class="$route.path === '/categories' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'">
            分类
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="animate-fadeIn">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-center md:text-left">
            <p class="text-sm text-slate-600">
              基于 <a href="https://atomgit.com/openeuler/witty-skill-insight" target="_blank" class="text-teal-600 hover:underline">Skill-insight</a> 全生命周期管理方法论
            </p>
            <p class="text-xs text-slate-400 mt-1">MIT License | Skills Radar</p>
          </div>

          <div class="flex items-center gap-6">
            <a href="https://github.com/wldandan/skills-radar" target="_blank"
              class="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.835 1.305 3.51.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>