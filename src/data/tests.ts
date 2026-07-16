export type TestId = "monthly" | "video" | "ppt" | "ios" | "web" | "codex" | "type";
export type TestKind = "knowledge" | "usage" | "personality";

export interface SourceLink {
  label: string;
  url: string;
  snapshot: string;
}

export interface QuizOption {
  label: string;
  points: number;
  reaction: string;
  best?: boolean;
}

export interface QuizQuestion {
  id: string;
  dimension: string;
  difficulty: "热身" | "进阶" | "高阶";
  category: string;
  setup: string;
  prompt: string;
  options: QuizOption[];
  explanation: string;
  takeaway: string;
  commands?: string[];
  sources?: SourceLink[];
}

export interface DimensionDefinition {
  key: string;
  label: string;
}

export interface TestLevel {
  min: number;
  tier: string;
  code: string;
  title: string;
  icon: string;
  quote: string;
  roast: string;
  color: string;
  ink: string;
}

export interface PersonalityType extends TestLevel {
  profile: string;
}

export interface TestDefinition {
  id: TestId;
  slug: string;
  index: string;
  kind: TestKind;
  shortTitle: string;
  title: string;
  description: string;
  eyebrow: string;
  symbol: string;
  duration: string;
  startTitle: string;
  startCopy: string;
  cta: string;
  dimensions: DimensionDefinition[];
  questions: QuizQuestion[];
  levels: TestLevel[];
  personalityTypes?: PersonalityType[];
}

