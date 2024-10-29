import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { gridCells } from "../../helpers/grid.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class GreenDoor extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.greenDoor,
        })
        this.addChild(sprite)

        // Opt into being solid
        this.isSolid = true;

        this.drawLayer = "FLOOR";
    }

    changeLocationGreenDoor(){
        events.emit("CHANGE_LEVEL", new TownLevel1({
            heroPosition: new Vector2(gridCells(7), gridCells(45))
        }))
    }
}