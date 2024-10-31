import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";
import { gridCells } from "../../helpers/grid.js";
import { OutdoorLevel1 } from "../../levels/OutdoorLevel1.js";


export class OutdoorEntrance extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.outdoorEntrance,
            frameSize: new Vector2(64, 64),
            position: new Vector2(0, -16),
        })
        this.addChild(sprite)

        // Opt into being solid
        this.isSolid = true;

        // location it leads to
        this.location = location.location;
        this.xCoord = location.xCoord;
        this.yCoord = location.yCoord;

        this.drawLayer = "FLOOR";

    }

    changeLocationCave(){
        events.emit("CHANGE_LEVEL", new OutdoorLevel1({
            heroPosition: new Vector2(gridCells(6),gridCells(4))
        }));
    }
}