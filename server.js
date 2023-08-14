import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Server } from "socket.io";
import path from 'path';

export const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}/index.html`);
});

export const io = new Server(expressServer);
