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
import { TownLevel1 } from "./TownLevel1.js";
import { BluePortal } from "../objects/Door/BluePortal.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(24), gridCells(20));

export class TownLevel2 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.cave,
            frameSize: new Vector2(320, 180),
        })
        const townGroundSprite = new Sprite({
            resource: resources.images.townGround,
            frameSize: new Vector2(900, 800),
            position: new Vector2(-128,0),
        })
        this.addChild(townGroundSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const brownDoor_npc1 = new BrownDoor(gridCells(10), gridCells(13), {
            location: "RoomLevel1",
        });
        this.addChild(brownDoor_npc1);

        const brownDoor_npc2 = new BrownDoor(gridCells(22), gridCells(13), {
            location: "RoomLevel1",
        });
        this.addChild(brownDoor_npc2);

        const caveEntrance = new CaveEntrance(gridCells(42), gridCells(3), {
            location: "CaveLevel1",
        });
        this.addChild(caveEntrance);

        const exit = new Exit(gridCells(-7), gridCells(31));
        this.addChild(exit);

        const bluePortal = new BluePortal(gridCells(41), gridCells(11));
        this.addChild(bluePortal);

        this.walls = new Set();

        // Always add hero last, buggy layering if not, weird!
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

    }
    
    ready(){
        // Staircase to OutdoorLevel
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(6),gridCells(4))
            }));
        })
        // Portal to TownLevel1
        events.on("HERO_ENTERS_PORTAL", this, () => {
            events.emit("CHANGE_LEVEL", new TownLevel1({
                heroPosition: new Vector2(gridCells(41),gridCells(12))
            }));
        })
    }
}