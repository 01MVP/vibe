import { campaignQuestions, questionsForTrack, tracks, type QuizQuestion, type TrackId } from "../data/questions";

type QuizMode = TrackId | "campaign";

const $ = <T extends HTMLElement>(selector: string) => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing quiz element: ${selector}`);
  return element;
};

const trackPicker = $("#track-picker");
const questionView = $("#question-view");
const resultView = $("#result-view");
const scoreGauge = $("#score-gauge");
const scoreRing = $("#score-ring") as unknown as SVGCircleElement;
const scoreValue = $("#score-value");
const scoreLabel = $("#score-label");
const correctCount = $("#correct-count");
const answeredCount = $("#answered-count");
const comboBox = $("#combo-box");
const comboCount = $("#combo-count");
const reactionText = $("#reaction-text");
const soundToggle = $("#sound-toggle") as HTMLButtonElement;
const activeTrackName = $("#active-track-name");
const activeLevelName = $("#active-level-name");
const questionPosition = $("#question-position");
const questionDifficulty = $("#question-difficulty");
const progressBar = $("#progress-bar");
const questionCard = $("#question-card");
const questionSetup = $("#question-setup");
const questionCategory = $("#question-category");
const questionPrompt = $("#question-prompt");
const optionList = $("#option-list");
const answerFeedback = $("#answer-feedback");
const feedbackVerdict = $("#feedback-verdict");
const feedbackExplanation = $("#feedback-explanation");
const feedbackSource = $("#feedback-source") as HTMLAnchorElement;
const nextQuestion = $("#next-question") as HTMLButtonElement;
const resultCard = $("#result-card");
const resultScore = $("#result-score");
const resultModeNote = $("#result-mode-note");
const resultCode = $("#result-code");
const resultIcon = $("#result-icon");
const resultTitle = $("#result-title");
const resultQuote = $("#result-quote");
const resultRoast = $("#result-roast");
const contextBar = $("#context-bar");
const evidenceBar = $("#evidence-bar");
const safetyBar = $("#safety-bar");
const contextValue = $("#context-value");
const evidenceValue = $("#evidence-value");
const safetyValue = $("#safety-value");
const shareStatus = $("#share-status");
const celebrationLayer = $("#celebration-layer");
const celebrationCopy = $("#celebration-copy");
const confettiLayer = $("#confetti-layer");
const challengeBanner = $("#challenge-banner");
const challengeCopy = $("#challenge-copy");
const levelLayer = $("#level-layer");
const clearedLevel = $("#cleared-level");
const clearedTitle = $("#cleared-title");
const clearedCopy = $("#cleared-copy");
const nextLevelTitle = $("#next-level-title");

const circumference = 2 * Math.PI * 58;
let activeTrack: QuizMode = "campaign";
let activeQuestions: QuizQuestion[] = [];
let questionIndex = 0;
let scoredAnswered = 0;
let correct = 0;
let totalAnswered = 0;
let combo = 0;
let stageCorrect = [0, 0, 0];
let isAnswered = false;
let soundOn = true;
let audioContext: AudioContext | undefined;
let celebrationTimer: number | undefined;

interface VibeType {
  code: string;
  name: string;
  icon: string;
  quote: string;
  roast: string;
  color: string;
  ink: string;
}

const campaignStages = [
  {
    index: "LV.01",
    title: "Prompt 新手村",
    copy: "会问，不许愿。",
    next: "Agent 驯兽场",
  },
  {
    index: "LV.02",
    title: "Agent 驯兽场",
    copy: "会验，不迷信绿色对勾。",
    next: "生产环境地狱",
  },
  {
    index: "LV.03",
    title: "生产环境地狱",
    copy: "会上线，也会回来。",
    next: "周五 23:58",
  },
];

const vibeTypes: Record<string, VibeType> = {
  WISH: {
    code: "WISH",
    name: "许愿池术士",
    icon: "🪄",
    quote: "做得高级一点，剩下交给命运。",
    roast: "你的 Prompt 很有梦想，验收标准还在路上。",
    color: "#f6d8cf",
    ink: "#6d2918",
  },
  CTRL: {
    code: "CTRL",
    name: "上下文包工头",
    icon: "🧱",
    quote: "上下文写了八页，测试一行没跑。",
    roast: "你很会交代任务，交付后的世界暂时不归你管。",
    color: "#dfe5f5",
    ink: "#24345d",
  },
  DIFF: {
    code: "DIFF",
    name: "改动显微镜",
    icon: "🔬",
    quote: "需求没看懂，但 diff 看得很懂。",
    roast: "任何一行偷偷变化，都逃不过你的审判。",
    color: "#eee2c8",
    ink: "#57421d",
  },
  BACK: {
    code: "BACK",
    name: "回滚预言家",
    icon: "↩️",
    quote: "功能还没上线，回滚方案已经写完。",
    roast: "你不一定知道要去哪，但永远知道怎么回来。",
    color: "#dcebd7",
    ink: "#284622",
  },
  TEST: {
    code: "TEST",
    name: "绿勾收藏家",
    icon: "✅",
    quote: "绿色对勾，是唯一的睡前故事。",
    roast: "你会问、会验；只差学会别在周五直接上线。",
    color: "#d9eed1",
    ink: "#22491d",
  },
  SAFE: {
    code: "SAFE",
    name: "安全带焊死侠",
    icon: "🪖",
    quote: "先备份。再备份刚才的备份。",
    roast: "你很会交代，也很怕出事，中间的验证偶尔靠缘分。",
    color: "#f3e1b8",
    ink: "#5b4316",
  },
  FIRE: {
    code: "FIRE",
    name: "事故现场监督员",
    icon: "🧯",
    quote: "不是在救火，就是在找谁点的火。",
    roast: "你会验证、会止血，但需求经常从火场里第一次见面。",
    color: "#ffd6c8",
    ink: "#6b2d1d",
  },
  SHIP: {
    code: "SHIP",
    name: "生产环境幸存者",
    icon: "🚢",
    quote: "能上线，也能活着回来。",
    roast: "你会问、会验、会回滚。AI 暂时还骗不到你。",
    color: "#d5eadf",
    ink: "#1f4937",
  },
};

let currentType = vibeTypes.WISH;

function setHidden(element: HTMLElement, hidden: boolean) {
  element.hidden = hidden;
}

function percentage() {
  return scoredAnswered === 0 ? 0 : Math.round((correct / scoredAnswered) * 100);
}

function updateScore() {
  const score = percentage();
  scoreValue.textContent = scoredAnswered === 0 ? "--" : String(score);
  correctCount.textContent = String(correct);
  answeredCount.textContent = String(totalAnswered);
  scoreRing.style.strokeDasharray = String(circumference);
  scoreRing.style.strokeDashoffset = String(circumference * (1 - score / 100));
  scoreLabel.textContent = scoredAnswered === 0 ? "尚未形成证据" : score >= 80 ? "Vibe 稳定" : score >= 60 ? "能跑，先别上线" : "生产环境有话说";
}

function updateCombo() {
  comboCount.textContent = `×${combo}`;
  comboBox.classList.remove("is-hot");
  if (combo >= 2) requestAnimationFrame(() => comboBox.classList.add("is-hot"));
}

function resolveVibeType() {
  const key = stageCorrect.map((value) => (value >= 2 ? "1" : "0")).join("");
  const codeByProfile: Record<string, keyof typeof vibeTypes> = {
    "000": "WISH",
    "100": "CTRL",
    "010": "DIFF",
    "001": "BACK",
    "110": "TEST",
    "101": "SAFE",
    "011": "FIRE",
    "111": "SHIP",
  };
  return vibeTypes[codeByProfile[key] ?? "WISH"];
}

function updateDimension(element: HTMLElement, valueElement: HTMLElement, value: number) {
  element.style.width = `${(value / 3) * 100}%`;
  valueElement.textContent = `${value}/3`;
}

function initAudio() {
  if (!audioContext) audioContext = new AudioContext();
  if (audioContext.state === "suspended") void audioContext.resume();
}

function tone(frequency: number, start: number, duration: number, gain = 0.04) {
  if (!soundOn) return;
  initAudio();
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + start);
  volume.gain.setValueAtTime(gain, audioContext.currentTime + start);
  volume.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + start + duration);
  oscillator.connect(volume).connect(audioContext.destination);
  oscillator.start(audioContext.currentTime + start);
  oscillator.stop(audioContext.currentTime + start + duration);
}

function playCorrectSound() {
  tone(523, 0, 0.12);
  tone(659, 0.1, 0.12);
  tone(784, 0.2, 0.22);
}

function playWrongSound() {
  tone(190, 0, 0.18, 0.035);
  tone(135, 0.14, 0.28, 0.035);
}

function playNeutralSound() {
  tone(440, 0, 0.08, 0.025);
  tone(554, 0.08, 0.12, 0.025);
}

function burstConfetti() {
  const colors = ["#7c3aed", "#ff5c45", "#c8f43d", "#ffd43b", "#111111", "#ffffff"];
  confettiLayer.replaceChildren();
  for (let i = 0; i < 42; i += 1) {
    const piece = document.createElement("i");
    piece.style.setProperty("--x", `${Math.round(Math.random() * 100)}vw`);
    piece.style.setProperty("--delay", `${Math.random() * 0.35}s`);
    piece.style.setProperty("--spin", `${Math.round(Math.random() * 720 + 360)}deg`);
    piece.style.setProperty("--color", colors[i % colors.length]);
    piece.style.setProperty("--size", `${Math.round(Math.random() * 8 + 6)}px`);
    confettiLayer.append(piece);
  }
  confettiLayer.classList.remove("is-active");
  requestAnimationFrame(() => confettiLayer.classList.add("is-active"));
  window.setTimeout(() => confettiLayer.classList.remove("is-active"), 1700);
}

function showCelebration(copy: string) {
  window.clearTimeout(celebrationTimer);
  celebrationCopy.textContent = copy;
  celebrationLayer.classList.add("is-visible");
  burstConfetti();
  celebrationTimer = window.setTimeout(() => celebrationLayer.classList.remove("is-visible"), 1150);
}

function startTrack(track: QuizMode) {
  activeTrack = track;
  activeQuestions = track === "campaign" ? campaignQuestions() : questionsForTrack(track);
  questionIndex = 0;
  scoredAnswered = 0;
  correct = 0;
  totalAnswered = 0;
  combo = 0;
  stageCorrect = [0, 0, 0];
  isAnswered = false;
  const trackInfo = tracks.find((item) => item.id === track);
  activeTrackName.textContent = track === "campaign" ? "MAIN QUEST / 生存模式" : trackInfo ? `${trackInfo.index} / ${trackInfo.title}` : track;
  setHidden(trackPicker, true);
  setHidden(resultView, true);
  setHidden(questionView, false);
  updateScore();
  updateCombo();
  reactionText.textContent = track === "campaign" ? "主线开始。先离开 Prompt 新手村，再考虑接管世界。" : "考试开始。请关闭尊严保护模式。";
  renderQuestion();
  document.querySelector("#exam")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestion() {
  const question = activeQuestions[questionIndex];
  if (!question) return;
  isAnswered = false;
  questionPosition.textContent = `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / ${String(activeQuestions.length).padStart(2, "0")}`;
  questionDifficulty.textContent = question.difficulty;
  questionDifficulty.dataset.level = question.difficulty;
  progressBar.style.width = `${((questionIndex + 1) / activeQuestions.length) * 100}%`;
  questionSetup.textContent = question.setup;
  questionCategory.textContent = question.category;
  questionPrompt.textContent = question.prompt;
  if (activeTrack === "campaign") {
    const stage = campaignStages[Math.min(Math.floor(questionIndex / 3), campaignStages.length - 1)];
    activeLevelName.textContent = `${stage.index} / ${stage.title}`;
    activeLevelName.hidden = false;
  } else {
    activeLevelName.hidden = true;
  }
  optionList.replaceChildren();
  answerFeedback.className = "answer-feedback";
  setHidden(answerFeedback, true);
  feedbackSource.hidden = true;
  questionCard.classList.remove("is-wrong", "is-correct", "is-neutral");

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><b></b>`;
    button.querySelector("b")!.textContent = option.label;
    button.addEventListener("click", () => answerQuestion(question, index));
    optionList.append(button);
  });
}

