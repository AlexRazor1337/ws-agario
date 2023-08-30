let player = {};
let players = [];
let orbs = [];

let WH = window.innerHeight;
let WW = window.innerWidth;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = WH;
canvas.width = WW;

const loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
    backdrop: 'static',
    keyboard: false,
});
const spawnModal = new bootstrap.Modal(document.getElementById('spawnModal'), {
    backdrop: 'static',
    keyboard: false,
});


window.addEventListener('load', () => {
    loginModal.show();
});

document.querySelector('.name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    player.name = document.querySelector('#name-input').value;
    if (player.name) {
        loginModal.hide();
        document.querySelector('.player-name').textContent = player.name;
        spawnModal.show();
    }
});

document.getElementById('play-solo-btn').addEventListener('click', () => {
    spawnModal.hide();
    
    const hidden = document.querySelectorAll('.hiddenOnStart').forEach((el) => {
        el.hidden = false;
    });
    
    
    init();
});
