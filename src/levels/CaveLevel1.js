import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Level } from "../objects/Level/Level.js";
import { Npc } from "../objects/NPC/Npc.js";
import { Rod } from "../objects/Rod/Rod.js";
import { resources } from "../Resources.js";
import { Sprite } from "../Sprite.js";
import { Vector2 } from "../Vector2.js";
import { OutdoorLevel1 } from "./OutdoorLevel1.js";

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

        this.heroStartPosition = params.heroPosiition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        const rod = new Rod(gridCells(9), gridCells(6));
        this.addChild(rod); 

        const npc = new Npc(gridCells(7), gridCells(5))
        this.addChild(npc);

        this.walls = new Set();

        this.walls.add(`64,48`);
    }
    ready(){
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(6),gridCells(4))
            }));
        })
    }
}