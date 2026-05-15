<template>
  <div class="tech-radar-wrapper">
    <svg ref="svg" viewBox="0 0 800 800" class="tech-radar-svg">
      <!-- Background rings -->
      <g class="rings">
        <circle cx="400" cy="400" r="350" fill="none" stroke="#E2E8F0" stroke-width="1" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="#E2E8F0" stroke-width="1" />
        <circle cx="400" cy="400" r="210" fill="none" stroke="#E2E8F0" stroke-width="1" />
        <circle cx="400" cy="400" r="140" fill="none" stroke="#E2E8F0" stroke-width="1" />
        <circle cx="400" cy="400" r="70" fill="none" stroke="#E2E8F0" stroke-width="1" />
      </g>

      <!-- Axis lines -->
      <g class="axes">
        <line v-for="(cat, i) in categories" :key="cat.id"
          x1="400" y1="400"
          :x2="400 + 350 * Math.cos((i * 60 - 90) * Math.PI / 180)"
          :y2="400 + 350 * Math.sin((i * 60 - 90) * Math.PI / 180)"
          stroke="#E2E8F0" stroke-width="1" />
      </g>

      <!-- Category labels -->
      <g class="category-labels">
        <text v-for="(cat, i) in categories" :key="cat.id"
          :x="400 + 380 * Math.cos((i * 60 - 90) * Math.PI / 180)"
          :y="400 + 380 * Math.sin((i * 60 - 90) * Math.PI / 180)"
          :fill="cat.color"
          font-weight="600"
          font-size="14"
          text-anchor="middle"
          dominant-baseline="middle">
          {{ cat.label }}
        </text>
      </g>

      <!-- Technology points with labels -->
      <g class="tech-points">
        <g v-for="(tech, idx) in positionedTechs" :key="tech.id"
          class="tech-item"
          @mouseenter="showTooltip(tech)"
          @mouseleave="hideTooltip"
          :style="{ cursor: 'pointer' }">
          <!-- Tech point -->
          <circle
            :cx="tech.x"
            :cy="tech.y"
            :r="tech.isHovered ? 8 : 6"
            :fill="tech.color"
            :stroke="tech.maturityColor"
            stroke-width="2"
            class="tech-circle"
            @click="$emit('techClick', tech.id)" />

          <!-- Tech name label -->
          <text
            :x="tech.labelX"
            :y="tech.labelY"
            :fill="tech.isHovered ? '#0F172A' : '#64748B'"
            :font-size="tech.isHovered ? 12 : 10"
            font-weight="500"
            :text-anchor="tech.labelAnchor"
            dominant-baseline="middle"
            class="tech-label">
            {{ tech.shortName }}
          </text>
        </g>
      </g>

      <!-- Tooltip using foreignObject for HTML rendering -->
      <foreignObject
        v-if="tooltipVisible && tooltipData"
        :x="tooltipData.x"
        :y="tooltipData.y"
        :width="tooltipData.width"
        :height="tooltipData.height"
        class="tooltip-foreign">
        <div class="tooltip-container" xmlns="http://www.w3.org/1999/xhtml">
          <div class="tooltip-header">
            <span class="tooltip-name">{{ tooltipData.tech.name }}</span>
            <span class="tooltip-category">{{ tooltipData.tech.categoryLabel }}</span>
          </div>
          <div class="tooltip-desc">{{ tooltipData.tech.description }}</div>
          <div class="tooltip-score" :style="{ color: tooltipData.tech.maturityColor }">
            综合评分: {{ tooltipData.tech.overallScore.toFixed(2) }} {{ getMaturityLabel(tooltipData.tech.overallScore) }}
          </div>
        </div>
      </foreignObject>

      <!-- Center dot -->
      <circle cx="400" cy="400" r="4" fill="#14B8A6" />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  technologies: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['techClick'])

const hoveredTech = ref(null)
const svg = ref(null)
const tooltipVisible = ref(false)
const tooltipData = ref(null)

