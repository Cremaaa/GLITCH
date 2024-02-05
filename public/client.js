

const socket = io(); //crea la connessione tra client e server
const canvas = document.getElementById('gameCanvas');
canvas.style.border = "5px solid black";
const ctx = canvas.getContext('2d');
// "" socket è un instanza del client

socket.on('aggiornaPosizione', (players) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.keys(players).forEach((playerId) => {
        const player = players[playerId];
        ctx.fillStyle = '#00F'; // Colore blu
        ctx.fillRect(player.x, player.y, 50, 50); // Rettangolo del giocatore
    });
});


// Gestione degli input del giocatore
document.addEventListener('keydown', (event) => {

    let direction;

    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        default:
            break;
    }

        socket.emit('muovi', direction);

});

function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect()
}