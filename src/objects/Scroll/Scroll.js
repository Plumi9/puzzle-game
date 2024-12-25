import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";

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

        this.content = {
            addsFlag: "READ_SCROLL",
        };
    }

    // Textbox Handler
    interactScroll(mainScene){
        // Adds the story Flag: "FOUND_CROWBAR"
        if(this.content.addsFlag){
            storyFlags.add(this.content.addsFlag);
        }
    }
}