const monthlyQuestions: QuizQuestion[] = [
  {
    id: "monthly-weekly-repeat",
    dimension: "discover",
    difficulty: "热身",
    category: "重复劳动",
    setup: "每周都要干一次",
    prompt: "一项工作每周都要开网页、复制内容、重复点按钮。最值得先升级哪一步？",
    options: [
      { label: "继续手动做，熟练以后自然会快", points: 0, reaction: "你把重复劳动练成了肌肉记忆。" },
      { label: "让 AI 告诉我步骤，我照着点", points: 1, reaction: "AI 是顾问，你仍然是鼠标外设。" },
      { label: "让浏览器 Agent 从头盲点到尾", points: 1, reaction: "手离开了鼠标，可复现性也离开了。" },
      { label: "先找成熟 Skill，再接 CLI／MCP，让 Agent 执行并验收", points: 3, best: true, reaction: "建议终于升级成了可执行工作流。" },
    ],
    explanation: "2026 年主流做法：Skill 封装成熟流程，MCP/CLI 提供真实权限，Agent 负责执行与验证。普通用户做周报、老师批量改作业、运营同步数据，都可以这么升级。",
    takeaway: "重复操作先找成熟 Skill，再给 Agent 可执行工具；别长期做人肉中间件。",
    commands: ["npx wrangler pages deploy", "brew install asc"],
    sources: [
      { label: "OpenAI Skills 文档", url: "https://learn.chatgpt.com/docs/build-skills", snapshot: "2026-07" },
      { label: "Anthropic Skills 标准", url: "https://github.com/anthropics/skills", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-video-choice",
    dimension: "discover",
    difficulty: "进阶",
    category: "AI 视频",
    setup: "想拍一条 15 秒短片",
    prompt: "你想让 AI 生成一条带人声、走位自然的 15 秒短视频发小红书。优先选哪个？",
    options: [
      { label: "直接扔一句话给 Sora", points: 0, reaction: "Sora 2026 年 4 月已下线，计划赶不上变化。" },
      { label: "挑最火的工具，管它适不适合", points: 1, reaction: "热搜选工具，效果靠运气。" },
      { label: "Veo 3.1 拍大片，Kling 3.0 拍真人短视频", points: 3, best: true, reaction: "你开始按任务和比例选工具了。" },
      { label: "全部工具都试一遍再决定", points: 1, reaction: "时间花光了，视频还没开始。" },
    ],
    explanation: "2026 年 7 月：Veo 3.1 强在原生音频+电影感；Kling 3.0 强在真人一致性和 9:16 性价比；Runway Gen-4.5 适合专业多镜头；Luma Ray 3 适合物理和关键帧控制。国内 Kling 也全球可用。",
    takeaway: "先决定用途（真人/电影/比例/音频），再挑工具。别只看名字热度。",
    sources: [
      { label: "DeepMind Veo 3.1", url: "https://deepmind.google/models/veo/", snapshot: "2026-07" },
      { label: "Kling 3.0 发布说明", url: "https://kling.ai/", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-ppt-reality",
    dimension: "delegate",
    difficulty: "热身",
    category: "AI PPT",
    setup: "30 页品牌演示",
    prompt: "你要一份可编辑、能长期复用的品牌 PPT。哪条路线最稳？",
    options: [
      { label: "一句话生成 30 页，导出前绝不回头", points: 0, reaction: "每一页都很完整地表达了随机性。" },
      { label: "生成 30 张图片，再贴进 PowerPoint", points: 0, reaction: "可编辑性已经被压成 JPG。" },
      { label: "先用 Gamma/Canva 出快稿，直接当最终母版", points: 2, reaction: "速度很顶，品牌控制还要补课。" },
      { label: "大纲→故事板→品牌模板→原生 PPTX→逐页渲染验收", points: 3, best: true, reaction: "你做的是演示文稿，不是 30 张 AI 壁纸。" },
    ],
    explanation: "快稿工具（Gamma/Canva）适合提速；要求可编辑、可复用和品牌一致时，模板化的原生 PPTX + 渲染验收更可控。Plus AI 适合在 Google Slides/PPT 里直接迭代。",
    takeaway: "先选交付物：求快用生成器，求控制用模板化 PPTX 工作流。",
    sources: [
      { label: "Gamma 导出说明", url: "https://help.gamma.app/", snapshot: "2026-07" },
      { label: "Plus AI 官方", url: "https://plusai.com/", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-nondev-web",
    dimension: "discover",
    difficulty: "热身",
    category: "AI 建站",
    setup: "普通人想做一个宣传页",
    prompt: "你不是程序员，但想快速做一个能上线的产品宣传页。最好的起点是？",
    options: [
      { label: "先学 HTML CSS 三个月再开始", points: 0, reaction: "2026 年了还在学前置技能。" },
      { label: "找 freelancer 做，贵就贵点", points: 1, reaction: "预算有了，学习和控制权没了。" },
      { label: "直接丢给 Lovable / v0 / Bolt.new 让它生成", points: 2, reaction: "你已经敢把想法扔给 AI 了。" },
      { label: "先在 Lovable/v0 搭原型，再用 Cursor 精修 + Vercel 一键上线", points: 3, best: true, reaction: "普通人也能拥有可维护的真实网站。" },
    ],
    explanation: "2026 年非开发者常用 Lovable（友好全栈）、v0（设计感强）、Bolt.new（浏览器零安装）。想长期维护就接 Cursor + Git。部署基本一键到 Vercel。",
    takeaway: "先用 AI 建站工具跑通 0→1，再决定要不要学代码维护。",
    sources: [
      { label: "v0 by Vercel 2026", url: "https://vercel.com/blog/introducing-the-new-v0", snapshot: "2026-07" },
      { label: "Lovable 文档", url: "https://lovable.dev/", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-ios-idea",
    dimension: "delegate",
    difficulty: "进阶",
    category: "AI iOS",
    setup: "脑子里有个小 App 想法",
    prompt: "你脑子里有个给老师用的课堂小工具 App，想让 AI 帮你做出来。最现实的路径？",
    options: [
      { label: "直接让 Agent 写完整项目，扔到 App Store", points: 0, reaction: "审核会教你什么是人类在场。" },
      { label: "自己学 SwiftUI 三个月", points: 1, reaction: "热情可能在第 4 周耗尽。" },
      { label: "用 Claude Code + Cursor + Xcode MCP 让 Agent 写 80%，你只管想法和验收", points: 3, best: true, reaction: "你终于不是唯一在写代码的人。" },
      { label: "找现成模板改改", points: 1, reaction: "模板改完通常变成另一个模板。" },
    ],
    explanation: "2026 年真实路径：用 Claude/Cursor 在 Xcode 里用 MCP（XcodeBuildMCP 等）让 Agent 跑模拟器、截图、修 bug，最后你用 asc 或 Xcode Cloud 打包上架。Agent 能做 70-80%，架构和审核仍需人。",
    takeaway: "AI 能写大部分代码，但上架、隐私、用户真实体验还是你的责任。",
    sources: [
      { label: "Apple Xcode 智能体支持", url: "https://developer.apple.com/", snapshot: "2026-07" },
      { label: "MCP iOS 工作流实践", url: "https://github.com/rorkai/app-store-connect-cli-skills", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-domestic",
    dimension: "discover",
    difficulty: "进阶",
    category: "国内工具",
    setup: "中文场景选工具",
    prompt: "你要处理大量中文长文档总结 + 偶尔写脚本。你会优先装哪个？",
    options: [
      { label: "只用国际模型，中文也能行", points: 1, reaction: "能用，但性价比和上下文经常翻车。" },
      { label: "Kimi / 豆包 / 通义随便挑一个最火的", points: 1, reaction: "热搜决定一切。" },
      { label: "Kimi 做长文档和 Agent 工作流，豆包做日常多模态，Qwen/DeepSeek 做编码", points: 3, best: true, reaction: "你开始按场景配工具，而不是信仰单一品牌。" },
      { label: "全部都装，慢慢挑", points: 0, reaction: "工具箱满了，决策瘫痪了。" },
    ],
    explanation: "2026 年 7 月国内现状：Kimi（Moonshot）长上下文和 Agent 强；豆包（字节）用户最多、Agent 执行和视频好；Qwen（阿里）开源全家桶+AgentWorld；DeepSeek 极致性价比编码；GLM（智谱）长时序和国产芯片适配强。按任务混搭最优。",
    takeaway: "中文任务别只看国际模型，国内模型在长文档、Agent、性价比上经常更香。",
    sources: [
      { label: "Kimi 官方 2026", url: "https://www.moonshot.ai/", snapshot: "2026-07" },
      { label: "Qwen3 系列", url: "https://qwen.ai/", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-fact-check",
    dimension: "verify",
    difficulty: "热身",
    category: "事实验收",
    setup: "AI 给了一堆数据",
    prompt: "AI 在 PPT 或视频脚本里塞了几个“2026 年市场数据”。你怎么处理？",
    options: [
      { label: "图表好看就先用，观众不会查", points: 0, reaction: "可信度已外包给配色。" },
      { label: "让 AI 再确认一次", points: 1, reaction: "同一个模型为自己签了字。" },
      { label: "删掉数据，只留趋势箭头", points: 1, reaction: "避免造假的方式是避免信息。" },
      { label: "保存来源、快照与计算口径，关键数字逐一核验", points: 3, best: true, reaction: "图表开始承载证据，而不是气氛。" },
    ],
    explanation: "任何模型都会幻觉数据。2026 年可靠做法：要求同时输出来源链接 + 快照日期，然后自己或让 Agent 打开原始页面核对。涉及金钱、用户数、排名时尤其要死磕。",
    takeaway: "让 AI 同时交付来源表；关键数字不要只在模型内部闭环。",
    sources: [{ label: "模型幻觉与验证实践", url: "https://learn.chatgpt.com/guides/best-practices", snapshot: "2026-07" }],
  },
  {
    id: "monthly-browser-agent",
    dimension: "verify",
    difficulty: "进阶",
    category: "页面验收",
    setup: "网页看起来不对",
    prompt: "Agent 改完网站后，按钮在手机上飞出屏幕。你让它怎么自证清白？",
    options: [
      { label: "它说改好了就信", points: 0, reaction: "希望是世界上最强的测试工具。" },
      { label: "你自己打开手机看一眼", points: 1, reaction: "有人看过，但闭环没形成。" },
      { label: "让 Agent 用内置浏览器打开、截图、读控制台、修、再验证", points: 3, best: true, reaction: "从‘应该没问题’升级到‘我看过了’。" },
      { label: "发一张截图让它猜", points: 1, reaction: "有画面了，现场坐标仍然失踪。" },
    ],
    explanation: "Codex/Claude/Cursor 的内置浏览器或 MCP 可以打开本地/线上页、点击、截图、查 DOM、网络和控制台。真实渲染闭环比任何承诺都重要。",
    takeaway: "页面问题必须经过真实渲染闭环：复现、观察、修复、再验证。",
    sources: [{ label: "OpenAI Browser 能力", url: "https://learn.chatgpt.com/docs/browser", snapshot: "2026-07" }],
  },
  {
    id: "monthly-scheduled",
    dimension: "verify",
    difficulty: "高阶",
    category: "自动巡检",
    setup: "每天都要看的东西",
    prompt: "你希望 AI 每天检查线上错误、竞品更新或新视频，只有异常才通知你。最合适的是？",
    options: [
      { label: "每天早上自己想起来，再发一次 Prompt", points: 0, reaction: "自动化最脆弱的依赖：你的记忆。" },
      { label: "开着一个聊天窗口，期待它主动醒来", points: 0, reaction: "窗口很努力地保持了沉默。" },
      { label: "建 Scheduled Task，写清权限、触发条件和停止规则", points: 3, best: true, reaction: "AI 终于按点上班，你不用。" },
      { label: "写日历提醒自己叫 AI", points: 1, reaction: "你给自动化增加了一层人工中转。" },
    ],
    explanation: "2026 年 Agent 平台（Codex、Claude、Cursor）都支持 Scheduled / Automations。可在独立 worktree 里跑，带最小权限和明确报告条件。适合每日监控、生成周报、抓新模型更新。",
    takeaway: "把重复检查交给定时任务，同时写清报告条件、权限和停止规则。",
    sources: [{ label: "OpenAI Scheduled Tasks", url: "https://learn.chatgpt.com/docs/automations", snapshot: "2026-07" }],
  },
  {
    id: "monthly-ranking-honest",
    dimension: "verify",
    difficulty: "高阶",
    category: "模型选择",
    setup: "榜单又更新了",
    prompt: "一张榜单说某模型在「Agent 任务」上世界第一。你准备怎么在群里安利？",
    options: [
      { label: "直接写：目前宇宙最强，没有之一", points: 0, reaction: "统计学被标题党请出了群聊。" },
      { label: "只要第一名领先 1 分，就是代差", points: 0, reaction: "误差区间正在默默流泪。" },
      { label: "写清榜单名称、任务、日期、样本量和置信区间", points: 3, best: true, reaction: "你成功阻止了一个‘遥遥领先’。" },
      { label: "榜单都不可信，所以完全不看", points: 1, reaction: "避免误判的方式是拒绝获得信息。" },
    ],
    explanation: "2026 年 7 月真实情况：没有模型在所有任务上永远第一。Agent 能力在 Terminal-Bench、SWE-Bench、内部长任务上差异大，且更新极快。永远写上下文。",
    takeaway: "推荐模型时写清任务、榜单与快照，不把暂时第一包装成绝对最强。",
    sources: [{ label: "Arena / SWE-Bench 2026", url: "https://arena.ai/leaderboard", snapshot: "2026-07" }],
  },
];

const videoQuestions: QuizQuestion[] = [
  {
    id: "video-prompt",
    dimension: "control",
    difficulty: "热身",
    category: "提示词",
    setup: "想拍一条产品展示视频",
    prompt: "你让 AI 拍一条手机壳旋转展示视频，第一句 Prompt 怎么写？",
    options: [
      { label: "一个手机壳在转，很高级", points: 0, reaction: "高级已经成了咒语。" },
      { label: "产品级电影镜头，4K，柔光，慢动作旋转，干净背景", points: 2, reaction: "你已经会堆形容词了。" },
      { label: "产品：黑色 iPhone 壳，放在浅灰大理石桌面，柔和窗光，缓慢 360° 旋转，8 秒，电影感，真实物理", points: 3, best: true, reaction: "具体物体 + 环境 + 光 + 运动 + 时长 = 可控。" },
      { label: "随便生成一个就行，后期再抠", points: 0, reaction: "后期抠图的代价是灵魂。" },
    ],
    explanation: "好视频 Prompt 需要：主体细节、场景、光影、运动路径、时长、风格。越具体越省后期。",
    takeaway: "视频 Prompt 不是诗，是分镜 + 物理 + 相机参数。",
    sources: [{ label: "Kling / Veo 提示指南", url: "https://kling.ai/", snapshot: "2026-07" }],
  },
  {
    id: "video-tool",
    dimension: "tool",
    difficulty: "热身",
    category: "工具选择",
    setup: "不同需求",
    prompt: "下面哪个场景最适合 Kling 3.0 而不是 Veo 3.1？",
    options: [
      { label: "需要极致电影运镜和原生英文旁白的大片", points: 1, reaction: "Veo 3.1 更对味。" },
      { label: "要做 9:16 真人出镜、唇同步好的短视频", points: 3, best: true, reaction: "Kling 在真人一致性和竖版上有优势。" },
      { label: "要做物理碰撞实验动画", points: 2, reaction: "Luma Ray 可能更强。" },
      { label: "要做多角色长故事板", points: 1, reaction: "Runway 的世界一致性更适合。" },
    ],
    explanation: "2026 年 7 月：Kling 3.0 在真人运动、唇同步、中文/多语言、性价比和竖版上经常胜出；Veo 3.1 在电影感和原生音频叙事上领先；Runway 适合专业控制；Luma 适合物理和关键帧。",
    takeaway: "按主体（真人/动画）、比例、音频需求选工具。",
    sources: [
      { label: "Kling 3.0", url: "https://kling.ai/", snapshot: "2026-07" },
      { label: "Veo 3.1", url: "https://deepmind.google/models/veo/", snapshot: "2026-07" },
    ],
  },
  {
    id: "video-consistency",
    dimension: "control",
    difficulty: "进阶",
    category: "一致性",
    setup: "同一个角色要多条",
    prompt: "你想让同一个女孩在三条不同视频里保持脸和衣服一致。最佳做法？",
    options: [
      { label: "每次都写一样的长 Prompt", points: 0, reaction: "概率在跟你开玩笑。" },
      { label: "生成第一条后，用「参考图」或「Character Reference」喂给后续", points: 3, best: true, reaction: "你终于把一致性从咒语变成了资产。" },
      { label: "生成完三条再后期抠脸", points: 1, reaction: "后期地狱已开启。" },
      { label: "换一个模型试试运气", points: 0, reaction: "运气不是工作流。" },
    ],
    explanation: "2026 主流视频工具都支持 Image/Character Reference（Kling Elements、Veo Ingredients、Runway Reference、Luma Consistent）。先生成角色图或用第一帧做 reference 是标准做法。",
    takeaway: "一致性靠「参考图 + 工具 reference 功能」，不是更长的 Prompt。",
    sources: [{ label: "Kling Elements / Veo Ingredients", url: "https://kling.ai/", snapshot: "2026-07" }],
  },
  {
    id: "video-audio",
    dimension: "control",
    difficulty: "进阶",
    category: "音频",
    setup: "要说话的视频",
    prompt: "你需要一条带自然对话的短视频。2026 年最稳的做法？",
    options: [
      { label: "生成无声视频，再配音", points: 1, reaction: "口型永远对不上。" },
      { label: "直接用支持原生音频的模型（Veo 3.1 / Kling 3.0）", points: 3, best: true, reaction: "你把音频当第一公民了。" },
      { label: "生成视频后用 ElevenLabs 强行对嘴", points: 1, reaction: "对嘴永远是艺术。" },
      { label: "用 Runway + 后期音频工具", points: 2, reaction: "可行，但多了一层复杂度。" },
    ],
    explanation: "Veo 3.1 和 Kling 3.0 都已支持原生音频生成（对话、音效、环境）。优先用原生比后期对嘴可靠得多。",
    takeaway: "需要对话就选原生音频模型，别指望后期完美对嘴。",
    sources: [{ label: "Veo 3.1 原生音频", url: "https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/", snapshot: "2026-07" }],
  },
  {
    id: "video-extend",
    dimension: "tool",
    difficulty: "进阶",
    category: "时长与剪辑",
    setup: "视频太短",
    prompt: "AI 只给 8 秒，你想要 25 秒完整故事。怎么做？",
    options: [
      { label: "一直加长 Prompt 直到模型崩溃", points: 0, reaction: "模型已经开始胡言乱语。" },
      { label: "生成多条 8 秒，用剪辑软件硬拼", points: 1, reaction: "动作和光可能完全不接。" },
      { label: "用「场景扩展」「Continue」或多关键帧功能连起来", points: 3, best: true, reaction: "你开始用工具的叙事能力了。" },
      { label: "放弃，8 秒也很好看", points: 0, reaction: "短是艺术，长是需求。" },
    ],
    explanation: "2026 工具都支持 scene extension、continue from last frame、multi-shot storyboard。Luma 的 Multi-Keyframe、Runway Director Mode、Kling 的多镜头模式都是为此设计的。",
    takeaway: "长视频靠「分镜 + 延续功能」，不是一个 Prompt 解决所有。",
    sources: [{ label: "Luma Ray 3.2 Keyframe", url: "https://lumalabs.ai/ray", snapshot: "2026-07" }],
  },
  {
    id: "video-qa",
    dimension: "qa",
    difficulty: "高阶",
    category: "视觉验收",
    setup: "生成完了要不要发",
    prompt: "AI 视频生成成功，命令说 100% 完成。你会怎么验收？",
    options: [
      { label: "能播就发", points: 0, reaction: "第 3 秒手突然多了两根手指。" },
      { label: "只看第一帧和最后一帧", points: 1, reaction: "中间三秒已经灵魂出窍。" },
      { label: "全片放一遍，重点看手、字幕、口型、物理", points: 3, best: true, reaction: "你把观众会注意的都检查了。" },
      { label: "让 AI 再生成一次「更好版本」", points: 1, reaction: "随机性获得了第二次机会。" },
    ],
    explanation: "AI 视频常见问题：手指、文字、物理、口型、动作跳变。必须人眼或 Agent 辅助全片检查 + 关键帧放大。",
    takeaway: "视频生成成功 ≠ 可用。必查：手、字、物理、连贯性。",
    sources: [{ label: "Runway / Kling 生产实践", url: "https://runwayml.com/", snapshot: "2026-07" }],
  },
];

const pptQuestions: QuizQuestion[] = [
  {
    id: "ppt-brief",
    dimension: "story",
    difficulty: "热身",
    category: "目标",
    setup: "MAKE A DECK",
    prompt: "你让 AI 做 PPT 的第一句话通常是什么？",
    options: [
      { label: "做个关于 AI 的 PPT，要高级", points: 0, reaction: "主题很大，观众和目的都在休假。" },
      { label: "做 20 页，字少一点", points: 1, reaction: "页数有了，为什么做仍然未知。" },
      { label: "先给材料，让 AI 自己理解", points: 2, reaction: "有上下文，但叙事目标仍可能漂移。" },
      { label: "先明确观众、场合、时长、目标与行动", points: 3, best: true, reaction: "你先决定演讲要改变谁。" },
    ],
    explanation: "好 PPT 先解决沟通目标，再解决页面。生成工具无法替你决定观众应该理解、相信或采取什么行动。",
    takeaway: "先写一页 brief：给谁看、为什么看、看完做什么。",
  },
  {
    id: "ppt-storyboard",
    dimension: "story",
    difficulty: "热身",
    category: "故事线",
    setup: "ONE SHOT / 30 SLIDES",
    prompt: "30 页 PPT，哪种生成顺序最不容易变成废话合集？",
    options: [
      { label: "直接生成 30 页，页数就是结构", points: 0, reaction: "目录、总结和谢谢占据了半壁江山。" },
      { label: "先生成所有正文，再补标题", points: 1, reaction: "故事线由段落随机决定。" },
      { label: "先要大纲，再逐页填内容", points: 2, reaction: "已经有骨架，还差每页的视觉意图。" },
      { label: "先故事线，再做逐页 storyboard，最后生成", points: 3, best: true, reaction: "每一页终于知道自己为什么存在。" },
    ],
    explanation: "Storyboard 应写清每页的一句话结论、证据与视觉形式，能在生成前发现重复、跳跃和空洞。",
    takeaway: "先审故事板，再花时间生成页面。",
  },
  {
    id: "ppt-sources",
    dimension: "story",
    difficulty: "进阶",
    category: "事实",
    setup: "DATA LOOKS PLAUSIBLE",
    prompt: "AI 给 PPT 填了几个很像真的市场数据。你怎么办？",
    options: [
      { label: "图表好看就先用，观众不会查", points: 0, reaction: "可信度已外包给配色。" },
      { label: "让 AI 再确认一次", points: 1, reaction: "同一个模型为自己签了字。" },
      { label: "删掉数据，只留趋势箭头", points: 1, reaction: "避免造假的方式是避免信息。" },
      { label: "保存来源、快照与计算口径，关键数字逐一核验", points: 3, best: true, reaction: "图表开始承载证据，而不是气氛。" },
    ],
    explanation: "演示文稿里的关键事实需要可追溯来源。尤其是市场、财务和研究数据，必须保留快照与口径。",
    takeaway: "让 AI 同时交付来源表；关键数字不要只在模型内部闭环。",
  },
  {
    id: "ppt-tool-choice",
    dimension: "tools",
    difficulty: "热身",
    category: "选工具",
    setup: "FAST OR CONTROLLED?",
    prompt: "Gamma、Canva、Plus AI、原生 PPTX，到底怎么选？",
    options: [
      { label: "哪个最近最火就永远用哪个", points: 0, reaction: "工具选择已交给热搜。" },
      { label: "所有场景都用 PowerPoint 手工画", points: 1, reaction: "控制力拉满，时间已经离职。" },
      { label: "先用生成器快出，再一律截图交付", points: 1, reaction: "速度有了，可编辑性没了。" },
      { label: "快稿用 Gamma/Canva；强控制用模板化原生 PPTX 或 Plus AI", points: 3, best: true, reaction: "你开始按交付物选工具，不按信仰。" },
    ],
    explanation: "Gamma/Canva 适合快速形成完整视觉；品牌模板、批量生成和原生编辑要求高时，PPTX Skill/Plus AI/PptxGenJS 更可控。",
    takeaway: "先问最终要网页演示、PDF，还是可编辑的原生 PPTX。",
    sources: [
      { label: "Gamma 2026", url: "https://gamma.app/", snapshot: "2026-07" },
      { label: "Plus AI", url: "https://plusai.com/", snapshot: "2026-07" },
    ],
  },
  {
    id: "ppt-brand",
    dimension: "tools",
    difficulty: "进阶",
    category: "品牌模板",
    setup: "MAKE IT APPLE",
    prompt: "公司有固定品牌，怎么避免 AI 每次都设计成不同宇宙？",
    options: [
      { label: "Prompt 里多写几遍‘高级、极简、苹果感’", points: 0, reaction: "形容词的音量已经拉满。" },
      { label: "每页生成后人工改颜色和字体", points: 1, reaction: "AI 省下的时间被你重新花掉。" },
      { label: "给一张参考截图，让它自由模仿", points: 2, reaction: "有方向，但缺少可执行的版式约束。" },
      { label: "提供母版、字体、色板、版式组件和真实样例", points: 3, best: true, reaction: "审美终于从形容词变成了资产。" },
    ],
    explanation: "稳定风格来自设计系统和模板资产，而不是更抽象的审美形容词。Canva Brand Kit、Beautiful.ai 团队库、PPTX 模板都能喂给 Skill。",
    takeaway: "把母版、组件、字体和示例放进 Skill，让每次生成复用同一套规则。",
    sources: [{ label: "Canva Brand Kit + AI", url: "https://www.canva.com/", snapshot: "2026-07" }],
  },
  {
    id: "ppt-native-edit",
    dimension: "tools",
    difficulty: "进阶",
    category: "可编辑性",
    setup: "EDIT THIS CHART",
    prompt: "客户要改图表数字。你交付的 PPT 最好是什么结构？",
    options: [
      { label: "整页是一张 4K 图片", points: 0, reaction: "每个数字都获得了永久纹身。" },
      { label: "图表截图，文字可以编辑", points: 1, reaction: "能改标题，不能改数据。" },
      { label: "把图片切成很多小图层", points: 1, reaction: "可编辑性变成了拼图游戏。" },
      { label: "文字、图表、形状尽量用原生 PPT 对象", points: 3, best: true, reaction: "客户终于不需要 Photoshop 改柱状图。" },
    ],
    explanation: "PptxGenJS、Plus AI 等方案可以生成原生文本、图表、图片、表格和模板，适合需要后续编辑的交付。",
    takeaway: "需要编辑的内容用原生对象；装饰性视觉才考虑扁平图片。",
    sources: [{ label: "PptxGenJS", url: "https://github.com/gitbrent/PptxGenJS", snapshot: "2026-07" }],
  },
  {
    id: "ppt-visual-consistency",
    dimension: "qa",
    difficulty: "进阶",
    category: "视觉素材",
    setup: "9 STYLES / 1 DECK",
    prompt: "一份 PPT 里 AI 生成了九种画风。你怎么救？",
    options: [
      { label: "每张都很好看，保留多元宇宙", points: 0, reaction: "这不是风格，是联展。" },
      { label: "统一套一个黑白滤镜", points: 1, reaction: "颜色统一了，叙事仍然分裂。" },
      { label: "删掉所有图，只留字", points: 1, reaction: "视觉问题通过取消视觉解决。" },
      { label: "先定 art direction，再批量生成或筛选一致素材", points: 3, best: true, reaction: "素材开始像同一个团队做的。" },
    ],
    explanation: "统一素材不只是颜色一致，还包括构图、质感、镜头、人物和信息密度。最好在生成前定参考图和风格描述。",
    takeaway: "在生成图片前写一段整套视觉方向，并用同一参考与尺寸。",
  },
  {
    id: "ppt-render-qa",
    dimension: "qa",
    difficulty: "高阶",
    category: "渲染验收",
    setup: "BUILD PASSED",
    prompt: "PPTX 成功生成后，你做过哪一级验收？",
    options: [
      { label: "文件存在，结束", points: 0, reaction: "第 12 页的标题已经离开画布。" },
      { label: "打开封面，能看就交", points: 1, reaction: "封面代表制再次获胜。" },
      { label: "快速翻一遍所有页面", points: 2, reaction: "有人工验收，但很难形成自动闭环。" },
      { label: "渲染全页缩略图和单页大图，检查后再迭代", points: 3, best: true, reaction: "你在验收观众看到的东西。" },
    ],
    explanation: "可靠的 PPT Skill 会把 PPTX 渲染成图，做 montage 总览，再针对问题页放大检查。视觉错误只有渲染后才看得清。",
    takeaway: "先看全局节奏，再看单页溢出、对齐、字号和图表。",
    sources: [{ label: "Presentation Skill render QA", url: "https://github.com/sirilsengolraj-source/presentation-skill", snapshot: "2026-07" }],
  },
];

const iosQuestions: QuizQuestion[] = [
  {
    id: "ios-idea-to-agent",
    dimension: "workflow",
    difficulty: "热身",
    category: "想法落地",
    setup: "老师想做一个课堂计时器 App",
    prompt: "你不是全职开发者，但想用 AI 做一个给学生用的 iOS 小工具。起点是？",
    options: [
      { label: "先学三个月 SwiftUI", points: 0, reaction: "热情可能在 Xcode 第一次崩溃时消失。" },
      { label: "直接让 Agent 写完整项目", points: 1, reaction: "Agent 写完了，你不会改也不会上架。" },
      { label: "用自然语言描述需求 + 学生画像 + 核心功能，让 Agent 先出原型和数据模型", points: 3, best: true, reaction: "你把「我会做」和「我能验收」分开了。" },
      { label: "在 App Store 搜现成的", points: 1, reaction: "现成的永远差一点点。" },
    ],
    explanation: "2026 年非专业开发者常用路径：Claude Code / Cursor 先规划架构、生成 SwiftUI 原型、用 MCP 跑模拟器验证。你负责说清楚「给谁用、解决什么痛点、什么算做好」。",
    takeaway: "先把需求翻译成可执行的 brief，Agent 再开始写代码。",
  },
  {
    id: "ios-cursor-xcode",
    dimension: "workflow",
    difficulty: "进阶",
    category: "工具栈",
    setup: "Cursor 还是 Xcode",
    prompt: "你用 AI 写 iOS App 时，主要在哪个环境里工作？",
    options: [
      { label: "只用 Cursor，Xcode 偶尔打开", points: 1, reaction: "预览和 Instruments 经常救命。" },
      { label: "只用 Xcode + 内置智能体", points: 2, reaction: "已经很强，但有时想更快迭代。" },
      { label: "Cursor 负责重构和生成，Xcode 负责预览、调试和最终构建", points: 3, best: true, reaction: "你把两个工具的强项拼起来了。" },
      { label: "纯命令行 + Agent", points: 0, reaction: "SwiftUI 预览哭了。" },
    ],
    explanation: "2026 主流工作流是混合：Cursor（或 Claude Code）做大块生成和重构，Xcode 做真机预览、Instruments、签名、TestFlight。MCP 让 Cursor 能直接调用 Xcode 构建和模拟器。",
    takeaway: "Cursor 写代码，Xcode 看结果和上架。别只活在一个世界。",
    sources: [
      { label: "Cursor iOS 工作流", url: "https://cursor.com/", snapshot: "2026-07" },
      { label: "Xcode 27 Intelligence", url: "https://developer.apple.com/", snapshot: "2026-07" },
    ],
  },
  {
    id: "ios-mcp",
    dimension: "tools",
    difficulty: "进阶",
    category: "MCP 自动化",
    setup: "不想每次都手动点",
    prompt: "你希望 Agent 能自己编译、跑模拟器、截图、甚至准备 TestFlight。你会怎么给它能力？",
    options: [
      { label: "给它完整 Mac 访问权限", points: 0, reaction: "便利和灾难同时到货。" },
      { label: "手动每次都告诉它怎么点 Xcode", points: 1, reaction: "你成了昂贵的鼠标。" },
      { label: "安装 XcodeBuildMCP + 模拟器 MCP，让 Agent 通过结构化工具操作", points: 3, best: true, reaction: "你把「我点」变成了「我授权」。" },
      { label: "只让它写代码，构建我自己来", points: 2, reaction: "已经不错，但还有 80% 的重复劳动。" },
    ],
    explanation: "2026 年 MCP 生态里有 XcodeBuildMCP、Simulator MCP、甚至直接连 App Store Connect 的 publish MCP。Agent 可以通过它们做构建、截图、上传而不需要你手动操作。",
    takeaway: "想让 Agent 真干活，就给它结构化的 MCP 工具，而不是全键盘鼠标权限。",
    sources: [{ label: "MCP iOS 生态", url: "https://mobbin.com/mcp", snapshot: "2026-07" }],
  },
  {
    id: "ios-simulator-vs-real",
    dimension: "qa",
    difficulty: "热身",
    category: "测试",
    setup: "模拟器过了就行吗",
    prompt: "Agent 说 App 在模拟器里跑得很好。你下一步？",
    options: [
      { label: "直接打包上架", points: 0, reaction: "真机上的权限和性能会教育你。" },
      { label: "自己拿两台真机快速过一遍", points: 2, reaction: "你至少还记得真机存在。" },
      { label: "让 Agent 用 MCP 跑真机构建 + 设备测试 + 截图", points: 3, best: true, reaction: "你把真机测试也自动化了。" },
      { label: "信 Agent 就够了", points: 0, reaction: "希望是世界上最稳的设备农场。" },
    ],
    explanation: "模拟器和真机差异极大（网络、权限、性能、传感器）。2026 年可以用 MCP + 真机或 Xcode Cloud 让 Agent 做真机验证。",
    takeaway: "模拟器是开发环境，真机和 TestFlight 才是用户环境。",
    sources: [{ label: "Apple TestFlight 流程", url: "https://developer.apple.com/testflight/", snapshot: "2026-07" }],
  },
  {
    id: "ios-metadata",
    dimension: "qa",
    difficulty: "进阶",
    category: "上架文案",
    setup: "准备提审",
    prompt: "App 功能做好了，现在要写 App Store 标题、副标题、描述和关键词。你怎么做？",
    options: [
      { label: "让 Agent 随便写一版就提交", points: 0, reaction: "审核和用户会一起教育你。" },
      { label: "自己手写，保证每个字都是真心话", points: 1, reaction: "真心话不一定能被搜到。" },
      { label: "用 asc / MCP 让 Agent 生成多版 + 本地化 + A/B 建议，你来终审", points: 3, best: true, reaction: "你把文案也变成了可迭代的工作流。" },
      { label: "抄竞品改几个词", points: 1, reaction: "抄来的永远排在抄的人后面。" },
    ],
    explanation: "App Store Connect 元数据直接影响发现和转化。2026 年可以用 asc CLI + Skills 让 Agent 批量生成、翻译、检查长度和关键词，再由人决定最终版。",
    takeaway: "上架文案是产品的一部分，别让 Agent 自由发挥。",
    sources: [{ label: "ASC CLI + Skills", url: "https://github.com/rorkai/app-store-connect-cli-skills", snapshot: "2026-07" }],
  },
  {
    id: "ios-privacy",
    dimension: "qa",
    difficulty: "高阶",
    category: "隐私与审核",
    setup: "App 要收集数据",
    prompt: "你的 App 需要健康数据 + 相机。你让 AI 怎么处理隐私部分？",
    options: [
      { label: "让 Agent 自动勾选所有权限", points: 0, reaction: "审核信封已经寄出。" },
      { label: "自己手动写隐私标签和使用说明", points: 2, reaction: "正确，但很累。" },
      { label: "先让 Agent 列出所有数据使用场景和理由，你再精简到最小必要", points: 3, best: true, reaction: "你把「能要」和「必须要」分开了。" },
      { label: "等审核被拒再改", points: 0, reaction: "经典的「先上车后补票」。" },
    ],
    explanation: "App Store 隐私标签、App Tracking Transparency、HealthKit 权限都需要准确声明。Agent 可以帮你列场景，但最终最小化 + 准确描述必须由人把关。",
    takeaway: "隐私不是功能，是上架的硬门槛。越小越安全。",
  },
];

const webQuestions: QuizQuestion[] = [
  {
    id: "web-starter",
    dimension: "tool",
    difficulty: "热身",
    category: "选工具",
    setup: "想做一个落地页",
    prompt: "非开发者想做一个带表单和支付的宣传页。2026 年最快的靠谱起点？",
    options: [
      { label: "先学 React 三个月", points: 0, reaction: "用户可能已经跑了。" },
      { label: "直接用 Lovable / v0 / Bolt.new 生成", points: 2, reaction: "你已经敢把想法扔给 AI 了。" },
      { label: "Lovable 搭原型 + 后端，v0 调 UI，Cursor 修复杂逻辑，最后 Vercel 一键上线", points: 3, best: true, reaction: "你把不同工具的强项拼成了完整链路。" },
      { label: "用传统建站工具拖拽", points: 1, reaction: "快是快了，但想加个自定义功能就抓瞎。" },
    ],
    explanation: "2026 年非技术用户常用 Lovable（全栈友好）、v0（设计质量高）、Bolt.new（浏览器内零安装）。想长期迭代就接 Cursor + Git。部署基本免费一键到 Vercel。",
    takeaway: "先用 AI 建站工具跑通 0→1，再决定要不要深入代码。",
    sources: [
      { label: "Lovable 2026", url: "https://lovable.dev/", snapshot: "2026-07" },
      { label: "v0 Vercel", url: "https://vercel.com/blog/introducing-the-new-v0", snapshot: "2026-07" },
    ],
  },
  {
    id: "web-handoff",
    dimension: "workflow",
    difficulty: "进阶",
    category: "交接",
    setup: "从生成到维护",
    prompt: "AI 帮你生成了一个 Next.js 网站，你想长期自己改功能。下一步最明智？",
    options: [
      { label: "继续只在聊天里改，每次都重新生成", points: 0, reaction: "历史记录已经变成第二个代码仓库。" },
      { label: "直接扔给 Cursor / Claude Code 接管整个仓库", points: 3, best: true, reaction: "你终于把「生成」升级成了「拥有」。" },
      { label: "只改 CSS，功能永远别动", points: 1, reaction: "你已经接受了半成品的命运。" },
      { label: "重新用传统方式重写一遍", points: 0, reaction: "AI 省下的时间被你全部花光。" },
    ],
    explanation: "v0/Lovable/Bolt 生成的代码质量已经很高，但想长期维护就必须接 Git + Cursor/Claude Code。把项目导入后用 AGENTS.md 写清规则，后续改动才有上下文。",
    takeaway: "生成只是开始。想拥有它，就把它变成一个真正的代码仓库。",
    sources: [{ label: "Cursor Agent 模式", url: "https://cursor.com/", snapshot: "2026-07" }],
  },
  {
    id: "web-design-system",
    dimension: "tool",
    difficulty: "进阶",
    category: "一致性",
    setup: "多页面要统一",
    prompt: "AI 给你的网站三个页面用了三种按钮风格。你怎么救？",
    options: [
      { label: "每页都好看，保留多元宇宙", points: 0, reaction: "用户会以为进了三个不同网站。" },
      { label: "写一个长 Prompt 让它「统一风格」", points: 1, reaction: "下次生成又会忘记。" },
      { label: "先建立设计系统（颜色、字体、组件），再让 Agent 全部重构", points: 3, best: true, reaction: "你把审美从描述变成了可执行资产。" },
      { label: "手动改三个页面", points: 1, reaction: "AI 省下的时间被你还回去了。" },
    ],
    explanation: "v0 支持设计系统、Cursor 可以读 shadcn/ui 或自定义组件库。把设计令牌和组件规范写进 AGENTS.md 或 Skill，后续生成就会自动遵守。",
    takeaway: "一致性来自可复用的设计系统，而不是每次都重新描述。",
  },
  {
    id: "web-backend",
    dimension: "workflow",
    difficulty: "进阶",
    category: "后端",
    setup: "需要存数据",
    prompt: "宣传页需要存用户邮箱 + 简单支付。你会怎么处理？",
    options: [
      { label: "让 Agent 自己搭数据库和支付", points: 1, reaction: "安全和合规正在排队。" },
      { label: "直接接 Supabase / Stripe + Vercel，Agent 只负责调用", points: 3, best: true, reaction: "你用成熟服务换取了睡眠质量。" },
      { label: "先放本地 JSON", points: 0, reaction: "用户数据将在下次部署时消失。" },
      { label: "做成纯静态，功能以后再说", points: 1, reaction: "以后经常就是永远。" },
    ],
    explanation: "2026 年 Lovable、v0、Bolt 都深度集成 Supabase / Vercel KV / Stripe。优先用成熟托管服务 + 结构化调用，比让 Agent 从零造轮子安全得多。",
    takeaway: "后端选成熟服务，Agent 只负责业务逻辑和 UI。",
    sources: [{ label: "Vercel + Supabase 集成", url: "https://vercel.com/", snapshot: "2026-07" }],
  },
  {
    id: "web-perf",
    dimension: "qa",
    difficulty: "高阶",
    category: "性能与体验",
    setup: "页面慢",
    prompt: "网站上线后首页加载要 6 秒。你让 Agent 怎么诊断？",
    options: [
      { label: "让它再生成一次「更快版本」", points: 0, reaction: "随机种子又被扔了一次。" },
      { label: "自己打开 DevTools 看一眼", points: 1, reaction: "你至少还记得性能存在。" },
      { label: "让 Agent 用浏览器工具跑 Lighthouse，分析阻塞资源、图片、JS，再优化", points: 3, best: true, reaction: "你让 Agent 看到了用户真正感受到的慢。" },
      { label: "加 CDN 就完事", points: 1, reaction: "CDN 治标不治本。" },
    ],
    explanation: "现代 AI 浏览器工具可以跑真实性能分析（Lighthouse、Network、Core Web Vitals）。让 Agent 自己诊断、修复、再验证，比你猜快得多。",
    takeaway: "性能问题必须在真实浏览器里被测量，而不是被猜测。",
    sources: [{ label: "Web Perf 实践 2026", url: "https://web.dev/", snapshot: "2026-07" }],
  },
];

const codexQuestions: QuizQuestion[] = [
  {
    id: "codex-goal",
    dimension: "context",
    difficulty: "热身",
    category: "长任务",
    setup: "BIG TASK / MANY TURNS",
    prompt: "一个任务要做很久，还要持续跟踪进度。你通常怎么用 Codex？",
    options: [
      { label: "一句话：全部做完，别问", points: 0, reaction: "目标很宏大，完成标准不存在。" },
      { label: "让它先写一段计划，然后聊天记录里找进度", points: 1, reaction: "有计划，但没有持续状态。" },
      { label: "用 /plan 拆步骤，自己盯着完成", points: 2, reaction: "已经会规划，还差持久目标。" },
      { label: "先 /plan，再用 /goal 建持续目标并随时调整", points: 3, best: true, reaction: "任务终于不会因为回合结束而失忆。" },
    ],
    explanation: "/plan 适合塑形多步骤工作；/goal 会建立持续目标并显示进度，可暂停、恢复和编辑。",
    takeaway: "长任务先计划，再建立 Goal；不要把完成标准藏在聊天历史里。",
    sources: [{ label: "OpenAI Slash commands", url: "https://learn.chatgpt.com/docs/reference/slash-commands", snapshot: "2026-07" }],
  },
  {
    id: "codex-agents-md",
    dimension: "context",
    difficulty: "热身",
    category: "AGENTS.md",
    setup: "SAME MISTAKE / THIRD TIME",
    prompt: "Codex 第三次忘了你的构建命令。你怎么办？",
    options: [
      { label: "第四次再提醒，语气更重一点", points: 0, reaction: "知识管理升级为情绪管理。" },
      { label: "把命令存进一个 Prompt 便签", points: 1, reaction: "能复用，但不会随仓库自动生效。" },
      { label: "写进仓库根目录 AGENTS.md", points: 2, reaction: "规则开始跟着仓库走了。" },
      { label: "写进最近作用域的 AGENTS.md，并用检查工具兜底", points: 3, best: true, reaction: "提醒变规则，规则再变成约束。" },
    ],
    explanation: "AGENTS.md 用于持久项目规则；靠近工作目录的文件优先。关键规则还应由 lint、测试或 hook 执行。",
    takeaway: "重复犯错就固化到最近作用域的 AGENTS.md；能机械检查的再交给工具。",
    sources: [{ label: "OpenAI Customization", url: "https://learn.chatgpt.com/docs/customization/overview", snapshot: "2026-07" }],
  },
  {
    id: "codex-skills",
    dimension: "tools",
    difficulty: "热身",
    category: "Skills",
    setup: "REPEATABLE WORKFLOW",
    prompt: "发布、周报、做 PPT 都有固定步骤。你在 Codex 里怎么复用？",
    options: [
      { label: "每次重新解释一遍", points: 0, reaction: "流程的唯一存储介质是你的耐心。" },
      { label: "收藏一段万能 Prompt", points: 1, reaction: "有说明书，但没有脚本、模板和参考资料。" },
      { label: "安装别人做好的 Plugin", points: 2, reaction: "懂得先复用成熟方案。" },
      { label: "优先装现成 Plugin；没有就做 Skill，带脚本与模板", points: 3, best: true, reaction: "你开始积累能力，而不是积累聊天记录。" },
    ],
    explanation: "Skill 可以封装说明、脚本、参考与资源；Plugin 是可安装的分发单元，可同时带 Skill 和外部工具。",
    takeaway: "重复工作先找 Plugin；没有成熟方案再做 Skill。",
    sources: [{ label: "OpenAI Skills & Plugins", url: "https://learn.chatgpt.com/docs/skills-and-plugins", snapshot: "2026-07" }],
  },
  {
    id: "codex-mcp",
    dimension: "tools",
    difficulty: "进阶",
    category: "MCP",
    setup: "GITHUB / FIGMA / DOCS",
    prompt: "Codex 需要读取 Figma、GitHub 或公司知识库。你怎么给它能力？",
    options: [
      { label: "把所有内容截图后拖进聊天", points: 0, reaction: "实时系统被压成了静态考古材料。" },
      { label: "让 Codex 自己猜接口", points: 0, reaction: "工具调用进入民间传说阶段。" },
      { label: "临时复制数据，做完一次就算", points: 1, reaction: "能完成，不能复用。" },
      { label: "安装对应 Plugin/MCP，并审查权限和可用工具", points: 3, best: true, reaction: "外部系统终于不是一张截图。" },
    ],
    explanation: "MCP 为 Codex 暴露外部工具、资源和 Prompt；Plugin 可以把 MCP 与工作流一起安装。",
    takeaway: "结构化系统优先用 Plugin/MCP，不要长期依赖截图和复制粘贴。",
    sources: [{ label: "OpenAI Customization / MCP", url: "https://learn.chatgpt.com/docs/customization/overview", snapshot: "2026-07" }],
  },
  {
    id: "codex-browser",
    dimension: "tools",
    difficulty: "进阶",
    category: "Browser",
    setup: "VERIFY THE UI",
    prompt: "Codex 改完网页后，你用过哪一级验收？",
    options: [
      { label: "只看 build 通过", points: 0, reaction: "页面在理论上非常漂亮。" },
      { label: "我自己打开浏览器，看一眼", points: 1, reaction: "有人看过，但 Agent 没形成闭环。" },
      { label: "让 Codex 用内置 Browser 打开并截图", points: 2, reaction: "已经让 Agent 看见结果。" },
      { label: "让它复现、查控制台/DOM、修复并再次验证", points: 3, best: true, reaction: "你已经不接受‘应该好了’。" },
    ],
    explanation: "内置 Browser 能操作和验证页面；Developer mode 可使用 CDP 检查 DOM、网络、样式与性能。",
    takeaway: "网页任务要让 Codex 亲自跑一遍用户路径，并检查错误。",
    sources: [{ label: "OpenAI Browser", url: "https://learn.chatgpt.com/docs/browser", snapshot: "2026-07" }],
  },
  {
    id: "codex-worktree",
    dimension: "automation",
    difficulty: "进阶",
    category: "Worktrees",
    setup: "PARALLEL TASKS",
    prompt: "你有没有让 Codex 用 Worktree 并行做独立任务？",
    options: [
      { label: "没听过 Worktree", points: 0, reaction: "今天已经查到一个明确缺口。" },
      { label: "听过，但所有任务仍在同一目录", points: 1, reaction: "概念已安装，工作流未启用。" },
      { label: "偶尔手动建分支，任务仍串行", points: 2, reaction: "隔离有了，并行还没完全打开。" },
      { label: "独立任务开 Worktree，完成后审查、Handoff 或合并", points: 3, best: true, reaction: "你把并行从口号变成了文件边界。" },
    ],
    explanation: "Codex-managed Worktree 让多个任务拥有独立 checkout，并可通过 Handoff 在后台与本地之间移动。",
    takeaway: "并行任务用 Worktree 隔离；共享核心文件仍应串行。",
    sources: [{ label: "OpenAI Worktrees", url: "https://learn.chatgpt.com/docs/environments/git-worktrees", snapshot: "2026-07" }],
  },
  {
    id: "codex-scheduled",
    dimension: "automation",
    difficulty: "高阶",
    category: "Scheduled Tasks",
    setup: "RUN AGAIN TOMORROW",
    prompt: "依赖更新、线上错误、PR 状态需要反复检查。你用过 Scheduled Task 吗？",
    options: [
      { label: "没有，每次靠我想起来", points: 0, reaction: "你的大脑仍是唯一调度器。" },
      { label: "用日历提醒我再打开 Codex", points: 1, reaction: "自动化走到门口，又把你叫回来。" },
      { label: "建过定时任务，但没写停止和报告条件", points: 2, reaction: "会跑了，还需要学会什么时候闭嘴。" },
      { label: "用最小权限定时运行，限定发现条件、输出和停止规则", points: 3, best: true, reaction: "后台 Agent 终于像一个可管理的同事。" },
    ],
    explanation: "Scheduled Tasks 可在项目或独立 Worktree 后台运行，也可调用 Skills 与 Plugins。",
    takeaway: "重复检查交给定时任务；先手动跑通，再设置最小权限和清晰退出条件。",
    sources: [{ label: "OpenAI Scheduled Tasks", url: "https://learn.chatgpt.com/docs/automations", snapshot: "2026-07" }],
  },
];

const typeQuestions: QuizQuestion[] = [
  {
    id: "type-brief",
    dimension: "brief",
    difficulty: "热身",
    category: "表达力",
    setup: "MAKE IT PREMIUM",
    prompt: "老板说：做个高级点的 PPT。你转头怎么跟 AI 说？",
    options: [
      { label: "做个高级点的 PPT", points: 0, reaction: "原封不动，压力完成了传递。" },
      { label: "做得像苹果，字少，图大", points: 1, reaction: "审美词库已加载。" },
      { label: "补上观众、场合、材料和页数", points: 2, reaction: "需求开始有了形状。" },
      { label: "先追问目标，再给范围、参考和验收标准", points: 3, reaction: "你不是传话筒，你是需求翻译器。" },
    ],
    explanation: "记录你的表达习惯：是转发愿望，还是把愿望翻译成可执行任务。",
    takeaway: "表达力不是 Prompt 长，而是目标、边界和完成标准清楚。",
  },
  {
    id: "type-teacher",
    dimension: "brief",
    difficulty: "热身",
    category: "表达力",
    setup: "TEACH THIS",
    prompt: "老师要让 AI 设计一节课。你觉得最重要的输入是什么？",
    options: [
      { label: "课题名称，其他让 AI 自由发挥", points: 0, reaction: "学生年龄也进入了自由发挥。" },
      { label: "让它参考优秀教案", points: 1, reaction: "有参考，没有你的课堂。" },
      { label: "学生水平、课时和知识点", points: 2, reaction: "教学现场已经出现。" },
      { label: "再加学习目标、活动限制和评价方式", points: 3, reaction: "你把‘教过’和‘学会’分开了。" },
    ],
    explanation: "同一题目面对不同学生，合适的课堂完全不同。",
    takeaway: "告诉 AI 谁在使用结果，以及什么算真正有效。",
  },
  {
    id: "type-repeat",
    dimension: "agency",
    difficulty: "热身",
    category: "工具力",
    setup: "DO THIS EVERY WEEK",
    prompt: "同一件 AI 工作已经做第三次。你下一步通常是什么？",
    options: [
      { label: "第四次继续复制 Prompt", points: 0, reaction: "稳定复现了人工劳动。" },
      { label: "把 Prompt 存进备忘录", points: 1, reaction: "手工流程获得了收藏夹。" },
      { label: "找有没有现成 Skill 或 Plugin", points: 2, reaction: "开始复用别人的经验。" },
      { label: "装现成方案，或把自己的流程做成 Skill", points: 3, reaction: "你在积累能力，不是在积累疲劳。" },
    ],
    explanation: "记录你是否会主动把重复劳动升级成工具。",
    takeaway: "重复三次，就是自动化候选。",
  },
  {
    id: "type-sheet",
    dimension: "agency",
    difficulty: "进阶",
    category: "工具力",
    setup: "3000 ROWS",
    prompt: "3000 行表格需要清洗。你的第一反应？",
    options: [
      { label: "先手动改十行，找找感觉", points: 0, reaction: "感觉找到了，周末失去了。" },
      { label: "问 AI 公式，然后自己复制到表格", points: 1, reaction: "AI 是顾问，你仍是操作员。" },
      { label: "上传文件，让 AI 直接处理并返回结果", points: 2, reaction: "工具已经开始替你动手。" },
      { label: "先备份，再让 Agent 处理、校验抽样和输出差异", points: 3, reaction: "自动化和安全带一起装上了。" },
    ],
    explanation: "工具力不只是让 AI 出主意，而是让它在受控边界内完成操作。",
    takeaway: "让 AI 操作真实文件，同时保留原始数据和验收证据。",
  },
  {
    id: "type-browser",
    dimension: "agency",
    difficulty: "高阶",
    category: "工具力",
    setup: "BUTTON DOESN'T WORK",
    prompt: "你做的网站按钮点不动。你最可能怎么处理？",
    options: [
      { label: "描述：就是这里不对，你再看看", points: 0, reaction: "错误位置精确到整个互联网。" },
      { label: "截图后让 AI 猜", points: 1, reaction: "有现场照片，没有现场操作。" },
      { label: "把控制台报错复制过去", points: 2, reaction: "证据有了，闭环仍靠你。" },
      { label: "让 Agent 自己开页面、复现、修复、再点击验证", points: 3, reaction: "你把鼠标也交给了工作流。" },
    ],
    explanation: "Viber 的分水岭，是 AI 只给建议，还是能真正完成并验证动作。",
    takeaway: "能给工具就别做人工传感器。",
  },
  {
    id: "type-research",
    dimension: "proof",
    difficulty: "热身",
    category: "验收力",
    setup: "SOUNDS TRUE",
    prompt: "AI 给了一个很像真的结论。你一般怎么处理？",
    options: [
      { label: "语气这么确定，应该是真的", points: 0, reaction: "自信成功替代了证据。" },
      { label: "再问一句：你确定吗", points: 1, reaction: "模型为自己完成了复审。" },
      { label: "让它给来源，我随机点一个", points: 2, reaction: "开始验收，但抽检略显随缘。" },
      { label: "关键结论回到原始来源，核对日期和上下文", points: 3, reaction: "你没有把引用链接当装饰。" },
    ],
    explanation: "验收力决定你拿到的是漂亮答案，还是可靠结果。",
    takeaway: "重要结论必须能回到原始材料。",
  },
  {
    id: "type-done",
    dimension: "proof",
    difficulty: "进阶",
    category: "验收力",
    setup: "DONE ✅",
    prompt: "Agent 说：已经完成。你的下一步是什么？",
    options: [
      { label: "它都打勾了，当然结束", points: 0, reaction: "绿色对勾成为唯一验收报告。" },
      { label: "问它有没有测试", points: 1, reaction: "获得第二份口头保证。" },
      { label: "看它运行了什么命令", points: 2, reaction: "开始检查证据链。" },
      { label: "按用户路径亲自或让 Agent 再走一遍", points: 3, reaction: "你验收的是结果，不是语气。" },
    ],
    explanation: "完成声明不是完成证据。不同交付物需要不同的最终验收。",
    takeaway: "最后一步永远是验证真实用户看到的结果。",
  },
];

const standardLevels = (titles: [string, string, string, string, string], quotes: [string, string, string, string, string]): TestLevel[] => [
  { min: 90, tier: "夯", code: "HARD", title: titles[0], icon: "⚡", quote: quotes[0], roast: "不是听说过，是已经跑进工作流。", color: "#d9efc7", ink: "#183b20" },
  { min: 75, tier: "顶级", code: "TOP", title: titles[1], icon: "🔥", quote: quotes[1], roast: "大部分新玩法你都用过，剩下的缺口已经被点名。", color: "#dce8ff", ink: "#18345f" },
  { min: 55, tier: "人上人", code: "HUMAN", title: titles[2], icon: "🧠", quote: quotes[2], roast: "知道不少，但人肉中间件还没有完全下岗。", color: "#f2e6c8", ink: "#503c13" },
  { min: 30, tier: "NPC", code: "NPC", title: titles[3], icon: "🧍", quote: quotes[3], roast: "AI 在旁边很忙，你也在旁边很忙。", color: "#e8e4dc", ink: "#34322d" },
  { min: 0, tier: "拉完了", code: "DONE", title: titles[4], icon: "🪨", quote: quotes[4], roast: "好消息：这套题至少让你今天少古法一次。", color: "#f5d7ce", ink: "#61291c" },
];

const personalityTypes: PersonalityType[] = [
  { profile: "000", min: 0, tier: "CAVE", code: "CAVE", title: "人肉中间件", icon: "🪨", quote: "AI 在旁边，你在复制粘贴。", roast: "你不是不会用 AI，你只是坚持亲自经过每一个步骤。", color: "#eee6d7", ink: "#4b3b25" },
  { profile: "100", min: 0, tier: "TALK", code: "TALK", title: "Prompt 文学家", icon: "✍️", quote: "提示词八千字，工具调用零次。", roast: "你很会说，只差让 AI 真正动手。", color: "#e2e7f3", ink: "#263653" },
  { profile: "010", min: 0, tier: "PLUG", code: "PLUG", title: "插件松鼠", icon: "🐿️", quote: "安装了四十七个，记得名字的三个。", roast: "你拥有一整片工具森林，偶尔也可以真的用一下。", color: "#f3e2b9", ink: "#523e12" },
  { profile: "001", min: 0, tier: "QAQA", code: "QAQA", title: "赛博质检员", icon: "🔍", quote: "不一定会做，但一定会挑。", roast: "AI 的每句话都要过你这道终审。", color: "#dcebd7", ink: "#294922" },
  { profile: "110", min: 0, tier: "BOSS", code: "BOSS", title: "Agent 包工头", icon: "📣", quote: "活都派出去了，验收偶尔忘了。", roast: "你已经会调兵遣将，工地监理还在招聘。", color: "#f1daca", ink: "#5a2f1e" },
  { profile: "101", min: 0, tier: "CTRL", code: "CTRL", title: "谨慎派甲方", icon: "📋", quote: "需求很清楚，改完必须给我看。", roast: "你把 AI 管得很稳，只是偶尔还在亲自搬砖。", color: "#dce9ee", ink: "#204653" },
  { profile: "011", min: 0, tier: "FLOW", code: "FLOW", title: "自动化疯子", icon: "⚙️", quote: "能装工具就绝不多打一行字。", roast: "流程自己跑得很快，需求有时在后面追。", color: "#e0ecd0", ink: "#334c20" },
  { profile: "111", min: 0, tier: "VIBE", code: "VIBE", title: "Vibe 总导演", icon: "🎬", quote: "人不动手，结果必须过目。", roast: "你会说清楚、会给工具、也会验收。AI 暂时还不能糊弄你。", color: "#d5eadf", ink: "#1f4937" },
];

export const tests: TestDefinition[] = [
  {
    id: "monthly",
    slug: "monthly",
    index: "01",
    kind: "knowledge",
    shortTitle: "7 月综合 AI 月考",
    title: "测测你还在用多少古法操作",
    description: "10 道新知题。覆盖自动化、AI 视频、PPT、建站、iOS 开发、国内工具、事实验收和模型选择。",
    eyebrow: "ISSUE 002 · JULY 2026",
    symbol: "⚡",
    duration: "10 题 · 约 5 分钟",
    startTitle: "2026 年 7 月综合 AI 月考",
    startCopy: "普通人、老师、设计师、创作者、开发者都能答。答完直接补课。",
    cta: "开始 7 月综合月考 →",
    dimensions: [{ key: "discover", label: "新知" }, { key: "delegate", label: "放手" }, { key: "verify", label: "验收" }],
    questions: monthlyQuestions,
    levels: standardLevels(
      ["2026 原生 Viber", "Agent 已接管", "半自动人类", "人肉中间件", "AI 时代手工作坊"],
      ["新工具不是收藏，是已经进工作流。", "大部分旧动作已经交给 Agent。", "会用 AI，也还会亲自搬砖。", "AI 提建议，你负责所有操作。", "每一步都很认真地手工完成。"],
    ),
  },
  {
    id: "video",
    slug: "video",
    index: "02",
    kind: "usage",
    shortTitle: "AI 视频月考",
    title: "你的 AI 视频用法，从夯到拉排第几？",
    description: "9 道题。Prompt、工具选择、一致性、原生音频、时长扩展、视觉验收。",
    eyebrow: "VIDEO CHECK · 2026.07",
    symbol: "🎬",
    duration: "9 题 · 约 4 分钟",
    startTitle: "你拍的是视频，还是随机 GIF？",
    startCopy: "测完拿到工具选择和一致性工作流。",
    cta: "测试我的视频水平 →",
    dimensions: [{ key: "control", label: "控制" }, { key: "tool", label: "工具" }, { key: "qa", label: "验收" }],
    questions: videoQuestions,
    levels: standardLevels(
      ["AI 片场总导演", "多镜头老司机", "提示词摄影师", "随机 GIF 艺术家", "AI 视频 NPC"],
      ["你已经能稳定产出可用的短片。", "工具和分镜都懂，还差一点点打磨。", "知道怎么拍，但一致性和时长还在挣扎。", "会生成，但基本靠运气和后期。", "还在用一句话生成 8 秒。"],
    ),
  },
  {
    id: "ppt",
    slug: "ppt",
    index: "03",
    kind: "usage",
    shortTitle: "AI PPT 月考",
    title: "你的 AI 做 PPT 方案，从夯到拉排第几？",
    description: "9 道题。故事线、工具选择、品牌一致、可编辑性、渲染验收。",
    eyebrow: "WORKFLOW CHECK · AI PPT",
    symbol: "▰",
    duration: "9 题 · 约 4 分钟",
    startTitle: "你做的是 PPT，还是 30 张 AI 壁纸？",
    startCopy: "测完得到适合你的 PPT 工具路线。",
    cta: "评级我的 PPT 方案 →",
    dimensions: [{ key: "story", label: "故事" }, { key: "tools", label: "工具" }, { key: "qa", label: "验收" }],
    questions: pptQuestions,
    levels: standardLevels(
      ["视觉工作流导演", "模板控制派", "AI 排版合伙人", "一键生成信徒", "截图式 PPT 工匠"],
      ["故事、模板、原生对象和验收闭环齐了。", "已经能兼顾速度、品牌和可编辑性。", "AI 能出稿，最终质量主要靠你救。", "点击生成之后，命运接管了排版。", "整页截图也是 PPT，只是不能改。"],
    ),
  },
  {
    id: "ios",
    slug: "ios",
    index: "04",
    kind: "usage",
    shortTitle: "AI iOS 开发月考",
    title: "你用 AI 做 iOS App 的水平，排第几？",
    description: "6 道题。想法翻译、Cursor+Xcode 混搭、MCP 自动化、真机测试、上架文案、隐私。",
    eyebrow: "INDIE MAKER CHECK · 2026.07",
    symbol: "📱",
    duration: "6 题 · 约 3 分钟",
    startTitle: "你的 App 是 Agent 写的，还是你验收的？",
    startCopy: "测完知道怎么让 AI 真正帮你把 App 做完上架。",
    cta: "测试我的 iOS Agent 水平 →",
    dimensions: [{ key: "workflow", label: "流程" }, { key: "tools", label: "工具" }, { key: "qa", label: "验收" }],
    questions: iosQuestions,
    levels: standardLevels(
      ["真· indie 导演", "MCP 驱动的半自动开发者", "Cursor 重度用户", "模拟器居民", "让 Agent 自己上架的人"],
      ["你把需求、工具、验证、上架全链路打通了。", "Agent 已经能干大部分活，你负责把关。", "会用 AI 写代码，但还没把构建和测试交给它。", "主要在模拟器里自嗨。", "还在等 Agent 自己把 App 做完。"],
    ),
  },
  {
    id: "web",
    slug: "web",
    index: "05",
    kind: "usage",
    shortTitle: "AI 网站开发月考",
    title: "你用 AI 建网站的能力，夯还是拉？",
    description: "5 道题。工具选择、从生成到长期维护、设计系统、后端、性能验收。",
    eyebrow: "VIBE CODING CHECK · 2026.07",
    symbol: "🌐",
    duration: "5 题 · 约 3 分钟",
    startTitle: "你建的是能长期维护的网站，还是一次性生成物？",
    startCopy: "测完知道 2026 年普通人怎么把网站做成真的产品。",
    cta: "测试我的建站水平 →",
    dimensions: [{ key: "tool", label: "工具" }, { key: "workflow", label: "流程" }, { key: "qa", label: "验收" }],
    questions: webQuestions,
    levels: standardLevels(
      ["全栈 Vibe 导演", "AI 建站老司机", "原型生成专家", "一次性网站艺术家", "生成即遗忘"],
      ["从想法到上线到长期迭代你都掌握了。", "能用多工具组合做出可维护的产品。", "会用 AI 快速出原型，但维护还在挣扎。", "生成完就发，后面谁爱改谁改。", "还在相信「一次生成永久可用」。"],
    ),
  },
  {
    id: "codex",
    slug: "codex",
    index: "06",
    kind: "usage",
    shortTitle: "Codex 熟练度",
    title: "Codex 的这些功能，你到底用了几个？",
    description: "8 道题。AGENTS.md、Skills、MCP、Worktree、Browser、Scheduled Task。",
    eyebrow: "TOOL CHECK · CODEX 2026.07",
    symbol: "⌘",
    duration: "8 题 · 约 4 分钟",
    startTitle: "别只把 Codex 当聊天框。",
    startCopy: "测完直接得到功能补课清单。",
    cta: "测试 Codex 熟练度 →",
    dimensions: [{ key: "context", label: "上下文" }, { key: "tools", label: "工具" }, { key: "automation", label: "自动化" }],
    questions: codexQuestions,
    levels: standardLevels(
      ["Codex 驯兽大师", "工作流导演", "熟练驾驶员", "聊天框用户", "复制粘贴实习生"],
      ["你在配置系统，不是在重复聊天。", "工具、上下文和自动化已经成体系。", "主功能会用，高阶能力还没完全打开。", "Codex 会写代码，你负责所有周边工作。", "你和 Codex 目前主要通过复制粘贴交流。"],
    ),
  },
  {
    id: "type",
    slug: "type",
    index: "07",
    kind: "personality",
    shortTitle: "Viber 类型",
    title: "你是哪种 Viber？",
    description: "8 道题。测试你的表达力、工具力和验收力。",
    eyebrow: "EVERGREEN · VIBER TYPE",
    symbol: "✦",
    duration: "8 题 · 约 3 分钟",
    startTitle: "AI 在干活，还是你在给 AI 打工？",
    startCopy: "没有标准答案，只有人格证据。",
    cta: "测出我的 Viber 类型 →",
    dimensions: [{ key: "brief", label: "表达力" }, { key: "agency", label: "工具力" }, { key: "proof", label: "验收力" }],
    questions: typeQuestions,
    levels: [],
    personalityTypes,
  },
];

export function getTestBySlug(slug: string) {
  return tests.find((test) => test.slug === slug);
}
