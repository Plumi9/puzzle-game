import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Npc extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        });

        // Opt into being solid
        this.isSolid = true;

        // Shadow Sprite
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8, -19),
        })
        this.addChild(shadow);

        // Body Sprite
        const body = new Sprite({
            resource: resources.images.knight,
            frameSize: new Vector2(32, 32),
            hFrames: 2,
            vFrames: 1,
            frame: 1, // which of the spriteframes is being drawn
            position: new Vector2(-8, -20),
        })
        this.addChild(body);
    }
}
