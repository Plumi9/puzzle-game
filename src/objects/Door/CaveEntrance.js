import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";
import { gridCells } from "../../helpers/grid.js";
import { CaveLevel1 } from "../../levels/CaveLevel1.js";


export class CaveEntrance extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.caveEntrance,
            frameSize: new Vector2(64, 64),
            position: new Vector2(0, -16),
        })
        this.addChild(sprite)

        // location it leads to
        this.location = location.location;
        this.xCoord = location.xCoord;
        this.yCoord = location.yCoord;

        this.drawLayer = "FLOOR";

    }

    changeLocationCave(){
        events.emit("CHANGE_LEVEL", new CaveLevel1({
            heroPosition: new Vector2(gridCells(4),gridCells(6))
        }));
    }
}