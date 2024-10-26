import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";

export class Npc44 extends GameObject{
    constructor(x,y, textConfig={}){
        super({
            position: new Vector2(x,y)
        });

        // Opt into being solid
        this.isSolid = true;

        // Say something when talking
        this.textContent = textConfig.content;
        this.textPortrait = textConfig.portraitFrame;

        // Shadow Sprite
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8, -19),
        })
        this.addChild(shadow);

        // Body Sprite
        const body = new Sprite({
            resource: resources.images.npc44,
            frameSize: new Vector2(32, 32),
            position: new Vector2(0, -6),
        })
        this.addChild(body);
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
}
