export type TrackId = "hot" | "builder" | "production";
export type QuestionTrack = TrackId | "campaign";

export interface SourceLink {
  label: string;
  url: string;
  snapshot: string;
}

export interface QuizOption {
  label: string;
  correct?: boolean;
  reaction: string;
}

export interface QuizQuestion {
  id: string;
  track: QuestionTrack;
  difficulty: "初阶" | "中阶" | "高阶" | "不计分";
  category: string;
  prompt: string;
  setup: string;
  options: QuizOption[];
  explanation: string;
  unscored?: boolean;
  source?: SourceLink;
}

export interface TrackDefinition {
  id: TrackId;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  tone: string;
}

export const tracks: TrackDefinition[] = [
  {
    id: "hot",
    index: "01",
    title: "模型八卦局",
    subtitle: "AI HOT TAKES",
    description: "最新榜单、模型能力和本月热梗。答错没关系，过期才尴尬。",
    audience: "刚入坑 / 非技术 / 吃瓜型选手",
    tone: "轻松，知识密度中等",
  },
  {
    id: "builder",
    index: "02",
    title: "Agent 驯兽场",
    subtitle: "SHIP SOMETHING",
    description: "从想法到能跑的产品，看看你是在带 Agent，还是被 Agent 带走。",
    audience: "独立开发者 / 产品经理 / Vibe Builder",
    tone: "实战，梗和方法各一半",
  },
  {
    id: "production",
    index: "03",
    title: "生产环境保卫战",
    subtitle: "NO DIRECT PUSH",
    description: "密钥、迁移、回滚、验证。这里没有‘看起来能跑就行’。",
    audience: "职业开发者 / 高阶用户 / 事故幸存者",
    tone: "地狱难度，但真的有用",
  },
];

