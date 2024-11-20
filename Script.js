const questions = [
  {
    question: "Which is the largest animal in the World?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: false },
    ],
  },
  {
    question: "Which is the smallest animal in the World?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: false },
      { text: "Bumblebee bat", correct: true },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: "Which is the fastest land animal?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Tiger", correct: false },
    ],
  },
  {
    question: "Which is the largest bird in the World?",
    answers: [
      { text: "Penguin", correct: false },
      { text: "Ostrich", correct: true },
      { text: "Eagle", correct: false },
      { text: "Peacock", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const rollnoInput = document.getElementById("rollno");
const startQuizButton = document.getElementById("start-quiz-btn");
const quizSection = document.getElementById("quiz-section");
const scoreSection = document.getElementById("score-section");
const rollnoDisplay = document.getElementById("rollno-display");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let rollNo = "";
let scores = {}; // Store scores with roll number as key

// Start the quiz
function startQuiz() {
  rollNo = rollnoInput.value;
  if (rollNo === "") {
    alert("Please enter your Roll No");
    return;
  }

  // Hide roll number input and start quiz button, show quiz section
  document.getElementById("rollno-section").style.display = "none";
  quizSection.style.display = "block";

  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none"; // Hide next button initially
  showQuestion();
}

// Show the current question
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Clear previous answers
  answerButton.innerHTML = "";

  // Create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, button));
    answerButton.appendChild(button);
  });
}

// Select an answer
function selectAnswer(answer, button) {
  if (answer.correct) {
    score++;
    button.classList.add("correct"); // Mark the correct answer
  } else {
    button.classList.add("incorrect"); // Mark the wrong answer
  }

  // Disable all buttons after selecting an answer
  const allButtons = answerButton.querySelectorAll("button");
  allButtons.forEach((btn) => {
    btn.disabled = true;
  });

  nextButton.style.display = "block"; // Show the next button
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextButton.style.display = "none"; // Hide next button until answer is selected
  } else {
    showResults();
  }
}

// Show the results after the quiz is over
function showResults() {
  // Store the score with the roll number
  scores[rollNo] = score;

  questionElement.innerHTML = `Quiz Over! Your score: ${score} out of ${questions.length}`;
  answerButton.innerHTML = ""; // Clear answer buttons
  nextButton.style.display = "none"; // Hide next button

  // Display roll number and score
  rollnoDisplay.innerHTML = rollNo;
  scoreDisplay.innerHTML = score;

  // Show the score section
  scoreSection.style.display = "block";
}

nextButton.addEventListener("click", nextQuestion);
startQuizButton.addEventListener("click", startQuiz);
