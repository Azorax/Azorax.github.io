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

const chooseRandomHole = array => array[0 /* Math.floor(Math.random() * 6) */];

const activateMole = chooseRandomHole(allHoles);

/* Detect click on 'hungry mole' */

let mole = activateMole;

moleStarveCycle(mole);

let lambdaF = x => moleFeedCycle(mole);

if (mole.querySelector('#hungry').classList.contains('show')) {
  mole.addEventListener('click', lambdaF);
  setTimeout(function() {
    mole.removeEventListener('click', lambdaF);
  }, 1000);
}

console.log(mole.querySelector('#sad'));
// moleStarveCycle(activateMole);
