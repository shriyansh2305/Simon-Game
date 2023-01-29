var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var  started = false;


$(".btn").click(function(){
       
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
    

});


function nextSequence() {

    level++;

    $("#level-title").text("Level " + level );

    var  randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var randomChosenButtonId = "#" + randomChosenColour;

    $("randomChosenButtonId").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    // console.log(gamePattern);    
    
}

function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    // var currentClass = "." + currentColour;  worked when put inside $()

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);

    // .delay(100).removeClass("pressed"); //did not work
    
}

$(document).keypress(function(){
   
    if(!started) {
        // $("#level-title").text("Level " + level );
        nextSequence();
        started = true;
    }
    
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length) {

            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            },1000);
        }
    }else {
        console.log("Failure");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}

