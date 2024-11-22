import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { Bed } from "../objects/Bed/Bed.js";
import { BrownDoor } from "../objects/Door/BrownDoor.js";
import { GreenDoor } from "../objects/Door/GreenDoor.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Fireplace } from "../objects/Fireplace/Fireplace.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Level } from "../objects/Level/Level.js";
import { Npc } from "../objects/NPC/Npc.js";
import { Rod } from "../objects/Rod/Rod.js";
import { resources } from "../Resources.js";
import { Sprite } from "../Sprite.js";
import { TALKED_TO_A, TALKED_TO_B } from "../StoryFlags.js";
import { Vector2 } from "../Vector2.js";
import { OutdoorLevel1 } from "./OutdoorLevel1.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(2), gridCells(8));

export class RoomLevel1 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })
        const roomSprite = new Sprite({
            resource: resources.images.room,
            frameSize: new Vector2(360, 280),
        })
        this.addChild(roomSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const door = new BrownDoor(gridCells(2),gridCells(7), { 
            location: 'TownLevel1',
            heroPosition: new Vector2(gridCells(10),gridCells(14)),
        });
        this.addChild(door);

        const fireplace = new Fireplace(gridCells(7),gridCells(8));
        this.addChild(fireplace);

        const bed = new Bed(gridCells(18),gridCells(3));
        this.addChild(bed);

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        // Collision
        this.walls = new Set();
    }
}