var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
var score = 0;
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
    score = 0;
}
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        $("h2").text("Score = "+score);
        started = true;
        nextSequence();
    }
});
function nextSequence (){
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
    animatePress(randomChosenColour); 
    level++;
    $("h1").text("Level " + level);
    
}
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour); 
    checkAns();
})
function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(userChosenColour){
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
}
function checkAns(){
    for(var i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i] !== gamePattern[i]){
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            return;
        }
    }
    if(userClickedPattern.length === gamePattern.length){
        userClickedPattern = [];
        score+=(10*level);
        $("h2").text("Score = "+score);
        setTimeout(function(){
            nextSequence();
        }, 1000); 
    }
}