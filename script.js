/* MOBILE NAVIGATION */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

/* DARK MODE */
const themeToggle = document.getElementById("themeToggle");

try {
  if (localStorage.getItem("vaccity-theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }
} catch (error) {}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const dark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = dark ? "☀️" : "🌙";

  try {
    localStorage.setItem("vaccity-theme", dark ? "dark" : "light");
  } catch (error) {}
});

/* EXPANDABLE VACCINE CARDS */
document.querySelectorAll(".learn-btn").forEach(button => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    const open = detail.classList.toggle("show");
    button.textContent = open ? "SHOW LESS −" : "LEARN MORE +";
  });
});

/* VACCINE SEARCH */
const search = document.getElementById("vaccineSearch");
const cards = document.querySelectorAll(".type-card");
const noResults = document.getElementById("noResults");

search.addEventListener("input", () => {
  const term = search.value.toLowerCase().trim();
  let count = 0;

  cards.forEach(card => {
    const match = card.textContent.toLowerCase().includes(term);
    card.style.display = match ? "" : "none";
    if (match) count++;
  });

  noResults.style.display = count ? "none" : "block";
});

/* RANDOM SCIENCE FACTS */
const facts = [
  "Vaccines train the immune system to recognize specific pathogens.",
  "Memory B cells and T cells help the body respond faster when it encounters a familiar pathogen.",
  "Not all vaccines work in the same way. Some use weakened or inactivated pathogens, while others use specific parts or genetic instructions.",
  "Vaccine development includes laboratory research, clinical trials, regulatory review, and continued safety monitoring.",
  "High vaccination coverage can help reduce the spread of certain infectious diseases in a community.",
  "mRNA in some vaccines provides temporary instructions for cells to make an antigen. It does not change a person's DNA.",
  "Biotechnology helps scientists design and produce vaccines using tools such as genetic engineering and cell culture.",
  "An antigen is a substance that can be recognized by the immune system and can trigger an immune response.",
  "Vaccines are tested in several stages before they are approved for public use. Researchers study both safety and effectiveness.",
  "A booster dose can remind the immune system about a pathogen and strengthen or restore protection when needed.",
  "Different vaccines may need different storage conditions. Some must be kept cold to help maintain their quality.",
  "Vaccination can help protect people who are more likely to become seriously ill by reducing the spread of some infectious diseases."
];

let lastFact = -1;

function showRandomFact() {
  let next = Math.floor(Math.random() * facts.length);
  while (facts.length > 1 && next === lastFact) {
    next = Math.floor(Math.random() * facts.length);
  }
  lastFact = next;
  document.getElementById("scienceFact").textContent = facts[next];
}

const factContainer = document.getElementById("factContainer");
factContainer.innerHTML = `
  <div class="daily-fact">
    <strong>🧠 DID YOU KNOW?</strong>
    <p id="scienceFact"></p>
    <button id="newFactBtn" type="button">Show another fact ↻</button>
  </div>
`;

document.getElementById("newFactBtn").addEventListener("click", showRandomFact);
showRandomFact();

/* CLICKABLE SCIENCE GLOSSARY */
const glossaryContainer = document.getElementById("glossaryContainer");

glossaryContainer.innerHTML = `
  <div class="learning-widget">
    <h3>📖 Quick Science Glossary</h3>
    <p>Tap a term to reveal its meaning.</p>
    <div class="glossary-buttons">
      <button data-term="antigen">Antigen</button>
      <button data-term="antibody">Antibody</button>
      <button data-term="pathogen">Pathogen</button>
      <button data-term="immunity">Immunity</button>
      <button data-term="biotechnology">Biotechnology</button>
      <button data-term="clinical">Clinical Trial</button>
    </div>
    <div class="glossary-answer" id="glossaryAnswer">Choose a word above to see its meaning.</div>
  </div>
`;

