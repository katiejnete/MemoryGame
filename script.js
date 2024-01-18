const gameContainer = document.getElementById("game");

// cards flipped
// no clicking!

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute('data-face','down');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  const divs = document.querySelectorAll('div div');
  for (i = 0; i < divs.length; i++) {
    divs[i].dataset.index = `index${i}`;
  }
}

// TODO: Implement this function!
let clickCount = 0;
let colorMatcher = {};
let domCount = 0;
let dblCheck = {};
let clickable = true;
let matched = false;

function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  // max cards up
  if (!clickable) return;
  if (!matched && !clickable) return;
  const targ = e.target;
  const colorName = targ.className;
  const idx = targ.dataset.index;
  if (!dblCheck[idx]) {
    dblCheck[idx] = 1;
    clickCount++;
  } 
  else {
    dblCheck[idx]++;
    clickCount = 1;
    return;
  } 

  // for each click => checks if clickable, if clickable and undr count, change color
  // once clickCount === 2 should start match function
  if (clickCount <= 2 && clickable === true) {
    targ.dataset.face = 'up';
    targ.style.backgroundColor = colorName;
    if (clickCount === 2) {
      clickable = false;
    }
  }
  if (clickable === false) {
    match();
    setTimeout(() => {
      matched = true;
      clickable = true;
      clickCount = 0;
      dblCheck = {};
    },1000);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

function faceUp (up) {
    up.style.backgroundColor = up.className;
}

function faceDown (up) {
  up.style.backgroundColor = 'transparent';
}

// once 2 clicks, check match, if match keep
// if not match, 1s then facedown
function match () {
  const ups = document.querySelectorAll('div[data-face="up"]');
  for (let up of ups) {
    if (!colorMatcher[up.className]) {
      colorMatcher[up.className] = 1;
    }
    else {
      colorMatcher[up.className]++;
    }
  }
  let numKeys = Object.keys(colorMatcher);
  if (numKeys.length > 1) {
    for (let up of ups) {
      if (up.dataset.stay === undefined) {
        setTimeout(faceDown, 1000, up);
        up.dataset.face = 'down';
      }
    }
    colorMatcher = {};
  }
  else if (numKeys.length === 1) {
    for (let up of ups) {
      faceUp(up);
      up.dataset.face = 'down';
      up.dataset.stay = 'true';
    }
    colorMatcher = {};
  }
}