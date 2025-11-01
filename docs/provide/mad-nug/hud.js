function createHUD() {
{ title: 'SENSOR FREQUENCY', type: 'wave' },
{ title: 'THRUSTER OUTPUT', type: 'gauge' },
{ title: 'NEURAL LINK STABILITY', type: 'wave' }
];
modules.forEach((m, i) => {
const screen = document.createElement('div');
screen.className = 'screen';
const title = document.createElement('div');
title.className = 'screen-title';
title.textContent = m.title;
const status = document.createElement('div');
status.className = 'status-text';
status.textContent = 'ACTIVE';
screen.appendChild(title);
screen.appendChild(status);


if (m.type === 'gauge') {
const gauge = document.createElement('div');
gauge.className = 'gauge';
const fill = document.createElement('div');
fill.className = 'gauge-fill';
gauge.appendChild(fill);
screen.appendChild(gauge);
animateGauge(fill);
}


if (m.type === 'wave') {
const wave = document.createElement('div');
wave.className = 'waveform';
for (let x = 0; x < 100; x++) {
const line = document.createElement('div');
line.className = 'wave-line';
line.style.left = x * 2 + 'px';
wave.appendChild(line);
}
screen.appendChild(wave);
animateWave(wave);
}
container.appendChild(screen);
});
}


function animateGauge(fill) {
anime({
targets: fill,
width: [0, function() { return Math.random() * 100 + '%'; }],
duration: 2000,
easing: 'easeInOutSine',
direction: 'alternate',
loop: true
});
}


function animateWave(wave) {
const lines = wave.querySelectorAll('.wave-line');
lines.forEach((line, i) => {
anime({
targets: line,
height: [5, 40],
direction: 'alternate',
duration: 300 + i * 5,
easing: 'easeInOutSine',
loop: true,
delay: i * 30
});
});
}


document.addEventListener('DOMContentLoaded', createHUD);
