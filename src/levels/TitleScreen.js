import { Level } from "../objects/Level/Level.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Vector2 } from "../Vector2.js";
import { gridCells } from "../helpers/grid.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../Resources.js";
import { GreenDoor } from "../objects/Door/GreenDoor.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(9), gridCells(7));

export class TitleScreen extends Level{
    constructor(params={}){
        super({});
        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })
        const groundSprite = new Sprite({
            resource: resources.images.titlescreen,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(groundSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);
        
        const greenDoor = new GreenDoor(gridCells(9), gridCells(4));
        this.addChild(greenDoor);        

        this.walls = new Set();

        // Invisible Walls
        // top wall
        this.walls.add(`64,48`);
        this.walls.add(`80,48`);
        this.walls.add(`96,48`);
        this.walls.add(`112,48`);

        this.walls.add(`176,48`);
        this.walls.add(`192,48`);
        this.walls.add(`208,48`);
        this.walls.add(`224,48`);

        // left wall
        this.walls.add(`64,64`);
        this.walls.add(`64,80`);
        this.walls.add(`64,96`);
        this.walls.add(`64,112`);
        this.walls.add(`64,128`);

        // right wall
        this.walls.add(`224,64`);
        this.walls.add(`224,80`);
        this.walls.add(`224,96`);
        this.walls.add(`224,112`);
        this.walls.add(`224,128`);

        // bottom wall

        this.walls.add(`80,128`);
        this.walls.add(`96,128`);
        this.walls.add(`112,128`);
        this.walls.add(`128,128`);
        this.walls.add(`144,128`);
        this.walls.add(`160,128`);
        this.walls.add(`176,128`);
        this.walls.add(`192,128`);
        this.walls.add(`208,128`);

        // House
        this.walls.add(`128,64`);
        this.walls.add(`144,64`);
        this.walls.add(`160,64`);
    }
    
}