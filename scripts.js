const cards = document.querySelectorAll(".memory-card");
const bg_video = document.getElementsByClassName("bg-video")[0];


function flipCard() {
    this.classList.toggle('flip');
}
cards.forEach(card => card.addEventListener("click", flipCard))