// Length = 2πr = 2 * π * 45 = 282,6
const LENGTH = 283;

let timeTotal = 5;
let timePassed = 0;
let timeRemaining = timeTotal;
let interval = null;
let isPaused = false;


function onTimesUp() {
  clearInterval(interval);
}

function reset() {
  clearInterval(interval);
  timePassed = 0;
  timeRemaining = timeTotal;
  isPaused = false;
  update();
}

// set timer in seconds
function setTimer(time) {
  timeTotal = time;
  reset();
}

function update() {
  timeRemaining = timeTotal - timePassed;

  document.getElementById("timer-countdown").innerHTML = timeToString(
    timeRemaining
  );
  updateCircle();
}

function startTimer() {
  reset();

  interval = setInterval(() => {
    if (isPaused)
      return;
    timePassed = timePassed += 1;
    update();

    if (timeRemaining === 0) {
      onTimesUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function pauseTimer() {
  isPaused = !isPaused;
}

function pad(time) {
  if (time < 10)
    return `0${time}`
  return `${time}`
}

function timeToString(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = pad(seconds);
  minutes = pad(minutes);

  return `${minutes}:${seconds}`;
}

function fraction() {
  const rawTimeFraction = timeRemaining / timeTotal;
  return rawTimeFraction - (1 / timeTotal) * (1 - rawTimeFraction);
}




function updateCircle() {
  const circleDasharray = `${(
    fraction() * LENGTH
  ).toFixed(0)} ${LENGTH}`;
  console.log(circleDasharray);

  document
    .getElementById("timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

