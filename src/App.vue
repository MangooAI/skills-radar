<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navigation -->
    <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 group py-1.5">
            <img :src="logoPath" alt="Skills Radar" class="h-16 w-auto group-hover:opacity-80 transition-opacity"/>
          </router-link>

          <!-- Nav Links -->
          <div class="flex items-center gap-1">
            <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
              <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M2 12h20"/><path d="M12 2a15 15 0 010 20"/><path d="M12 2a15 15 0 000 20"/>
              </svg>
              技术图谱
            </router-link>
            <router-link to="/insights" class="nav-link" :class="{ 'active': $route.path === '/insights' }">
              <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3v18h18"/><polyline points="7 14 11 10 15 14 21 8"/>
              </svg>
              演进洞察
            </router-link>
          </div>

          <!-- GitHub Link -->
          <a href="https://github.com/MangooAI/skills-radar" target="_blank"
            class="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-600 transition-all group">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.835 1.305 3.51.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span class="text-sm font-medium hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="animate-fadeIn">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col items-center gap-4 text-center">
          <!-- Footer Logo -->
          <img :src="logoPath" alt="Skills Radar" class="h-24 w-auto"/>
          <p class="text-sm text-slate-600">
            基于 <a href="https://atomgit.com/openeuler/witty-skill-insight" target="_blank" class="text-teal-600 hover:underline">Skill-insight</a> 全生命周期管理方法论
          </p>
          <div class="flex items-center gap-4">
            <p class="text-xs text-slate-400">MIT License · {{ stats.total }} 项技术已收录</p>
            <span class="text-slate-300">|</span>
            <a href="https://github.com/MangooAI/skills-radar" target="_blank"
              class="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1.5">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRadarStore } from './stores/radar'

const $route = useRoute()
const store = useRadarStore()

const basePath = import.meta.env.DEV ? '' : '/skills-radar'
const logoPath = `${basePath}/skill-radar-logo.svg`

const stats = computed(() => store.stats)
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 text-slate-600 hover:text-teal-600 text-sm font-medium transition-colors flex items-center;
}
.nav-link.active {
  @apply text-teal-600 bg-teal-50 rounded-lg;
}
</style>
