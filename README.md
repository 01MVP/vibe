# 01MVP Vibe Lab

会补课的 AI 能力测试站。当前包含：

- 每月更新的 Vibe 新知月考
- Codex 功能熟练度与缺口清单
- AI PPT 工作流评级
- 8 种 Viber 类型

每题答完都有解析；结果页会生成评级、能力维度、补课清单和可分享的 1080 × 1440 结果图。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 验证

```bash
pnpm build
```

## 部署

生产站点：`https://vibe.01mvp.com`

```bash
pnpm build
npx wrangler@latest pages deploy dist --project-name vibe --branch main
```

站点使用 Cloudflare Pages；`main` 是生产分支。

## 路由

- `/monthly`：当月 Vibe 新知
- `/codex`：Codex 熟练度
- `/ppt`：AI PPT 方案评级
- `/type`：Viber 类型

## 内容结构

- `src/data/tests.ts`：四套测试、结果等级、解析与来源快照
- `src/scripts/quiz.ts`：答题、评分、类型判定、补课清单与结果图逻辑
- `src/styles/global.css`：页面视觉与响应式样式
- `public/assets/`：页面使用的生成式插画

热点题使用带日期的公开资料快照。榜单发生变化时，应同步更新答案、解析和快照日期。

## License

MIT
