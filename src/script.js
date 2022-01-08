const digits = [
  [
    // 0
    { hour: 6, minute: 15 },
    { hour: 9, minute: 30 },
    { hour: 6, minute: 0 },
    { hour: 0, minute: 30 },
    { hour: 3, minute: 0 },
    { hour: 0, minute: 45 },
  ],
  [
    // 1
    { hour: 7.5, minute: 37.5 },
    { hour: 6, minute: 30 },
    { hour: 7.5, minute: 37.5 },
    { hour: 6, minute: 0 },
    { hour: 7.5, minute: 37.5 },
    { hour: 0, minute: 0 },
  ],
  [
    // 2
    { hour: 3, minute: 15 },
    { hour: 9, minute: 30 },
    { hour: 6, minute: 15 },
    { hour: 0, minute: 45 },
    { hour: 0, minute: 15 },
    { hour: 9, minute: 45 },
  ],
  [
    // 3
    { hour: 3, minute: 15 },
    { hour: 9, minute: 30 },
    { hour: 3, minute: 15 },
    { hour: 9, minute: 0 },
    { hour: 3, minute: 15 },
    { hour: 9, minute: 0 },
  ],
  [
    // 4
    { hour: 6, minute: 30 },
    { hour: 6, minute: 30 },
    { hour: 0, minute: 15 },
    { hour: 6, minute: 0 },
    { hour: 7.5, minute: 37.5 },
    { hour: 0, minute: 0 },
  ],
  [
    // 5
    { hour: 6, minute: 15 },
    { hour: 9, minute: 45 },
    { hour: 0, minute: 15 },
    { hour: 6, minute: 45 },
    { hour: 3, minute: 15 },
    { hour: 0, minute: 45 },
  ],
  [
    // 6
    { hour: 6, minute: 15 },
    { hour: 9, minute: 45 },
    { hour: 6, minute: 0 },
    { hour: 6, minute: 45 },
    { hour: 0, minute: 15 },
    { hour: 0, minute: 45 },
  ],
  [
    // 7
    { hour: 3, minute: 15 },
    { hour: 6, minute: 45 },
    { hour: 7.5, minute: 37.5 },
    { hour: 6, minute: 0 },
    { hour: 7.5, minute: 37.5 },
    { hour: 0, minute: 0 },
  ],
  [
    // 8
    { hour: 6, minute: 15 },
    { hour: 6, minute: 45 },
    { hour: 0, minute: 15 },
    { hour: 0, minute: 45 },
    { hour: 0, minute: 15 },
    { hour: 0, minute: 45 },
  ],
  [
    // 9
    { hour: 6, minute: 15 },
    { hour: 6, minute: 45 },
    { hour: 3, minute: 0 },
    { hour: 6, minute: 0 },
    { hour: 3, minute: 15 },
    { hour: 0, minute: 45 },
  ],
];

const happyDigit = Array(6).fill({ hour: 22.5, minute: 7.5 });
const neutralDigit = Array(6).fill({ hour: 7.5, minute: 7.5 });

function showSpecialState(digit) {
  stopClock();
  for (let x = 0; x < 4; x++) {
    setDigit(x, digit);
  }
  window.setTimeout(() => startClock(), 10000);
}

document.querySelector('.trigger--left').addEventListener('click', (e) => {
  showSpecialState(happyDigit);
});

document.querySelector('.trigger--right').addEventListener('click', (e) => {
  showSpecialState(neutralDigit);
});

window.addEventListener('keydown', (e) => {
  const h = 72;
  const n = 78;
  if (h === e.keyCode) {
    showSpecialState(happyDigit);
  }
  if (n === e.keyCode) {
    showSpecialState(neutralDigit);
  }
});

document.querySelector('.art').addEventListener('click', (e) => {
  document.querySelector('.text').classList.toggle('s-hidden');
  document.querySelector('.art').classList.toggle('art--full');
});

function hourToDegrees(hour) {
  return hour * (360 / 12) - 90;
}

function minuteToDegrees(minute) {
  return minute * (360 / 60) - 90;
}

function setHands(id, hour, minute) {
  const clock = document.querySelector(`.clock--${id}`);
  clock.style.setProperty(`--small-hand`, `${hourToDegrees(hour) + 360}deg`);
  clock.style.setProperty(
    `--large-hand`,
    `${minuteToDegrees(minute) - 360}deg`
  );
}

function setDigit(id, values) {
  for (let x = 0; x < 6; x++) {
    setHands(id * 6 + x, values[x].hour, values[x].minute);
  }
}

function setTime(time, isDark) {
  setDigit(0, digits[time.charAt(0)]);
  setDigit(1, digits[time.charAt(1)]);
  setDigit(2, digits[time.charAt(3)]);
  setDigit(3, digits[time.charAt(4)]);

  document.documentElement.setAttribute('data-dark-mode', isDark);
}

let state;
let interval;
let dateNumber;
let times;

const latitude = 39;
const longitude = -94;

function startClock() {
  state = '----';
  interval = window.setInterval(() => {
    const date = new Date(Date.now() + 10000);
    const time = date.toTimeString();
    if (time !== state) {
      if (dateNumber !== date.getDate()) {
        dateNumber = date.getDate();
        times = SunCalc.getTimes(date, latitude, longitude);
      }
      setTime(
        time,
        date.getTime() < times.sunrise.getTime() ||
          date.getTime() > times.sunset.getTime()
      );
      state = time;
    }
  }, 1000);
}

function stopClock() {
  clearInterval(interval);
}

startClock();
