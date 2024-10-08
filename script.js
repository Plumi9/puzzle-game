import { GameLoop } from "./src/GameLoop.js";
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprites.js";
import { Vector2 } from "./src/Vector2.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { gridCells, isSpaceFree } from "./src/helper/grid.js";
import { moveTowards } from "./src/helper/moveTowards.js";
import { walls } from "./src/levels/level1.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/objects/Hero/heroAnimations.js";
import { Animations } from "./src/Animations.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
})
const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180),
})
const testSprite = new Sprite({
    resource: resources.images.untitled,
    frameSize: new Vector2(320,192),
})
const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1, // which of the spriteframes is being drawn
    position: new Vector2(gridCells(6), gridCells(5)),
    animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
    })
})

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32,32),
})

const input = new Input();

const update = (delta) => {

    const distance = moveTowards(hero, heroDestinationPosition, 1)
    const hasArrived = distance <= 1;
    if(hasArrived){
        tryMove();
    }

    // Work on hero animations
    hero.step(delta);
};

const tryMove = () => {
    if(!input.direction){
        if(heroFacing === LEFT){hero.animations.play("standLeft")}
        if(heroFacing === RIGHT){hero.animations.play("standRight")}
        if(heroFacing === UP){hero.animations.play("standUp")}
        if(heroFacing === DOWN){hero.animations.play("standDown")}
        return;
    }

    let nextX = heroDestinationPosition.x
    let nextY = heroDestinationPosition.y
    const gridSize = 16;


    if(input.direction === DOWN){
        nextY += gridSize;
        hero.animations.play("walkDown");
    }
    if(input.direction === UP){
        nextY -= gridSize;
        hero.animations.play("walkUp");

    }
    if(input.direction === LEFT){
        nextX -= gridSize;
        hero.animations.play("walkLeft");
    }
    if(input.direction === RIGHT){
        nextX += gridSize;
        hero.animations.play("walkRight");
    }
    heroFacing = input.direction ?? heroFacing;

    if(isSpaceFree(walls, nextX, nextY)){
        heroDestinationPosition.x = nextX;
        heroDestinationPosition.y = nextY;    
    }
}

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    //testSprite.drawImage(ctx,0,0);
    const heroOffset = new Vector2(-8,-21);
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + heroOffset.y;
    shadow.drawImage(ctx, heroPosX, heroPosY)
    hero.drawImage(ctx, heroPosX, heroPosY);
}

const rainGif = document.getElementById("rain-gif");

// Function to toggle the rain visibility
const toggleRain = () => {
    console.log(rainGif.classList);
    rainGif.classList.toggle("hidden");
};

// Set interval for rain to appear/disappear
setInterval(() => {
    toggleRain(); // Show/Hide rain
}, 1 * 5 * 1000); // 5 minutes in milliseconds

// Initially show rain
toggleRain(); // Start with rain visible

const gameLoop = new GameLoop(update, draw)
gameLoop.start();

