class Resources{
    constructor(){
        // Everything we plan to download
        this.toLoad = {
            // Hero
            hero: "./sprites/hero-sheet.png",
            shadow: "./sprites/shadow.png",

            exit: "./sprites/exit.png",

            // Maps
            sky: "./sprites/sky.png",
            ground: "./sprites/ground.png",

            cave: "./sprites/cave.png",
            caveGround: "./sprites/cave-ground.png",

            // Items
            rod: "./sprites/rod.png",
            shovel:"./sprites/shovel.png",

            // NPCs
            knight: "./sprites/knight-sheet-1.png",

            // HUD
            textBox: "./sprites/text-box.png",
            fontWhite: "./sprites/sprite-font-white.png",
            portraits: "./sprites/portraits-sheet.png",

            // Music
            calmMusic: "./music/Calm3.ogg",
            evilMusic: "./music/Evil5.ogg",
        };

        // A bucket to keep all images
        this.images = {}

        // Load each image
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();