import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { BrownDoor } from "../objects/Door/BrownDoor.js";
import { GreenDoor } from "../objects/Door/GreenDoor.js";
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
import { CaveEntrance } from "../objects/Door/CaveEntrance.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(24), gridCells(20));

export class TownLevel1 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.cave,
            frameSize: new Vector2(320, 180),
        })
        const townGroundSprite = new Sprite({
            resource: resources.images.townGround,
            frameSize: new Vector2(992, 1090),
            position: new Vector2(-32,-112),
        })
        this.addChild(townGroundSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const brownDoor1 = new BrownDoor(gridCells(23), gridCells(24), {
            location: "OutdoorLevel1",
        });
        this.addChild(brownDoor1);

        const brownDoor2 = new BrownDoor(gridCells(24), gridCells(24), {
            location: "RoomLevel1",
        });
        this.addChild(brownDoor2);

        const caveEntrance = new CaveEntrance(gridCells(56), gridCells(14), {
            location: "CaveLevel1",
        });
        this.addChild(caveEntrance);

        const exit = new Exit(gridCells(5), gridCells(42));
        this.addChild(exit);

        this.walls = new Set();

        // Always add hero last, buggy layering if not, weird!
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

    }
    
    ready(){
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(4),gridCells(6))
            }));
        })
    }
}