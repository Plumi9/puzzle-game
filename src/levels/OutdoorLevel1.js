import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Level } from "../objects/Level/Level.js";
import { Rod } from "../objects/Rod/Rod.js";
import { Shovel } from "../objects/Shovel/Shovel.js";
import { resources } from "../Resources.js";
import { Sprite } from "../Sprite.js";
import { Vector2 } from "../Vector2.js";
import { CaveLevel1 } from "./CaveLevel1.js";
import { GreenDoor } from "../objects/Door/GreenDoor.js";
import { TownLevel1 } from "./TownLevel1.js";
const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class OutdoorLevel1 extends Level{
    constructor(params={}){
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320, 180),
        })
        const groundSprite = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(groundSprite);

        const exit = new Exit(gridCells(6), gridCells(3));
        this.addChild(exit);
        
        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);
        
        const rod = new Rod(gridCells(7), gridCells(6));
        this.addChild(rod); 
        
        const shovel = new Shovel(gridCells(6), gridCells(6));
        this.addChild(shovel);

        // Collision
        this.walls = new Set();

        this.walls.add(`64,48`); // trees
        this.walls.add(`208,64`);
        this.walls.add(`224,32`);

        this.walls.add(`64,64`); // squares
        this.walls.add(`64,80`);
        this.walls.add(`80,64`);
        this.walls.add(`80,80`);

        this.walls.add(`128,48`);
        this.walls.add(`144,48`);

        this.walls.add(`112,80`); // water
        this.walls.add(`128,80`);
        this.walls.add(`144,80`);
        this.walls.add(`160,80`);

        this.walls.add(`224,64`); // house

        this.walls.add(`192,96`); // stones
        this.walls.add(`208,96`);
        this.walls.add(`224,96`);

        this.walls.add("32,48"); // left wall
        this.walls.add("32,64");
        this.walls.add("32,80");
        this.walls.add("32,96");

        this.walls.add("48,32"); // top wall
        this.walls.add("64,32");
        this.walls.add("80,32");
        this.walls.add("96,32");
        this.walls.add("112,16");
        this.walls.add("128,16");
        this.walls.add("144,16");
        this.walls.add("160,16");
        this.walls.add("176,16");
        this.walls.add("192,16");
        this.walls.add("208,16");
        this.walls.add("224,16");
        this.walls.add("240,32");

        this.walls.add("256,48"); // right wall
        this.walls.add("256,64"); 
        this.walls.add("256,80"); 
        this.walls.add("256,96"); 

        this.walls.add("48,112");  // bottom wall
        this.walls.add("64,112");
        this.walls.add("80,112");
        this.walls.add("96,112");
        this.walls.add("112,112");
        this.walls.add("128,112");
        this.walls.add("144,112");
        this.walls.add("160,112");
        this.walls.add("176,112");
        this.walls.add("192,112");
        this.walls.add("208,112");
        this.walls.add("224,112");
        this.walls.add("240,112");
    }
    ready(){
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new TownLevel1({
                heroPosition: new Vector2(gridCells(42),gridCells(4))
            }));
        })
    }
}
