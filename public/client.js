import { Player } from "./player.js";

const socket = io(); //crea la connessione tra client e server
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let giocatori = {};

socket.on('aggiorna', (players)=>{
    giocatori = players;
})

export let gameData = {
    cameraHeight: window.innerHeight,
    cameraWidth: window.innerHeight,
    mapWidth: window.innerHeight * 2,
    mapHeight: window.innerHeight * 2,
};

console.log(gameData);

//Calcolo per rendere il gioco responsive
function responsive(){
    gameData = {
        cameraHeight: window.innerHeight,
        cameraWidth: window.innerHeight,
        mapWidth: window.innerHeight * 2,
        mapHeight: window.innerHeight * 2,
    }
    canvas.width = gameData.cameraWidth;
    canvas.height = gameData.cameraHeight;
}

responsive();

const player = new Player();


// Gestione degli input del giocatore
document.addEventListener('keydown', (event) => {



});



function updateGame(){
    player.update();
}


function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGame();

    Object.keys(giocatori).forEach( id => {
        ctx.beginPath();
        player.draw(ctx, giocatori[socket.id])
        ctx.rect(giocatori[socket.id].cameraOffsetX + (giocatori[id].x - giocatori[socket.id].x), giocatori[socket.id].cameraOffsetY + (giocatori[id].y - giocatori[socket.id].y), 40,40);
        console.log("x: " + (giocatori[socket.id].cameraOffsetX + (giocatori[id].x - giocatori[socket.id].x)))
        ctx.fill();
        ctx.closePath();
    })

    socket.emit("player", player);
}

loop();