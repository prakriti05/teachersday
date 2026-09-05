/* ==========================================================================
   Teacher's Day — greeting card engine
   One shared state machine (closed → subject's world → paper greeting).
   Each subject only supplies content + a small icon below — the state
   machine, timing, and paper-world styling stay identical for all six,
   so the six pages feel like one project.
   ========================================================================== */

const ICONS = {
  compass: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="10" r="3" fill="currentColor" stroke="none"/>
    <line x1="32" y1="13" x2="18" y2="54"/>
    <line x1="32" y1="13" x2="46" y2="54"/>
    <path d="M14 50 A20 20 0 0 1 50 50" stroke-dasharray="3 4"/>
  </svg>`,
  flask: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26 8h12"/>
    <path d="M28 8v14L14 48a4 4 0 0 0 3.6 6h28.8a4 4 0 0 0 3.6-6L36 22V8"/>
    <path d="M20 40h24"/>
  </svg>`,
  nib: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 6 50 24 32 58 14 24Z"/>
    <line x1="32" y1="24" x2="32" y2="52"/>
    <circle cx="32" cy="19" r="2.2" fill="currentColor" stroke="none"/>
  </svg>`,
  book: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 16c-6-6-16-6-22-3v34c6-3 16-3 22 3"/>
    <path d="M32 16c6-6 16-6 22-3v34c-6-3-16-3-22 3"/>
    <line x1="32" y1="16" x2="32" y2="47"/>
  </svg>`,
  rose: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="32" r="21"/>
    <path d="M32 13 37 32 32 51 27 32Z" fill="currentColor" stroke="none" opacity="0.85"/>
    <line x1="32" y1="6" x2="32" y2="11"/>
    <line x1="32" y1="53" x2="32" y2="58"/>
    <line x1="6" y1="32" x2="11" y2="32"/>
    <line x1="53" y1="32" x2="58" y2="32"/>
  </svg>`,
};

const SUBJECTS = {
  computer: {
    eyebrow: "for the teacher who taught computer science",
    terminal: [
      { text: "> loading_six_years.py", cls: "line-comment" },
      { text: "importing patience, guidance, laughter", cls: "line-val" },
      { text: "compiling every lesson you gave us...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "{ }", top: "16%", left: "10%", delay: 0.9 },
      { text: "</>", top: "72%", left: "14%", delay: 1.3 },
      { text: "print()", top: "20%", left: "78%", delay: 1.1 },
      { text: "while(true)", top: "76%", left: "70%", delay: 1.6 },
      { text: "class Teacher:", top: "48%", left: "6%", delay: 2.0 },
    ],
    title: "Happy Teacher's Day",
    message:
      "C, Python, animation and more—\nYou taught us things we'll always remember.\nBut beyond the codes and screens,\nit was your guidance that truly mattered.",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },

  maths: {
    eyebrow: "for the teacher who taught maths",
    icon: ICONS.compass,
    terminal: [
      { text: "> solving_six_years.eq", cls: "line-comment" },
      { text: "given: countless doubts, endless questions", cls: "line-val" },
      { text: "working through every step, patiently...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "\u03c0", top: "16%", left: "10%", delay: 0.9 },
      { text: "\u221a", top: "72%", left: "14%", delay: 1.3 },
      { text: "\u222b", top: "20%", left: "78%", delay: 1.1 },
      { text: "\u2211", top: "76%", left: "70%", delay: 1.6 },
      { text: "x = ?", top: "48%", left: "6%", delay: 2.0 },
    ],
    title: "Happy Teacher's Day",
    message:
      "X may be unknown,\nbut one thing is certain—\nyour guidance has always made a difference.",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },

  science: {
    eyebrow: "for the teacher who taught science",
    icon: ICONS.flask,
    terminal: [
      { text: "> observing_six_years.lab", cls: "line-comment" },
      { text: "combining curiosity, patience, encouragement", cls: "line-val" },
      { text: "running the experiment called \"school\"...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "F = ma", top: "16%", left: "8%", delay: 0.9 },
      { text: "H\u2082O", top: "72%", left: "14%", delay: 1.3 },
      { text: "DNA", top: "20%", left: "78%", delay: 1.1 },
      { text: "\u2206H", top: "76%", left: "70%", delay: 1.6 },
      { text: "\u2726", top: "48%", left: "6%", delay: 2.0 },
    ],
    title: "Happy Teacher's Day",
    message:
      "From gravity to galaxies,\nfrom reactions to experiments—\nyou made us wonder, \"Why?\"\nand then helped us find the answer.",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },

  hindi: {
    eyebrow: "for the teacher who taught hindi",
    icon: ICONS.nib,
    terminal: [
      { text: "> inking_six_years.txt", cls: "line-comment" },
      { text: "words for patience, verses for encouragement", cls: "line-val" },
      { text: "every lesson written between the lines...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "अ आ इ ई", top: "16%", left: "8%", delay: 0.9 },
      { text: "क ख ग घ", top: "72%", left: "14%", delay: 1.3 },
      { text: "कविता", top: "20%", left: "76%", delay: 1.1 },
      { text: "पन्ने", top: "76%", left: "70%", delay: 1.6 },
      { text: "।", top: "48%", left: "6%", delay: 2.0 },
    ],
    title: "शिक्षक दिवस की हार्दिक शुभकामनाएँ",
    message:
      "शब्दों से भावनाएँ,\nकविताओं से एहसास,\nआपने हिंदी को सिर्फ़ एक विषय नहीं,\nबल्कि दिल से जुड़ी एक भाषा बनाया।\n\nआपका स्नेह और मार्गदर्शन हमेशा याद रहेगा।",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },

  english: {
    eyebrow: "for the teacher who taught english",
    icon: ICONS.book,
    terminal: [
      { text: "> reading_six_years.txt", cls: "line-comment" },
      { text: "chapters on patience, honesty, curiosity", cls: "line-val" },
      { text: "turning every page you taught us...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "\u201c \u201d", top: "16%", left: "8%", delay: 0.9 },
      { text: "once upon a time", top: "72%", left: "10%", delay: 1.3 },
      { text: "the end.", top: "20%", left: "72%", delay: 1.1 },
      { text: "\u00b6", top: "76%", left: "72%", delay: 1.6 },
      { text: "chapter one", top: "48%", left: "5%", delay: 2.0 },
    ],
    title: "Happy Teacher's Day",
    message:
      "Years may pass and lessons may fade,\nbut the teachers who made a difference are never forgotten.\n\nThank you for being one of those teachers, Ma'am",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },

  sst: {
    eyebrow: "for the teacher who taught social studies",
    icon: ICONS.rose,
    terminal: [
      { text: "> mapping_six_years.geo", cls: "line-comment" },
      { text: "marking patience, fairness, curiosity", cls: "line-val" },
      { text: "tracing every lesson across the years...", cls: "line-key" },
      { text: "output: gratitude", cls: "line-val" },
    ],
    floaters: [
      { text: "N", top: "14%", left: "10%", delay: 0.9 },
      { text: "S \u00b7 E \u00b7 W", top: "72%", left: "12%", delay: 1.3 },
      { text: "1947", top: "20%", left: "76%", delay: 1.1 },
      { text: "\u2696", top: "76%", left: "70%", delay: 1.6 },
      { text: "the map", top: "48%", left: "6%", delay: 2.0 },
    ],
    title: "Happy Teacher's Day",
    message:
      "From maps and places to stories of the past,\nyou made the world feel a little closer to us.\n\nThank you, Ma'am, for all the lessons, memories, and moments that made our school days special.",
    closing: "With gratitude,\nfrom one of your students. \u2764",
  },
};

const params = new URLSearchParams(location.search);
const requested = (params.get("subject") || "computer").toLowerCase();
const subjectKey = SUBJECTS[requested] ? requested : "computer";
const subject = SUBJECTS[subjectKey];

const stage = document.getElementById("stage");
stage.dataset.subject = subjectKey;

const phaseClosed = document.getElementById("phase-closed");
const phaseCode = document.getElementById("phase-code");
const phaseGreeting = document.getElementById("phase-greeting");
const terminalEl = document.getElementById("terminal-lines");
const floatersEl = document.getElementById("floaters");
const iconEl = document.getElementById("world-icon");
const eyebrowEl = document.getElementById("eyebrow");
const titleEl = document.getElementById("title");
const messageEl = document.getElementById("message");
const closingEl = document.getElementById("closing");
const skipBtn = document.getElementById("skip");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let timers = [];
let opened = false;
let done = false;

function after(fn, ms) {
  const id = setTimeout(fn, reducedMotion ? Math.min(ms, 120) : ms);
  timers.push(id);
  return id;
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

/* ---------- phase 0 → 1 ---------- */

function openCard() {
  if (opened) return;
  opened = true;
  phaseClosed.hidden = true;
  phaseCode.hidden = false;
  if (subject.icon) {
    iconEl.innerHTML = subject.icon;
    iconEl.hidden = false;
  }
  typeTerminal();
}

/* ---------- phase 1: type out lines, float the symbols ---------- */

function typeTerminal() {
  subject.floaters.forEach((f) => {
    const span = document.createElement("span");
    span.className = "floater";
    span.textContent = f.text;
    span.style.top = f.top;
    span.style.left = f.left;
    span.style.animationDelay = `${f.delay}s, ${f.delay}s`;
    floatersEl.appendChild(span);
  });

  let cursor = 0;
  const lineDelay = reducedMotion ? 80 : 650;

  function nextLine() {
    if (cursor >= subject.terminal.length) {
      after(goToGreeting, reducedMotion ? 200 : 1100);
      return;
    }
    const line = subject.terminal[cursor];
    const div = document.createElement("div");
    div.className = line.cls || "";
    div.textContent = line.text;
    div.style.opacity = "0";
    terminalEl.appendChild(div);
    requestAnimationFrame(() => {
      div.style.transition = "opacity 0.5s ease";
      div.style.opacity = "1";
    });
    cursor += 1;
    after(nextLine, lineDelay);
  }

  after(nextLine, reducedMotion ? 100 : 500);
}

/* ---------- phase 1 → 2 ---------- */

function goToGreeting() {
  stage.setAttribute("data-world", "paper");
  after(() => {
    phaseCode.hidden = true;
    phaseGreeting.hidden = false;
    revealGreeting();
  }, reducedMotion ? 100 : 900);
}

function revealGreeting() {
  eyebrowEl.textContent = subject.eyebrow;
  titleEl.textContent = subject.title;
  messageEl.textContent = subject.message;
  closingEl.textContent = subject.closing;

  const stagger = reducedMotion ? 60 : 450;
  after(() => eyebrowEl.classList.add("reveal-fade"), stagger * 1);
  after(() => titleEl.classList.add("reveal"), stagger * 2);
  after(() => messageEl.classList.add("reveal"), stagger * 4);
  after(() => {
    closingEl.classList.add("reveal-fade");
    finish();
  }, stagger * 7);
}

function finish() {
  done = true;
  skipBtn.hidden = true;
}

/* ---------- skip control ---------- */

function skipToEnd() {
  clearTimers();
  if (done) return;
  opened = true;
  phaseClosed.hidden = true;
  phaseCode.hidden = true;
  stage.setAttribute("data-world", "paper");
  phaseGreeting.hidden = false;

  eyebrowEl.textContent = subject.eyebrow;
  titleEl.textContent = subject.title;
  messageEl.textContent = subject.message;
  closingEl.textContent = subject.closing;
  eyebrowEl.classList.add("reveal-fade");
  titleEl.classList.add("reveal");
  messageEl.classList.add("reveal");
  closingEl.classList.add("reveal-fade");
  finish();
}

/* ---------- wiring ---------- */

phaseClosed.addEventListener("click", openCard);
phaseClosed.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openCard();
  }
});
phaseClosed.tabIndex = 0;
phaseClosed.setAttribute("role", "button");
phaseClosed.setAttribute("aria-label", "Open the greeting card");

skipBtn.addEventListener("click", skipToEnd);
