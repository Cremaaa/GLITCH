import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express(); //crea un applicazione express
const server = http.createServer(app); //torna una nuova istanza del server
const io = new Server(server);//abilita le richieste via socket

import cors from 'cors';
app.use(cors());

const players = {};

app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log("Nuovo giocatore connesso " + socket.id);

    players[socket.id] = {
        x: Math.random() * 500, // Posizione x iniziale
        y: Math.random() * 500, // Posizione y iniziale
    };

    // Invia la posizione iniziale del giocatore appena connesso
    socket.emit('aggiornaPosizione', players);

    // Gestisci il movimento del giocatore
    socket.on('muovi', (direction) => {
        alert("we")
        // Aggiorna la posizione del giocatore in base alla direzione
        switch (direction) {
            case 'up':
                players[socket.id].y -= 10;
                break;
            case 'down':
                players[socket.id].y += 10;
                break;
            case 'left':
                players[socket.id].x -= 10;
                break;
            case 'right':
                players[socket.id].x += 10;
                break;
            default:
                break;
        }

        // Invia la posizione aggiornata a tutti gli altri giocatori
        io.emit('aggiornaPosizione', players);
    });

    // Gestisci la disconnessione del giocatore
    socket.on('disconnect', () => {
        console.log(`Giocatore disconnesso: ${socket.id}`);
        delete players[socket.id];
        io.emit('aggiornaPosizione', players);
    });
})

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});