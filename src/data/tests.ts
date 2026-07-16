export type TestId = "monthly" | "codex" | "ppt" | "type";
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
    id: "monthly-app-store",
    dimension: "discover",
    difficulty: "热身",
    category: "App 上架",
    setup: "APP STORE / 47 FIELDS",
    prompt: "又要发新版。App Store 那一堆文案、截图和审核信息，你准备怎么填？",
    options: [
      { label: "打开网页，逐格填写，顺便祈祷别掉登录", points: 0, reaction: "古法手作，苹果网页是你的工位。" },
      { label: "让 AI 写文案，我负责复制粘贴四十七次", points: 1, reaction: "AI 负责脑力，你负责人肉 API。" },
      { label: "让浏览器 Agent 盲点，点错了再说", points: 1, reaction: "自动化了，但没有可复现性。" },
      { label: "把 metadata 版本化，用 asc/API dry-run、校验再提交", points: 3, best: true, reaction: "上架信息终于也配拥有 Git 历史。" },
    ],
    explanation: "Apple 提供 App Store Connect API 管理审核提交；社区 asc CLI 可以把 metadata、截图、构建与提交串成可检查的流程。",
    takeaway: "把上架资料当代码管理：版本化、dry-run、校验、再提交。",
    sources: [
      { label: "Apple Review Submissions API", url: "https://developer.apple.com/documentation/appstoreconnectapi/review-submissions", snapshot: "2026-07" },
      { label: "asc CLI", url: "https://github.com/rorkai/App-Store-Connect-CLI", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-xcode-agent",
    dimension: "discover",
    difficulty: "热身",
    category: "iOS 调试",
    setup: "BUILD FAILED / COPY LOG?",
    prompt: "iOS App 报错，AI 又让你手动复制日志。2026 年更顺手的做法是？",
    options: [
      { label: "复制最后一行红字，前面的都不重要", points: 0, reaction: "你成功删除了 90% 的上下文。" },
      { label: "截图发给纯文本模型，问它看见没有", points: 0, reaction: "一场关于视力的信任实验。" },
      { label: "只让它改代码，构建和模拟器我来点", points: 1, reaction: "你仍然是这条流水线上的传送带。" },
      { label: "接入 Xcode Tools，让 Agent 自己构建、测试和读诊断", points: 3, best: true, reaction: "报错终于可以直接找 AI，不必经过你翻译。" },
    ],
    explanation: "Apple 已支持外部 Agent 通过 xcrun mcpbridge 使用 Xcode 能力；需要操作模拟器 UI 时，还可以补充模拟器 MCP。",
    takeaway: "先给 Agent 结构化的 Xcode 能力；需要视觉交互时再加模拟器工具。",
    sources: [
      { label: "Apple：Giving external agents access to Xcode", url: "https://developer.apple.com/documentation/xcode/giving-external-agents-access-to-xcode", snapshot: "2026-07" },
      { label: "iOS Simulator MCP", url: "https://github.com/whitesmith/ios-simulator-mcp", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-browser",
    dimension: "discover",
    difficulty: "热身",
    category: "页面验收",
    setup: "IT BUILDS / BUT LOOKS WRONG",
    prompt: "网页 build 通过，但手机端按钮飞出了屏幕。你让 AI 怎么查？",
    options: [
      { label: "把代码再读一遍，靠想象还原页面", points: 0, reaction: "CSS 在脑内浏览器里永远正确。" },
      { label: "让它把按钮宽度改成 100%，碰碰运气", points: 1, reaction: "响应式设计进入抽奖环节。" },
      { label: "发一张截图，但不告诉它页面状态", points: 1, reaction: "有画面了，现场坐标仍然失踪。" },
      { label: "用内置浏览器复现、截图、查 DOM/控制台，再修复复测", points: 3, best: true, reaction: "从‘应该没问题’升级到‘我看过了’。" },
    ],
    explanation: "Codex 的内置浏览器可以打开本地页面、点击、截图和验证；Developer mode 还能检查 DOM、网络和控制台。",
    takeaway: "页面问题必须经过真实渲染闭环：复现、观察、修复、再验证。",
    sources: [{ label: "OpenAI：Browser", url: "https://learn.chatgpt.com/docs/browser", snapshot: "2026-07" }],
  },
  {
    id: "monthly-skill-plugin",
    dimension: "delegate",
    difficulty: "进阶",
    category: "Skills",
    setup: "SAME PROMPT / EVERY MONDAY",
    prompt: "每周都让 AI 按同一套格式做汇报。最值得升级的动作是？",
    options: [
      { label: "保存一份 3000 字 Prompt，每周粘贴", points: 1, reaction: "你发明了人工安装包。" },
      { label: "每周重新解释，顺便测试感情是否稳定", points: 0, reaction: "重复沟通也是一种工伤。" },
      { label: "写成 Skill；需要外部系统时再配 Plugin/MCP", points: 3, best: true, reaction: "流程从聊天记录升级成了可复用能力。" },
      { label: "让 AI 自己记住，永远不要写下来", points: 0, reaction: "组织知识已托管给缘分。" },
    ],
    explanation: "Skill 适合可重复的工作流程；Plugin 可以把 Skill 与应用、MCP 工具一起安装和分发。",
    takeaway: "重复三次的 Prompt，值得变成 Skill；需要系统能力时再接 Plugin/MCP。",
    sources: [{ label: "OpenAI：Skills & Plugins", url: "https://learn.chatgpt.com/docs/skills-and-plugins", snapshot: "2026-07" }],
  },
  {
    id: "monthly-ppt",
    dimension: "delegate",
    difficulty: "进阶",
    category: "AI 做 PPT",
    setup: "30 SLIDES / MAKE IT PREMIUM",
    prompt: "你要一份可编辑、能长期复用的品牌 PPT。哪条路线最稳？",
    options: [
      { label: "一句话生成 30 页，导出前绝不回头", points: 0, reaction: "每一页都很完整地表达了随机性。" },
      { label: "生成 30 张图片，再贴进 PowerPoint", points: 0, reaction: "可编辑性已经被压成 JPG。" },
      { label: "先用 Gamma/Canva 出快稿，直接当最终母版", points: 2, reaction: "速度很顶，品牌控制还要补课。" },
      { label: "大纲→故事板→品牌模板→原生 PPTX→逐页渲染验收", points: 3, best: true, reaction: "你做的是演示文稿，不是 30 张 AI 壁纸。" },
    ],
    explanation: "快稿工具适合提速；要求可编辑、可复用和品牌一致时，模板化的原生 PPTX 生成加渲染验收更可控。",
    takeaway: "先选交付物：求快用生成器，求控制用模板化 PPTX 工作流。",
    sources: [
      { label: "PptxGenJS", url: "https://github.com/gitbrent/PptxGenJS", snapshot: "2026-07" },
      { label: "Gamma Export", url: "https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma", snapshot: "2026-07" },
    ],
  },
  {
    id: "monthly-worktree",
    dimension: "delegate",
    difficulty: "进阶",
    category: "并行工作",
    setup: "3 TASKS / 1 REPO",
    prompt: "你想让 Codex 同时做三个互不相关的功能，又不想互相踩文件。怎么开？",
    options: [
      { label: "三个任务都在 main 上同时保存", points: 0, reaction: "分布式冲突正在形成。" },
      { label: "开三个聊天，但都指向同一目录", points: 1, reaction: "聊天分开了，文件还住在一起。" },
      { label: "等第一个做完，再把第二个忘掉", points: 0, reaction: "并行问题被排队解决。" },
      { label: "为独立任务开 Worktree，完成后再审查合并", points: 3, best: true, reaction: "并行终于有了物理边界。" },
    ],
    explanation: "Codex Worktree 为任务创建独立 checkout，适合并行开发，不干扰本地主工作区。",
    takeaway: "并行的前提是写入边界独立；同一核心文件不要硬并发。",
    sources: [{ label: "OpenAI：Worktrees", url: "https://learn.chatgpt.com/docs/environments/git-worktrees", snapshot: "2026-07" }],
  },
  {
    id: "monthly-scheduled",
    dimension: "verify",
    difficulty: "高阶",
    category: "自动巡检",
    setup: "CHECK THIS EVERY DAY",
    prompt: "你希望 AI 每天检查线上错误，有异常才回来报告。最合适的是？",
    options: [
      { label: "每天早上自己想起来，再发一次 Prompt", points: 0, reaction: "自动化最脆弱的依赖：你的记忆。" },
      { label: "开着一个聊天窗口，期待它主动醒来", points: 0, reaction: "窗口很努力地保持了沉默。" },
      { label: "写日历提醒，提醒自己叫 AI", points: 1, reaction: "你给自动化增加了一层人工中转。" },
      { label: "建 Scheduled Task，限定权限、条件和停止规则", points: 3, best: true, reaction: "AI 终于按点上班，你不用。" },
    ],
    explanation: "Scheduled Tasks 可以后台定时运行，也能结合 Skill、Plugin 和独立 Worktree。无人值守时应使用最小权限。",
    takeaway: "把重复检查交给定时任务，同时写清报告条件、权限和停止规则。",
    sources: [{ label: "OpenAI：Scheduled Tasks", url: "https://learn.chatgpt.com/docs/automations", snapshot: "2026-07" }],
  },
  {
    id: "monthly-ppt-qa",
    dimension: "verify",
    difficulty: "高阶",
    category: "PPT 验收",
    setup: "PPTX GENERATED / SHIP?",
    prompt: "AI 已经生成了 PPTX，命令退出码也是 0。现在可以交付了吗？",
    options: [
      { label: "可以，文件能打开就代表设计通过", points: 0, reaction: "文字已经在页面外自由生活。" },
      { label: "只看封面，后面应该会保持礼貌", points: 0, reaction: "第 17 页的表格笑而不语。" },
      { label: "让 AI 再保证一次没有问题", points: 1, reaction: "获得一份不可执行的电子承诺。" },
      { label: "逐页渲染成图，检查溢出、对齐、密度和事实", points: 3, best: true, reaction: "生成成功和交付成功终于分家了。" },
    ],
    explanation: "PPTX 是布局文件，生成成功不代表视觉正确。可靠工作流会渲染每页并进行视觉与内容 QA。",
    takeaway: "任何视觉交付都要看最终渲染结果，不要只看文件是否生成。",
    sources: [{ label: "Presentation Skill：render-based verification", url: "https://github.com/sirilsengolraj-source/presentation-skill", snapshot: "2026-07" }],
  },
  {
    id: "monthly-ranking",
    dimension: "verify",
    difficulty: "高阶",
    category: "模型排名",
    setup: "NO.1 MODEL!!!",
    prompt: "一张榜单说某模型世界第一。你准备怎么转述？",
    options: [
      { label: "直接写：目前宇宙最强，没有之一", points: 0, reaction: "统计学被标题党请出了群聊。" },
      { label: "只要第一名领先 1 分，就是代差", points: 0, reaction: "误差区间正在默默流泪。" },
      { label: "写清榜单、任务、日期和差距，再看置信区间", points: 3, best: true, reaction: "你成功阻止了一个‘遥遥领先’。" },
      { label: "榜单都不可信，所以完全不看", points: 1, reaction: "避免误判的方式是拒绝获得信息。" },
    ],
    explanation: "模型排名只在具体任务、规则与时间快照下成立。小分差还需要结合置信区间判断是否真的领先。",
    takeaway: "推荐模型时写清任务与快照，不把暂时第一包装成绝对最强。",
    sources: [{ label: "Arena Leaderboard", url: "https://arena.ai/leaderboard", snapshot: "2026-07" }],
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
    sources: [{ label: "OpenAI：Slash commands", url: "https://learn.chatgpt.com/docs/reference/slash-commands", snapshot: "2026-07" }],
  },
  {
    id: "codex-agents",
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
    sources: [{ label: "OpenAI：Customization", url: "https://learn.chatgpt.com/docs/customization/overview", snapshot: "2026-07" }],
  },
  {
    id: "codex-memory",
    dimension: "context",
    difficulty: "进阶",
    category: "Memories",
    setup: "YOU TOLD ME LAST WEEK",
    prompt: "你希望 Codex 跨任务记住个人偏好，但团队硬规则不能丢。怎么分？",
    options: [
      { label: "全部交给记忆，包括生产发布规则", points: 0, reaction: "关键规则已寄存在概率里。" },
      { label: "每次从头说，不使用任何持久信息", points: 1, reaction: "稳定，但稳定地重复。" },
      { label: "偏好用 Memories，团队规则放 AGENTS.md/文档", points: 3, best: true, reaction: "个人习惯与团队契约终于分居。" },
      { label: "把所有内容写进全局 AGENTS.md", points: 2, reaction: "会生效，但项目边界容易串台。" },
    ],
    explanation: "Memories 是有帮助的回忆层，不应成为关键规则的唯一来源；团队约束应进入版本化指导或文档。",
    takeaway: "偏好进 Memories，必须执行的规则进 AGENTS.md 和检查工具。",
    sources: [{ label: "OpenAI：Memories", url: "https://learn.chatgpt.com/docs/customization/memories", snapshot: "2026-07" }],
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
    sources: [{ label: "OpenAI：Skills & Plugins", url: "https://learn.chatgpt.com/docs/skills-and-plugins", snapshot: "2026-07" }],
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
    sources: [{ label: "OpenAI：Customization / MCP", url: "https://learn.chatgpt.com/docs/customization/overview", snapshot: "2026-07" }],
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
    sources: [{ label: "OpenAI：Browser", url: "https://learn.chatgpt.com/docs/browser", snapshot: "2026-07" }],
  },
  {
    id: "codex-computer-use",
    dimension: "tools",
    difficulty: "高阶",
    category: "Computer Use",
    setup: "DESKTOP APP / SIMULATOR",
    prompt: "问题只会出现在原生 App 或 iOS 模拟器里。你怎么让 Codex复现？",
    options: [
      { label: "录屏后描述：大概就是这里不对", points: 0, reaction: "坐标、状态和日志集体缺席。" },
      { label: "我来点，Codex 负责猜", points: 1, reaction: "你是它昂贵的机械臂。" },
      { label: "有结构化 MCP 就接 MCP，否则开 Computer Use", points: 3, best: true, reaction: "AI 终于拥有了眼睛和鼠标。" },
      { label: "给它 Full Access，所有 App 永久允许", points: 0, reaction: "便利和风险同时获得了满分。" },
    ],
    explanation: "Computer Use 适合必须视觉操作的桌面流程；有专用 Plugin/MCP 时优先结构化集成，并保持任务与权限范围最小。",
    takeaway: "先选结构化工具，必要时再用 Computer Use；不要无边界授权。",
    sources: [{ label: "OpenAI：Computer Use", url: "https://learn.chatgpt.com/docs/computer-use", snapshot: "2026-07" }],
  },
  {
    id: "codex-worktrees",
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
    sources: [{ label: "OpenAI：Worktrees", url: "https://learn.chatgpt.com/docs/environments/git-worktrees", snapshot: "2026-07" }],
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
    sources: [{ label: "OpenAI：Scheduled Tasks", url: "https://learn.chatgpt.com/docs/automations", snapshot: "2026-07" }],
  },
  {
    id: "codex-review",
    dimension: "automation",
    difficulty: "高阶",
    category: "Code Review",
    setup: "PR READY?",
    prompt: "PR 准备合并前，你让 Codex 做到哪一步？",
    options: [
      { label: "不 Review，CI 绿了就是缘分", points: 0, reaction: "逻辑错误不属于 CI 的服务范围。" },
      { label: "在本地问一句：有问题吗", points: 1, reaction: "有复核，但没有明确审查边界。" },
      { label: "用 /review 看本地 diff", points: 2, reaction: "已经会在发出前自检。" },
      { label: "本地 /review；GitHub 用 @codex review 或自动 Review", points: 3, best: true, reaction: "代码开始经历不止一次清醒检查。" },
    ],
    explanation: "Codex 支持本地 review 模式，也能在 GitHub 通过 @codex review 或自动 Review 检查 PR，并遵循 AGENTS.md。",
    takeaway: "提交前本地 Review，PR 上再做高信号复核；把团队审查规则写进 AGENTS.md。",
    sources: [{ label: "OpenAI：Codex code review in GitHub", url: "https://learn.chatgpt.com/docs/third-party/github", snapshot: "2026-07" }],
  },
];

const pptQuestions: QuizQuestion[] = [
  {
    id: "ppt-audience",
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
    id: "ppt-tool",
    dimension: "tools",
    difficulty: "热身",
    category: "选工具",
    setup: "FAST OR CONTROLLED?",
    prompt: "Gamma、Canva、PPT Skill、PptxGenJS，到底怎么选？",
    options: [
      { label: "哪个最近最火就永远用哪个", points: 0, reaction: "工具选择已交给热搜。" },
      { label: "所有场景都用 PowerPoint 手工画", points: 1, reaction: "控制力拉满，时间已经离职。" },
      { label: "先用生成器快出，再一律截图交付", points: 1, reaction: "速度有了，可编辑性没了。" },
      { label: "快稿用 Gamma/Canva；强控制用模板化原生 PPTX", points: 3, best: true, reaction: "你开始按交付物选工具，不按信仰。" },
    ],
    explanation: "Gamma、Canva 适合快速形成完整视觉；品牌模板、批量生成和原生编辑要求高时，PPTX Skill/PptxGenJS 更可控。",
    takeaway: "先问最终要网页演示、PDF，还是可编辑的原生 PPTX。",
    sources: [
      { label: "Gamma Export", url: "https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma", snapshot: "2026-07" },
      { label: "Canva AI Presentations", url: "https://www.canva.com/create/ai-presentations/", snapshot: "2026-07" },
    ],
  },
  {
    id: "ppt-template",
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
    explanation: "稳定风格来自设计系统和模板资产，而不是更抽象的审美形容词。",
    takeaway: "把母版、组件、字体和示例放进 Skill，让每次生成复用同一套规则。",
    sources: [{ label: "OpenAI：Skills & Plugins", url: "https://learn.chatgpt.com/docs/skills-and-plugins", snapshot: "2026-07" }],
  },
  {
    id: "ppt-native",
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
    explanation: "PptxGenJS 等方案可以生成原生文本、图表、图片、表格和模板，适合需要后续编辑的交付。",
    takeaway: "需要编辑的内容用原生对象；装饰性视觉才考虑扁平图片。",
    sources: [{ label: "PptxGenJS", url: "https://github.com/gitbrent/PptxGenJS", snapshot: "2026-07" }],
  },
  {
    id: "ppt-visuals",
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
    explanation: "统一素材不只是颜色一致，还包括构图、质感、镜头、人物和信息密度。",
    takeaway: "在生成图片前写一段整套视觉方向，并用同一参考与尺寸。",
  },
  {
    id: "ppt-render",
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
    explanation: "可靠的 PPT Skill 会把 PPTX 渲染成图，做 montage 总览，再针对问题页放大检查。",
    takeaway: "先看全局节奏，再看单页溢出、对齐、字号和图表。",
    sources: [{ label: "Presentation Skill", url: "https://github.com/sirilsengolraj-source/presentation-skill", snapshot: "2026-07" }],
  },
  {
    id: "ppt-iterate",
    dimension: "qa",
    difficulty: "高阶",
    category: "迭代",
    setup: "VERSION FINAL FINAL 7",
    prompt: "第一版看起来一般，你通常怎么让 AI 改？",
    options: [
      { label: "重做一版，要更高级", points: 0, reaction: "随机种子获得了第二次机会。" },
      { label: "逐页说‘不好看’", points: 1, reaction: "反馈真实，行动信息不足。" },
      { label: "给一份总体评价，让 AI 自己猜优先级", points: 2, reaction: "能改，但容易把好页面一起推翻。" },
      { label: "标出具体页面、问题、保留项和验收标准", points: 3, best: true, reaction: "修改从审美争论变成了可执行工单。" },
    ],
    explanation: "高质量迭代需要定位页面与对象，说明问题、保留项和目标，而不是重复抽象形容词。",
    takeaway: "反馈格式：第几页／哪里不对／什么不能动／改完如何判断。",
  },
];

const typeQuestions: QuizQuestion[] = [
  {
    id: "type-ppt-brief",
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
    id: "type-trip",
    dimension: "brief",
    difficulty: "进阶",
    category: "表达力",
    setup: "PLAN MY TRIP",
    prompt: "你让 AI 做旅行计划，一般会给多少上下文？",
    options: [
      { label: "城市名。它懂我。", points: 0, reaction: "AI 正在安排你凌晨六点爬山。" },
      { label: "城市、日期和预算", points: 1, reaction: "活下来的基本条件有了。" },
      { label: "再加同行人、兴趣和节奏", points: 2, reaction: "计划开始像你的旅行。" },
      { label: "还会给禁忌、已订项目和必须保留的空白", points: 3, reaction: "你连不想做什么都说清楚了。" },
    ],
    explanation: "上下文决定 AI 是在生成模板，还是在解决你的问题。",
    takeaway: "高手会同时给偏好和禁区。",
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
  {
    id: "type-files",
    dimension: "proof",
    difficulty: "高阶",
    category: "验收力",
    setup: "ONE CHANGE / 38 FILES",
    prompt: "你只让 AI 改一句话，它动了 38 个文件。你会？",
    options: [
      { label: "它一定有自己的考虑", points: 0, reaction: "另外 37 个文件感谢你的信任。" },
      { label: "只看最终页面，能用就行", points: 1, reaction: "页面背后的世界正在自由变化。" },
      { label: "问它为什么改这么多", points: 2, reaction: "范围审查终于开始。" },
      { label: "停下看 diff，缩回最小范围并重新验证", points: 3, reaction: "你把 Vibe 从玄学拉回了工程。" },
    ],
    explanation: "会用 AI 不等于无条件接受 AI。范围异常本身就是风险信号。",
    takeaway: "改动规模和需求不匹配时，先停、看 diff、再继续。",
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
    shortTitle: "7 月 Vibe 月考",
    title: "测测你还在用多少古法操作",
    description: "9 道新知题。答完带走 App 上架、Xcode Agent、AI PPT、Skills 和自动巡检的新用法。",
    eyebrow: "ISSUE 001 · JULY 2026",
    symbol: "⚡",
    duration: "9 题 · 约 4 分钟",
    startTitle: "你的 AI 用法，是夯，还是拉完了？",
    startCopy: "每题答完立即补课。",
    cta: "开始 7 月月考 →",
    dimensions: [{ key: "discover", label: "新知" }, { key: "delegate", label: "放手" }, { key: "verify", label: "验收" }],
    questions: monthlyQuestions,
    levels: standardLevels(
      ["2026 原生 Viber", "Agent 已接管", "半自动人类", "人肉中间件", "AI 时代手工作坊"],
      ["新工具不是收藏，是已经进工作流。", "大部分旧动作已经交给 Agent。", "会用 AI，也还会亲自搬砖。", "AI 提建议，你负责所有操作。", "每一步都很认真地手工完成。"],
    ),
  },
  {
    id: "codex",
    slug: "codex",
    index: "02",
    kind: "usage",
    shortTitle: "Codex 熟练度",
    title: "Codex 的这些功能，你到底用了几个？",
    description: "从 AGENTS.md、Skills、MCP，到 Worktrees、Browser、Computer Use、Goal 和自动 Review。",
    eyebrow: "TOOL CHECK · CODEX 2026.07",
    symbol: "⌘",
    duration: "10 题 · 约 5 分钟",
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
    id: "ppt",
    slug: "ppt",
    index: "03",
    kind: "usage",
    shortTitle: "AI PPT 方案评级",
    title: "你的 AI 做 PPT 方案，从夯到拉排第几？",
    description: "不是比谁一键生成得快，而是看故事线、工具选择、可编辑性和视觉验收。",
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
    id: "type",
    slug: "type",
    index: "04",
    kind: "personality",
    shortTitle: "Viber 类型",
    title: "你是哪种 Viber？",
    description: "Viber 不一定会写代码，但会用 AI 把东西做出来。测试你的表达力、工具力和验收力。",
    eyebrow: "EVERGREEN · VIBER TYPE",
    symbol: "✦",
    duration: "9 题 · 约 3 分钟",
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
