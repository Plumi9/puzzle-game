import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js"
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { storyFlags } from "../../StoryFlags.js";

export class Chest extends GameObject{
    constructor(x,y,manual=false){
        super({
            position: new Vector2(x,y)
        })
        
        // keeping track of states, no words for this shit
        this.manual = manual;
        this.isOpen = false;
        this.initialState();

        this.isSolid = true;
        this.drawLayer = "FLOOR";

        this.content = [
            {
                string: "Found something!",
                addsFlag: "FOUND_SOMETHING",
            },
            {
                string: "Can't close the chest. Stupid Dev!",
            },
            {
                string: "I can't open this chest! Part of story!"
            }
        ];
    }

    initialState(){
        if(this.manual){
            if(storyFlags.flags.has("PLAYER_OPENED_CHEST")){
                const sprite = new Sprite({
                    resource: resources.images.openChest,
                    position: new Vector2(1,-2),
                })
                this.addChild(sprite);
                this.isOpen = true;
            }
            else{
                const sprite = new Sprite({
                    resource: resources.images.chest,
                    position: new Vector2(1,-2),
                })
                this.addChild(sprite);
            }
        }
        else{
            if(storyFlags.flags.has("END_DAY_1")){
                const sprite = new Sprite({
                    resource: resources.images.openPurpleChest,
                    position: new Vector2(1,-2),
                })
                this.addChild(sprite);    
            }
            else{
                const sprite = new Sprite({
                    resource: resources.images.purpleChest,
                    position: new Vector2(1,-2),
                })
                this.addChild(sprite);
            }
        }
    }

    openChest(chestInstance){
        if(!this.isOpen){
            let sprite = chestInstance.children[0];
            chestInstance.removeChild(sprite);

            sprite = new Sprite({
                resource: resources.images.openChest,
                position: new Vector2(1,-2),
            })
            this.addChild(sprite);
            this.isOpen = true;

            storyFlags.add("PLAYER_OPENED_CHEST");
        }
    }

    interactChest(mainScene, chestInstance){
        if(this.manual){
            if(!this.isOpen){
                // Adds story Flag
                if(this.content.addsFlag){
                    storyFlags.add(this.content[0].addsFlag);
                }
    
                this.createTextBox(mainScene, 0);
                this.openChest(chestInstance)
            }
            else{
                this.createTextBox(mainScene, 1);
            }
        }
        else{
            this.createTextBox(mainScene, 2);
        }
    }

    createTextBox(mainScene, num){
        // Show the textbox
        const textbox = new SpriteTextString({
            string: this.content[num].string,
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