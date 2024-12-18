import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { Chest } from "../objects/Chest/Chest.js";
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

export class CaveLevel1 extends Level{
    constructor(params={}){
        super({});

        this.background = new Sprite({
            resource: resources.images.cave,
            frameSize: new Vector2(320, 180),
        })
        const caveGroundSprite = new Sprite({
            resource: resources.images.caveGround,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(caveGroundSprite);
        
        const exit = new Exit(gridCells(3), gridCells(6));
        this.addChild(exit);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        const rod = new Rod(gridCells(9), gridCells(6));
        this.addChild(rod); 

        const chest = new Chest(gridCells(8),gridCells(1), true);
        this.addChild(chest);

        const npc1 = new Npc(gridCells(7), gridCells(5), {
            content: [
                {
                    string: "I just can't stand that guy.",
                    requires: [TALKED_TO_B],
                    bypass: [TALKED_TO_A],
                    addsFlag: TALKED_TO_A,
                },
                {
                    string: "He is just the worst!",
                    requires: [TALKED_TO_A],
                },
                {
                    string: "Grumble grumble. Another day at work.",
                    requires: [],
                }
            ],
            portraitFrame: 1,
        })
        this.addChild(npc1);

        const npc_knight2 = new Npc(gridCells(6), gridCells(4), {
            content: [
                {
                    string: "What a wonderful day at work in the cave!",
                    requires: [],
                    addsFlag: TALKED_TO_B
                }
            ],
            portraitFrame: 0,
        })
        this.addChild(npc_knight2);

        this.walls = new Set();

        this.walls.add(`64,48`);
    }
    
    ready(){
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new TownLevel1({
                heroPosition: new Vector2(gridCells(-7),gridCells(32))
            }));
        })
    }
}