import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "../../Input.js";
import {gridCells, isSpaceFree} from "../../helpers/grid.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resources.js";
import {Animations} from "../../Animations.js";
import {FrameIndexPattern} from "../../FrameIndexPattern.js";
import {
    PICK_UP_DOWN,
    STAND_DOWN,
    STAND_LEFT,
    STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
} from "./heroAnimations.js";
import {moveTowards} from "../../helpers/moveTowards.js";
import { events } from "../../Events.js";
import { Shovel } from "../Shovel/Shovel.js";
import { Npc } from "../NPC/Npc.js"
import { GreenDoor } from "../Door/GreenDoor.js";
import { OutdoorLevel1 } from "../../levels/OutdoorLevel1.js";
import { BrownDoor } from "../Door/BrownDoor.js";
import { OutdoorEntrance } from "../Door/OutdoorEntrance.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { BluePortal } from "../Door/BluePortal.js";

export class Hero extends GameObject{
    constructor(x, y){
        super({
            position: new Vector2(x, y)
        });
        // Shadow Sprite
        const shadow = new Sprite({
            resource: resources.images.shadow,
            position: new Vector2(-8, -19),
            frameSize: new Vector2(32,32),
        })
        this.addChild(shadow);

        // Body Sprite
        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1, // which of the spriteframes is being drawn
            position: new Vector2(-8, -20),
            animations: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp: new FrameIndexPattern(STAND_UP),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUpDown: new FrameIndexPattern(PICK_UP_DOWN)
            })
        })
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickUpTime = 0;
        this.itemPickUpShell = null;
        this.isLocked = false;

        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.onPickupItem(data)
        })
    }

    ready(){
        events.on("START_TEXT_BOX",this, () => {
            this.isLocked = true;
        })
        events.on("END_TEXT_BOX", this, () => {
            this.isLocked = false;
        })
    }

    step(delta, root){
        // console.log(this.position)
        // Check for input
        /** @type {Input} input */
        const input = root.input;
        /**@param {Input} input */
        
        if (input?.getActionJustPressed("Space") && root.isZoomedIn) {
            events.emit("TOGGLE_ZOOM");
            return; // End step to avoid processing movement while zoomed
        }

        // Don't do anything when locked
        if(this.isLocked){
            return;
        }

        // stop movement when picking up
        if(this.itemPickUpTime > 0){
            this.workOnItemPickup(delta);
            return;
        }

        // interact with objects
        if(input?.getActionJustPressed("Space")){
            // Look for an object at the next space the player is facing
            const objectAtPosition = this.parent.children.find(child => {
                return child.position.matches(this.position.toNeighbor(this.facingDirection))
            })
            if(objectAtPosition){
                events.emit("HERO_REQUESTS_ACTION", objectAtPosition);
            }
        }

        // maybe implement interact and inspect as different buttons
        if(input?.getActionJustPressed("KeyE")){
            // Look for an object at the next space the player is facing
            const objectAtPosition = this.parent.children.find(child => {
                return child.position.matches(this.position.toNeighbor(this.facingDirection))
            })
            if(objectAtPosition){
                console.log("You want to interact with this thang", objectAtPosition)
                events.emit("HERO_REQUESTS_INTERACTION", objectAtPosition);
            }
        }

        // set player Speed
        const SPEED = 10;

        const distance = moveTowards(this, this.destinationPosition, SPEED)
        const hasArrived = distance <= 1;
        if(hasArrived){
            this.tryMove(root);
        }

        this.tryEmitPosition();
    }

    tryEmitPosition(){
        if(this.lastX === this.position.x && this.lastY === this.position.y){
            return
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position)
    }

    tryMove(root) {
        const {input} = root
        if(!input.direction){
            if(this.facingDirection === LEFT){this.body.animations.play("standLeft")}
            if(this.facingDirection === RIGHT){this.body.animations.play("standRight")}
            if(this.facingDirection === UP){this.body.animations.play("standUp")}
            if(this.facingDirection === DOWN){this.body.animations.play("standDown")}
            return;
        }
    
        let nextX = this.destinationPosition.x
        let nextY = this.destinationPosition.y
        const gridSize = 16;
    
    
        if(input.direction === DOWN){
            nextY += gridSize;
            this.body.animations.play("walkDown");
        }
        if(input.direction === UP){
            nextY -= gridSize;
            this.body.animations.play("walkUp");
    
        }
        if(input.direction === LEFT){
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        }
        if(input.direction === RIGHT){
            nextX += gridSize;
            this.body.animations.play("walkRight");
        }
        this.facingDirection = input.direction ?? this.facingDirection;
    
        // Validating that the next destination is free
        const spaceIsFree = isSpaceFree(root.level?.walls, nextX, nextY)
        const solidBodyAtSpace = this.parent.children.find(c => {
            return c.isSolid && c.position.x === nextX && c.position.y === nextY;
        })

        if(spaceIsFree && !solidBodyAtSpace){
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;    
        }
    }

    onPickupItem({ image, position }){
        // Player stops on item spot
        if(position){
            this.destinationPosition = position.duplicate();
        }
        else{
            this.destinationPosition = this.position.duplicate();
        }

        // Start pickup animation
        this.itemPickUpTime = 400 // ms

        this.itemPickUpShell = new GameObject({});
        this.itemPickUpShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18),
        }))
        this.addChild(this.itemPickUpShell);
    }

    workOnItemPickup(delta){
        this.itemPickUpTime -= delta;
        this.body.animations.play("pickUpDown");

        // Remove the item being held overhead
        if(this.itemPickUpTime <= 0){
            this.itemPickUpShell.destroy();
        }
    }
}