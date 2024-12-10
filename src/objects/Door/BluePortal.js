import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";
import { gridCells } from "../../helpers/grid.js";
import { TownLevel_night } from "../../levels/TownLevel_night.js";

export class BluePortal extends GameObject{
    constructor(x,y,location={}){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.bluePortal,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8,-16)
        })
        this.addChild(sprite)

        // location it leads to
        this.location = location.location;
        this.heroPosition = location.heroPosition ?? new Vector2(gridCells(2),gridCells(2));        

        // Opt into being solid
        this.isSolid = true;

        this.drawLayer = "FLOOR";
    }

    changeLocationPortal(){
        events.emit("CHANGE_LEVEL", new TownLevel_night({
            heroPosition: this.heroPosition,
        }));
    }
}