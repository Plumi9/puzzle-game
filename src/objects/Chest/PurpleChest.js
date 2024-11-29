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
        const sprite = new Sprite({
            resource: resources.images.purpleChest,
            position: new Vector2(1,-2),
        })
        this.addChild(sprite);
        
        // keeping track of states
        this.isOpen = false;

        this.isSolid = true;
        this.drawLayer = "FLOOR";
        
        this.content = [
            {
                string: "Found something in PURPLE Chest!",
                addsFlag: "FOUND_SOMETHING",
            },
            {
                string: "Can't close the PURPLE chest. Stupid Dev!",
            }
        ];
    }

    openPurpleChest(chestInstance){
        if(!this.isOpen){
            let sprite = chestInstance.children[0];
            chestInstance.removeChild(sprite);

            sprite = new Sprite({
                resource: resources.images.openPurpleChest,
                position: new Vector2(1,-2),
            })
            this.addChild(sprite);
            this.isOpen = true;
        }
    }

    interactPurpleChest(mainScene, chestInstance){
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
            this.openPurpleChest(chestInstance)
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