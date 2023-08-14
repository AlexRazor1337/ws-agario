import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Server } from "socket.io";
import path from 'path';

export const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(process.env.PORT || 3000);

export const io = new Server(expressServer);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    
    socket.on('event', (data) => {
        console.log(data);
        io.emit('message', data);
    });
});
