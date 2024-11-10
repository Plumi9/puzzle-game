import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class Chest extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.chest,
            position: new Vector2(1,0),
        })
        this.addChild(sprite);
        
        this.isSolid = true;

        this.content = {
                string: "Found something",
                addsFlag: "FOUND_SHOVEL",
            };
    }
    interactChest(mainScene){
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.shovel
        })
        // Adds the story Flag: "FOUND_SHOVEL"
        if(this.content.addsFlag){
            storyFlags.add(this.content.addsFlag);
        }

        // Show the textbox
        const textbox = new SpriteTextString({
            string: this.content.string,
            portraitFrame: 0,
        });
        mainScene.addChild(textbox);

        events.emit("START_TEXT_BOX");

        // Unsubscribe from this textbox after its destroyed
        const endingSub = events.on("END_TEXT_BOX", this, () => {
            textbox.destroy();
            events.off(endingSub);
            
            this.destroy();
        })
    }
}