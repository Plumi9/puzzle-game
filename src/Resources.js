class Resources{
    constructor(){
        // Everything we plan to download
        this.toLoad = {
            // Hero
            hero: "./sprites/hero-sheet.png",
            shadow: "./sprites/shadow.png",

            // Transition points
            exit: "./sprites/exit.png",
            greenDoor: "./sprites/green-door.png",
            brownDoor: "./sprites/brown-door.png",
            outdoorEntrance: "./sprites/OutdoorEntrance.png",
            bluePortal: "./sprites/bluePortal.png",
            woodsEntrance: "./sprites/woodsEntrance.png",

            // Maps
            black: "./sprites/black.png",
            titlescreen: "./sprites/titlescreen.png",
            
            sky: "./sprites/sky.png",
            ground: "./sprites/ground.png",

            cave: "./sprites/cave.png",
            caveGround: "./sprites/cave-ground.png",

            townGround: "./sprites/town-ground.png",

            room: "./sprites/room.png",
            room2: "./sprites/room2.png",

            dungeonGround: "./sprites/dungeon.png",

            woodsGround: "./sprites/woods.png",

            // Items
            rod: "./sprites/rod.png",
            shovel: "./sprites/shovel.png",
            key: "./sprites/key.png",

            // Interactive Props
            fireplace_on: "./sprites/fireplace_on.png",
            fireplace_off: "./sprites/fireplace_off.png",
            emptyPotion: "./sprites/emptyPotion.png",
            chest: "./sprites/chest.png",
            mound: "./sprites/mound.png",
            
            scroll: "./sprites/scroll.png",
            scrollZoom: "./sprites/scrollZoom.png",

            paper: "./sprites/paper.png",
            paperZoom: "./sprites/paperZoom.png",
            
            sword: "./sprites/sword.png",
            ring: "./sprites/ring.png",
            necklace: "./sprites/necklace.png",
            pouch: "./sprites/pouch.png",
            book: "./sprites/book.png",


            // NPCs
            knight: "./sprites/knight-sheet-1.png",

            npc1: "./sprites/characters/char_01.png",
            npc2: "./sprites/characters/char_02.png",
            npc3: "./sprites/characters/char_03.png",
            npc4: "./sprites/characters/char_04.png",
            npc5: "./sprites/characters/char_05.png",
            npc6: "./sprites/characters/char_06.png",
            npc7: "./sprites/characters/char_07.png",
            npc8: "./sprites/characters/char_08.png",
            npc9: "./sprites/characters/char_09.png",
            npc10: "./sprites/characters/char_10.png",
            npc11: "./sprites/characters/char_11.png",
            npc12: "./sprites/characters/char_12.png",
            npc13: "./sprites/characters/char_13.png",
            npc14: "./sprites/characters/char_14.png",
            npc15: "./sprites/characters/char_15.png",
            npc16: "./sprites/characters/char_16.png",
            npc17: "./sprites/characters/char_17.png",
            npc18: "./sprites/characters/char_18.png",
            npc19: "./sprites/characters/char_19.png",
            npc20: "./sprites/characters/char_20.png",
            npc21: "./sprites/characters/char_21.png",
            npc22: "./sprites/characters/char_22.png",
            npc23: "./sprites/characters/char_23.png",
            npc24: "./sprites/characters/char_24.png",
            npc25: "./sprites/characters/char_25.png",
            npc26: "./sprites/characters/char_26.png",
            npc27: "./sprites/characters/char_27.png",
            npc28: "./sprites/characters/char_28.png",
            npc29: "./sprites/characters/char_29.png",
            npc30: "./sprites/characters/char_30.png",
            npc31: "./sprites/characters/char_31.png",
            npc32: "./sprites/characters/char_32.png",
            npc33: "./sprites/characters/char_33.png",
            npc34: "./sprites/characters/char_34.png",
            npc35: "./sprites/characters/char_35.png",
            npc36: "./sprites/characters/char_36.png",
            npc37: "./sprites/characters/char_37.png",
            npc38: "./sprites/characters/char_38.png",
            npc39: "./sprites/characters/char_39.png",
            npc40: "./sprites/characters/char_40.png",
            npc41: "./sprites/characters/char_41.png",
            npc42: "./sprites/characters/char_42.png",
            npc43: "./sprites/characters/char_43.png",
            npc44: "./sprites/characters/char_44.png",
            npc45: "./sprites/characters/char_45.png",
            npc46: "./sprites/characters/char_46.png",
            npc47: "./sprites/characters/char_47.png",
            npc48: "./sprites/characters/char_48.png",
            npc49: "./sprites/characters/char_49.png",
            npc50: "./sprites/characters/char_50.png",

            // HUD
            textBox: "./sprites/text-box.png",
            fontWhite: "./sprites/sprite-font-white.png",
            portraits: "./sprites/portraits-sheet.png",

            // Music
            calmMusic: "./music/Calm3.ogg",
            evilMusic: "./music/Evil5.ogg",
            happyMusic: "./music/Happy.mp3",
            uneasyMusic: "./music/Uneasy.mp3",
            mysteriousMusic: "./music/Harp.ogg",
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