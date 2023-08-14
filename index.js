require('dotenv').config();
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
const server = app.listen(process.env.PORT || 3000);

const io = socketio(server);
