const cards = document.querySelectorAll(".memory-card");
const bg_video = document.getElementsByClassName("bg-video")[0];


let hasFlipped = false, firstCard = null, secondCard = null, count = 0;
let lockBoard = false;
const game_bg_music = new Audio("images/game-bg-music.mp3");
const game_start_button = document.getElementById("start-game");
let gameStarted = false;
const mute_button = document.getElementById("mute-btn");
const score = document.getElementById("score-container");
const hints_btn = document.getElementById("hints-btn");
let hints_left = 4;//Total available "HINTS"
let hints_left_display = document.getElementById("hints-left");
hints_left_display.innerText = hints_left;



game_start_button.addEventListener("click", () => {
    gameStarted = true;

    game_bg_music.loop = true;
    game_bg_music.play();
    game_bg_music.volume = 0.1;
    // game_bg_music.muted = true;
});
mute_button.addEventListener("click", () => {
    // console.log(game_bg_music.pause());
    if (!gameStarted) return;
    if (game_bg_music.paused) {
        mute_button.querySelector("img").src = "./images/volume-up.svg";
        game_bg_music.play();
    }
    else {
        mute_button.querySelector("img").src = "./images/volume-mute.svg";
        game_bg_music.pause();
    }
});

hints_btn.addEventListener("click", () => {
    if (!gameStarted) return;
    if (hints_left != 0 && firstCard != null && secondCard === null) {
        hints_left--;
        hints_left_display.innerText = hints_left;
        let cardValue = firstCard.dataset.technology;
        cards.forEach((card) => {
            if (card != firstCard && card.dataset.technology === cardValue) {
                card.classList.add("flip");
                lockBoard = true;
                setTimeout(() => {
                    card.classList.remove("flip");
                    lockBoard = false;
                }, 1500);
            }
        })
    }
});

function flipCard() {
    if (!gameStarted) return;
    if (lockBoard) return;
    if (this === firstCard) {
        return;
    }
    this.classList.add('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    // hasFlipped = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.technology === secondCard.dataset.technology) {
        disableCards();
        count++;
        console.log(count);
        score.innerText = count;
        return;
    }
    unflipCards();
    if (count > 0) {
        count--;
        score.innerText = count;
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    // secondCard.classList.add("flip");
    const game_success_music = new Audio("images/game-success-music-6346.mp3");
    game_success_music.play();
    resetBoard();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // lockBoard = false;
        resetBoard();
    }, 1500);
}
function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => {
    let cardOrder = Math.floor(Math.random() * 12);
    card.style.order = cardOrder;
})

cards.forEach(card => card.addEventListener("click", flipCard));