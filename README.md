# Vibe Coding 月考

每月一期的 Vibe Coding 趣味考试：最新模型事实、Agent 实战和生产环境常识，答完获得毒舌诊断与可分享战报。

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

## 内容结构

- `src/data/questions.ts`：三套题库、答案、解析与来源快照
- `src/scripts/quiz.ts`：答题、评分、动画、音效和分享逻辑
- `src/styles/global.css`：页面视觉与响应式样式
- `public/assets/`：页面使用的生成式插画

热点题使用带日期的公开资料快照。榜单发生变化时，应同步更新答案、解析和快照日期。

## License

MIT
