import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class ScrollZoom extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        this.drawLayer = "HUD"

        const sprite = new Sprite({
            resource: resources.images.scrollZoom,
            frameSize: new Vector2(300,300)
        })
        this.addChild(sprite)

        this.renderScrollZoom();
    }
    renderScrollZoom(){
    }
}