export const questions: QuizQuestion[] = [
  {
    id: "campaign-first-prompt",
    track: "campaign",
    difficulty: "初阶",
    category: "开局",
    setup: "NEW PROJECT / EMPTY REPO",
    prompt: "新项目开工，你最可能对 AI 说哪句？",
    options: [
      { label: "做个能火的 App，要高级", reaction: "许愿池检测到一笔大额投币。" },
      { label: "先把所有依赖升到最新版", reaction: "功能还没出生，迁移事故先满月了。" },
      { label: "先看仓库，再按用户、范围和验收标准列计划", correct: true, reaction: "你没有许愿。你在下单。" },
      { label: "你自由发挥，我先去洗澡", reaction: "洗完澡，你将得到一个陌生的创业项目。" },
    ],
    explanation: "好开局不是更长的 Prompt，而是让 AI 先理解现场，再明确用户、范围和完成标准。",
  },
  {
    id: "campaign-blind-screenshot",
    track: "campaign",
    difficulty: "初阶",
    category: "看图",
    setup: "LOOK AT THIS SCREENSHOT",
    prompt: "纯文本模型说它看懂了截图。你怎么办？",
    options: [
      { label: "把截图再发十遍，增加像素诚意", reaction: "十张看不见的图，仍然看不见。" },
      { label: "确认视觉输入，或明确配置视觉代理", correct: true, reaction: "你检查的是视力，不是态度。" },
      { label: "让它发誓真的看到了", reaction: "模型刚刚输出了一份电子保证书。" },
      { label: "补充一句：就这里不对", reaction: "上下文增加了三个字，谜团更加完整。" },
    ],
    explanation: "先确认模型与调用链真的支持图片。自信的描述不等于视觉输入存在。",
  },
  {
    id: "campaign-magic-words",
    track: "campaign",
    difficulty: "初阶",
    category: "Prompt 黑话",
    setup: "THE MAGIC WORDS",
    prompt: "下面哪句需求，最容易让 AI 一本正经地自由发挥？",
    options: [
      { label: "做得高级一点，要有苹果感", correct: true, reaction: "需求没有边界，但审美压力已经拉满。" },
      { label: "只改首页 CTA 文案，其他文件不要动", reaction: "范围很窄，Agent 没有借口翻修厨房。" },
      { label: "完成后运行 pnpm build，并给出退出码", reaction: "这是可以验收的动作。" },
      { label: "先检查现有设计规范，再给两个方案", reaction: "先取上下文，很像一个成年人。" },
    ],
    explanation: "‘高级’和‘苹果感’没有可验证定义。给范围、参考、约束和完成标准，才是在降低随机性。",
  },
  {
    id: "campaign-four-agents",
    track: "campaign",
    difficulty: "中阶",
    category: "多 Agent 物理学",
    setup: "4 AGENTS / 1 FILE",
    prompt: "你让四个 Agent 同时重构同一个核心文件，最可能解锁什么成就？",
    options: [
      { label: "四倍生产力", reaction: "如果工作边界重叠，四倍的通常不是生产力。" },
      { label: "分布式 Merge Conflict", correct: true, reaction: "恭喜解锁：高并发互相覆盖。" },
      { label: "自动形成技术委员会", reaction: "它们不会开会，只会同时保存。" },
      { label: "代码通过民主投票变正确", reaction: "多数票无法修复类型错误。" },
    ],
    explanation: "多 Agent 适合边界独立、写入范围不冲突的任务。共享核心文件时，协调成本通常超过并行收益。",
  },
  {
    id: "campaign-38-files",
    track: "campaign",
    difficulty: "中阶",
    category: "验收",
    setup: "ONE BUTTON / 38 FILES",
    prompt: "你只让 AI 改按钮颜色，它改了 38 个文件。你第一反应？",
    options: [
      { label: "它说完成了，直接上线", reaction: "生产环境已开始写遗书。" },
      { label: "先看 diff，问清另外 37 个文件在忙什么", correct: true, reaction: "Git 松了口气，按钮仍然有颜色。" },
      { label: "再叫一个 Agent 把它改回 37 个", reaction: "范围控制进入讨价还价阶段。" },
      { label: "截图好看，后端改了什么不重要", reaction: "权限系统藏在截图外安静燃烧。" },
    ],
    explanation: "改动规模与需求不匹配时先停下看 diff。不要让‘完成’代替范围审查。",
  },
  {
    id: "campaign-green-check",
    track: "campaign",
    difficulty: "中阶",
    category: "证据",
    setup: "ALL TESTS PASSED ✅",
    prompt: "Agent 说测试全过。哪一行最能让你睡着？",
    options: [
      { label: "请放心", reaction: "服务器也学会了情绪价值。" },
      { label: "一个很大的绿色 ✅", reaction: "审计报告现已压缩成 emoji。" },
      { label: "运行命令、退出码和实际覆盖的场景", correct: true, reaction: "你要的是证据，不是晚安故事。" },
      { label: "顺便重构了整个项目", reaction: "测试过了，范围失踪了。" },
    ],
    explanation: "测试结论需要可重复的命令和明确覆盖范围。一个绿色符号不能说明测了什么。",
  },
  {
    id: "campaign-secret-leak",
    track: "campaign",
    difficulty: "高阶",
    category: "密钥",
    setup: "SECRET IN CLIENT BUNDLE",
    prompt: "API Key 被打进前端包。哪招最有 Vibe？",
    options: [
      { label: "改名为 NOT_A_SECRET", reaction: "攻击者尊重了你的变量命名。" },
      { label: "立即轮换，并把秘密调用移到服务端", correct: true, reaction: "密钥重生了，攻击窗口开始关闭。" },
      { label: "Base64 一下，看起来不像密钥", reaction: "编码完成。加密没有发生。" },
      { label: "等下个大版本顺便修", reaction: "攻击者感谢你的发布节奏。" },
    ],
    explanation: "已经进入客户端的密钥按泄露处理：先撤销或轮换，再修正调用边界。",
  },
  {
    id: "campaign-drop-column",
    track: "campaign",
    difficulty: "高阶",
    category: "迁移",
    setup: "DROP COLUMN DETECTED",
    prompt: "生产迁移里出现 DROP COLUMN。你选哪个咒语？",
    options: [
      { label: "改成小写 drop，看起来温柔一点", reaction: "大小写没有缩小爆炸半径。" },
      { label: "AI 写的 SQL，一般不会错", reaction: "这句话将出现在事故复盘第一页。" },
      { label: "停止，核对迁移、备份和回滚路径", correct: true, reaction: "数据向你发送了一封感谢信。" },
      { label: "今天周五，数据库应该也想下班", reaction: "它确实下班了，带着整列数据。" },
    ],
    explanation: "不可逆变更必须停下来确认预期、备份和回滚，不因为赶时间跳过。",
  },
  {
    id: "campaign-friday-boss",
    track: "campaign",
    difficulty: "高阶",
    category: "最终 Boss",
    setup: "FRIDAY / 23:58 / CEO ONLINE",
    prompt: "老板说‘就改个按钮，直接上线吧’，Agent 顺手改了 27 个文件。你怎么打 Boss？",
    options: [
      { label: "先冻结范围、审查 diff、最小验证，并准备回滚", correct: true, reaction: "Boss 没死，但生产环境活过了周末。" },
      { label: "27 是幸运数字，直接 push main", reaction: "GitHub Actions 正在播放片尾曲。" },
      { label: "再叫三个 Agent 来复核并顺便重构", reaction: "最终 Boss 进入了第二形态。" },
      { label: "只要按钮颜色对了，后端改动不重要", reaction: "权限系统在按钮背后安静地燃烧。" },
    ],
    explanation: "紧急发布更需要缩小范围：确认实际 diff、运行最小充分验证、确保回滚路径，再决定是否发布。",
  },
  {
    id: "hot-code-gap",
    track: "hot",
    difficulty: "初阶",
    category: "本月榜单",
    setup: "2026-07-13 / ARENA WEBDEV",
    prompt: "当前 WebDev 榜第一名，比第二名高多少分？",
    options: [
      { label: "1 分，而且置信区间重叠", correct: true, reaction: "你没有把 1 分写成‘遥遥领先’，很克制。" },
      { label: "100 分，已经是代差", reaction: "营销部很满意，统计学已经离职。" },
      { label: "500 分，其他模型建议转行", reaction: "这个领先幅度来自你的想象力。" },
      { label: "榜单从来没有分数", reaction: "榜单有分数，只是分数不等于宇宙真理。" },
    ],
    explanation: "GPT-5.6 Sol xHigh（Codex harness）为 1631，Claude Fable 5 为 1630；两者置信区间重叠，合理表述是‘暂时第一，基本打平’。",
    source: {
      label: "Arena WebDev Leaderboard",
      url: "https://arena.ai/leaderboard/code?rankBy=labs",
      snapshot: "2026-07-13",
    },
  },
  {
    id: "hot-writing",
    track: "hot",
    difficulty: "初阶",
    category: "创作能力",
    setup: "TEXT ARENA / CREATIVE WRITING",
    prompt: "按当前 Arena 的 Creative Writing 分类，谁排第一？",
    options: [
      { label: "Claude Fable 5", correct: true, reaction: "文学编辑部发来一只会写小说的螃蟹。" },
      { label: "GPT Image 2", reaction: "它很会画，但让图片写小说有点强人所难。" },
      { label: "DeepSeek V4 Flash", reaction: "便宜能打，不代表每个分类都第一。" },
      { label: "我朋友圈里那个提示词", reaction: "朋友圈暂未被 Arena 收录。" },
    ],
    explanation: "模型没有抽象的‘总冠军’，应按任务看榜单。当前 Creative Writing 分类第一是 Claude Fable 5。",
    source: {
      label: "Arena Text Leaderboard",
      url: "https://arena.ai/leaderboard/text?rankBy=labs",
      snapshot: "2026-07-13",
    },
  },
  {
    id: "hot-blind-model",
    track: "hot",
    difficulty: "中阶",
    category: "视觉陷阱",
    setup: "WHO NEEDS A VISION PROXY?",
    prompt: "下面哪个模型收到截图后，需要找另一位‘同事’先看图？",
    options: [
      { label: "GPT-5.6 Sol", reaction: "它能直接接收图片输入。" },
      { label: "Gemini 3.1 Pro", reaction: "Gemini 从出生起就很爱看图。" },
      { label: "DeepSeek V4", correct: true, reaction: "抓到了：编辑器里的‘看图’可能是视觉代理在打工。" },
      { label: "Claude Fable 5", reaction: "它当前就在 Vision Arena 榜首附近。" },
    ],
    explanation: "DeepSeek 官方文档明确说明 V4 是 text-only；一些编辑器会先调用另一个视觉模型描述图片，再把描述交给 DeepSeek。",
    source: {
      label: "DeepSeek 官方集成文档",
      url: "https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot",
      snapshot: "2026-07-16",
    },
  },
  {
    id: "hot-image",
    track: "hot",
    difficulty: "中阶",
    category: "图片模型",
    setup: "TEXT-TO-IMAGE ARENA",
    prompt: "当前 Text-to-Image Arena 第一名是谁？",
    options: [
      { label: "GPT Image 2", correct: true, reaction: "答对了。今天的手指数量暂时安全。" },
      { label: "Sora 2 Pro", reaction: "Sora 更习惯让画面动起来。" },
      { label: "Claude Fable 5", reaction: "会看图和会生成图，是两份不同的工。" },
      { label: "Nano Banana 1", reaction: "香蕉仍然能打，但当前不是榜首。" },
    ],
    explanation: "截至快照日期，GPT Image 2（medium）位列 Text-to-Image Arena 第一。",
    source: {
      label: "Arena Image Leaderboard",
      url: "https://arena.ai/leaderboard/text-to-image?rankBy=labs",
      snapshot: "2026-07-05",
    },
  },
  {
    id: "hot-openai-family",
    track: "hot",
    difficulty: "中阶",
    category: "模型选择",
    setup: "SOL / TERRA / LUNA",
    prompt: "OpenAI 官方当前建议：复杂推理和编程，默认先从哪个开始？",
    options: [
      { label: "GPT-5.6 Sol", correct: true, reaction: "太阳升起来了，token 账单也醒了。" },
      { label: "GPT-5.6 Luna", reaction: "Luna 更适合成本敏感和高吞吐。" },
      { label: "GPT-5.6 Terra", reaction: "Terra 是能力与成本的平衡位。" },
      { label: "永远选名字最长的", reaction: "模型选择不是宝可梦稀有度。" },
    ],
    explanation: "官方把 Sol 定位为旗舰能力，Terra 平衡能力与成本，Luna 面向成本敏感和高吞吐工作负载。",
    source: {
      label: "OpenAI Models",
      url: "https://developers.openai.com/api/docs/models",
      snapshot: "2026-07-16",
    },
  },
  {
    id: "hot-codex-reset",
    track: "hot",
    difficulty: "不计分",
    category: "精神状态",
    setup: "THIS ONE IS PERSONAL",
    prompt: "本周你等过几次 Codex rate-limit reset？",
    options: [
      { label: "0 次，我作息健康", reaction: "系统检测到一种稀有生活方式。" },
      { label: "1 次，刚好泡杯咖啡", reaction: "你和限额达成了脆弱和平。" },
      { label: "已经会背重置时间", reaction: "欢迎加入人体 cron job 计划。" },
      { label: "我不回答没有律师在场的问题", reaction: "已记录：高风险 Vibe Coder。" },
    ],
    explanation: "这题只记录精神状态，不影响分数。Codex CLI 可用 /usage 查看 daily、weekly、cumulative usage 和 rate-limit reset。",
    unscored: true,
    source: {
      label: "Codex slash commands",
      url: "https://developers.openai.com/codex/cli/slash-commands",
      snapshot: "2026-07-16",
    },
  },
  {
    id: "builder-before-code",
    track: "builder",
    difficulty: "初阶",
    category: "开工姿势",
    setup: "BEFORE THE FIRST PROMPT",
    prompt: "准备让 Agent 写一个现有项目的新功能，第一步最像高手的是？",
    options: [
      { label: "让它先检查仓库、约束和验收标准", correct: true, reaction: "Agent 终于知道自己身处哪个宇宙。" },
      { label: "直接说‘做得高级一点’", reaction: "高级是一种愿望，不是验收标准。" },
      { label: "先让它把框架全部升级", reaction: "功能还没写，迁移事故已经预约。" },
      { label: "复制一段 3000 字万能 Prompt", reaction: "上下文不是越长越懂你。" },
    ],
    explanation: "先获取真实上下文，再定义完成标准。框架、边界、现有模式和验证命令，比一段万能提示词更重要。",
  },
  {
    id: "builder-big-diff",
    track: "builder",
    difficulty: "中阶",
    category: "验收",
    setup: "38 FILES CHANGED",
    prompt: "Agent 修改了 38 个文件，并宣布‘全部完成’。你下一步做什么？",
    options: [
      { label: "看 diff，再跑与改动对应的检查", correct: true, reaction: "AI 董事会集体点头，Git 也松了口气。" },
      { label: "既然它说完成，就直接上线", reaction: "生产环境正在输入离职申请。" },
      { label: "让它再优化一遍", reaction: "38 个文件很快会变成 76 个。" },
      { label: "只看页面截图，漂亮就行", reaction: "后端权限检查从截图里消失了。" },
    ],
    explanation: "‘完成’必须由证据定义：审查实际 diff，确认范围，再跑类型检查、构建或更窄的行为验证。",
  },
  {
    id: "builder-stuck-loop",
    track: "builder",
    difficulty: "中阶",
    category: "调试",
    setup: "RETRY #4",
    prompt: "AI 连续三次修不好同一个错误，第四次最不该做什么？",
    options: [
      { label: "原样再说一次‘还是不行’", correct: true, reaction: "同一句咒语念四遍，bug 不会自动尊重你。" },
      { label: "给出完整错误和复现步骤", reaction: "证据进入上下文，修复概率上升。" },
      { label: "缩小问题范围并检查真实运行状态", reaction: "调试终于从占卜回到工程。" },
      { label: "让它解释失败假设并重新取证", reaction: "很合理：先纠正模型的世界观。" },
    ],
    explanation: "重复相同提示只会强化错误路径。加入新证据、缩小变量、检查日志和运行状态，才是在改变问题。",
  },
  {
    id: "builder-library",
    track: "builder",
    difficulty: "中阶",
    category: "最新资料",
    setup: "THE API MAY HAVE CHANGED",
    prompt: "Agent 对一个刚更新的库写法很自信，但你怀疑它记错了。最好的动作是？",
    options: [
      { label: "查官方文档和本地已安装版本", correct: true, reaction: "模型记忆退场，当前事实上场。" },
      { label: "问另一个模型投票", reaction: "两个过期记忆不会自动合成最新文档。" },
      { label: "相信语气最坚定的那个", reaction: "自信不是 API 类型。" },
      { label: "把报错删掉", reaction: "问题确实看不见了。" },
    ],
    explanation: "易变化的技术事实应回到官方文档、本地类型和实际依赖版本。模型答案只能作为线索。",
  },
  {
    id: "builder-screenshot",
    track: "builder",
    difficulty: "中阶",
    category: "多模态",
    setup: "LOOK AT THIS SCREENSHOT",
    prompt: "你把截图丢给纯文本模型，它开始一本正经地描述不存在的按钮。怎么办？",
    options: [
      { label: "换支持视觉输入的模型，或明确配置视觉代理", correct: true, reaction: "截图终于被真正看见，而不是被想象。" },
      { label: "把图片再发十次", reaction: "十张看不见的图仍然看不见。" },
      { label: "把提示词改成全大写", reaction: "视力问题没有被音量解决。" },
      { label: "让它保证自己看到了", reaction: "保证是一种文本输出。" },
    ],
    explanation: "先确认模型和调用链支持图片输入。某些编辑器会用另一个模型做视觉代理，不能把代理能力误当成本体能力。",
    source: {
      label: "DeepSeek 视觉代理说明",
      url: "https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot",
      snapshot: "2026-07-16",
    },
  },
  {
    id: "builder-evidence",
    track: "builder",
    difficulty: "不计分",
    category: "人格鉴定",
    setup: "AGENT SAYS DONE",
    prompt: "Agent 说‘测试全部通过’，你最希望下一行看到什么？",
    options: [
      { label: "具体运行了什么，以及退出码", reaction: "证据型人格：你不吃口头完成。" },
      { label: "一句‘请放心’", reaction: "安慰型人格：服务器也会安慰你。" },
      { label: "一个绿色对勾 emoji", reaction: "视觉型人格：✅ 已成为审计报告。" },
      { label: "‘顺便重构了整个项目’", reaction: "冒险型人格：范围边界已失踪。" },
    ],
    explanation: "这题不计分，但第一项是可靠交付最需要的证据。",
    unscored: true,
  },
  {
    id: "prod-migration",
    track: "production",
    difficulty: "高阶",
    category: "数据库",
    setup: "DROP COLUMN DETECTED",
    prompt: "生产迁移里突然出现 DROP COLUMN，最专业的下一步是？",
    options: [
      { label: "停止，核对迁移集、备份和回滚路径", correct: true, reaction: "数据向你发送了一封感谢信。" },
      { label: "AI 生成的 SQL 一般不会错", reaction: "这句话将出现在事故复盘第一页。" },
      { label: "先执行，失败了再问", reaction: "列已经没了，但问题变得更具体了。" },
      { label: "把 DROP 改成小写，看起来温柔一点", reaction: "大小写没有改变破坏半径。" },
    ],
    explanation: "破坏性 SQL 必须停止自动流程，确认预期迁移、备份、兼容窗口和回滚方案。速度不是跳过不可逆检查的理由。",
  },
  {
    id: "prod-secret",
    track: "production",
    difficulty: "高阶",
    category: "安全",
    setup: "SECRET IN CLIENT BUNDLE",
    prompt: "你发现 API Key 被打进前端 bundle。第一优先级是什么？",
    options: [
      { label: "立即撤销/轮换，再把调用移到服务端", correct: true, reaction: "密钥获得了重生，攻击窗口开始关闭。" },
      { label: "只从 Git 历史删掉", reaction: "已经泄露的密钥不会因为历史改写而失忆。" },
      { label: "给变量名加 PRIVATE_ 前缀", reaction: "变量名不是访问控制。" },
      { label: "等下个版本一起修", reaction: "攻击者感谢你的发布节奏。" },
    ],
    explanation: "已暴露的密钥先按泄露处理：撤销或轮换；随后修正架构，避免秘密进入客户端，并检查日志与使用记录。",
  },
  {
    id: "prod-multi-agent",
    track: "production",
    difficulty: "高阶",
    category: "多 Agent",
    setup: "PARALLEL OR CHAOS?",
    prompt: "什么时候最适合让多个 Agent 并行工作？",
    options: [
      { label: "子任务边界独立，输入输出和归属清楚", correct: true, reaction: "并行变快了，没有变成多人同时改同一行。" },
      { label: "所有 Agent 同时重构同一个核心文件", reaction: "你发明了高并发 merge conflict。" },
      { label: "任务越模糊，Agent 越多越好", reaction: "不确定性乘以四，仍然不是计划。" },
      { label: "只要机器还有内存", reaction: "资源充足不代表协作边界存在。" },
    ],
    explanation: "并行适合可独立推进、写入范围不冲突的工作。共享核心状态、依赖顺序明显的任务更适合串行。",
  },
  {
    id: "prod-leaderboard",
    track: "production",
    difficulty: "高阶",
    category: "模型评估",
    setup: "#1 ON THE LEADERBOARD",
    prompt: "某模型刚登顶公开榜单。你要把它设成生产默认，缺少的最后一步是什么？",
    options: [
      { label: "用自己的真实任务做 eval，并比较质量、延迟和成本", correct: true, reaction: "公开榜单负责发现候选，你的 eval 负责决定上线。" },
      { label: "没有最后一步，第一名自动适合所有业务", reaction: "写作冠军正在尝试接管数据库迁移。" },
      { label: "看发布会掌声大小", reaction: "掌声暂未进入评估指标。" },
      { label: "问模型自己是不是最强", reaction: "候选人完成了自我评价。" },
    ],
    explanation: "公开榜单是候选发现工具，不是你的业务验收。生产选择必须基于代表性任务、失败样本、延迟、成本和稳定性。",
  },
  {
    id: "prod-tests",
    track: "production",
    difficulty: "高阶",
    category: "验证",
    setup: "AI WROTE THE TESTS",
    prompt: "AI 同时写实现和测试，而且测试全过。为什么仍然不能直接放心？",
    options: [
      { label: "实现和测试可能共享同一个错误假设", correct: true, reaction: "两个绿色对勾也可能在验证同一个误解。" },
      { label: "AI 写的测试永远不会运行", reaction: "它们会运行，只是不一定测对东西。" },
      { label: "通过的测试比失败的更危险", reaction: "危险的是测试边界，不是绿色本身。" },
      { label: "测试只适用于传统编程", reaction: "Agent 时代更需要可重复验证。" },
    ],
    explanation: "需要独立检查验收标准、边界和失败路径。测试通过证明代码符合测试，不自动证明测试符合真实需求。",
  },
  {
    id: "prod-incident",
    track: "production",
    difficulty: "不计分",
    category: "事故人格",
    setup: "PRODUCTION IS ON FIRE",
    prompt: "线上刚出故障，AI 建议‘顺便重构相关模块’。你的表情是？",
    options: [
      { label: "先止血和回滚，重构另开任务", reaction: "事故指挥官：恢复服务优先。" },
      { label: "好主意，来都来了", reaction: "范围膨胀型：火场里开始装修。" },
      { label: "让三个 Agent 一起重构", reaction: "多 Agent 烟花表演即将开始。" },
      { label: "关掉监控，世界恢复安静", reaction: "不可观测型：错误已从屏幕上消失。" },
    ],
    explanation: "这题不计分。真正的事故流程是先恢复服务、保存证据，再在稳定状态下修复根因。",
    unscored: true,
  },
];

export function questionsForTrack(track: TrackId): QuizQuestion[] {
  return questions.filter((question) => question.track === track);
}

const campaignOrder = [
  "campaign-first-prompt",
  "campaign-blind-screenshot",
  "campaign-magic-words",
  "campaign-38-files",
  "campaign-green-check",
  "campaign-four-agents",
  "campaign-secret-leak",
  "campaign-drop-column",
  "campaign-friday-boss",
];

export function campaignQuestions(): QuizQuestion[] {
  return campaignOrder.map((id) => questions.find((question) => question.id === id)).filter((question): question is QuizQuestion => Boolean(question));
}
