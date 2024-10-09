import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Rod extends GameObject{
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        })
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5) 
        })
        this.addChild(sprite);
    }

    ready(){
        events.on("HERO_POSITION", this, pos => {

            // detect overlap
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);

            if(roundedHeroX === this.position.x && roundedHeroY === this.position.y){
                this.onCollideWithHero();
            }
        })
    }

    onCollideWithHero(){
        // remove this instance from the scene
        this.destroy();

        // Alert other modules that we picked up Rod
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position,
        })
    }
}