import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Chest extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.chest,
        })
        this.addChild(sprite);
        
        this.isSolid = true;
    }
    interactProp(){
        console.log("HELLO")
        this.destroy();
    }
}