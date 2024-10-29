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
import { BluePortal } from "../objects/Door/BluePortal.js";
import { TownLevel2 } from "./TownLevel2.js";
import { Npc1 } from "../objects/NPC/Npc1.js";
import { Npc10 } from "../objects/NPC/Npc10.js";
import { Npc11 } from "../objects/NPC/Npc11.js";
import { Npc20 } from "../objects/NPC/Npc20.js";
import { Npc26 } from "../objects/NPC/Npc26.js";
import { Npc19 } from "../objects/NPC/Npc19.js";
import { Npc42 } from "../objects/NPC/Npc42.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(0), gridCells(0));

export class TownLevel1 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.sky,
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

        const girl = new Npc1(gridCells(1), gridCells(1),{
            content: [
                {
                    string: "I just can't stand that guy.",
                },
            ],
        });
        this.addChild(girl);
        const knight = new Npc10(gridCells(2), gridCells(1));
        this.addChild(knight);
        const healer = new Npc11(gridCells(3), gridCells(1));
        this.addChild(healer);
        const wizard = new Npc20(gridCells(4), gridCells(1));
        this.addChild(wizard);
        const ninja = new Npc26(gridCells(5), gridCells(1));
        this.addChild(ninja);
        const hunter = new Npc19(gridCells(6), gridCells(1));
        this.addChild(hunter);
        const priest = new Npc42(gridCells(7), gridCells(1));
        this.addChild(priest);

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
        // Portal to TownLevel2
        events.on("HERO_ENTERS_PORTAL", this, () => {
            events.emit("CHANGE_LEVEL", new TownLevel2({
                heroPosition: new Vector2(gridCells(41),gridCells(12))
            }));
        })
    }
}