function answerQuestion(question: QuizQuestion, selectedIndex: number) {
  if (isAnswered) return;
  isAnswered = true;
  totalAnswered += 1;
  const selected = question.options[selectedIndex];
  const buttons = [...optionList.querySelectorAll<HTMLButtonElement>("button")];
  buttons.forEach((button) => (button.disabled = true));

  let verdict = "精神状态已归档";
  let state: "correct" | "wrong" | "neutral" = "neutral";
  if (question.unscored) {
    buttons[selectedIndex]?.classList.add("is-neutral");
    playNeutralSound();
  } else {
    scoredAnswered += 1;
    if (selected.correct) {
      correct += 1;
      combo += 1;
      if (activeTrack === "campaign") stageCorrect[Math.min(Math.floor(questionIndex / 3), 2)] += 1;
      verdict = "答对了，离被 AI 取代又远了 3 分钟";
      state = "correct";
      buttons[selectedIndex]?.classList.add("is-correct");
      playCorrectSound();
    } else {
      combo = 0;
      verdict = "答错了，但你至少没有直接 push main";
      state = "wrong";
      buttons[selectedIndex]?.classList.add("is-wrong");
      const correctIndex = question.options.findIndex((option) => option.correct);
      buttons[correctIndex]?.classList.add("is-correct", "is-correct-answer");
      playWrongSound();
      document.body.classList.remove("wrong-flash");
      requestAnimationFrame(() => document.body.classList.add("wrong-flash"));
    }
  }

  questionCard.classList.add(`is-${state}`);
  answerFeedback.classList.add(`is-${state}`);
  reactionText.textContent = selected.reaction;
  feedbackVerdict.textContent = verdict;
  feedbackExplanation.textContent = question.explanation;
  if (question.source) {
    feedbackSource.href = question.source.url;
    feedbackSource.textContent = `查看来源：${question.source.label} · 快照 ${question.source.snapshot} ↗`;
    feedbackSource.hidden = false;
  }
  setHidden(answerFeedback, false);
  nextQuestion.textContent = questionIndex === activeQuestions.length - 1 ? "查看诊断书 →" : "下一题 →";
  updateScore();
  updateCombo();
}