// Calculate positions for all technologies
const positionedTechs = computed(() => {
  if (!props.categories.length || !props.technologies.length) return []

  const result = []
  const centerX = 400
  const centerY = 400
  const angleStep = 60 // Each category is 60 degrees apart

  props.categories.forEach((cat, catIndex) => {
    const catAngle = (catIndex * angleStep - 90) * Math.PI / 180
    const catTechs = props.technologies.filter(t => t.categoryId === cat.id)

    catTechs.forEach((tech, techIndex) => {
      // Calculate overall score for positioning
      const weights = [0.30, 0.25, 0.25, 0.20]
      const overallScore = tech.scores?.reduce((sum, s, i) => sum + s * weights[i], 0) || 0.5

      // Position: score determines distance from center
      // Higher score = closer to outer ring
      const techRadius = 70 + (overallScore * 280)

      // Spread techs within category arc
      const spreadAngle = 40 // degrees to spread within category
      const techAngleOffset = (techIndex - (catTechs.length - 1) / 2) * (spreadAngle / Math.max(catTechs.length - 1, 1))
      const techAngle = ((catIndex * angleStep - 90 + techAngleOffset) * Math.PI / 180)

      const x = centerX + techRadius * Math.cos(techAngle)
      const y = centerY + techRadius * Math.sin(techAngle)

      // Label positioning - offset from point
      const labelOffset = 15
      const labelAngle = techAngle

      // Determine label anchor based on position
      let labelAnchor = 'middle'
      if (x < centerX - 50) labelAnchor = 'end'
      else if (x > centerX + 50) labelAnchor = 'start'

      const labelX = x + labelOffset * Math.cos(techAngle)
      const labelY = y + labelOffset * Math.sin(techAngle)

      // Maturity color
      let maturityColor = '#EF4444' // red for exploring
      if (overallScore > 0.6) maturityColor = '#10B981' // green for mature
      else if (overallScore >= 0.4) maturityColor = '#F59E0B' // yellow for growing

      // Short name for display (truncate if needed)
      const shortName = tech.name.length > 12 ? tech.name.slice(0, 10) + '..' : tech.name

      result.push({
        ...tech,
        x,
        y,
        overallScore,
        color: cat.color,
        maturityColor,
        labelX,
        labelY,
        labelAnchor,
        shortName,
        categoryLabel: cat.label + ' · ' + cat.label_en,
        isHovered: hoveredTech.value?.id === tech.id
      })
    })
  })

  return result
})

// Show tooltip with calculated position
function showTooltip(tech) {
  hoveredTech.value = tech

  // Calculate tooltip dimensions based on content
  const nameLen = tech.name?.length || 0
  const descLen = tech.description?.length || 0

  // Width based on content length
  const width = Math.min(300, Math.max(240, 200 + nameLen * 6))

  // Height based on description length - adaptive
  // Base height: 80px for header and score
  // Each 20 chars of description adds ~16px (line-height 16px)
  const baseHeight = 80
  const descLines = Math.ceil(descLen / 25) // ~25 chars per line
  const descHeight = Math.min(descLines * 18, 72) // max 4 lines, 18px per line
  const height = baseHeight + descHeight + 20 // padding

  // Calculate position - avoid going outside SVG bounds
  let tooltipX = tech.x + 20
  let tooltipY = tech.y - height / 2

  // Adjust if tooltip would go outside right edge
  if (tooltipX + width > 790) {
    tooltipX = tech.x - width - 20
  }

  // Adjust if tooltip would go outside left edge
  if (tooltipX < 10) {
    tooltipX = 10
  }

  // Adjust if tooltip would go outside top edge
  if (tooltipY < 10) {
    tooltipY = 10
  }

  // Adjust if tooltip would go outside bottom edge
  if (tooltipY + height > 790) {
    tooltipY = 790 - height
  }

  tooltipData.value = {
    tech,
    x: tooltipX,
    y: tooltipY,
    width,
    height
  }

  tooltipVisible.value = true
}

// Hide tooltip
function hideTooltip() {
  hoveredTech.value = null
  tooltipVisible.value = false
  tooltipData.value = null
}

function getMaturityLabel(score) {
  if (score > 0.6) return '(成熟期)'
  if (score >= 0.4) return '(成长期)'
  return '(探索期)'
}

onMounted(() => {
  // Add CSS transitions via JavaScript for SVG elements
  if (svg.value) {
    const circles = svg.value.querySelectorAll('.tech-circle')
    circles.forEach(circle => {
      circle.style.transition = 'all 0.15s ease-out'
    })
  }
})
</script>

<style scoped>
.tech-radar-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.tech-radar-svg {
  width: 100%;
  height: auto;
  display: block;
}

.tech-item {
  cursor: pointer;
}

.tech-circle {
  transition: r 0.15s ease-out, fill-opacity 0.15s ease-out;
}

.tech-label {
  transition: fill 0.15s ease-out, font-size 0.15s ease-out;
  pointer-events: none;
}

.tech-item:hover .tech-label {
  fill: #0F172A;
  font-size: 12px;
}

.tooltip-foreign {
  overflow: visible;
  pointer-events: none;
}

.tooltip-container {
  background: #0F172A;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  width: fit-content;
  min-width: 100%;
  max-width: 100%;
  height: fit-content;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.tooltip-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.tooltip-name {
  color: #FFFFFF;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
}

.tooltip-category {
  color: #94A3B8;
  font-size: 12px;
  line-height: 1.2;
}

.tooltip-desc {
  color: #CBD5E1;
  font-size: 13px;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: normal;
  flex-shrink: 0;
}

.tooltip-score {
  font-size: 14px;
  font-weight: 600;
  padding-top: 6px;
  border-top: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}
</style>