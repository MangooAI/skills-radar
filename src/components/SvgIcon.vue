<template>
  <!-- Generation icon: building/construct -->
  <svg v-if="name === 'generation'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>

  <!-- Recall icon: target/bullseye -->
  <svg v-else-if="name === 'recall'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>

  <!-- Execution icon: gear/engine -->
  <svg v-else-if="name === 'execution'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>

  <!-- Evaluation icon: ruler/measure -->
  <svg v-else-if="name === 'evaluation'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12h20"/>
    <path d="M12 2v20"/>
    <path d="M4.93 4.93l14.14 14.14"/>
    <path d="M19.07 4.93L4.93 19.07"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>

  <!-- Optimization icon: rocket/boost -->
  <svg v-else-if="name === 'optimization'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.12 2.12 0 00-2.91-.09z"/>
    <path d="M12 15c-1 2-3 4-3 4s3.5 1 5 0c1.5-1 1-3.5 0-5"/>
    <path d="M9 7c2-2 4-3 4-3s1 3.5 0 5c-1 1.5-3 1-5 0"/>
    <path d="M20 4l-6 6"/>
    <path d="M14 8l-2 2"/>
    <circle cx="20" cy="4" r="1.5"/>
  </svg>

  <!-- Management icon: shield/protect -->
  <svg v-else-if="name === 'management'" :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>

  <!-- Default fallback: box -->
  <svg v-else :class="$attrs.class" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const VALID_NAMES = ['generation', 'recall', 'execution', 'evaluation', 'optimization', 'management']

const props = defineProps({
  name: { type: String, default: '' },
  color: { type: String, default: 'currentColor' }
})

// 未知 name 在开发环境警告，避免静默显示错误图标
if (import.meta.env.DEV && props.name && !VALID_NAMES.includes(props.name)) {
  console.warn(`[SvgIcon] 未知图标 name: "${props.name}"，已知: ${VALID_NAMES.join(', ')}`)
}

const isValid = computed(() => VALID_NAMES.includes(props.name))
</script>
