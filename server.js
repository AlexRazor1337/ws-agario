import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import { Server } from "socket.io";
import compression from 'compression';
import { instrument } from '@socket.io/admin-ui';

const __dirname = path.resolve();

export const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

const expressServer = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});

export const io = new Server(expressServer, {
    cors: {
        origin: [`http://localhost:${process.env.ADMIN_PORT}`],
        credentials: true,
    }
});

if (process.env.NODE_ENV === 'development') {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    instrument(io, {
        auth: {
            type: "basic",
            username: "admin",
            password: hashedPassword
        },
        mode: "development",
    });

    const adminApp = express();
    adminApp.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'));
    adminApp.listen(process.env.ADMIN_PORT, () => {
        console.log(`Admin UI is running on http://localhost:${process.env.ADMIN_PORT}`);
    });
}
