import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class TextBox extends GameObject{
    constructor(){
        super({
            position: new Vector2(32,112)
        });
        this.content = "Hello, World! Hello2, World2! Hellooo";
        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64),
        })
    }
    drawImage(ctx, drawPosX, drawPosY){
        // Draw backdrop first
        this.backdrop.drawImage(ctx, drawPosX, drawPosY);

        // Draw Text after backdrop
        ctx.font = "12px fontRetroGaming";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#fff";


        const MAX_WIDTH = 250;
        const LINE_HEIGHT = 20;
        const PADDING_LEFT = 10;
        const PADDING_TOP = 12;

        let words = this.content.split(" ");
        let line = "";

        for(let n = 0; n<words.length; n++){
            let testline = line + words[n] + " ";
            let metrics = ctx.measureText(testline);
            let testWidth = metrics.width;

            // If testline exceeds the maximum width and its not the first word
            if(testWidth > MAX_WIDTH && n > 0){
                ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY+PADDING_TOP);
                // Reset the line to start with the current word
                line = words[n] + " ";
                // Move our cursor downwards to next line
                drawPosY += LINE_HEIGHT;
            }
            else{
                line = testline;
            }
        }
        ctx.fillText(line, drawPosX+PADDING_LEFT, drawPosY+PADDING_TOP);
    }
}