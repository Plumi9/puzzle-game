import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Scroll extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.scroll,
        })
        this.addChild(sprite);

        this.isSolid = true;
    }

    // Textbox Handler
    interactScroll(mainScene){
        //events.emit("START_TEXT_BOX");
    }
}
