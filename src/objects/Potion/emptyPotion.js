import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";


export class EmptyPotion extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.emptyPotion,
        })
        this.addChild(sprite);

        this.isSolid = true;
    }

    // Textbox Handler
    interactPotion(mainScene){
        // Show the textbox
        const textbox = new SpriteTextString({
            string: "Empty Potion. Smells like medicine."
        });
        mainScene.addChild(textbox);
        events.emit("START_TEXT_BOX");

        // Unsubscribe from this textbox after its destroyed
        const endingSub = events.on("END_TEXT_BOX", this, () => {
            textbox.destroy();
            events.off(endingSub);
        })
    }
}