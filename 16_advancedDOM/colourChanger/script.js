var button = document.querySelector("button");

button.addEventListener("click", function() {
    console.log('clicked')
    if (document.bgColor !== "purple") {
        document.bgColor = "purple"
    } else {
        document.bgColor = ""
    }
});