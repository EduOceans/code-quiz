let timer;
let currentQuestion = 0;
let score = 75;

function setTimer () {
    timeElement.innerHTML = score;
    timer = setInterval(function () {
        score--;
        timeElement.innerHTML = score;
    }, 1000);
}   

function displayQuestions() {
    
    // Questions finished
    if (currentQuestion == questions.length) {
        clearInterval(timer);
        return displayEndScreen();
    }

    // Display of the title
    const questionTitleElement = document.getElementById("question-title");
    questionTitleElement.innerHTML = questions[currentQuestion].question;

    const questionsElement = document.getElementById("questions");
    questionsElement.removeAttribute("class");

    // Display of answers
    const choicesElement = document.getElementById("choices");
    choicesElement.innerHTML = '';
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        choicesElement.innerHTML += `<button onclick="clickButton(${i})" class="btn">${questions[currentQuestion].answers[i].text}</button>`;
    }
}

function displayEndScreen() {
    const questionsElement = document.getElementById("questions")
    questionsElement.setAttribute("class", "hide");

    const endScreen = document.getElementById("end-screen");
    endScreen.removeAttribute("class");

    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.innerHTML = score;
}

function hideStartScreen() {
    const startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");
}
// Start the quiz 
function startQuiz() {
    
    // Timer countdown
    setTimer();

    displayQuestions();

    hideStartScreen(); 
}

function clickButton(index) {
    const feedbackMessage = document.getElementById("feedback");
    feedbackMessage.classList.remove("hide");
    
    // 1. Display result (correct/incorrect)
    if (questions[currentQuestion].answers[index].correct == true) {
        feedbackMessage.innerHTML = "CORRECT!";
    } else {
        feedbackMessage.innerHTML = "WRONG!";
        // 2. Deduct 10s from counter
        score -= 10;
        timeElement.innerHTML = score;
    }
    
    // 3. Go to next question
    currentQuestion++;
    displayQuestions();
}

let initials = '';

function setHighScores() {
    const initialsElement = document.getElementById("initials").value; 
    initials = initialsElement;

    const finalScoresStorage = JSON.parse(localStorage.getItem("finalscores"));
    if (finalScoresStorage) {
        finalScoresStorage.push({
            initials: initials,
            score: score,
        })
        localStorage.setItem("finalscores", JSON.stringify(finalScoresStorage));
    } else {
        localStorage.setItem("finalscores", JSON.stringify([{
            initials: initials,
            score: score,
        }]));    
    }

    

    window.location.href = "highscores.html";
}




// TIMER
const timeElement = document.getElementById("time");

// START QUIZ BUTTON
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', startQuiz);

// SUBMIT BUTTON
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", setHighScores);

