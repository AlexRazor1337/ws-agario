const socket = io.connect('http://localhost:9001');

socket.on('init', (data) => {
    orbs = data.orbs;
});