function showLevelCleared() {
  const stageIndex = Math.floor(questionIndex / 3);
  const stage = campaignStages[stageIndex];
  if (!stage) return;
  clearedLevel.textContent = stage.index;
  clearedTitle.textContent = stage.title;
  clearedCopy.textContent = stage.copy;
  nextLevelTitle.textContent = stage.next;
  levelLayer.hidden = false;
  burstConfetti();
  playCorrectSound();
}

function finishTrack() {
  const score = percentage();
  currentType = activeTrack === "campaign" ? resolveVibeType() : score >= 80 ? vibeTypes.SHIP : score >= 60 ? vibeTypes.TEST : vibeTypes.WISH;
  resultCard.dataset.type = currentType.code;
  resultCard.style.setProperty("--type-color", currentType.color);
  resultCard.style.setProperty("--type-ink", currentType.ink);
  resultScore.textContent = String(score);
  resultCode.textContent = currentType.code;
  resultIcon.textContent = currentType.icon;
  resultTitle.textContent = currentType.name;
  resultQuote.textContent = currentType.quote;
  resultRoast.textContent = currentType.roast;
  resultModeNote.textContent = "YOUR VIBE TYPE";
  updateDimension(contextBar, contextValue, stageCorrect[0]);
  updateDimension(evidenceBar, evidenceValue, stageCorrect[1]);
  updateDimension(safetyBar, safetyValue, stageCorrect[2]);
  setHidden(questionView, true);
  setHidden(resultView, false);
  scoreLabel.textContent = `${currentType.code} / ${currentType.name}`;
  reactionText.textContent = currentType.quote;
  if (score === 100) showCelebration("满分。AI 董事会被迫起立。");
  else burstConfetti();
  const url = new URL(window.location.href);
  url.searchParams.delete("challenge");
  url.searchParams.set("result", currentType.code);
  url.searchParams.set("score", String(score));
  window.history.replaceState({}, "", url);
}

