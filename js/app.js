/*
* Create a list that holds all of your cards

let arrayCards = [
            "fa-bug",
            "fa-hippo",
            "fa-cat",
            "fa-carrot",
            "fa-crow",
            "fa-cat",
            "fa-ice-cream",
            "fa-medal",
            "fa-bug",
            "fa-kiss-wink-heart",
            "fa-ice-cream",
            "fa-kiss-wink-heart",
            "fa-carrot",
            "fa-medal",
            "fa-hippo",
            "fa-crow"];
*/

let toggledCard = []
const deck = document.querySelector('.deck');
let moves = 0;
let stars = 3;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

shuffleDeck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//set an event listen for a card 
// toggle cards, add moves and check if a star need to be hidden, also checking when the game is over

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCard.length < 2 &&
        !toggledCard.includes(clickTarget)
    ) {
        toggleCard(clickTarget);
        addToggledCard(clickTarget);
        if (toggledCard.length === 2) {
            chackForMatch(clickTarget);
            addMove();            
            if (moves == 16 || moves == 32) {
                stars--;
                hideStar();
            }
        }
    }
    if (document.querySelectorAll('.match').length == 16) {
        modalInfo();
        toggleModal();
    };
});

// game restart
document.querySelector('.restart').addEventListener('click', restartGame);
document.querySelector('.restart-button').addEventListener('click', restartButton);
document.querySelector('.cancel-button').addEventListener('click', toggleModal);

//toggle the cards when open/closed and when matched.
function toggleCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addToggledCard(clickTarget) {
    toggledCard.push(clickTarget);
    console.log(toggledCard)
}
//checking for match and toggle the cards accordingly
function chackForMatch() {
    if (toggledCard[0].firstElementChild.className ===
        toggledCard[1].firstElementChild.className
    ) {
        toggledCard[0].classList.toggle('match');
        toggledCard[1].classList.toggle('match');
        toggledCard = [];
    } else {
        setTimeout(() => {
            toggleCard(toggledCard[0]);
            toggleCard(toggledCard[1]);
            toggledCard = [];
        }, 1000);
    }
}

//adding moves
function addMove() {
    moves++;
    const moveCountText = document.querySelector('.moves');
    moveCountText.innerHTML = moves;
}

//show the move count
function countMoves() {
    const moveModalCountText = document.querySelector('.modal-moves');
    moveModalCountText.innerHTML = `with only: ${moves} moves`;
}

//show the star count
function countStars(stars) {
    const starModalCountText = document.querySelector('.modal-stars');
    starModalCountText.innerHTML = `You finished with: ${stars} stars`;
}

function zeroMoves(){
    moves = 0;
    const moveCountText = document.querySelector('.moves');
    moveCountText.innerHTML = moves;
}

//hide stars
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

//show all starts for the restart
function showAllStars() {
    stars = 3;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'inline-block') {
            star.style.display = 'inline-block';
        }
    }	
} 

//set all cards to close
function showAllCards() {
	const allCards = document.querySelectorAll('.card')
    for (card of allCards) {
        if (card.classList.contains('match')) {
            card.classList.remove('match');
            card.classList.remove('open');
            card.classList.remove('show');
        }
    }
}

// add timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function timerResat() {
    minutesLabel.innerHTML = '00';
    secondsLabel.innerHTML = '00';
    totalSeconds = 0;
}

function stopTimer() {
    const minutes = minutesLabel.innerHTML;
    const seconds = secondsLabel.innerHTML;
    const minutesModalCountText = document.querySelector('.modal-minutes');
    minutesModalCountText.innerHTML = `It took you: ${minutes}`;
    const secondsModalCountText = document.querySelector('.modal-seconds');
    secondsModalCountText.innerHTML = `${seconds} minuets`;
}

//resating the game
function restartGame() {
	zeroMoves();
	showAllCards();
    timerResat();
    showAllStars();
}

//toggle the modal on and off (will be activated by an event listener for the cancel button)
function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}

function restartButton () {
    restartGame();
    toggleModal();
}

//adding all the info to the modal
function modalInfo() {
    countStars(stars);
    countMoves();
    stopTimer();
}
