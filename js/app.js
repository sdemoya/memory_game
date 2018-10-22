//CREATE CARDS
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

//SHUFFLE CARDS function from http://stackoverflow.com/a/2450976
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


//START GAME
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

//FLIP & MATCH
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
      //ENDS GAME
      if (matches.length == 1) {
            console.log('gammmme');
            stars ();
            stopT();
      }
  });
});


//MOVE COUNTER
moves = 0;

function moveCounter( ) {
  moves++
  document.getElementById('moves').innerHTML = moves;
}

//TIMER
var time = document.getElementById('timer')

function gameTime() {
  var second = 00;
  var minute = second * 60;
  setTimeout (function() {
    second++;
    if (second == 60) {
      second = 00;
      minute++;
    }
    if (second < 0) {
      clearTimeout(time);
    }
    time.innerHTML = minute + ':' + second;
  }, 1000);
}

function finalT() {

}

function stopT() {
  clearTimeout(time);
}

//RESET BUTTON
function reset () {
  window.location.reload();
}


//STAR RATING
function stars () {
  if (moves > 8 && moves < 16) {
    console.log('3 stars');
  } else if (moves == 16 && moves < 24) {
     document.getElementById('3').classList.remove('fa-star');
     document.getElementById('3').classList.add('fa-star-o');
     console.log ("2 stars");
  } else if (moves > 24 && moves < 33) {
    document.getElementById('3').classList.remove('fa-star');
    document.getElementById('3').classList.add('fa-star-o');
    document.getElementById('2').classList.remove('fa-star');
    document.getElementById('2').classList.add('fa-star-o');
    console.log('1 star');
  } else {
    document.getElementById('3').classList.remove('fa-star');
    document.getElementById('3').classList.add('fa-star-o');
    document.getElementById('2').classList.remove('fa-star');
    document.getElementById('2').classList.add('fa-star-o');
    document.getElementById('1').classList.remove('fa-star');
    document.getElementById('1').classList.add('fa-star-o');
    console.log('no stars');
  }
}


/*
var win = document.getElementById('won');
var lose = document.getElementById('lost');
var finalTime = timer.innerHTML

//document.addEventListener('openCards.length === 16',   ...)
function gameEnd() {
  if (openCards.length === 16) {
    alert("Congratulations! You matched all 8 pairs."); //Display time, stars & moves
    //stopTimer();   clearInterval(interval);

  } else if (openCards.length !== 16) {
      alert("Better luck next time!");
  }
};

*/