function showPicker() {
  setHidden(questionView, true);
  setHidden(resultView, true);
  setHidden(trackPicker, false);
  scoreValue.textContent = "--";
  correctCount.textContent = "0";
  answeredCount.textContent = "0";
  scoreRing.style.strokeDashoffset = String(circumference);
  combo = 0;
  stageCorrect = [0, 0, 0];
  updateCombo();
  activeLevelName.hidden = true;
  scoreLabel.textContent = "等待开考";
  reactionText.textContent = "请先选择一张试卷。我们承诺不会把成绩发给你老板。";
  const url = new URL(window.location.href);
  url.searchParams.delete("challenge");
  url.searchParams.delete("result");
  url.searchParams.delete("score");
  window.history.replaceState({}, "", url);
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  let line = "";
  let currentY = y;
  for (const character of text) {
    const nextLine = line + character;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = character;
      currentY += lineHeight;
    } else {
      line = nextLine;
    }
  }
  if (line) context.fillText(line, x, currentY);
  return currentY;
}

async function createResultImage() {
  await document.fonts.ready;
  const score = percentage();
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  context.fillStyle = currentType.color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.fillRect(64, 64, 952, 1312);
  context.strokeStyle = currentType.ink;
  context.lineWidth = 4;
  context.strokeRect(64, 64, 952, 1312);

  context.fillStyle = currentType.ink;
  context.font = '700 28px "JetBrains Mono", monospace';
  context.fillText("01MVP / VIBE TYPE", 112, 130);
  context.textAlign = "right";
  context.fillText(`${score}/100`, 968, 130);
  context.textAlign = "left";

  context.font = '900 190px "Inter", sans-serif';
  context.fillText(currentType.code, 104, 360);
  context.font = '140px "Apple Color Emoji", sans-serif';
  context.textAlign = "right";
  context.fillText(currentType.icon, 954, 350);
  context.textAlign = "left";

  context.font = '800 72px "Noto Sans SC", sans-serif';
  context.fillText(currentType.name, 112, 470);
  context.fillStyle = "#20201f";
  context.font = '800 46px "Noto Sans SC", sans-serif';
  const quoteBottom = drawWrappedText(context, currentType.quote, 112, 570, 820, 68);

  const labels = ["会问", "会验", "会上线"];
  const values = stageCorrect;
  const startY = Math.max(760, quoteBottom + 120);
  labels.forEach((label, index) => {
    const y = startY + index * 112;
    context.fillStyle = "#20201f";
    context.font = '700 28px "Noto Sans SC", sans-serif';
    context.fillText(label, 112, y);
    context.fillStyle = "#e9e6df";
    context.fillRect(250, y - 27, 580, 30);
    context.fillStyle = currentType.ink;
    context.fillRect(250, y - 27, (580 * values[index]) / 3, 30);
    context.font = '700 24px "JetBrains Mono", monospace';
    context.fillText(`${values[index]}/3`, 860, y);
  });

  context.fillStyle = "#706d66";
  context.font = '500 30px "Noto Sans SC", sans-serif';
  drawWrappedText(context, currentType.roast, 112, startY + 390, 820, 46);
  context.fillStyle = currentType.ink;
  context.font = '700 24px "JetBrains Mono", monospace';
  context.fillText("vibe.01mvp.com", 112, 1318);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Image export failed"))), "image/png");
  });
}

