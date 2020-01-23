/* Retrieve all holes from document */

const allHoles = Array.from(document.querySelectorAll('.hole'));

/* Code for changing mole src and mole cycle */

function changeToSad(mole) {
  mole.src = '../../images/molegame/mole-sad.png';
  mole.alt = 'sad mole';
  mole.classList.add('wiggle');
}

function changeToFed(mole) {
  mole.src = '../../images/molegame/mole-fed.png';
  mole.alt = 'fed mole';
  mole.classList.add('wiggle');
}

function changeToLeaving(mole) {
  mole.src = '../../images/molegame/mole-leaving.png';
  mole.alt = 'leaving mole';
  mole.classList.remove('wiggle');
  mole.classList.remove('spin');
  setTimeout(hideMole, 500, mole);
}

function hideMole(mole) {
  mole.src = '../../images/molegame/mole-hungry.png';
  mole.alt = 'hungry mole';
  mole.classList.remove('show');
}

const unFedMole = mole => {
  changeToSad(mole);
  setTimeout(changeToLeaving, 1000, mole);
};

const fedMole = mole => {
  changeToFed(mole);
  setTimeout(changeToLeaving, 1000, mole);
};

/* Code for choosing Random Hole */

const chooseRandomHole = array => array[Math.floor(Math.random() * 7)];

/* Initialisation function */

function init() {
  const spawnMole = () => {
    const hole = chooseRandomHole(allHoles);

    const mole = hole.querySelector('.mole');

    if (!mole.classList.contains('show')) {
      mole.classList.add('show'); // mole pops out
      setTimeout(unFedMole, 1500, mole); // if not fed
      mole.addEventListener('click', e => fedMole(mole)); // if fed
      setTimeout(() => hole.classList.remove('.active'), 3000); // reset hole
      console.log(mole);
    }
  };
  setInterval(spawnMole, 600);
}
init();
