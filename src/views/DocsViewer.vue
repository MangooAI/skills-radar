<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="card p-8 text-center">
      <div class="text-red-500 mb-4">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-slate-900 mb-2">文档加载失败</h2>
      <p class="text-slate-600 mb-4">{{ error }}</p>
      <router-link to="/" class="btn-primary">返回首页</router-link>
    </div>

    <!-- Markdown Content -->
    <div v-else class="card p-8">
      <div class="prose prose-slate max-w-none" v-html="htmlContent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const htmlContent = ref('')

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

// 技术ID -> 文档文件名映射（只映射有实际文档的技术）
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

// 可用的技术文档列表
const availableTechDocs = [
  'tech-trace2skill', 'tech-d2skill', 'tech-skillx', 'tech-memento-skills',
  'tech-skillrl', 'tech-skillrouter', 'tech-graph-of-skills', 'tech-skvm',
  'tech-skillinsight', 'tech-skillsbench', 'tech-skillprobe', 'tech-skillforge',
  'tech-skillreducer'
]

async function fetchMarkdown() {
  loading.value = true
  error.value = null

  const path = route.params.path
  // 开发模式用根路径，生产模式用 GitHub Pages 路径
  const basePath = import.meta.env.DEV ? '' : '/skills-radar'

  let actualPath = path

  // 处理技术文档路径映射
  if (path.startsWith('tech-')) {
    const techId = path.replace('tech-', '')
    // 如果有映射，使用映射后的文件名
    if (techDocMapping[techId]) {
      actualPath = techDocMapping[techId]
    }
  }

  // 检查文件是否存在
  const filePath = `${basePath}/docs/radar/${actualPath}.md`

  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      // 如果是技术文档且文件不存在，尝试查找类似文档
      if (path.startsWith('tech-') && !availableTechDocs.includes(actualPath)) {
        // 返回一个提示页面而不是错误
        htmlContent.value = `<h1>文档待补充</h1><p>该技术的详细文档尚未创建，请参考其他相关技术文档。</p><p><a href="/">返回首页</a></p>`
        loading.value = false
        return
      }
      throw new Error(`文档不存在: ${path}`)
    }
    const markdown = await response.text()
    htmlContent.value = marked(markdown)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchMarkdown)
watch(() => route.params.path, fetchMarkdown)
</script>

<style>
.prose h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #334155;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose p {
  color: #64748b;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.prose ul, .prose ol {
  color: #64748b;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose a {
  color: #14b8a6;
  text-decoration: underline;
}

.prose a:hover {
  color: #0d9488;
}

.prose code {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.prose pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.prose pre code {
  background: transparent;
  padding: 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.prose th, .prose td {
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  text-align: left;
}

.prose th {
  background: #f8fafc;
  font-weight: 600;
  color: #334155;
}

.prose blockquote {
  border-left: 4px solid #14b8a6;
  padding-left: 1rem;
  color: #64748b;
  margin: 1rem 0;
}
</style>