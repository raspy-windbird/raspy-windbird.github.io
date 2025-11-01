export function makeMonitorGrid({ container = '#monitor', cols = 4, rows = 2 } = {}) {
const wrap = document.querySelector(container);
if (!wrap) return;
const count = cols * rows;
wrap.style.gridTemplateColumns = `repeat(${cols},1fr)`;
wrap.innerHTML = '';
for (let i = 0; i < count; i++) {
const screen = document.createElement('div');
screen.className = 'screen';
if (Math.random() > 0.6) screen.classList.add('flicker');
const meta = document.createElement('div');
meta.className = 'meta';
meta.textContent = `SENSOR ${i + 1}`;
const content = document.createElement('div');
content.className = 'content';
content.textContent = `MODULE ${String.fromCharCode(65 + (i % 26))}: ACTIVE`;
screen.appendChild(meta);
screen.appendChild(content);
wrap.appendChild(screen);
}
}


document.addEventListener('DOMContentLoaded', () => {
makeMonitorGrid();
const wrap = document.querySelector('.monitor-wrap');
const btn = document.getElementById('toggle-mode');
const label = document.getElementById('mode-label');
btn.addEventListener('click', () => {
const mode = wrap.dataset.mode === 'unicorn' ? 'destroy' : 'unicorn';
wrap.dataset.mode = mode;
label.textContent = mode === 'destroy' ? 'DESTROY MODE' : 'UNICORN MODE';
});
});
