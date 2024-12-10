import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { gridCells } from "../../helpers/grid.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";


export class Reaper extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.reaper,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8,-18)
        })
        this.addChild(sprite)

        // Opt into being solid
        this.isSolid = true;

        this.drawLayer = "FLOOR";

        // Say something when talking
        this.textContent = {
            content: [
                {
                    string: "11111111",
                    requires: [],
                    bypass: ["TALKED_TO_REAPER"],
                    addsFlag: "TALKED_TO_REAPER",
                    split: "second string from 1111111",
                },
                {
                    string: "2222222",
                    requires: [],
                    bypass: ["TALKED_TO_REAPER"],
                    addsFlag: "TALKED_TO_REAPER",
                },
                {
                    string: "33333",
                    requires: ["TALKED_TO_REAPER"],
                    bypass: [],
                    split: "second string from 333333",
                },
            ],
        }
        this.textPortrait = 0;
    }
    // getContent(){
    //     // Maybe expand with story flag logic, etc... 
    //     const match  = storyFlags.getRelevantScenario(this.textContent);
    //     if(!match){
    //         console.warn("No matches found in this list", this.textContent);
    //         return null;
    //     } 

    //     return {
    //         portraitFrame: this.textPortrait,
    //         string: match.string,
    //         addsFlag: match.addsFlag ?? null,
    //     }
    // }
    getDialog(mainScene){
        const match  = storyFlags.getRelevantScenario(this.textContent.content);
        if(!match){
            console.warn("No matches found in this list", this.textContent);
            return;
        } 
        else{
            // Potentially add a story flag
            if(match.addsFlag){
                storyFlags.add(match.addsFlag);
            }
            // Show the textbox
            const textbox = new SpriteTextString({
                portraitFrame: match.portraitFrame,
                string: match.string,
            });
            mainScene.addChild(textbox);
            events.emit("START_TEXT_BOX");

            // Unsubscribe from this textbox after its destroyed
            const endingSub = events.on("END_TEXT_BOX", this, () => {
                textbox.destroy();
                events.off(endingSub);
                
                if(match.split){
                    events.emit("START_TEXT_BOX");
                    setTimeout(function(){
                        const textbox2 = new SpriteTextString({
                            string: match.split,
                            portraitFrame: match.portraitFrame,
                        });
                        mainScene.addChild(textbox2);
                        events.emit("START_TEXT_BOX");
                
                        // Unsubscribe from this textbox after its destroyed
                        const endingSub2 = events.on("END_TEXT_BOX", this, () => {
                            textbox2.destroy();
                            events.off(endingSub2);
                        })
                    }, 50);
                }
            })
        }
    }
}