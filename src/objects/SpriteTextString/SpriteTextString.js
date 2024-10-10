import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { getCharacterFrame, getCharacterWidth } from "./SpriteFontMap.js";

export class SpriteTextString extends GameObject{
    constructor(str){
        super({
            position: new Vector2(32,108),
        });
        
        this.drawLayer = "HUD";

        const content = str ?? "Default text.";

        // Create an array of words (because of line wrapping)
        this.words = content.split(" ").map(word => {
            // We need to know how the words are
            let wordWidth = 0;

            // Get width of each character in the word
            const chars = word.split("").map(char => {
                const charWidth = getCharacterWidth(char);
                wordWidth += charWidth;
                return {

                    // Also create a Sprite for each character in the word
                    width: charWidth,
                    sprite: new Sprite({
                        resource: resources.images.fontWhite,
                        hFrames: 13,
                        vFrames: 6,
                        frame:getCharacterFrame(char),
                    })
                }
            })
            return {
                wordWidth,
                chars
            }
        });

        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64),
        })

        // Typewriter
        this.showingIndex = 0;
        this.textSpeed = 40; // Smaller number means faster Speed
        this.timeUntilNextShow = this.textSpeed;
    }

    step(delta){
        this.timeUntilNextShow -= delta;
        if(this.timeUntilNextShow <= 0){
            // Increase amount of characters that are drawn
            this.showingIndex += 1;

            // Reset time counter for next character
            this.timeUntilNextShow = this.textSpeed;
        }
    }

    drawImage(ctx, drawPosX, drawPosY){
        // Draw the backdrop
        this.backdrop.drawImage(ctx, drawPosX, drawPosY);

        // Configuration options
        const PADDING_LEFT = 7;
        const PADDING_TOP = 7;
        const LINE_WIDTH_MAX = 240;
        const LINE_VERTICAL_HEIGHT = 14;

        // Initial position of cursor
        let cursorX = drawPosX + PADDING_LEFT;
        let cursorY = drawPosY + PADDING_TOP;
        let currentShowingIndex = 0;
        
        this.words.forEach(word => {

            // Decide if we can fit this next word on this next line
            const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
            if (spaceRemaining < word.wordWidth) {
                cursorX = drawPosX + PADDING_LEFT
                cursorY += LINE_VERTICAL_HEIGHT;
            }
        
            // Draw this whole segment of text
            word.chars.forEach(char => {
        
              // Stop here if we should not yet show the following characters
                if (currentShowingIndex > this.showingIndex) {
                return;
                }
        
                const {sprite, width} = char;
        
                const withCharOffset = cursorX - 5;
                sprite.draw(ctx, withCharOffset, cursorY)

              // Add width of the character we just printed to cursor pos
                cursorX += width;

              // plus 1px between character
                cursorX += 1;

              // Uptick the index we are counting
                currentShowingIndex += 1;
            })

        // Move the cursor over
        cursorX += 3;
        })
    }
}