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
  mole.classList.remove('.active');
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
var canBeFed;

const moleStarveCycle = mole => {
  hungryMole(mole);
  starve = setTimeout(noFeed, 1500, mole);
};

const moleFeedCycle = mole => {
  clearTimeout(starve);
  feed(mole);
};

/* Choose random holes to spawn a mole and spawn them periodically */
const spawn = () => {
  /* Detect click on 'hungry mole' */

  const mole = chooseRandomHole(allHoles);

  if (!mole.classList.contains('.active')) {
    mole.classList.add('.active');
    moleStarveCycle(mole);

    const feedCycle = x => moleFeedCycle(mole);

    if (mole.querySelector('#hungry').classList.contains('show')) {
      canBeFed = mole.addEventListener('click', feedCycle);
      setTimeout(function() {
        mole.removeEventListener('click', feedCycle);
      }, 1400);
    }
  }
};

const spawnInterval = setInterval(spawn, Math.random() * 300 + 500);

const chooseRandomHole = array => array[Math.floor(Math.random() * 7)];

/* Mouse image change to bird and worm*/
const background = document.querySelector('.game');
const birdCursor = document.querySelector('.bird');
const wormCursor = document.querySelector('.worm');
const hungryMoles = document.querySelectorAll('#hungry');

background.addEventListener('mouseenter', e => {
  birdCursor.classList.add('show');

  background.addEventListener('mousemove', e => {
    birdCursor.style.left = `${e.clientX - 40}px`;
    birdCursor.style.top = `${e.clientY - 40}px`;
  });
});

background.addEventListener('mouseleave', e => {
  birdCursor.classList.remove('show');
});

/* Array.from(hungryMoles).forEach(m =>
  m.addEventListener('mousemove', e => {
    if (m.classList.contains('show')) {
      wormCursor.style.left = `${e.clientX - 40}px`;
      wormCursor.style.top = `${e.clientY - 40}px`;
      birdCursor.classList.remove('show');
      wormCursor.classList.add('show');
    } else {
      wormCursor.classList.remove('show');
      birdCursor.classList.add('show');
    }
  })
); */

/*
If hovering over a hungry show mole then change cursor 

problem: 2 images are shown.

we need to hide the general one when 2nd one shows.

when 2nd one is 'done'
- starve or feed cycle is procc'd
- 1. after 1 second
- 2. after a click happens before that 1 second

Maybe move the z-index depending on which ones are showing?

*/

// fix issue where some aren't going inactive, and some images stack
