import { GameObject } from "../../GameObject.js";
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

        this.drawLayer = "FLOOR";
    }
}