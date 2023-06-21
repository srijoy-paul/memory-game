const cards = document.querySelectorAll(".memory-card");
const bg_video = document.getElementsByClassName("bg-video")[0];

let hasFlipped = false, firstCard, secondCard, count = 0;
let lockBoard = false;

function flipCard() {
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
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
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
cards.forEach(card => card.addEventListener("click", flipCard));