# view README

## 目录结构

```bash
views 
├── baseReport # 基础报告
│   ├── accessAnalysis # 访客分析（流量分析）
│   │   ├── components 
│   │   │   └── RealtimeDetail.vue # 实时访客详情面板组件
│   │   ├── composition
│   │   │   └── useRealTimeTable.ts # 实时访客表格数据逻辑封装
│   │   ├── dto.d.ts # ts 类型定义
│   │   └── RealTimeAccess.vue # 实时访客
│   ├── websiteSummary # 网站概况
│   │   └── index.vue # 网站概况入口文件
│   └── index.vue # 基础报告入口文件
├── home
│   └──  index.vue # 首页
└── README.md
```
