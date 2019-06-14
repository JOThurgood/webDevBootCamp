// Check off specific Todos by clicking
$("li").click(function(){
    $(this).toggleClass("completed");
}); 

// Click on X to delete the todo
$("span").click(function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});