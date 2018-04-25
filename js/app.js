//Create a list that holds all of your cards
const iconClasses = [
  "fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  "use strict";
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Add Random Class To Each Card
let RandomArray = shuffle(iconClasses), //Random Array of classes >> icons
  deck = document.getElementById("deck"),
  restartIcon = document.getElementById("restart-icon"),
  playAgainBtn = document.getElementById("play-again");
//Add All Cards To Html (each icon has random class)
for (let i = 0; i < iconClasses.length; i++) {
  deck.innerHTML += `<li class="card" id="${i}">
                <i class="${RandomArray[i]}"></i>
            </li>`;
}

function reload() {
  //reload function
  location.reload();
}
//Restart Game Function
restartIcon.addEventListener("click", reload);
playAgainBtn.addEventListener("click", reload);

//when play button clicked show icons for 2 second  and start imer
let playButton = document.getElementById("play-button"),
  cardIcons = document.querySelectorAll(".deck li i"),
  liElements = document.querySelectorAll(".deck li"),
  moves = document.getElementById("moves"),
  numOfMoves = Number(moves.textContent);

playButton.onclick = function(e) {
  //start this function only for one time
  setTimeout(function() {
    for (let i = 0; i < cardIcons.length; i++) {
      liElements[i].classList.add("show", "open");

      liElements[i].click = function() {
        this.classList.add("show", "open"); //add open,show classes onclick
      };
    }
  }, 200);

  setTimeout(function() {
    for (let i = 0; i < cardIcons.length; i++) {
      liElements[i].classList.remove("show", "open");
    }
  }, 2200);

  //Clculate Time
  let timeInSeconds = document.getElementById("sec"),
    timeInMinutes = document.getElementById("min"),
    countTime;

  function calcTime() {
    "use strict";
    let sec = Number(timeInSeconds.textContent),
      min = Number(timeInMinutes.textContent);

    sec += 1;
    if (sec >= 60) {
      sec = 0;
      min += 1;
    }

    if (sec < 10) {
      sec = "0" + sec;
    }

    if (min < 10) {
      min = "0" + min;
    }

    timeInSeconds.textContent = sec;
    timeInMinutes.textContent = min;
  }
  countTime = setInterval(calcTime, 1000);

  let iconsArray = [],
    stars = document.querySelectorAll(".stars li i"),
    numOfStars = 3,
    matched = 0;
  for (let i = 0; i < cardIcons.length; i++) {
    liElements[i].addEventListener("click", function(e) {
      if (this.className.includes("open") === false) {
        // if card is not opened
        //check if class open is exist or not
        this.classList.add("open", "show");
        numOfMoves += 0.5;
        moves.innerHTML = Math.floor(numOfMoves); //to
        //stars function
        (function checkStars() {
          if (numOfMoves > 10) {
            stars[2].style.color = "black";
            numOfStars = 2;
          }
          if (numOfMoves >= 16) {
            stars[1].style.color = "black";
            numOfStars = 1;
          }
        })();
        //check if two cards are matched or not
        iconsArray.push(this.id);
        console.log(iconsArray);

        if (iconsArray.length === 2) {
          let firstLi = document.getElementById(iconsArray[0]),
            secondLi = document.getElementById(iconsArray[1]);
          if (
            firstLi.firstElementChild.className ===
            secondLi.firstElementChild.className
          ) {
            firstLi.classList.add("match");
            secondLi.classList.add("match");
            iconsArray = [];
            matched += 1; //track the matched cards
            console.log(matched);
          } else {
            setTimeout(function() {
              firstLi.classList.add("not-match");
              secondLi.classList.add("not-match");
              e.preventDefault();
              setTimeout(function() {
                secondLi.setAttribute("class", "card");
                firstLi.setAttribute("class", "card");
              }, 500);
            }, 700);
            iconsArray = [];
          }
        }
        //when all cards are matched
        let result = document.getElementById("result"),
          winPopUp = document.getElementById("win"),
          winIcon = document.getElementById("win-icon"),
          starsContainer = document.getElementById("stars-container"),
          timeResult = document.getElementById("time-result");
        (function allMatched() {
          if (matched === 8) {
            clearInterval(countTime);
            winPopUp.style.transform = "scale(1)";
            winIcon.style.transform = "rotatez(360deg)";
            result.innerHTML = `With ${numOfMoves} Moves  and  ${numOfStars} Stars.
Your ${timeResult.textContent}`;
          }
        })();
      } else {
        e.preventDefault();
      }
    });
  }
  this.style.transform = "scale(0) translatey(-5000px)";
};