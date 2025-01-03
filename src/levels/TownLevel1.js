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
import { TALKED_TO_A, TALKED_TO_B, TALKED_TO_GIRL, TALKED_TO_HEALER, TALKED_TO_HUNTER, TALKED_TO_KNIGHT, TALKED_TO_NINJA, TALKED_TO_WIZARD } from "../StoryFlags.js";
import { Vector2 } from "../Vector2.js";
import { OutdoorLevel1 } from "./OutdoorLevel1.js";
import { OutdoorEntrance } from "../objects/Door/OutdoorEntrance.js";
import { BluePortal } from "../objects/Door/BluePortal.js";
import { TownLevel_night } from "./TownLevel_night.js";
import { Npc1 } from "../objects/NPC/Npc1.js";
import { Npc10 } from "../objects/NPC/Npc10.js";
import { Npc11 } from "../objects/NPC/Npc11.js";
import { Npc20 } from "../objects/NPC/Npc20.js";
import { Npc26 } from "../objects/NPC/Npc26.js";
import { Npc19 } from "../objects/NPC/Npc19.js";
import { CaveLevel1 } from "./CaveLevel1.js";
import { Chest } from "../objects/Chest/Chest.js";
import { Shovel } from "../objects/Shovel/Shovel.js";
import { EmptyPotion } from "../objects/Potion/emptyPotion.js";
import { Sword } from "../objects/Sword/sword.js";
import { Paper } from "../objects/Paper/Paper.js";
import { Ring } from "../objects/Ring/Ring.js";
import { Necklace } from "../objects/Necklace/Necklace.js";
import { Scroll } from "../objects/Scroll/Scroll.js";
import { Mound } from "../objects/Mound/Mound.js";
import { Pouch } from "../objects/Pouch/Pouch.js";
import { Book } from "../objects/Book/Book.js";
import { Key } from "../objects/Key/Key.js";
import { Fireplace } from "../objects/Fireplace/Fireplace.js";
import { Bed } from "../objects/Bed/Bed.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(22), gridCells(14));

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

        const brownDoor_RoomLevel1 = new BrownDoor(gridCells(22), gridCells(13), {
            location: "RoomLevel1",
            heroPosition: new Vector2(gridCells(3),gridCells(9)),
        });
        this.addChild(brownDoor_RoomLevel1);

        const brownDoor_RoomLevel_pink = new BrownDoor(gridCells(10), gridCells(13), {
            location: "RoomLevel_pink",
            heroPosition: new Vector2(gridCells(3),gridCells(9)),
        });
        this.addChild(brownDoor_RoomLevel_pink);

        const brownDoor_RoomLevel_grey = new BrownDoor(gridCells(12), gridCells(3), {
            location: "RoomLevel_grey",
            heroPosition: new Vector2(gridCells(3),gridCells(9)),
        });
        this.addChild(brownDoor_RoomLevel_grey);

        const brownDoor_RoomLevel_brown = new BrownDoor(gridCells(26), gridCells(3), {
            location: "RoomLevel_brown",
            heroPosition: new Vector2(gridCells(3),gridCells(9)),
        });
        this.addChild(brownDoor_RoomLevel_brown);

        const brownDoor_RoomLevel_purple = new BrownDoor(gridCells(5), gridCells(40), {
            location: "RoomLevel_purple",
            heroPosition: new Vector2(gridCells(3),gridCells(3)),
        });
        this.addChild(brownDoor_RoomLevel_purple);

        const brownDoor_RoomLevel_yellow = new BrownDoor(gridCells(18), gridCells(40), {
            location: "RoomLevel_yellow",
            heroPosition: new Vector2(gridCells(3),gridCells(3)),
        });
        this.addChild(brownDoor_RoomLevel_yellow);

        const brownDoor_DungeonLevel1 = new BrownDoor(gridCells(41), gridCells(11), {
            location: "DungeonLevel1",
            heroPosition: new Vector2(gridCells(2),gridCells(3)),
        });
        this.addChild(brownDoor_DungeonLevel1);

        const outdoorEntrance = new OutdoorEntrance(gridCells(42), gridCells(3));
        this.addChild(outdoorEntrance);

        const exit = new Exit(gridCells(-7), gridCells(31));
        this.addChild(exit);

        this.walls = new Set();

        const girl = new Npc1(gridCells(11), gridCells(13),{
            content: [
                {
                    string: "Hey there! I am Lila! If you are new to Midvale, I can show you around. Just be careful, not everyone here is as friendly as they seem! dsajd dsadas dsad dsa",
                    requires: [],
                    bypass: [TALKED_TO_GIRL],
                    addsFlag: TALKED_TO_GIRL,
                },
                {
                    string: "I love this town, but sometimes it feels like everyone has secrets. I just wish people would be honest with each other.",
                    requires: [],
                    bypass: ["TALKED_TO_GIRL2"],
                    addsFlag: "TALKED_TO_GIRL2",
                },
                {
                    string: "33333",
                    requires: ["TALKED_TO_GIRL2"],
                    bypass: [],
                },
            ],
            portraitFrame: 2,
        });
        this.addChild(girl);
        const knight = new Npc10(gridCells(19), gridCells(40), {
            content: [
                {
                    string: "Ah, a newcomer! I'm Alaric, defender of Midvale. Proud to meet you. I am a little busy - there are rumors of trouble in the woods.",
                    requires: [],
                    bypass: [TALKED_TO_KNIGHT],
                    addsFlag: TALKED_TO_KNIGHT,
                },
                {
                    string: "You know, it's a peaceful town, but even here, shadows lurk. Always stay vigilant!",
                    requires: [TALKED_TO_KNIGHT],
                    bypass: [],
                    addsFlag: "TALKED_TO_KNIGHT2",
                },
            ],
            portraitFrame: 3,
        });
        this.addChild(knight);
        const healer = new Npc11(gridCells(13), gridCells(3), {
            content: [
                {
                    string: "Welcome to Midvale! I'm Elara, the healer. If you need a remedy or a friendly ear, I'm here. But I often find solace in my herbs. They help me clear my mind.",
                    requires: [],
                    bypass: [TALKED_TO_HEALER],
                    addsFlag: TALKED_TO_HEALER,
                },
                {
                    string: "The townsfolk have their quirks, but I love them dearly. Just don't disturb the forest at night. The creatures can be... unpredictable.",
                    requires: [TALKED_TO_HEALER],
                    bypass: [],
                    addsFlag: "TALKED_TO_HEALER2",
                },
            ],
            portraitFrame: 4,
        });
        this.addChild(healer);
        const hunter = new Npc19(gridCells(27), gridCells(3), {
            content: [
                {
                    string: "I'm gay",
                    requires: [],
                    bypass: [TALKED_TO_HUNTER],
                    addsFlag: TALKED_TO_HUNTER,
                },
                {
                    string: "Or am I?",
                    requires: [TALKED_TO_HUNTER],
                    bypass: ["FOUND_SHOVEL"],
                    addsFlag: "TALKED_TO_HUNTER2",
                },
                {
                    string: "Ooh a shovel. NICE!",
                    requires: ["FOUND_SHOVEL"],
                    bypass: [],
                    addsFlag: "TALKED_TO_HUNTER2",
                },
            ],
            portraitFrame: 5,
        });
        this.addChild(hunter);
        const wizard = new Npc20(gridCells(6), gridCells(40), {
            content: [
                {
                    string: "Hmm, a newcomer. I'm Alden, the wizard. If you seek knowledge, you may ask me - or not. Most prefer the simplicity of life over the complexities of magic.",
                    requires: [],
                    bypass: [TALKED_TO_WIZARD],
                    addsFlag: TALKED_TO_WIZARD,
                },
                {
                    string: "Be cautious, curiosity can lead you down dark paths. Some knowledge is best left undiscovered.",
                    requires: [TALKED_TO_WIZARD],
                    bypass: [],
                    addsFlag: "TALKED_TO_WIZARD2",
                },
            ],
            portraitFrame: 6,
        });
        this.addChild(wizard);

        // Always add hero last, buggy layering if not, weird, maybe not! LIE!
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);
    }

    ready(){
        // Staircase to OutdoorLevel
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new CaveLevel1({
                heroPosition: new Vector2(gridCells(4),gridCells(6))
            }));
        })
    }
}