import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { gridCells } from "../../helpers/grid.js";
import { CaveLevel1 } from "../../levels/CaveLevel1.js";
import { DungeonLevel1 } from "../../levels/DungeonLevel1.js";
import { OutdoorLevel1 } from "../../levels/OutdoorLevel1.js";
import { RoomLevel1 } from "../../levels/RoomLevel1.js";
import { RoomLevel2 } from "../../levels/RoomLevel2.js";
import { Void } from "../../levels/Void.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { storyFlags } from "../../StoryFlags.js";
import { Vector2 } from "../../Vector2.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { RoomLevel_pink } from "../../levels/RoomLevel_pink.js";
import { RoomLevel_grey } from "../../levels/RoomLevel_grey.js";
import { RoomLevel_brown } from "../../levels/RoomLevel_brown.js";
import { RoomLevel_purple } from "../../levels/RoomLevel_purple.js";
import { RoomLevel_yellow } from "../../levels/RoomLevel_yellow.js";

export class BrownDoor extends GameObject{
    constructor(x,y,location={}){ // location needs to have location and heroPosition
        super({
            position: new Vector2(x,y),
        });
        const sprite = new Sprite({
            resource: resources.images.brownDoor,
            frameSize: new Vector2(16,32),
            position: new Vector2(0,-16),
        })
        this.addChild(sprite)

        this.isSolid = true;
        //this.drawLayer = "FLOOR";

        // location it leads to
        this.location = location.location;
        this.heroPosition = location.heroPosition ?? new Vector2(gridCells(2),gridCells(2));

        this.content = {
            string: "I need a key to open this particular door."
        };
    }

    changeLocationBrownDoor(mainScene){
        switch(this.location){
            case 'RoomLevel1':
                events.emit("CHANGE_LEVEL", new RoomLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel_pink':
                events.emit("CHANGE_LEVEL", new RoomLevel_pink({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel_grey':
                events.emit("CHANGE_LEVEL", new RoomLevel_grey({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel_brown':
                events.emit("CHANGE_LEVEL", new RoomLevel_brown({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel_purple':
                events.emit("CHANGE_LEVEL", new RoomLevel_purple({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel_yellow':
                events.emit("CHANGE_LEVEL", new RoomLevel_yellow({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel2':
                events.emit("CHANGE_LEVEL", new RoomLevel2({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'TownLevel1': 
                events.emit("CHANGE_LEVEL", new TownLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'DungeonLevel1':
                // check for story flag "KEY_FOUND"
                if(storyFlags.flags.has("FOUND_KEY")){
                    events.emit("CHANGE_LEVEL", new DungeonLevel1({
                        heroPosition: this.heroPosition,
                    }));
                }
                else{
                    // Show the textbox
                    const textbox = new SpriteTextString({
                        string: this.content.string,
                    });
                    mainScene.addChild(textbox);
                    events.emit("START_TEXT_BOX");

                    // Unsubscribe from this textbox after its destroyed
                    const endingSub = events.on("END_TEXT_BOX", this, () => {
                        textbox.destroy();
                        events.off(endingSub);
                    })
                }
                break;
        }
    }
}