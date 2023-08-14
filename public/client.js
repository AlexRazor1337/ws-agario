const SERVER_URL = 'http://localhost:9001';

const socket = io.connect(SERVER_URL);

const init = async () => {
    const initdData = await socket.emitWithAck('init', {
        playerName: player.name
    });
    
    orbs = initdData.orbs;
    player.index = initdData.index;

    setInterval(() => {
        socket.emit('client-tick', {
            xVector: player.xVector ? player.xVector : .1,
            yVector: player.yVector ? player.yVector : .1,
        });
    }, 1000 / 30);

    player.x = Math.floor(Math.random() * WW);
    player.y = Math.floor(Math.random() * WH);
    draw();
}

socket.on('tick', (newPlayers) => {
    players = newPlayers;
    
    if (players[player.index].playerData) {
        player.x = players[player.index].playerData.x;
        player.y = players[player.index].playerData.y;
    }
});

// On disconnect, refresh the page
socket.on('disconnect', () => {
    window.location.href = window.location.href + '/';
});

socket.on('orb-update', (data) => {
    console.log('orb-update', orbs[data.capturedOrb].x, data.newOrb.x);
    orbs.splice(data.capturedOrb, 1, data.newOrb);
    console.log('orb-update f', orbs[data.capturedOrb].x, data.newOrb.x);
    
});

socket.on('player-absorb', (data) => {
    document.querySelector('#game-message').innerHTML = `${data.absorber} absorbed ${data.absorbee}!`;
    document.querySelector('#game-message').style.opacity = 1;
    
    setTimeout(() => {
        document.querySelector('#game-message').style.opacity = 0;
    }, 2000);
});

socket.on('update-leaderboard', (data) => {
    document.querySelector('.leader-board').innerHTML = '';
    data.forEach((player) => {
        if (!player.name) return;
        
        document.querySelector('.leader-board').innerHTML += `
            <li class="leaderboard-player">${player.name} - ${player.score}</li>`

    });
});
