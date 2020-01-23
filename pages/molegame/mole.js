const allHoles = Array.from(document.querySelectorAll('.hole'));

/* Code for mole timeout and animation */
const hungryMole = mole => mole.querySelector('#hungry').classList.add('show');
const fedMole = mole => {
  mole.querySelector('#hungry').classList.remove('show');
  mole.querySelector('#fed').classList.add('show');
};
const sadMole = mole => {
  mole.querySelector('#hungry').classList.remove('show');
  mole.querySelector('#sad').classList.add('show');
};
const leavingMole = mole => {
  setTimeout(function() {
    mole.querySelector('#sad').classList.remove('show');
    mole.querySelector('#fed').classList.remove('show');
    mole.querySelector('#leaving').classList.add('show');
    setTimeout(resetMole, 500, mole);
  }, 700);
};
const resetMole = mole => {
  mole.querySelector('#leaving').classList.remove('show');
};

const noFeed = mole => {
  sadMole(mole);
  leavingMole(mole);
};

const feed = mole => {
  fedMole(mole);
  leavingMole(mole);
};

var starve;

const moleStarveCycle = mole => {
  hungryMole(mole);
  starve = setTimeout(noFeed, 1000, mole);
};

const moleFeedCycle = mole => {
  clearTimeout(starve);
  feed(mole);
};

/* Choose random holes to spawn a mole */

const chooseRandomHole = array => array[Math.floor(Math.random() * 2)];

const activateMole = chooseRandomHole(allHoles);

/* Detect click on 'hungry mole' */

let mole = activateMole;

moleStarveCycle(mole);

const feedCycle = x => moleFeedCycle(mole);

if (mole.querySelector('#hungry').classList.contains('show')) {
  mole.addEventListener('click', feedCycle);
  setTimeout(function() {
    mole.removeEventListener('click', feedCycle);
  }, 1000);
}

/* Mouse image change to bird and worm*/
const background = document.querySelector('.game');
const birdCursor = document.querySelector('.bird');
const wormCursor = document.querySelector('.worm');
const hungryMole = document.querySelector('#hungry');

background.addEventListener('mousemove', e => {
  birdCursor.style.left = `${e.clientX - 40}px`;
  birdCursor.style.top = `${e.clientY - 40}px`;
});

wormCursor.addEventListener('movemove', e => {
  wormCursor.style.left = `${e.clientX - 40}px`;
  wormCursor.style.top = `${e.clientY - 40}px`;
});
