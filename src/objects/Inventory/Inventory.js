import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Inventory extends GameObject{
    constructor(){
        super({
            position: new Vector2(0, 1)
        });

        this.drawLayer = "HUD";
        
        this.nextId = 0;
        this.items = [];
        // react to player picking up an item
        events.on("HERO_PICKS_UP_ITEM", this, data => {
            const item_image = data.image
            this.nextId += 1;
            this.items.push({
                id: this.nextId,
                //image: resources.images.rod,
                image: item_image,
            })
            this.renderInventory();
        })

        this.renderInventory();
    }

    renderInventory(){

        // remove drawings if needed
        this.children.forEach(child => child.destroy())

        // draw fresh from the latest version of the list
        this.items.forEach((item,index) => {
            const sprite = new Sprite({
                resource: item.image,
                position: new Vector2(index*12, 0),
            })
            this.addChild(sprite)
        })
    }

    removeFromInventory(id){
        this.items = this.items.filter(item => item.id !== id);
        this.renderInventory();
    }
}