const definitions = {
  antigen: "An antigen is a substance recognized by the immune system. It can trigger an immune response.",
  antibody: "An antibody is a protein made by certain immune cells that can bind to a specific antigen.",
  pathogen: "A pathogen is a microorganism or agent that can cause disease, such as certain viruses and bacteria.",
  immunity: "Immunity is the body's ability to resist or respond to an infection or other harmful substance.",
  biotechnology: "Biotechnology uses living organisms, cells, or biological processes to develop products and technologies.",
  clinical: "A clinical trial is a research study involving people that evaluates a medical intervention, including a vaccine."
};

document.querySelectorAll("[data-term]").forEach(button => {
  button.addEventListener("click", () => {
    const term = button.dataset.term;
    document.getElementById("glossaryAnswer").textContent = definitions[term];
    document.querySelectorAll("[data-term]").forEach(item => {
      item.setAttribute("aria-pressed", String(item === button));
    });
  });
});

/* MYTH OR FACT GAME */
const mythContainer = document.getElementById("mythContainer");

mythContainer.innerHTML = `
  <div class="learning-widget">
    <h3>🧐 Myth or Fact?</h3>
    <p id="mythStatement"></p>
    <div class="myth-controls">
      <button class="myth-button" id="mythChoice">MYTH</button>
      <button class="myth-button" id="factChoice">FACT</button>
      <button class="myth-button" id="nextMyth" style="display:none">NEXT STATEMENT →</button>
    </div>
    <p class="myth-feedback" id="mythFeedback" aria-live="polite"></p>
  </div>
`;

const statements = [
  {
    text: "Antibiotics can treat viral infections like the flu.",
    answer: "myth",
    detail: "Antibiotics work against bacteria, not viruses. The flu is caused by an influenza virus."
  },
  {
    text: "Vaccines help the immune system recognize specific pathogens.",
    answer: "fact",
    detail: "Vaccines prepare the immune system to recognize a specific pathogen or antigen."
  },
  {
    text: "All vaccines use a live form of a pathogen.",
    answer: "myth",
    detail: "There are several vaccine types, including inactivated, subunit, recombinant, and mRNA vaccines."
  },
  {
    text: "Clinical trials help researchers evaluate vaccine safety and effectiveness.",
    answer: "fact",
    detail: "Clinical trials are an important part of evaluating vaccines before approval."
  },
  {
    text: "mRNA vaccines change a person's DNA.",
    answer: "myth",
    detail: "The mRNA gives temporary instructions to cells and does not change a person's DNA."
  },
  {
    text: "Some vaccines require booster doses.",
    answer: "fact",
    detail: "Some vaccines need additional doses to maintain or strengthen protection."
  },
  {
    text: "Every person experiences the same side effects after vaccination.",
    answer: "myth",
    detail: "Reactions can vary. Some people experience mild side effects, while others may have none."
  }
];

let mythIndex = 0;
let mythAnswered = false;

const mythStatement = document.getElementById("mythStatement");
const mythFeedback = document.getElementById("mythFeedback");
const mythChoice = document.getElementById("mythChoice");
const factChoice = document.getElementById("factChoice");
const nextMyth = document.getElementById("nextMyth");

function loadMyth() {
  mythStatement.textContent = statements[mythIndex].text;
  mythFeedback.textContent = "";
  mythChoice.disabled = false;
  factChoice.disabled = false;
  nextMyth.style.display = "none";
  mythAnswered = false;
}

function answerMyth(choice) {
  if (mythAnswered) return;
  mythAnswered = true;

  const item = statements[mythIndex];
  const correct = choice === item.answer;

  mythFeedback.textContent =
    (correct ? "✓ Correct! " : "✕ Not quite. ") + item.detail;

  mythChoice.disabled = true;
  factChoice.disabled = true;
  nextMyth.style.display = "inline-block";
}

mythChoice.addEventListener("click", () => answerMyth("myth"));
factChoice.addEventListener("click", () => answerMyth("fact"));

nextMyth.addEventListener("click", () => {
  mythIndex = (mythIndex + 1) % statements.length;
  loadMyth();
});

