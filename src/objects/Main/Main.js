import { Camera } from "../../Camera.js";
import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { Input } from "../../Input.js";
import { MusicManager } from "../../MusicManager.js";
import { resources } from "../../Resources.js";
import { storyFlags } from "../../StoryFlags.js";
import { Inventory } from "../Inventory/Inventory.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { OutdoorLevel1 } from "../../levels/OutdoorLevel1.js";
import { CaveLevel1 } from "../../levels/CaveLevel1.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { TownLevel2 } from "../../levels/TownLevel2.js";

export class Main extends GameObject{
    constructor(){
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
        this.musicManager = new MusicManager();
    }
    ready(){
        const inventory = new Inventory();
        this.addChild(inventory);        

        // Change Level handlers
        events.on("CHANGE_LEVEL", this, newLevelInstance => {
            this.setLevel(newLevelInstance);
        })

        // Launch textbox handler
        events.on("HERO_REQUESTS_ACTION",this, (withObject) => {
            console.log(withObject);
            if(typeof withObject.getContent === "function"){
                const content = withObject.getContent();

                if(!content){
                    return;
                }

                // Potentially add a story flag
                if(content.addsFlag){
                    console.log("ADD FLAG", content.addsFlag);
                    storyFlags.add(content.addsFlag);
                }
                console.log(storyFlags);
                // Show the textbox
                const textbox = new SpriteTextString({
                    portraitFrame: content.portraitFrame,
                    string: content.string,
                });
                this.addChild(textbox);
                events.emit("START_TEXT_BOX");
    
                // Unsubscribe from this textbox after its destroyed
                const endingSub = events.on("END_TEXT_BOX", this, () => {
                    textbox.destroy();
                    events.off(endingSub);
                })
            }
            if(typeof withObject.changeLocationRoom === "function"){
                withObject.changeLocationRoom();
            }
            if(typeof withObject.changeLocationCave === "function"){
                withObject.changeLocationCave();
            }
        })
    }

    setLevel(newLevelInstance) {
        if (this.level) {
            this.level.destroy();
        }

        this.level = newLevelInstance;
        this.addChild(this.level);

        // Change music based on the level
        if (newLevelInstance instanceof CaveLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.evilMusic));
        } else if (newLevelInstance instanceof OutdoorLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.calmMusic));
        }
        else if (newLevelInstance instanceof TownLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.happyMusic));
        }
        else if (newLevelInstance instanceof TownLevel2) {
            this.musicManager.playTrack(new Audio(resources.toLoad.uneasyMusic));
        }
    }

    drawBackground(ctx){
        this.level?.background.drawImage(ctx,0,0);
    }

    drawObjects(ctx){
        this.children.forEach(child => {
            if(child.drawLayer !== "HUD"){
                child.draw(ctx,0,0);
            }
        })
    }

    drawForeground(ctx){
        this.children.forEach(child => {
            if(child.drawLayer === "HUD"){
                child.draw(ctx,0,0);
            }
        })

        if(this.level instanceof TownLevel2){
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(320,0);
            ctx.lineTo(320,180);
            ctx.lineTo(0,180);
            ctx.lineTo(0,0);
            ctx.arc(160, 85, 50, 0, Math.PI * 2, true); // Outer circle
            ctx.fillStyle = "rgb(0 0 0 / 100%)";
            ctx.fill();

            ctx.arc(160, 85, 50, 0, Math.PI * 2, true); 
            ctx.fillStyle = "rgb(0 0 0 / 50%)";
            ctx.fill();
        }
    }
}