const allHoles = Array.from(document.querySelectorAll('.hole'));
const chooseRandomHole = array => array[0 /* Math.floor(Math.random() * 6) */];

const activateMole = chooseRandomHole(allHoles);
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

const moleStarveCycle = mole => {
  hungryMole(mole);
  let starve = setTimeout(noFeed, 1000, mole);
};

const moleFeedCycle = mole => {
  clearTimeout(starve);
};

moleStarveCycle(activateMole);

moleFeedCycle(activateMole);
