const socket = io.connect('http://localhost:9001');

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
    player.x = players[player.index].playerData.x;
    player.y = players[player.index].playerData.y;
});

// On disconnect, refresh the page
socket.on('disconnect', () => {
    window.location.href = 'http://localhost:9001';
});