async function shareResult() {
  const score = percentage();
  const url = new URL(window.location.href);
  url.searchParams.set("result", currentType.code);
  url.searchParams.set("score", String(score));
  const text = `我的 Vibe Coding 类型是 ${currentType.code}「${currentType.name}」，${score} 分。你是哪一型？`;
  try {
    const blob = await createResultImage();
    const file = new File([blob], `vibe-${currentType.code.toLowerCase()}-${score}.png`, { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ title: "Vibe Coding 月考", text, url: url.href, files: [file] });
        shareStatus.textContent = "结果图已交给系统分享。";
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = file.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
    shareStatus.textContent = "结果图已保存。";
  } catch (error) {
    shareStatus.textContent = "生成失败，请直接截图结果卡。";
  }
}

document.querySelectorAll<HTMLButtonElement>("[data-track]").forEach((button) => {
  button.addEventListener("click", () => startTrack(button.dataset.track as QuizMode));
});
nextQuestion.addEventListener("click", () => {
  if (!isAnswered) return;
  if (questionIndex >= activeQuestions.length - 1) finishTrack();
  else if (activeTrack === "campaign" && (questionIndex === 2 || questionIndex === 5)) showLevelCleared();
  else {
    questionIndex += 1;
    renderQuestion();
  }
});
$("#enter-next-level").addEventListener("click", () => {
  levelLayer.hidden = true;
  questionIndex += 1;
  renderQuestion();
});
$("#back-to-tracks").addEventListener("click", showPicker);
$("#change-track").addEventListener("click", showPicker);
$("#retry-track").addEventListener("click", () => startTrack(activeTrack));
$("#share-result").addEventListener("click", () => void shareResult());
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "ON" : "OFF";
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  if (soundOn) playNeutralSound();
});
$("#challenge-close").addEventListener("click", () => (challengeBanner.hidden = true));

