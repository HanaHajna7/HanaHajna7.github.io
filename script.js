let flippedCards = [];
let canFlip = true;
let player = 1;
let score1 = 0;
let score2 = 0;
let moves = 0;
const flipDelay = 1500;

const restartButton = document.createElement("button");
restartButton.id = "restartButton";
restartButton.innerText = "RESTART";
restartButton.addEventListener("click", restartGame);
document.body.insertBefore(restartButton, document.getElementById("app"));

const showScore = document.createElement("div");
showScore.id = "score";
document.body.appendChild(showScore);

const showMoves = document.createElement("div");
showMoves.id = "moves";
document.body.appendChild(showMoves);

const imagesButton = document.createElement("button");
imagesButton.id = "imagesButton";
imagesButton.innerText = "Switch to Christmas";
document.body.appendChild(imagesButton);

const images1 = [
    "bunny.avif", "bunny.avif",
    "zajiic.jpg", "zajiic.jpg",
    "chicken.webp", "chicken.webp",
    "eggs.jpeg", "eggs.jpeg",
    "kure.webp", "kure.webp",
    "pomlazka.jpg", "pomlazka.jpg",
    "sheep.avif", "sheep.avif",
    "zajic.webp", "zajic.webp"
];
const images2 = [
    "sob.jpg", "sob.jpg",
    "elf.jpg", "elf.jpg",
    "gingerbread.webp", "gingerbread.webp",
    "penguin.avif", "penguin.avif",
    "snowman.jpg", "snowman.jpg",
    "strom.jpg", "strom.jpg",
    "venec.png", "venec.png",
    "santa.avif", "santa.avif"
];

let imagesNow = images1;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createImage(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
}

function createFlipCard(frontSrc, backSrc) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    flipCardFront.appendChild(createImage(frontSrc, "Front"));

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.appendChild(createImage(backSrc, "Back"));

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    flipCard.addEventListener("click", () => {
        if (!canFlip || flipCardInner.classList.contains("flip") || flippedCards.length >= 2) {
            return;
        }
        

        flipCardInner.classList.add("flip");
        flippedCards.push(flipCardInner);

        if (flippedCards.length === 2) {
            canFlip = false;
            moves++;
            const img1 = flippedCards[0].querySelector(".flip-card-back img").src;
            const img2 = flippedCards[1].querySelector(".flip-card-back img").src;

            if (img1 === img2) {
                if(player === 1 ){
                    score1++;
                }else{
                    score2++;
                }
                score();
                flippedCards = [];
                setTimeout(() => {
                    flippedCards = [];
                    canFlip = true;
                }, flipDelay);
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove("flip"));
                    flippedCards = [];
                    canFlip = true;
                    switchPlayer();
                }, flipDelay);
            }
        }
    });
    return flipCard;
}

function createCardMatrix(rows, cols) {
    const gridContainer = document.getElementById("app");
    gridContainer.innerHTML = "";
    shuffle(imagesNow);
    for (let i = 0; i < rows * cols; i++) {
        const card = createFlipCard("pozadi.webp", imagesNow[i]);
        gridContainer.appendChild(card);
    }
    score();
}

function switchPlayer() {
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }
    score();
}
function score(){
    const score = document.getElementById("score");
    const movesTotal = document.getElementById("moves");
    score.innerHTML = `<p>Player 1: ${score1} points</p><p>Player 2: ${score2} points</p>`;
    
    if (score1 + score2 === 8) {
        if (score1 > score2) {
            score.innerHTML = `<p>Player 1 wins!</p>`;
        } else if (score2 > score1) {
            score.innerHTML = `<p>Player 2 wins!</p>`;
        } else {
            score.innerHTML = `<p>It's a tie!</p>`;
        }
    } else {
        score.innerHTML += `<p>Player ${player} is on the move.</p>`;
    }
    movesTotal.innerHTML = `<p>Total moves: ${Math.floor(moves / 2)}</p>`;
}
imagesButton.addEventListener("click", () =>{
    if (imagesNow === images1) {
        imagesNow = images2;
        imagesButton.innerText = "Switch to Easter";
    } else {
        imagesNow = images1;
        imagesButton.innerText = "Switch to Christmas";
    }
    restartGame();
});

function restartGame() {
    flippedCards = [];
    canFlip = true;
    player = 1;
    score1 = 0;
    score2 = 0;
    createCardMatrix(4, 4);
    moves = 0;
    score();
}

createCardMatrix(4, 4);