import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";
import { gridCells } from "../../helpers/grid.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";

export class WoodsEntrance extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.woodsEntrance,
            frameSize: new Vector2(32, 48),
            position: new Vector2(-10,-18)
        })
        this.addChild(sprite)

        // Opt into being solid
        this.isSolid = true;

        this.drawLayer = "FLOOR";

    }

    changeLocationWoodsEntrance(){
        events.emit("CHANGE_LEVEL", new TownLevel1({
            heroPosition: new Vector2(gridCells(42),gridCells(4))
        }));
    }
}