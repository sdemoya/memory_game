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
  return `<li class="card", data-card="${card}"><i class="fa ${card}"></i></li>`;
};

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


//initalize game
function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  //reset Moves
  moves = 0;
}

initGame();

//flip & matching functionality
var allCards = document.querySelectorAll('.card');
var openCards = [];
var matches = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    //startTimer
    gameTime();
    //so you can't open same card twice
    if (!card.classList.contains('open') &&
        !card.classList.contains('show') &&
        !card.classList.contains('match')) {
          openCards.push(card);
          card.classList.add('open', 'show');

      if (openCards.length == 2) {
        moveCounter();
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          matches.push(openCards);
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

//move counter - need to add display functionality
moves = 0;

function moveCounter( ) {
  moves++
  document.getElementById('moves').innerHTML = moves;
}

//timer
function gameTime() {
  var second = 00;
  var minute = second * 60;
  var time= setInterval (function() {
    document.getElementById('timer').innerHTML = minute + ':' + second;
    second++;
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (second < 0) {
      clearInterval(time);
    }
  }, 1000);
}
console.log(gameTime);
//gameEnd functionality
function gameEnd() {
  if (matches.length == 8) {
    clearInterval(interval);
    finalTime = timer.innerHTML
  } else {
      clearInterval(interval);
      finalTime = timer.innerHTML
  }
}
