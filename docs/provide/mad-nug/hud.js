

function createHUD() {
const container = document.getElementById('monitor');
const modules = [
{ title: 'PSYCOFRAME OUTPUT', type: 'gauge' },
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
document.addEventListener('DOMContentLoaded', createHUD);
