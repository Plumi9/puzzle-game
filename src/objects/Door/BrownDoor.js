import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { gridCells } from "../../helpers/grid.js";
import { CaveLevel1 } from "../../levels/CaveLevel1.js";
import { OutdoorLevel1 } from "../../levels/OutdoorLevel1.js";
import { RoomLevel1 } from "../../levels/RoomLevel1.js";
import { TestLevel } from "../../levels/testlevel.js";
import { TitleScreen } from "../../levels/TitleScreen.js";
import { TownLevel1 } from "../../levels/TownLevel1.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

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

        // Opt into being solid
        this.isSolid = true;
        
        // location it leads to
        this.location = location.location;
        this.heroPosition = location.heroPosition ?? new Vector2(gridCells(2),gridCells(2));

        this.drawLayer = "FLOOR";
    }

    changeLocationRoom(){
        switch(this.location){
            case 'CaveLevel1':
                events.emit("CHANGE_LEVEL", new CaveLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'OutdoorLevel1':
                events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'RoomLevel1':
                events.emit("CHANGE_LEVEL", new RoomLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'TestLevel':
                events.emit("CHANGE_LEVEL", new TestLevel({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'TitleScreen': 
                events.emit("CHANGE_LEVEL", new TitleScreen({
                    heroPosition: this.heroPosition,
                }));
                break;
            case 'TownLevel1': 
                events.emit("CHANGE_LEVEL", new TownLevel1({
                    heroPosition: this.heroPosition,
                }));
                break;
        }
    }
}