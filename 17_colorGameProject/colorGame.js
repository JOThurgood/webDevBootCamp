var numSqrs = 6;
var colors = generateRandomColors(numSqrs);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisp");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1")
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSqrs = 3;
    colors = generateRandomColors(numSqrs);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for(var i = 0; i < squares.length; i++){
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSqrs = 6;
    colors = generateRandomColors(numSqrs);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});


colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function () {
    colors = generateRandomColors(numSqrs);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = ""

    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }

    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New colours"
});

for(var i = 0; i < squares.length; i++){
    // initial colours
    squares[i].style.backgroundColor = colors[i];

    // add click listners

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

function changeColors(color) {
    // loop through squares and change each color to match "color"
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