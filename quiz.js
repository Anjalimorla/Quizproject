const questions = [
  {
    question: "Which CSS property controls text size?",
    options: ["font-weight","font-size","text-style","size"],
    answer: "font-size"
  },
  {
    question: "Which symbol is used for ID selectors in CSS?",
    options: [".","#","*","@"],
    answer: "#"
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: ["<!-- comment -->","/* comment */","// comment","# comment"],
    answer: "// comment"
  },
  {
    question: "Which CSS value makes an element invisible but keeps its space?",
    options: ["display: none","visibility: hidden","opacity: 0","position: hidden"],
    answer: "visibility: hidden"
  }
];

const $ = id => document.getElementById(id);
const QUESTION_TIME = 15;

let index = 0, score = 0, timer, timeLeft;

const nextBtn = $("nextBtn"),
      questionEl = $("question"),
      optionsEl = $("options"),
      progressEl = $("progress"),
      scoreEl = $("scoreDisplay"),
      timerEl = $("timerDisplay");

nextBtn.onclick = () => ++index < questions.length ? loadQuestion() : endQuiz();

function loadQuestion() {
  clearInterval(timer);
  const q = questions[index];

  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${index+1}/${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(btn, opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timeLeft = QUESTION_TIME;
  timerEl.textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timerEl.textContent = `Time: ${--timeLeft}s`;
    if (timeLeft <= 0) revealAnswer();
  }, 1000);
}

function selectAnswer(btn, opt) {
  clearInterval(timer);
  const correct = questions[index].answer;

  [...optionsEl.children].forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add("correct");
  });

  if (opt === correct) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    btn.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function revealAnswer() {
  clearInterval(timer);
  selectAnswer({}, null);
}

function endQuiz() {
  localStorage.setItem("quizScore", score);
  localStorage.setItem("quizTotal", questions.length);
  window.location.href = "result.html";
}

loadQuestion();