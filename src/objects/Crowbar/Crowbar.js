import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";

export class Crowbar extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.crowbar,
        })
        this.addChild(sprite);

        // maybe dont make it solid, thoughts?
        this.isSolid = true;

        this.content = {
            string: "A crowbar!",
            addsFlag: "FOUND_CROWBAR",
        };
    }

    interactCrowbar(mainScene){
        // Adds the story Flag: "FOUND_CROWBAR"
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
    // TODO for all objects btw
    inspectCrowbar(mainScene){
        // Adds the story Flag: "FOUND_CROWBAR"
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