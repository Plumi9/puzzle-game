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
import { TownLevel_night } from "../../levels/TownLevel_night.js";
import { RoomLevel1 } from "../../levels/RoomLevel1.js";
import { Scrollzoom } from "../Scroll/ScrollZoom.js";
import { Vector2 } from "../../Vector2.js";
import { Paperzoom } from "../Paper/Paperzoom.js";

export class Main extends GameObject{
    constructor(){
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
        this.musicManager = new MusicManager();
        this.isZoomedIn = false; // Track scroll zoom state
    }
    ready(){
        const inventory = new Inventory();
        this.addChild(inventory);

        // Scroll zoom in logic
        events.on("TOGGLE_ZOOM", this, () => {
            if (this.isZoomedIn){
                this.isZoomedIn = false;
                // Remove the scroll zoom from the display
                const scrollInstance = this.children.find(
                    (child) => child instanceof Scrollzoom
                );
                scrollInstance?.destroy();
                const paperInstance = this.children.find(
                    (child) => child instanceof Paperzoom
                );
                paperInstance?.destroy();
                events.emit("END_TEXT_BOX"); // Unlock player movement
            }
        });

        // Change Level handlers
        events.on("CHANGE_LEVEL", this, newLevelInstance => {
            this.setLevel(newLevelInstance);
        })

        events.on("HERO_REQUESTS_INTERACTION",this,(withObject) => {
            console.log(withObject.constructor.name);

            switch(withObject.constructor.name){
                case "Bed":
                    withObject.interactBed(this);
                    break;
            }
        })

        // TODO: Change to HERO_REQUESTS_INSPECTION and sort
        // Launch textbox/teleport handler
        events.on("HERO_REQUESTS_ACTION",this, (withObject) => {
            console.log(withObject.constructor.name);

            // TEXTBOX HANDLER
            if(typeof withObject.getContent === "function"){
                const content = withObject.getContent();

                if(!content){
                    return;
                }

                // Potentially add a story flag
                if(content.addsFlag){
                    storyFlags.add(content.addsFlag);
                }
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
            if(typeof withObject.getDialog === "function"){
                withObject.getDialog(this);
            }
            // Door handler
            // TODO: CHANGE TO SWITCH STATEMENT
            if(typeof withObject.changeLocationBrownDoor === "function"){
                withObject.changeLocationBrownDoor(this);
            }
            if(typeof withObject.changeLocationOutdoorEntrance === "function"){
                withObject.changeLocationOutdoorEntrance();
            }
            if(typeof withObject.changeLocationPortal === "function"){
                withObject.changeLocationPortal();
            }
            if(typeof withObject.changeLocationGreenDoor === "function"){
                withObject.changeLocationGreenDoor();
            }
            if(typeof withObject.changeLocationWoodsEntrance === "function"){
                withObject.changeLocationWoodsEntrance();
            }

            // Props Handler
            switch(withObject.constructor.name){
                case "Crowbar":
                    withObject.interactCrowbar(this);
                    break;
                case "Chest":
                    withObject.interactChest(this,withObject);
                    break;
                case "PurpleChest":
                    withObject.interactPurpleChest(this,withObject);
                    break;
                case "EmptyPotion":
                    withObject.interactPotion(this);
                    break;
                case "Sword": 
                    withObject.interactSword(this);
                    break;
                case "Paper": 
                    if (!this.isZoomedIn) {
                        this.isZoomedIn = true;
                        const paperZoom = new Paperzoom();
                        paperZoom.position = new Vector2(80, 0);
                        this.addChild(paperZoom);
                        events.emit("START_TEXT_BOX");
                    }
                    break;
                case "Ring": 
                    withObject.interactRing(this);
                    break;
                case "Necklace": 
                    withObject.interactNecklace(this);
                    break;
                case "Scroll":
                    if (!this.isZoomedIn) {
                        this.isZoomedIn = true;
                        const scrollZoom = new Scrollzoom();
                        scrollZoom.position = new Vector2(80, 0);
                        this.addChild(scrollZoom);
                        events.emit("START_TEXT_BOX");
                    }
                    break;
                case "Mound": 
                    withObject.interactMound(this);
                    break;
                case "Pouch": 
                    withObject.interactPouch(this);
                    break;
                case "Book": 
                    withObject.interactBook(this);
                    break;
                case "Fireplace": 
                    withObject.interactFireplace(this,withObject);
                    break;
                case "Bed": 
                    withObject.interactBed(this,withObject);
                    break;
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
        } 
        else if (newLevelInstance instanceof OutdoorLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.mysteriousMusic), 0.1);
        }
        else if (newLevelInstance instanceof TownLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.happyMusic));
        }
        else if (newLevelInstance instanceof TownLevel_night) {
            this.musicManager.playTrack(new Audio(resources.toLoad.uneasyMusic));
        }
        else if (newLevelInstance instanceof RoomLevel1) {
            this.musicManager.playTrack(new Audio(resources.toLoad.calmMusic));
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
        // Do this before drawing other in foreground
        // otherwise textbox and HUD items are behind black
        // ctx.beginPath();
        // ctx.moveTo(0,0);
        // ctx.lineTo(320,0);
        // ctx.lineTo(320,180);
        // ctx.lineTo(0,180);
        // ctx.lineTo(0,0);
        // ctx.arc(160, 85, 50, 0, Math.PI * 2, true); // Outer circle
        // ctx.fillStyle = "rgb(0 0 0 / 100%)"; // full black
        // ctx.fill();

        // ctx.arc(160, 85, 50, 0, Math.PI * 2, true); // Inner circle
        // ctx.fillStyle = "rgb(0 0 0 / 50%)"; // Opacity in the middle
        // ctx.fill();

        this.children.forEach(child => {
            if(child.drawLayer === "HUD"){
                child.draw(ctx,0,0);
            }
        })

        // limited view cone
        // if(this.level instanceof TownLevel_night){
        //     ctx.beginPath();
        //     ctx.moveTo(0,0);
        //     ctx.lineTo(320,0);
        //     ctx.lineTo(320,180);
        //     ctx.lineTo(0,180);
        //     ctx.lineTo(0,0);
        //     ctx.arc(160, 85, 50, 0, Math.PI * 2, true); // Outer circle
        //     ctx.fillStyle = "rgb(0 0 0 / 100%)"; // full black
        //     ctx.fill();
    
        //     ctx.arc(160, 85, 50, 0, Math.PI * 2, true); // Inner circle
        //     ctx.fillStyle = "rgb(0 0 0 / 50%)"; // Opacity in the middle
        //     ctx.fill();
        // }
    }
}