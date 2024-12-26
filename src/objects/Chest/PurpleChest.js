import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class PurpleChest extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })
        // keeping track of states
        this.isOpen;
        this.initialState();

        this.isSolid = true;
        this.drawLayer = "FLOOR";
        
        this.content = [
            {
                string: "CANT OPEN PURPLE CHEST. STORY!",
                addsFlag: "FOUND_SOMETHING",
            },
            {
                string: "CANT CLOSE PURPLE CHEST. STORY!",
            }
        ];
    }

    initialState(){
        if(storyFlags.flags.has("END_ACT_1")){
            const sprite = new Sprite({
                resource: resources.images.openPurpleChest,
                position: new Vector2(1,-2),
            })
            this.addChild(sprite);
            this.isOpen = true;
        }
        else{
            const sprite = new Sprite({
                resource: resources.images.purpleChest,
                position: new Vector2(1,-2),
            })
            this.addChild(sprite);
            this.isOpen = false;
        }
    }

    interactPurpleChest(mainScene){
        if(!this.isOpen){
            // Adds story Flag
            if(this.content.addsFlag){
                storyFlags.add(this.content[0].addsFlag);
            }

            // Show the textbox
            const textbox = new SpriteTextString({
                string: this.content[0].string,
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
        else{
            // Adds story Flag
            if(this.content.addsFlag){
                storyFlags.add(this.content[1].addsFlag);
            }

            // Show the textbox
            const textbox = new SpriteTextString({
                string: this.content[1].string,
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
}