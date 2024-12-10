import { GameLoop } from "./src/GameLoop.js";
import { Vector2 } from "./src/Vector2.js";
import { Main } from "./src/objects/Main/Main.js";
import { CaveLevel1 } from "./src/levels/CaveLevel1.js";
import { OutdoorLevel1 } from "./src/levels/OutdoorLevel1.js";
import { Void } from "./src/levels/Void.js";
import { TestLevel } from "./src/levels/TestLevel.js";
import { TownLevel1 } from "./src/levels/TownLevel1.js";
import { RoomLevel1 } from "./src/levels/RoomLevel1.js";
import { gridCells } from "./src/helpers/grid.js";
import { TownLevel_night } from "./src/levels/TownLevel_night.js";
import { DungeonLevel1 } from "./src/levels/DungeonLevel1.js";
import { RoomLevel2 } from "./src/levels/RoomLevel2.js";
import { WoodsLevel1 } from "./src/levels/WoodsLevel1.js";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new Main({
    position: new Vector2(0,0)
})
mainScene.setLevel(new WoodsLevel1())
//mainScene.setLevel(new DungeonLevel1());
//mainScene.setLevel(new RoomLevel1());
//mainScene.setLevel(new RoomLevel2());
//mainScene.setLevel(new TownLevel1());
//mainScene.setLevel(new TownLevel_night());
//mainScene.setLevel(new TestLevel());
//mainScene.setLevel(new Void());
//mainScene.setLevel(new OutdoorLevel1());
//mainScene.setLevel(new CaveLevel1());

// Establish update and draw loop
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
    mainScene.input?.update();
}
const draw = () => {

    // Clear anything stale
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // Draw the sky Sprite for static sky
    mainScene.drawBackground(ctx);

    // Save the current state for camera effect
    ctx.save();

    // Offset by camera position
    if(mainScene.camera){
        ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
    }

    // draw objects in the mounted scene
    mainScene.drawObjects(ctx);

    // Restore to original state
    ctx.restore();

    // Draw anything above the game world
    mainScene.drawForeground(ctx);
}

// // Rain Inmplementation
// const rainGif = document.getElementById("rain-gif");
// // toggle the rain visibility
// const toggleRain = () => {
//     rainGif.classList.toggle("hidden");
// };
// // Set interval for rain to appear/disappear
// setInterval(() => {
//     toggleRain();
// }, 1 * 5 * 1000); // 5000 ms
// toggleRain(); // Start with rain visible

// // Background music implementation
// const backgroundMusic = new Audio("./sprites/song.mp3");
// backgroundMusic.volume = 0.01;
// // Function to start the background music
// const playBackgroundMusic = () => {
//     backgroundMusic.loop = true; // Set it to loop
//     backgroundMusic.play().catch(error => {
//         console.error("Error playing audio:", error);
//     });
// };
// // Add event listener for start button
// const startButton = document.getElementById("start-button");
// startButton.addEventListener("click", () => {
//     playBackgroundMusic(); // Play the background music
//     startButton.style.display = "none"; // Hide the start button
// });

// Starting the game
const gameLoop = new GameLoop(update, draw)
gameLoop.start();