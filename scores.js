function readScores() {
    let highscores = JSON.parse(localStorage.getItem("finalscores"));
    
    for (let i = 0; i < highscores.length; i++) {
        document.getElementById("highscores").innerHTML += `<li>${highscores[i].initials} - ${highscores[i].score}</li>`;
    }
}

function clearScores() {
    localStorage.clear();
    document.getElementById("highscores").innerHTML = " ";
}

readScores();
const clearScoreBtn = document.getElementById("clear");
clearScoreBtn.addEventListener('click', clearScores);




