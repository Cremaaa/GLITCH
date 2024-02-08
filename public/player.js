import { gameData } from "./client.js";

export class Player {

    keys = [];
    x = 400;
    y = 900;
    speed = 0;
    mapWidth;
    mapHeight;
    cameraWidth;
    cameraHeight;
    cameraOffsetX;
    cameraOffsetY;
    cameraX;
    cameraY;
    acceleration;
    topSpeed = 20;
    breakForce = 0.1
    rotation = 0;
    width = 50;
    height = 100;

    constructor() {
        this.mapWidth = gameData.mapWidth;
        this.mapHeight = gameData.mapHeight;
        this.cameraWidth = gameData.cameraWidth;
        this.cameraHeight = gameData.cameraHeight;
        this.cameraOffsetX = gameData.cameraWidth / 2;
        this.cameraOffsetY = gameData.cameraHeight / 2;

        window.addEventListener("keydown", e => {
            if ((e.key === " " ||
                e.key === "w" ||
                e.key === "a" ||
                e.key === "d"
                )
                && this.keys.indexOf(e.key) === -1
            ) this.keys.push(e.key);
        });

        window.addEventListener("keyup", e => {
            if ((e.key === " " ||
                e.key === "w" ||
                e.key === "a" ||
                e.key === "d"
                )
            ) this.keys.splice(this.keys.indexOf(e.key), 1);
        });
    }

    update() {


        if (this.keys.includes(" ")) {
            this.speed -= this.breakForce;
        }else if (this.keys.includes("w")) {
            if(this.speed < this.topSpeed)this.speed += 0.03;
        }else this.speed -= this.speed/200;

        if(this.speed <= 0) this.speed = 0;

        if (this.keys.includes("a")) {
            //TOP SPEED -0.5   
            this.rotation -= 1 - this.speed/(this.topSpeed * 2);
        }

        if (this.keys.includes("d")) {
            this.rotation += 1 - this.speed/(this.topSpeed * 2);
        }



        this.cameraX = -this.x + this.cameraOffsetX //- this.speed * 15;
        this.cameraY = -this.y + this.cameraOffsetY //- this.speed * 15;

        const radians = (this.rotation * Math.PI) / 180;
        const dx = this.speed * Math.sin(radians);
        const dy = -this.speed * Math.cos(radians);

        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
                // Draw the race map
                ctx.drawImage(raceMap, this.cameraX, this.cameraY, this.mapWidth, this.mapHeight);
        
                // Save the current context state
                ctx.save();
                
                // Translate and rotate the context for drawing the car
                ctx.translate(this.cameraOffsetX, this.cameraOffsetY);
                ctx.rotate((this.rotation * Math.PI) / 180); // Convert degrees to radians for rotation
                ctx.drawImage(car, -this.width/2, -this.height/2, this.width, this.height); // Draw the car
                
                // Restore the context state
                ctx.restore();
    }
}