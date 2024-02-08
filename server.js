const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express(); // Crea un'applicazione express
const server = http.createServer(app); // Torna una nuova istanza del server
const io = socketIO(server); // Abilita le richieste via socket

const cors = require('cors');
app.use(cors());

const players = {};

app.use(express.static("public"));

io.on('connection', function(socket) {
    console.log("Nuovo giocatore connesso " + socket.id);

    players[socket.id] = {
        x:  10,
        y: 10,
    };

    // Invia la posizione iniziale del giocatore appena connesso
    io.emit('aggiorna', players);

    // Gestisci il movimento del giocatore
    socket.on("player", (player) => {
        players[socket.id].x = player.x;
        players[socket.id].y = player.y;
        io.emit('aggiorna', players);
    });

    // Gestisci la disconnessione del giocatore
    socket.on('disconnect', function() {
        console.log(`Giocatore disconnesso: ${socket.id}`);
        delete players[socket.id];
        io.emit('aggiornaPosizione', players);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});