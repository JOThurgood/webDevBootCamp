// Check off specific Todos by clicking
$("li").click(function(){
    $(this).toggleClass("completed");
}); 

// Click on X to delete the Todo
$("span").click(function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

// 
$("input[type='text']").keypress(function(event){
    if(event.which === 13){ // if enter
        // grab from input
        var todoText = $(this).val();
        // set to empty
        $(this).val('');
        // create new li and add to ul
        $("ul").append("<li><span>X</span>"+todoText+"</li>");
    }
});