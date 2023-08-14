import { io } from '../server.js'
import { Orb } from './classes/Orb.js';
import { Player } from './classes/Player.js';
import { PlayerConfig } from './classes/PlayerConfig.js';
import { PlayerData } from './classes/PlayerData.js';
import { checkForOrbCollisions, checkForPlayerCollisions } from './col.js';

const settings = {
    worldHeight: parseInt(process.env.WORLD_HEIGHT),
    worldWidth: parseInt(process.env.WORLD_WIDTH),
    orbRadius: parseInt(process.env.DEFAULT_SIZE),
    orbCount: parseInt(process.env.ORB_COUNT),
    defaultZoom: parseFloat(process.env.DEFAULT_ZOOM),
    defaultSpeed: parseInt(process.env.DEFAULT_SPEED)
};

const orbs = [];
const players = [];
const playersForUsers = [];

const initGame = () => {
    for (let i = 0; i < settings.orbCount; i++) {
        orbs.push(new Orb({
            worldHeight: process.env.WORLD_HEIGHT,
            worldWidth: process.env.WORLD_WIDTH,
            orbRadius: 5
        }));
    }
}

setInterval(() => {
    if (players.length > 0) {
        io.to('game').emit('tick', players);
    }
}, Math.floor(1000 / 30));

io.on('connect', (socket) => {
    let player = {};
    socket.on('init', (data, callback) => {
        socket.join('game');

        const playerConfig = new PlayerConfig(settings);
        const playerData = new PlayerData(data.playerName, settings);
        player = new Player(socket.id, playerConfig, playerData);
        players.push(player);
        playersForUsers.push(playerData);

        callback({
            orbs,
            index: players.length - 1
        });
    });

    socket.on('client-tick', (data) => {
        // const { speed } = player.playerConfig.speed; TODO - fix this
        const speed = 6;
        const xV = player.playerConfig.xVector = data.xVector;
        const yV = player.playerConfig.yVector = data.yVector;

        if ((player.playerData.x > 5 && xV < 0) || (player.playerData.x < settings.worldWidth) && (xV > 0)) {
            player.playerData.x += speed * xV;
        }
        if ((player.playerData.y > 5 && yV > 0) || (player.playerData.y < settings.worldHeight) && (yV < 0)) {
            player.playerData.y -= speed * yV;
        }
        
        const capturedOrb = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings);
        if (capturedOrb) {
            orbs.splice(capturedOrb, 1, new Orb(settings));
            const orbData = {
                capturedOrb,
                newOrb: orbs[capturedOrb]
            }
            
            io.to('game').emit('orb-update', orbData);
        }
        
        const capturedPlayerData = checkForPlayerCollisions(player.playerData, player.playerConfig, players, playersForUsers, socket.id);
        if (capturedPlayerData) {
            io.to('game').emit('player-absorb', capturedPlayerData);
        }
    });

    socket.on('disconnect', (data) => {
        players.forEach((player, index) => {
            if (socket.id === player.socketId) {
                players.splice(index, 1);
                playersForUsers.splice(index, 1);
            }
        });
    });
});

initGame();

export default io;
