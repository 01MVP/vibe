import { tests, type QuizQuestion, type TestDefinition, type TestLevel } from "../data/tests";

const root = document.querySelector<HTMLElement>("#quiz-app");

if (root) {
  const test = tests.find((item) => item.id === root.dataset.testId);
  if (!test) throw new Error(`Unknown test: ${root.dataset.testId}`);
  bootQuiz(root, test);
}

interface Answer {
  question: QuizQuestion;
  optionIndex: number;
  points: number;
  max: number;
}

interface ResultState {
  level: TestLevel;
  score: number;
  dimensions: Array<{ label: string; score: number }>;
  gaps: string[];
}

function bootQuiz(root: HTMLElement, test: TestDefinition) {
  const find = <T extends HTMLElement>(selector: string) => {
    const element = root.querySelector<T>(selector);
    if (!element) throw new Error(`Missing quiz element: ${selector}`);
    return element;
  };

  const startView = find("#start-view");
  const questionView = find("#question-view");
  const resultView = find("#result-view");
  const progressBar = find("#progress-bar");
  const answeredCount = find("#answered-count");
  const questionPosition = find("#question-position");
  const questionDifficulty = find("#question-difficulty");
  const questionCategory = find("#question-category");
  const questionSetup = find("#question-setup");
  const questionPrompt = find("#question-prompt");
  const questionCard = find("#question-card");
  const optionList = find("#option-list");
  const answerFeedback = find("#answer-feedback");
  const feedbackVerdict = find("#feedback-verdict");
  const feedbackExplanation = find("#feedback-explanation");
  const feedbackTakeaway = find("#feedback-takeaway");
  const feedbackSources = find("#feedback-sources");
  const nextQuestion = find<HTMLButtonElement>("#next-question");
  const resultCard = find("#result-card");
  const resultScore = find("#result-score");
  const resultTier = find("#result-tier");
  const resultCode = find("#result-code");
  const resultIcon = find("#result-icon");
  const resultTitle = find("#result-title");
  const resultQuote = find("#result-quote");
  const resultRoast = find("#result-roast");
  const resultGaps = find("#result-gaps");
  const shareStatus = find("#share-status");
  const challengeBanner = find("#challenge-banner");
  const challengeCopy = find("#challenge-copy");
  const confettiLayer = document.querySelector<HTMLElement>("#confetti-layer");
  const dimensionBars = [...root.querySelectorAll<HTMLElement>("[data-dimension-bar]")];
  const dimensionValues = [...root.querySelectorAll<HTMLElement>("[data-dimension-value]")];

  let questionIndex = 0;
  let answers: Answer[] = [];
  let answered = false;
  let result: ResultState | undefined;

  function show(view: HTMLElement) {
    [startView, questionView, resultView].forEach((item) => { item.hidden = item !== view; });
  }

  function reset() {
    questionIndex = 0;
    answers = [];
    answered = false;
    result = undefined;
    shareStatus.textContent = "";
    show(startView);
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function start() {
    questionIndex = 0;
    answers = [];
    show(questionView);
    renderQuestion();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuestion() {
    const question = test.questions[questionIndex];
    answered = false;
    answerFeedback.hidden = true;
    questionCard.classList.remove("answered");
    answeredCount.textContent = `${answers.length} / ${test.questions.length}`;
    questionPosition.textContent = `${String(questionIndex + 1).padStart(2, "0")} / ${String(test.questions.length).padStart(2, "0")}`;
    questionDifficulty.textContent = question.difficulty;
    questionCategory.textContent = question.category;
    questionSetup.textContent = question.setup;
    questionPrompt.textContent = question.prompt;
    progressBar.style.width = `${(questionIndex / test.questions.length) * 100}%`;
    optionList.replaceChildren();

    question.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.innerHTML = `<span>${String.fromCharCode(65 + optionIndex)}</span><strong>${escapeHtml(option.label)}</strong>`;
      button.addEventListener("click", () => selectOption(question, optionIndex));
      optionList.append(button);
    });
  }

  function selectOption(question: QuizQuestion, optionIndex: number) {
    if (answered) return;
    answered = true;
    const option = question.options[optionIndex];
    const max = Math.max(...question.options.map((item) => item.points));
    answers.push({ question, optionIndex, points: option.points, max });

    const buttons = [...optionList.querySelectorAll<HTMLButtonElement>("button")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === optionIndex) button.classList.add("selected");
      if (question.options[index].best) button.classList.add("recommended");
    });
    questionCard.classList.add("answered");
    answeredCount.textContent = `${answers.length} / ${test.questions.length}`;
    progressBar.style.width = `${((questionIndex + 1) / test.questions.length) * 100}%`;

    if (test.kind === "knowledge") {
      const correct = Boolean(option.best);
      feedbackVerdict.textContent = `${correct ? "答对了" : "补一课"} · ${option.reaction}`;
      feedbackVerdict.dataset.tone = correct ? "good" : "learn";
    } else if (test.kind === "usage") {
      const usageLabels = ["第一次见", "听说过", "已经会用", "已成工作流"];
      feedbackVerdict.textContent = `${usageLabels[option.points] ?? "已记录"} · ${option.reaction}`;
      feedbackVerdict.dataset.tone = option.points >= max ? "good" : "learn";
    } else {
      feedbackVerdict.textContent = `人格证据 +1 · ${option.reaction}`;
      feedbackVerdict.dataset.tone = "neutral";
    }

    feedbackExplanation.textContent = question.explanation;
    feedbackTakeaway.textContent = `带走：${question.takeaway}`;
    feedbackSources.replaceChildren();
    question.sources?.forEach((source) => {
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `${source.label} ↗`;
      feedbackSources.append(link);
    });
    nextQuestion.textContent = questionIndex === test.questions.length - 1 ? "查看结果 →" : "下一题 →";
    answerFeedback.hidden = false;
    answerFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function calculateResult(): ResultState {
    const total = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxTotal = answers.reduce((sum, answer) => sum + answer.max, 0);
    const score = maxTotal === 0 ? 0 : Math.round((total / maxTotal) * 100);
    const dimensions = test.dimensions.map((dimension) => {
      const matching = answers.filter((answer) => answer.question.dimension === dimension.key);
      const points = matching.reduce((sum, answer) => sum + answer.points, 0);
      const maximum = matching.reduce((sum, answer) => sum + answer.max, 0);
      return { label: dimension.label, score: maximum === 0 ? 0 : Math.round((points / maximum) * 100) };
    });

    let level: TestLevel;
    if (test.kind === "personality" && test.personalityTypes) {
      const profile = dimensions.map((dimension) => dimension.score >= 62 ? "1" : "0").join("");
      level = test.personalityTypes.find((item) => item.profile === profile) ?? test.personalityTypes[0];
    } else {
      level = test.levels.find((item) => score >= item.min) ?? test.levels[test.levels.length - 1];
    }

    const gapCandidates = answers
      .map((answer) => ({ gap: answer.max - answer.points, takeaway: answer.question.takeaway }))
      .filter((item) => item.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .filter((item, index, all) => all.findIndex((candidate) => candidate.takeaway === item.takeaway) === index);
    const gaps = test.dimensions
      .map((dimension) => answers
        .filter((answer) => answer.question.dimension === dimension.key && answer.max > answer.points)
        .sort((a, b) => (b.max - b.points) - (a.max - a.points))[0]?.question.takeaway)
      .filter((takeaway): takeaway is string => Boolean(takeaway));
    for (const candidate of gapCandidates) {
      if (gaps.length >= 3) break;
      if (!gaps.includes(candidate.takeaway)) gaps.push(candidate.takeaway);
    }

    if (gaps.length === 0) {
      gaps.push(test.kind === "personality" ? "把你的高分工作流做成 Skill，少靠临场发挥。" : "把这套高分用法教给一个还在手工作业的朋友。");
    }
    return { level, score, dimensions, gaps };
  }

  function renderResult() {
    result = calculateResult();
    const { level, score, dimensions, gaps } = result;
    resultScore.textContent = String(score);
    resultTier.textContent = test.kind === "personality" ? `VIBER TYPE · ${level.tier}` : `综合评级 · ${level.tier}`;
    resultCode.textContent = level.code;
    resultIcon.textContent = level.icon;
    resultTitle.textContent = level.title;
    resultQuote.textContent = `“${level.quote}”`;
    resultRoast.textContent = level.roast;
    resultCard.style.setProperty("--result-color", level.color);
    resultCard.style.setProperty("--result-ink", level.ink);
    resultGaps.replaceChildren(...gaps.map((gap) => {
      const item = document.createElement("li");
      item.textContent = gap;
      return item;
    }));
    dimensions.forEach((dimension, index) => {
      if (dimensionBars[index]) dimensionBars[index].style.width = `${dimension.score}%`;
      if (dimensionValues[index]) dimensionValues[index].textContent = String(dimension.score);
    });
    const url = new URL(window.location.href);
    url.searchParams.set("result", level.code);
    url.searchParams.set("score", String(score));
    window.history.replaceState({}, "", url);
    show(resultView);
    launchConfetti(confettiLayer);
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveResultImage() {
    if (!result) return;
    const blob = await drawResult(test, result);
    const filename = `vibe-${test.id}-${result.level.code.toLowerCase()}-${result.score}.png`;
    const file = new File([blob], filename, { type: "image/png" });
    const shareUrl = new URL(window.location.href).href;

    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: `${test.shortTitle}：${result.level.title}`, text: `我在 ${test.shortTitle} 测出 ${result.level.tier} · ${result.score} 分。你也来试试。`, url: shareUrl, files: [file] });
        shareStatus.textContent = "结果图已分享。";
        return;
      }
      downloadBlob(blob, filename);
      shareStatus.textContent = "结果图已保存。";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        shareStatus.textContent = "已取消分享。";
        return;
      }
      downloadBlob(blob, filename);
      shareStatus.textContent = "分享不可用，已改为保存图片。";
    }
  }

  find("#start-test").addEventListener("click", start);
  find("#exit-test").addEventListener("click", reset);
  find("#retry-test").addEventListener("click", start);
  find("#share-result").addEventListener("click", saveResultImage);
  find("#challenge-close").addEventListener("click", () => { challengeBanner.hidden = true; });
  nextQuestion.addEventListener("click", () => {
    if (!answered) return;
    if (questionIndex >= test.questions.length - 1) renderResult();
    else {
      questionIndex += 1;
      renderQuestion();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const sharedCode = new URL(window.location.href).searchParams.get("result");
  const sharedScore = new URL(window.location.href).searchParams.get("score");
  const sharedLevel = [...test.levels, ...(test.personalityTypes ?? [])].find((item) => item.code === sharedCode);
  if (sharedLevel) {
    challengeCopy.textContent = `有人测出「${sharedLevel.title}」${sharedScore ? ` · ${sharedScore} 分` : ""}，不服就来。`;
    challengeBanner.hidden = false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] ?? char);
}

function launchConfetti(layer: HTMLElement | null) {
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  layer.replaceChildren();
  const colors = ["#111111", "#e9663b", "#3c7cff", "#f4cb3f", "#72b55b"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--delay", `${Math.random() * 0.7}s`);
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    layer.append(piece);
  }
  layer.classList.add("active");
  window.setTimeout(() => layer.classList.remove("active"), 2400);
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function drawResult(test: TestDefinition, result: ResultState): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  const { level, score, dimensions, gaps } = result;
  context.fillStyle = "#f5f3ed";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = level.color;
  context.fillRect(54, 54, 972, 1332);
  context.strokeStyle = level.ink;
  context.lineWidth = 4;
  context.strokeRect(54, 54, 972, 1332);
  context.fillStyle = level.ink;

  context.font = '700 28px "Arial", sans-serif';
  context.fillText(`01MVP / ${test.shortTitle.toUpperCase()}`, 104, 124);
  context.textAlign = "right";
  context.font = '900 68px "Arial", sans-serif';
  context.fillText(String(score), 970, 142);
  context.font = '700 24px "Arial", sans-serif';
  context.fillText("/ 100", 970, 174);
  context.textAlign = "left";

  context.font = '800 34px "Arial", sans-serif';
  context.fillText(test.kind === "personality" ? `VIBER TYPE · ${level.tier}` : `综合评级 · ${level.tier}`, 104, 255);
  context.font = '900 178px "Arial", sans-serif';
  context.fillText(level.code, 96, 430);
  context.textAlign = "right";
  context.font = '104px "Apple Color Emoji", sans-serif';
  context.fillText(level.icon, 970, 420);
  context.textAlign = "left";

  context.font = '900 58px "Arial", sans-serif';
  context.fillText(level.title, 104, 520);
  context.font = '600 34px "Arial", sans-serif';
  drawWrappedText(context, `“${level.quote}”`, 104, 585, 820, 50, 2);

  let y = 735;
  dimensions.forEach((dimension) => {
    context.font = '700 27px "Arial", sans-serif';
    context.fillText(dimension.label, 104, y);
    context.textAlign = "right";
    context.fillText(String(dimension.score), 970, y);
    context.textAlign = "left";
    context.globalAlpha = 0.18;
    context.fillRect(240, y - 24, 650, 24);
    context.globalAlpha = 1;
    context.fillRect(240, y - 24, 650 * (dimension.score / 100), 24);
    y += 70;
  });

  context.strokeStyle = level.ink;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(104, 948);
  context.lineTo(970, 948);
  context.stroke();
  context.font = '800 25px "Arial", sans-serif';
  context.fillText("你的补课清单", 104, 1002);
  context.font = '600 24px "Arial", sans-serif';
  y = 1048;
  gaps.slice(0, 3).forEach((gap) => {
    context.fillText("→", 104, y);
    y = drawWrappedText(context, gap, 152, y, 800, 34, 2) + 44;
  });

  context.font = '700 24px "Arial", sans-serif';
  context.fillText(`vibe.01mvp.com/${test.slug}`, 104, 1330);
  context.textAlign = "right";
  context.fillText("不服就来测", 970, 1330);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image generation failed")), "image/png");
  });
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number) {
  const characters = [...text];
  const lines: string[] = [];
  let current = "";
  characters.forEach((character) => {
    const candidate = current + character;
    if (context.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = character;
    } else current = candidate;
  });
  if (current) lines.push(current);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines) visible[maxLines - 1] = `${visible[maxLines - 1].slice(0, -1)}…`;
  visible.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return y + (visible.length - 1) * lineHeight;
}
