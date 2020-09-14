const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

// Flip counter.
let combos = 0;

function count() {
    $(".count").text(++combos);
}

// Card shuffle
(function shuffle() {
    cards.forEach(card => {
        let cardShuffle = Math.floor(Math.random()*16);
        card.style.order = cardShuffle;
    });
})();

function flipCard() {

    if (lockBoard) return;

    // Prevents click of same card twice
    if (this === firstCard) return;

    // Flip card animation
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //second click
        //hasFlippedCard = false;
        secondCard = this;
        
        //Counts when two flips have been made.
        count()

        //do cards match...
        if (firstCard.dataset.name === secondCard.dataset.name) {
            //it matches!
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            resetBoard()
            playLinda()
            
        } else {

            lockBoard = true;

            //no match!
            setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard()
            
            }, 1000);
        }
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));
