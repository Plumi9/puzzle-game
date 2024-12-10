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
import { Mound } from "../objects/Mound/Mound.js";
import { WoodsEntrance } from "../objects/Door/WoodsEntrance.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(19), gridCells(5));

export class WoodsLevel1 extends Level{
    constructor(params={}){
        super({});
        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })
        const groundSprite = new Sprite({
            resource: resources.images.woodsGround,
            frameSize: new Vector2(560, 524),
            position: new Vector2(6,4)
        })
        this.addChild(groundSprite);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const woodsEntrance = new WoodsEntrance(gridCells(19),gridCells(4));
        this.addChild(woodsEntrance);

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        const mound = new Mound(gridCells(27),gridCells(24));
        this.addChild(mound);

        // Collision
        this.walls = new Set();

    }
    ready(){}
}
