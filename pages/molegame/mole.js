/* Code for changing mole src and mole cycle */

function changeToSad(mole) {
  mole.src = '../../images/molegame/mole-sad.png';
  mole.alt = 'sad mole';
  mole.classList.add('wiggle');
  mole.parentElement.classList.remove('.feed');
}

function changeToFed(mole) {
  mole.src = '../../images/molegame/mole-fed.png';
  mole.alt = 'fed mole';
  mole.classList.add('spin');
  mole.parentElement.classList.remove('.feed');
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
  mole.parentElement.classList.remove('.active');
}
/* Retrieve all holes from document */

const allHoles = Array.from(document.querySelectorAll('.hole'));

/* Code for choosing Random Hole */

const chooseRandomHole = array => array[Math.floor(Math.random() * 7)];

// Points Tracker

var points = 0;

/* Initialisation function */

function init() {
  const spawnMole = () => {
    const hole = chooseRandomHole(allHoles);

    const mole = hole.querySelector('.mole');

    const fedMoleCycle = e => fedMole(mole);

    const fedMole = mole => {
      // Mole is fed
      points++;
      mole.removeEventListener('click', fedMoleCycle);
      clearTimeout(unFedTimer);
      changeToFed(mole);
      setTimeout(changeToLeaving, 1000, mole);
    };

    const unFedMole = mole => {
      // Mole is not fed
      mole.removeEventListener('click', fedMoleCycle);
      changeToSad(mole);
      setTimeout(changeToLeaving, 1000, mole);
    };

    if (!mole.classList.contains('show')) {
      mole.classList.add('show'); // mole pops out
      hole.classList.add('.feed'); // you can feed it

      var unFedTimer = setTimeout(unFedMole, 1500, mole); // if not fed
      mole.addEventListener('click', fedMoleCycle); // if fed
    }
  };

  setInterval(spawnMole, 600); // spawn a mole ever .6 seconds
}

init();

// Cursor handling
const gameBackground = document.getElementById('background');
const cursor = document.querySelector('.cursor');

const changeMouse = e => {
  cursor.classList.add('show');
  cursor.style.left = `${e.clientX - 40}px`;
  cursor.style.top = `${e.clientY - 40}px`;
};

gameBackground.addEventListener('mousemove', changeMouse);

allHoles.forEach(hole => {
  hole.addEventListener('mousemove', e => {
    if (hole.classList.contains('.feed')) {
      cursor.src = '../../images/molegame/cursor-worm.png';
    } else {
      cursor.src = '../../images/molegame/cursor.png';
    }
  });
  hole.addEventListener('mouseleave', e => {
    cursor.src = '../../images/molegame/cursor.png';
  });
});
