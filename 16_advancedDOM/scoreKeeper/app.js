var p1Button = document.querySelector('#p1');
var p2Button = document.querySelector('#p2');
var resetButton = document.querySelector('#reset');
var p1Disp = document.querySelector('#p1Disp');
var p2Disp = document.querySelector('#p2Disp');

var numInput = document.querySelector('input');
var maxScoreDisp = document.querySelector('#maxScoreDisp');

var p1Score = 0;
var p2Score = 0;
var winningScore = 5;
var gameOver = false; 

numInput.addEventListener("change", () => {
    winningScore = parseInt(numInput.value);
    maxScoreDisp.textContent = winningScore;
    reset();
 });

p1Button.addEventListener("click",() => {
    if (!gameOver) {
        p1Score++;
        p1Disp.textContent = p1Score;
    }
    if (p1Score === winningScore) {
        gameOver = true;
        p1Disp.classList.add('winner')
    }
});


p2Button.addEventListener("click",() => {
    if (!gameOver) {
        p2Score++;
        p2Disp.textContent = p2Score;
    }
    if (p2Score === winningScore) {
        gameOver = true;
        p2Disp.classList.add('winner')
    }
});

resetButton.addEventListener("click", reset);

function reset () {
    p1Score = 0;
    p2Score = 0;
    p1Disp.textContent = p1Score;
    p2Disp.textContent = p2Score;
    p1Disp.classList.remove('winner');
    p2Disp.classList.remove('winner');
    gameOver = false
}