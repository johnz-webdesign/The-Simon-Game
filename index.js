userClickedPattern = [];

gamePattern = [];

buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var gameStarted = false;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function () {
    if (!gameStarted) return;

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    var currentColor = $(this);
    currentColor.addClass("pressed");
    setTimeout(function() {
        currentColor.removeClass("pressed");
    }, 100);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("h1").text("Level " + level);
        $(document).off("keydown");
    }
});

function playSound(input) {
    var audio = new Audio("sounds/" + input + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    } else {
        // User made a mistake
        playSound("wrong"); // Play "wrong" sound
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver(); // Reset the game
    }
}

// Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    $(document).keydown(function () {
        if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("h1").text("Level " + level);
        $(document).off("keydown");
    }});
}