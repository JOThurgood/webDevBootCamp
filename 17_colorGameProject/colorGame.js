var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisp");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1")

colorDisplay.textContent = pickedColor;

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