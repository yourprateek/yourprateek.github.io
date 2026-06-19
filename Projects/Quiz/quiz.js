// DOM Elements
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const currentQuestionSpan = document.getElementById("current-ques");
const totalQuestionSpan = document.getElementById("total-ques");
const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What do we normally call the salt water solution used for pickling vegetables?",
        answers: [
            { text: "Syrup", correct: false},
            { text: "Saline Water", correct: false},
            { text: "Vinegar", correct: false},
            { text: "Brine", correct: true}
        ]
    },
    {
        question: "Which internal organ has the highest water content?",
        answers: [
            { text: "The brain", correct: true},
            { text: "Skin", correct: false},
            { text: "The Liver", correct: false},
            { text: "The Stomach", correct: false}
        ]
    },
    {
        question: "What part of a plant transports water from the roots to the leaves?",
        answers: [
            { text: "Xylem", correct: true},
            { text: "Phloem", correct: false},
            { text: "Stem", correct: false},
            { text: "Bark", correct: false}
        ]
    },
    {
        question: "What kind of tide occurs when the sun and moon are at a right angle from one another?",
        answers: [
            { text: "Sring Tides", correct: false},
            { text: "Neap Tide", correct: true},
            { text: "Perigean Tides", correct: false},
            { text: "Apogean Tides", correct: false}
        ]
    },
    {
        question: "What is the largest glacier in the world?",
        answers: [
            { text: "Fox Glacier", correct: false},
            { text: "Siachen Glacier", correct: false},
            { text: "Baltoro Glacier", correct: false},
            { text: "Seller Glacier", correct: true}
        ]
    }
]

//Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    console.log("Quiz Started");

    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;
    score = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex +1;

    const progressPercent= ((currentQuestionIndex)/quizQuestions.length) *100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML ="";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if(answersDisabled) return

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        else if(button === selectedButton){ 
            button.classList.add("incorrect");
        }
    })

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        //check if there are more ques
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        }else{
            showResult();
        }
    },1000)
}

function showResult(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100) {
        resultMessage.textContent = "A Perfect Score!? You are a Genius!   (Unless you cheated)";
    }else if(percentage>= 60){
        resultMessage.textContent = "Average! You can do better";
    }else if(percentage>=30){
        resultMessage.textContent = "Well..This is embarassing xD";
    }else{
        resultMessage.textContent = "Were you even trying?";
    }
}

function restartQuiz(){
    console.log("Quiz Restarted");
    resultScreen.classList.remove("active");

    startQuiz();
}