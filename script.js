/* ==========================================================================
   Teacher's Day — greeting card engine
   One shared state machine (closed → code world → paper greeting).
   Each subject only supplies content + a few visual accents below.
   To add a subject: add an entry to SUBJECTS with the same shape as
   "computer", then link to ?subject=<key>.
   ========================================================================== */

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

  // Stubs — same shape as "computer", to be filled in next.
  maths:   null,
  science: null,
  hindi:   null,
  english: null,
  sst:     null,
};

const params = new URLSearchParams(location.search);
const requested = (params.get("subject") || "computer").toLowerCase();
const subject = SUBJECTS[requested] || SUBJECTS.computer;

const stage = document.getElementById("stage");
const phaseClosed = document.getElementById("phase-closed");
const phaseCode = document.getElementById("phase-code");
const phaseGreeting = document.getElementById("phase-greeting");
const terminalEl = document.getElementById("terminal-lines");
const floatersEl = document.getElementById("floaters");
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
