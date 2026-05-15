<template>
  <div class="score-bar-container flex items-center gap-2">
    <div class="score-bar w-20">
      <div class="score-bar-fill" :class="barClass" :style="{ width: (score * 100) + '%' }"></div>
    </div>
    <span class="score-value text-xs font-medium text-slate-600">{{ score.toFixed(2) }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    default: 0
  }
})

const barClass = computed(() => {
  if (props.score >= 0.7) return 'high'
  if (props.score >= 0.5) return 'medium'
  return 'low'
})
</script>

<style scoped>
.score-bar {
  height: 6px;
  border-radius: 3px;
  background: #F1F5F9;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.score-bar-fill.high {
  background: linear-gradient(90deg, #10B981, #34D399);
}

.score-bar-fill.medium {
  background: linear-gradient(90deg, #F59E0B, #FBBF24);
}

.score-bar-fill.low {
  background: linear-gradient(90deg, #EF4444, #F87171);
}
</style>