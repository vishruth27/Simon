const BUTTON_COLORS = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence() {

    level++;
    userClickedPattern = [];
    $("#level-title").text("LEVEL " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = BUTTON_COLORS[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound('button');
};

document.addEventListener("load", trip, {once: true});

function trip () {

    let sound = new Howl({
        src: ['sounds/trip.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.6,
    })

    sound.play();
}

$(".btn").on("click", function () {


    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    let dropNum = BUTTON_COLORS.indexOf(userChosenColor);
    playSound('waterdrop' + dropNum.toString());
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown", function () {

    if (!started) {
        $("h2").remove();
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(index) {

    if (userClickedPattern[index] == gamePattern[index]) {

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 800);
        }
    } else {

        gameOver();
    }
}

function playSound(audioName) {

    let sound = new Howl({
        src: ['sounds/' + audioName + '.mp3'],
        autoplay: true,
    });
    sound.play();
}

function animatePress(currentColor) {

    $("." + currentColor).addClass("animate")
    setTimeout(function () {
        $("." + currentColor).removeClass("animate");
    }, 1000)
}

function gameOver() {

    document.querySelector("#level-title").innerText = "GAME OVER\nPress any key to restart.";
//     document.body.style.backgroundImage = url('https://media.giphy.com/media/14f8lItZImSCqI/source.gif');
//     setTimeout(function () {
//         document.querySelector("body").classList.toggle("game-over")
//     }, 200)

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