scoreRing.style.strokeDasharray = String(circumference);
scoreRing.style.strokeDashoffset = String(circumference);
const initialParams = new URLSearchParams(window.location.search);
const sharedResult = initialParams.get("result");
const sharedScore = Number.parseInt(initialParams.get("score") ?? "", 10);
if (sharedResult && vibeTypes[sharedResult] && Number.isFinite(sharedScore) && sharedScore >= 0 && sharedScore <= 100) {
  const type = vibeTypes[sharedResult];
  challengeCopy.textContent = `有人测出 ${type.code}「${type.name}」${sharedScore} 分。你是哪一型？`;
  challengeBanner.hidden = false;
}

const challenge = initialParams.get("challenge");
if (challenge) {
  const [trackId, rawScore] = challenge.split(":");
  const track = tracks.find((item) => item.id === trackId);
  const score = Number.parseInt(rawScore ?? "", 10);
  const validMode = track ?? (trackId === "campaign" ? { title: "Vibe Coding 生存模式" } : undefined);
  if (validMode && Number.isFinite(score) && score >= 0 && score <= 100) {
    challengeCopy.textContent = `有人在「${validMode.title}」拿了 ${score} 分，向你发起了没有法律效力的挑战。`;
    challengeBanner.hidden = false;
  }
}

scoreGauge.addEventListener("animationend", () => scoreGauge.classList.remove("pulse"));
