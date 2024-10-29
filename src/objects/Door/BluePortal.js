import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";

export class BluePortal extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.bluePortal,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8,-16)
        })
        this.addChild(sprite)

        this.drawLayer = "FLOOR";
    }

    changeLocationPortal(){
        events.emit("HERO_ENTERS_PORTAL");
    }
}