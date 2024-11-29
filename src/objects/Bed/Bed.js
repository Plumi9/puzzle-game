import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class Bed extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.bed,
            position: new Vector2(0,-20),
            frameSize: new Vector2(32,36),
        })
        this.addChild(sprite);
        
        this.isSolid = true;

        this.content = {
                string: "I feel sleepy.",
                addsFlag: "END_DAY_1",
            };
    }

    interactBed(mainScene){
        // Adds the story Flag: "END_DAY_1"
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

            //tp to next "level"
        })
    }

    inspectBed(mainScene){
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
        })
    }
}