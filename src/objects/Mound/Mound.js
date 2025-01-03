import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class Mound extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.mound,
        })
        this.addChild(sprite);

        this.isSolid = true;
    }

    // Textbox Handler
    interactMound(mainScene){
        // Check for shovel
        if(storyFlags.flags.get("FOUND_SHOVEL")){
            events.emit("HERO_PICKS_UP_ITEM", {
                image: resources.images.shovel
            })
            // Show the textbox
            const textbox = new SpriteTextString({
                string: "Mound with shovel"
            });
            mainScene.addChild(textbox);
            events.emit("START_TEXT_BOX");
            this.destroy();

            // Unsubscribe from this textbox after its destroyed
            const endingSub = events.on("END_TEXT_BOX", this, () => {
                textbox.destroy();
                events.off(endingSub);
            })
        }
        else{
            // Show the textbox
            const textbox = new SpriteTextString({
                string: "Mound without shovel"
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
}
