document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const movesSpan = document.querySelector('.moves');
    const resetButton = document.querySelector('.reset-btn');
    const winMessage = document.querySelector('.win-message');
    const finalMovesSpan = document.querySelector('.final-moves');

    const emojis = ['😀', '😂', '😍', '😎', '🤔', '😴', '🥳', '🤯'];
    let cards = [...emojis, ...emojis];

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        // Reset game state
        gameBoard.innerHTML = '';
        winMessage.style.display = 'none';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        canFlip = true;
        updateMoves();

        shuffle(cards);

        cards.forEach(emoji => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;

            card.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${emoji}</div>
            `;

            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
        });
    }

    function handleCardClick(e) {
        if (!canFlip) return;
        const clickedCard = e.currentTarget;

        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        flipCard(clickedCard);
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            moves++;
            updateMoves();
            canFlip = false; // Prevent flipping more cards
            checkForMatch();
        }
    }

    function flipCard(card) {
        card.classList.add('flipped');
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            // It's a match
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];
            canFlip = true;
            checkWinCondition();
        } else {
            // Not a match
            setTimeout(() => {
                unflipCards();
            }, 1000);
        }
    }

    function unflipCards() {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        flippedCards = [];
        canFlip = true;
    }

    function updateMoves() {
        movesSpan.textContent = `步數: ${moves}`;
    }

    function checkWinCondition() {
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                finalMovesSpan.textContent = moves;
                winMessage.style.display = 'block';
            }, 500);
        }
    }

    resetButton.addEventListener('click', createBoard);

    // Initial game setup
    createBoard();
});