import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { gridCells } from "../../helpers/grid.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";


export class Enemy extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.nerd,
            frameSize: new Vector2(32,32),
            position: new Vector2(-7,-10)
        })
        this.addChild(sprite);

        this.drawLayer = "FLOOR";
        this.heroPosition = null; // To store the player's position
        this.speed = 0.5; // Adjust for desired speed
        this.movementCooldown = 500; // Time in milliseconds between moves
        this.timeSinceLastMove = 0;
    }

    step(delta, root) {
        // Listen for HERO_POSITION updates
        events.on("HERO_POSITION", this, (heroPosition) => {
            this.heroPosition = heroPosition;
        });

        // If we have the hero's position, move towards it
        this.timeSinceLastMove += delta;

        if (this.timeSinceLastMove >= this.movementCooldown) {
            this.timeSinceLastMove = 0; // Reset timer
            if (this.heroPosition) {
                this.moveTowardsHero();
            }
        }
    }

    moveTowardsHero() {
        const desiredDistance = 16; // Distance to keep from the hero, in pixels
        const gridSize = 16; // Size of each grid cell

        // Calculate the direction vector
        const directionX = this.heroPosition.x - this.position.x;
        const directionY = this.heroPosition.y - this.position.y;

        // Calculate the distance
        const distance = Math.sqrt(directionX ** 2 + directionY ** 2);

        // Avoid division by zero if the enemy reaches the hero
        if (distance === 0) return;

        // Stop if 2 squares away from player
        if (distance <= desiredDistance) this.destroy();

        // Normalize the direction vector
        const normalizedX = directionX / distance;
        const normalizedY = directionY / distance;

        // Calculate potential new grid-aligned position
        let newX = this.position.x + Math.sign(normalizedX) * gridSize;
        let newY = this.position.y + Math.sign(normalizedY) * gridSize;

        // Only move if the new position brings the enemy closer to the hero
        const newDistance = Math.sqrt(
            (this.heroPosition.x - newX) ** 2 + (this.heroPosition.y - newY) ** 2
        );

        if (newDistance < distance) {
            this.position.x = newX;
            this.position.y = newY;
        }
    }
}