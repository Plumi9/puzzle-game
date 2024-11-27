import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class Fireplace extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        })

        const sprite = new Sprite({
            resource: resources.images.fireplace_on,
            frameSize: new Vector2(26,41),
            position: new Vector2(-5,-30)
        })
        this.addChild(sprite)

        this.isOn = true;
        this.hasKey = true;

        this.isSolid = true;

        this.content = [
            {
                string: "I should put out the fire.",
            },
            {
                string: "There is something in the ashes!",
                addsFlag: "FOUND_KEY",
            },
            {
                string: "No fire, no bitches!",
            },
        ]
    }

    toggleFireplaceSprite(fireplace_obj){
        if(!this.isOn && !this.hasKey){
            return;
        }
        else if(this.isOn){
            let first_sprite = fireplace_obj.children[0];
            fireplace_obj.removeChild(first_sprite);
            const sprite = new Sprite({
                resource: resources.images.fireplace_off_key,
                frameSize: new Vector2(26,41),
                position: new Vector2(-5,-30),
            })
            fireplace_obj.addChild(sprite);
        }
        else if(this.hasKey){
            let first_sprite = fireplace_obj.children[0];
            fireplace_obj.removeChild(first_sprite);
            const sprite = new Sprite({
                resource: resources.images.fireplace_off,
                frameSize: new Vector2(26,41),
                position: new Vector2(-5,-30),
            })
            fireplace_obj.addChild(sprite);
        }
    }

    interactFireplace(mainScene,fireplace_obj){
        if(!this.isOn && !this.hasKey){
            // Show the textbox
            const textbox = new SpriteTextString({
                string: this.content[2].string,
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
        else if(this.isOn){
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
                this.toggleFireplaceSprite(fireplace_obj);
                this.isOn = false;
            })
        }
        else if(this.hasKey){
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
            
                this.toggleFireplaceSprite(fireplace_obj)

                events.emit("HERO_PICKS_UP_ITEM", {
                    image: resources.images.key
                })
                this.hasKey = false;
            })
            
            // Add story flag for picking up key
            if(this.content[1].addsFlag){
                storyFlags.add(this.content[1].addsFlag);
            }
        }
    }
}