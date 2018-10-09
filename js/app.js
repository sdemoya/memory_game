//dynamically generate cards
var cards = ['fa-coffee', 'fa-coffee',
            'fa-battery-full', 'fa-battery-full',
            'fa-laptop', 'fa-laptop',
            'fa-terminal', 'fa-terminal',
            'fa-stack-overflow', 'fa-stack-overflow',
            'fa-github', 'fa-github',
            'fa-google', 'fa-google',
            'fa-wifi', 'fa-wifi'];


function generateCard(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
};

//initalize game
function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

initGame();

//flip functionality & timeout to flip over after two are selected
var allCards = document.querySelectorAll('.card');
var openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    //so you can't open same card twice
    if (!card.classList.contains('open') &&
        !card.classList.contains('show') &&
        !card.classList.contains('match')) {
          openCards.push(card);
          card.classList.add('open', 'show');

      if (openCards.length == 2) {
        //add condition to prevent 3rd card from opening
        if (openCards[0].dataset.card == openCards[1].dataset.card) { //error here openCard is not logging/card not defined
          openCards[0].classList.add('open', 'show', 'match');
          openCards[1].classList.add('open', 'show', 'match');
          openCards = [];
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });

            openCards = [];
            }, 800);
          }
        }
      }
  });
});






/*game end function
var matches = [];

function gameOver() {
  if (matches.length === 16) {
    //display pop up
  }
*/


/*

function starRating() {}

function scoreCard() {}

function reset() {}

function moveCounter() {}

function timer(bool){}
*/


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
