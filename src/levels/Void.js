import { Level } from "../objects/Level/Level.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Vector2 } from "../Vector2.js";
import { gridCells } from "../helpers/grid.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../Resources.js";
import { GreenDoor } from "../objects/Door/GreenDoor.js";
import { Reaper } from "../objects/NPC/reaper.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(4), gridCells(10));

export class Void extends Level{
    constructor(params={}){
        super({});
        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })
        const groundSprite = new Sprite({
            resource: resources.images.void,
            frameSize: new Vector2(320, 180),
        })
        this.addChild(groundSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);
        
        const greenDoor = new GreenDoor(gridCells(4), gridCells(5));
        this.addChild(greenDoor);        

        const reaper = new Reaper(gridCells(2),gridCells(8),{
            content: [
                {
                    string: "TALKED TO REAPER, implement me or im boutta bust on this sucka",
                    addsFlag: "TALKED TO REAPER",
                },
                {
                    string: "TALKED TO REAPER, implement me or im boutta bust on this sucka",
                },
            ]
        });
        this.addChild(reaper);

        this.walls = new Set();
        // bottom wall
        this.walls.add(`${gridCells(4)},${gridCells(11)}`)
        
        // right wall
        this.walls.add(`${gridCells(5)},${gridCells(10)}`)
        this.walls.add(`${gridCells(5)},${gridCells(9)}`)
        this.walls.add(`${gridCells(5)},${gridCells(8)}`)
        this.walls.add(`${gridCells(5)},${gridCells(7)}`)
        this.walls.add(`${gridCells(5)},${gridCells(6)}`)

        // left wall
        this.walls.add(`${gridCells(3)},${gridCells(10)}`)
        this.walls.add(`${gridCells(3)},${gridCells(9)}`)
        this.walls.add(`${gridCells(3)},${gridCells(7)}`)
        this.walls.add(`${gridCells(3)},${gridCells(6)}`)


    }
    
}