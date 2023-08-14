import { io } from '../server.js'
import { Orb } from './classes/Orb.js';

const orbs = [];


const initGame = () => {
    for (let i = 0; i < process.env.ORB_COUNT; i++) {
        orbs.push(new Orb({
            worldHeight: process.env.WORLD_HEIGHT,
            worldWidth: process.env.WORLD_WIDTH,
            orbRadius: 5
        }));
    }   
}

initGame();

io.on('connect', (socket) => {
    socket.emit('init', { orbs });
});

export default io;
