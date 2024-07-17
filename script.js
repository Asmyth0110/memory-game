const cards = document.querySelectorAll('.memory-card');
const movesElement = document.getElementById('moves');
const congratulationsElement = document.getElementById('congratulations');
const totalMovesElement = document.getElementById('total-moves');
const resetButton = document.getElementById('reset-button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedCards = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;
    updateMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedCards += 2;

    if (matchedCards === cards.length) {
        gameCompleted();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateMoves() {
    moves++;
    movesElement.textContent = moves;
}

function gameCompleted() {
    totalMovesElement.textContent = moves;
    congratulationsElement.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

function resetGame() {
    moves = 0;
    matchedCards = 0;
    movesElement.textContent = moves;
    congratulationsElement.classList.add('hidden');
    resetButton.classList.add('hidden');
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

resetButton.addEventListener('click', resetGame);

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
