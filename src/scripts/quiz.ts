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
const resultScore = $("#result-score");
const resultModeNote = $("#result-mode-note");
const resultTitle = $("#result-title");
const resultRoast = $("#result-roast");
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
let isAnswered = false;
let soundOn = true;
let audioContext: AudioContext | undefined;
let celebrationTimer: number | undefined;

const campaignStages = [
  {
    index: "LV.01",
    title: "Prompt 新手村",
    copy: "你已经会把愿望改写成范围、约束和验收标准。村口的万能 Prompt 卷轴失去了法力。",
    next: "Agent 驯兽场",
  },
  {
    index: "LV.02",
    title: "Agent 驯兽场",
    copy: "你开始看 diff、要证据、控制并行边界。Agent 仍然会乱跑，但已经戴上项圈。",
    next: "生产环境地狱",
  },
  {
    index: "LV.03",
    title: "生产环境地狱",
    copy: "你知道密钥会泄露、迁移会删库、周五会骗人。现在去见最终 Boss。",
    next: "周五 23:58",
  },
];

const resultLevels = [
  {
    min: 90,
    title: "生产环境幸存者",
    roast: "你知道什么时候该相信 Agent，也知道什么时候该拔掉它的网线。现在的问题是：你的同事知道吗？",
  },
  {
    min: 75,
    title: "上下文建筑师",
    roast: "你喂给 AI 的不是愿望，是边界、证据和验收标准。它偶尔还是会犯傻，但至少不是自由发挥。",
  },
  {
    min: 60,
    title: "Agent 驯兽员",
    roast: "大部分时候你在骑马，少数时候马在登录你的生产服务器。继续练。",
  },
  {
    min: 40,
    title: "复制粘贴工程师",
    roast: "你已经掌握了最重要的快捷键，距离掌握上下文只差一次认真看 diff。",
  },
  {
    min: 0,
    title: "Prompt 许愿池常驻嘉宾",
    roast: "你的核心工作流是输入‘做得高级一点’，然后对结果感到私人背叛。好消息：成长空间巨大。",
  },
];

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

function modeLabel(mode: QuizMode) {
  if (mode === "campaign") return "Vibe Coding 生存模式";
  return tracks.find((item) => item.id === mode)?.title ?? mode;
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
      verdict = "答对了，离被 AI 取代又远了 3 分钟";
      state = "correct";
      buttons[selectedIndex]?.classList.add("is-correct");
      playCorrectSound();
      showCelebration("AI 董事会批准了你的答案");
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
  const level = resultLevels.find((item) => score >= item.min) ?? resultLevels.at(-1)!;
  resultScore.textContent = String(score);
  resultTitle.textContent = level.title;
  resultRoast.textContent = level.roast;
  resultModeNote.textContent = activeTrack === "campaign" ? "三关主线已通关 · FINAL BOSS DEFEATED" : `${modeLabel(activeTrack)} · PRACTICE COMPLETE`;
  setHidden(questionView, true);
  setHidden(resultView, false);
  scoreLabel.textContent = level.title;
  reactionText.textContent = `最终鉴定：${level.title}。这不是职业资格证，但很适合发群里。`;
  showCelebration(`${score} 分！AI 董事会正在假装惊讶`);
  const url = new URL(window.location.href);
  url.searchParams.set("challenge", `${activeTrack}:${score}`);
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
  updateCombo();
  activeLevelName.hidden = true;
  scoreLabel.textContent = "等待开考";
  reactionText.textContent = "请先选择一张试卷。我们承诺不会把成绩发给你老板。";
  const url = new URL(window.location.href);
  url.searchParams.delete("challenge");
  window.history.replaceState({}, "", url);
}

async function shareResult() {
  const score = percentage();
  const title = resultTitle.textContent ?? "Vibe Coder";
  const track = modeLabel(activeTrack);
  const url = new URL(window.location.href);
  url.searchParams.set("challenge", `${activeTrack}:${score}`);
  const text = `我在 Vibe Coding 月考的「${track}」拿了 ${score} 分，鉴定为「${title}」。你敢来吗？`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Vibe Coding 月考", text, url: url.href });
      shareStatus.textContent = "战报已交给系统分享面板。";
    } else {
      await navigator.clipboard.writeText(`${text}\n${url.href}`);
      shareStatus.textContent = "战报已复制，去群里制造一点同辈压力吧。";
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    shareStatus.textContent = "自动复制失败，请复制浏览器地址栏链接。";
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
const challenge = new URLSearchParams(window.location.search).get("challenge");
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
