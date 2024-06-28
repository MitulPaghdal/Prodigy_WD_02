let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    running = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Resume';
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapCounter = 0;
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    timeDisplay.textContent =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds : milliseconds);
}

function addLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
    laps.appendChild(lapTime);
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
