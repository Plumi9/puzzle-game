import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { BrownDoor } from "../objects/Door/BrownDoor.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Level } from "../objects/Level/Level.js";
import { Npc } from "../objects/NPC/Npc.js";
import { Rod } from "../objects/Rod/Rod.js";
import { resources } from "../Resources.js";
import { Sprite } from "../Sprite.js";
import { TALKED_TO_A, TALKED_TO_B } from "../StoryFlags.js";
import { Vector2 } from "../Vector2.js";
import { OutdoorLevel1 } from "./OutdoorLevel1.js";
import { TownLevel1 } from "./TownLevel1.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class DungeonLevel1 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })
        const dungeonGroundSprite = new Sprite({
            resource: resources.images.dungeonGround,
            frameSize: new Vector2(400, 400),
        })
        this.addChild(dungeonGroundSprite);
        
        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const brownDoor = new BrownDoor(gridCells(2),gridCells(2),{
            location: "TownLevel1",
            heroPosition: new Vector2(gridCells(41),gridCells(12)),
        });
        this.addChild(brownDoor)

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        this.walls = new Set();

    }
    
    ready(){
    }
}