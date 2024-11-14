import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Paperzoom extends GameObject {
    constructor() {
        super({});
        const sprite = new Sprite({
            resource: resources.images.paperZoom,
            frameSize: new Vector2(320,320),
        });
        this.addChild(sprite);
        this.drawLayer = "HUD";
    }
}