loadMyth();

/* MAIN QUIZ */
const questions = [
  {
    question: "What is the main purpose of a vaccine?",
    answers: [
      "To cure an existing infection",
      "To train the immune system to recognize a pathogen",
      "To replace white blood cells",
      "To prevent the body from producing antibodies"
    ],
    correct: 1,
    explanation: "Vaccines train the immune system to recognize and respond to specific pathogens."
  },
  {
    question: "What does mRNA stand for?",
    answers: [
      "Modified ribonucleic acid",
      "Messenger ribonucleic acid",
      "Multiple reactive nucleic acid",
      "Medical ribonucleic acid"
    ],
    correct: 1,
    explanation: "mRNA stands for messenger ribonucleic acid. It carries instructions for making proteins."
  },
  {
    question: "Which cells help the immune system remember a pathogen?",
    answers: [
      "Memory B cells and T cells",
      "Red blood cells",
      "Platelets",
      "Skin cells"
    ],
    correct: 0,
    explanation: "Memory B cells and T cells help the immune system respond faster during future exposure."
  },
  {
    question: "Which of these is a type of vaccine?",
    answers: [
      "Antibiotic vaccine",
      "mRNA vaccine",
      "Painkiller vaccine",
      "Vitamin vaccine"
    ],
    correct: 1,
    explanation: "mRNA vaccines use genetic instructions to help cells produce an antigen."
  },
  {
    question: "What is a clinical trial?",
    answers: [
      "A test performed only on animals",
      "A process of testing a vaccine in people to evaluate its safety and effectiveness",
      "A method of manufacturing syringes",
      "A way to diagnose every disease"
    ],
    correct: 1,
    explanation: "Clinical trials evaluate a vaccine's safety and effectiveness in human participants."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  const q = questions[currentQuestion];
  answered = false;

  questionText.textContent = q.question;
  questionNumber.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  scoreDisplay.textContent = `SCORE: ${score}`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  answersElement.innerHTML = "";
  feedback.textContent = "";
  nextBtn.style.display = "none";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index, button));
    answersElement.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const allButtons = answersElement.querySelectorAll("button");

  allButtons.forEach((button, i) => {
    button.disabled = true;
    if (i === q.correct) button.classList.add("correct");
  });

  if (index === q.correct) {
    score++;
    feedback.textContent = "✓ Correct! " + q.explanation;
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = "✕ Not quite. " + q.explanation;
  }

  scoreDisplay.textContent = `SCORE: ${score}`;
  nextBtn.style.display = "inline-block";
  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "SEE MY RESULTS →"
      : "NEXT QUESTION →";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quizContent").style.display = "none";
  document.getElementById("quizResult").style.display = "block";
  progressBar.style.width = "100%";

  document.getElementById("resultText").textContent =
    `You got ${score} out of ${questions.length} questions correct. ` +
    (score === 5
      ? "Excellent! You have a great understanding of vaccine biotechnology!"
      : score >= 3
      ? "Good job! Review the topics you missed to improve your understanding."
      : "Keep learning! Explore the website again and try another round.");

  document.getElementById("resultIcon").textContent =
    score === 5 ? "🏆" : score >= 3 ? "🌟" : "📚";

  document.getElementById("resultTitle").textContent =
    score === 5 ? "Perfect Score!" :
    score >= 3 ? "Great Work!" : "Keep Exploring!";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quizContent").style.display = "block";
  document.getElementById("quizResult").style.display = "none";
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restartBtn").addEventListener("click", restartQuiz);

loadQuestion();

/* READING PROGRESS BAR */
function updateReadingProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  document.getElementById("readingProgress").style.width =
    `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

/* BACK TO TOP */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* SCROLL REVEAL */
const revealTargets = document.querySelectorAll(
  "section, .type-card, .step, .timeline-item, .app-card, .eval-card, .creator-card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

console.log("Welcome to VACCITY! Explore, learn, and test your knowledge.");