# Skills Radar - GitHub Pages 静态版

> 追踪 Skills 技术，让 Agent 能力进化有迹可循

基于 [skills-radar-web](https://github.com/wldandan/skills-radar) 项目的静态重构版本，可直接部署到 GitHub Pages。

## 特性

- 纯静态站点，无需后端服务
- 基于 Vue 3 + Vite 构建
- 支持 GitHub Pages 部署
- 包含完整的 markdown 文档

## 本地开发

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库 Settings > Pages 中选择：
   - Source: GitHub Actions
3. 构建完成后访问: `https://[your-username].github.io/skills-radar/`

## 数据来源

- 数据文件: `public/data/radar-data.json`
- 文档来源: https://github.com/wldandan/skills-radar

## 项目结构

```
skills-radar-github-pages/
├── public/
│   ├── data/           # 静态数据
│   │   └── radar-data.json
│   └── docs/           # markdown 文档
│       └── radar/      # 技术雷达文档
│           ├── 01-taxonomy.md
│           ├── category-*.md
│           ├── tech-*.md
│           └── ...
├── src/
│   ├── components/     # Vue 组件
│   ├── views/          # 页面视图
│   ├── stores/         # Pinia 状态管理
│   └── router/         # 路由配置
├── vite.config.js      # Vite 配置
└── package.json
```

## 技术栈

- Vue 3
- Vite 5
- Pinia
- Vue Router
- TailwindCSS
- marked (Markdown 解析)

## License

MIT