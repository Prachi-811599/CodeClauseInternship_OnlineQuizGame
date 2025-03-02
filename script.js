const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "High Tech Markup Language", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/* */", correct: false },
            { text: "#", correct: false },
            { text: "<!-- -->", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Colorful Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false }
        ]
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        answers: [
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Float", correct: true },
            { text: "String", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    clearInterval(timer);
    timeLeft = 10;
    timerDisplay.innerText = `⏳ ${timeLeft}s`;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    resetState();
    questionElement.innerText = `Quiz Completed! Your score: ${score} / ${questions.length}`;
    scoreDisplay.innerText = `Final Score: ${score}`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerText = `⏳ ${timeLeft}s`;
        } else {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

nextButton.addEventListener("click", nextQuestion);

startQuiz();
