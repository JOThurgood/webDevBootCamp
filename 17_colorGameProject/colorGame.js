var numSqrs = 6;
var colors =[];
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.querySelector("#colorDisp");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1")
var resetButton = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode")

init();

function init() {
    initButtons(); // event listeners etc
    initSquares();
    reset(); // Initial color selection + disp
}

function initButtons() {
    resetButton.addEventListener("click", reset);
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function () {
            // deselect all first
            for (var i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove("selected");
            }
            this.classList.add("selected");
            this.textContent === "Easy" ? numSqrs = 3 : numSqrs = 6;
            reset();
        });
    }
}

function initSquares() {
    for(var i = 0; i < squares.length; i++){        
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                h1.style.backgroundColor = clickedColor;
                messageDisplay.textContent = "Correct"
                changeColors(clickedColor);
                resetButton.textContent = "Play again?"
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSqrs);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = ""

    for(var i = 0; i < squares.length; i++){
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New colours"
}


function changeColors(color) {
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    return colors[Math.floor(Math.random() * colors.length)];  
}

function generateRandomColors(n) {
    var arr = [] 
    for (var i = 0; i < n; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor( Math.random()*256 )
    var g = Math.floor( Math.random()*256 )
    var b = Math.floor( Math.random()*256 )
    // the whitespace in the return string is important elsewhere
    return `rgb(${r}, ${g}, ${b})`;
}