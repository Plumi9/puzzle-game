import { Level } from "../objects/Level/Level.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Vector2 } from "../Vector2.js";
import { gridCells } from "../helpers/grid.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../Resources.js";
import { Npc1  } from "../objects/NPC/Npc1.js";
import { Npc2  } from "../objects/NPC/Npc2.js";
import { Npc3  } from "../objects/NPC/Npc3.js";
import { Npc4  } from "../objects/NPC/Npc4.js";
import { Npc5  } from "../objects/NPC/Npc5.js";
import { Npc6  } from "../objects/NPC/Npc6.js";
import { Npc7  } from "../objects/NPC/Npc7.js";
import { Npc8  } from "../objects/NPC/Npc8.js";
import { Npc9  } from "../objects/NPC/Npc9.js";
import { Npc10 } from "../objects/NPC/Npc10.js";
import { Npc11 } from "../objects/NPC/Npc11.js";
import { Npc12 } from "../objects/NPC/Npc12.js";
import { Npc13 } from "../objects/NPC/Npc13.js";
import { Npc14 } from "../objects/NPC/Npc14.js";
import { Npc15 } from "../objects/NPC/Npc15.js";
import { Npc16 } from "../objects/NPC/Npc16.js";
import { Npc17 } from "../objects/NPC/Npc17.js";
import { Npc18 } from "../objects/NPC/Npc18.js";
import { Npc19 } from "../objects/NPC/Npc19.js";
import { Npc20 } from "../objects/NPC/Npc20.js";
import { Npc21 } from "../objects/NPC/Npc21.js";
import { Npc22 } from "../objects/NPC/Npc22.js";
import { Npc23 } from "../objects/NPC/Npc23.js";
import { Npc24 } from "../objects/NPC/Npc24.js";
import { Npc25 } from "../objects/NPC/Npc25.js";
import { Npc26 } from "../objects/NPC/Npc26.js";
import { Npc27 } from "../objects/NPC/Npc27.js";
import { Npc28 } from "../objects/NPC/Npc28.js";
import { Npc29 } from "../objects/NPC/Npc29.js";
import { Npc30 } from "../objects/NPC/Npc30.js";
import { Npc31 } from "../objects/NPC/Npc31.js";
import { Npc32 } from "../objects/NPC/Npc32.js";
import { Npc33 } from "../objects/NPC/Npc33.js";
import { Npc34 } from "../objects/NPC/Npc34.js";
import { Npc35 } from "../objects/NPC/Npc35.js";
import { Npc36 } from "../objects/NPC/Npc36.js";
import { Npc37 } from "../objects/NPC/Npc37.js";
import { Npc38 } from "../objects/NPC/Npc38.js";
import { Npc39 } from "../objects/NPC/Npc39.js";
import { Npc40 } from "../objects/NPC/Npc40.js";
import { Npc41 } from "../objects/NPC/Npc41.js";
import { Npc42 } from "../objects/NPC/Npc42.js";
import { Npc43 } from "../objects/NPC/Npc43.js";
import { Npc44 } from "../objects/NPC/Npc44.js";
import { Npc45 } from "../objects/NPC/Npc45.js";
import { Npc46 } from "../objects/NPC/Npc46.js";
import { Npc47 } from "../objects/NPC/Npc47.js";
import { Npc48 } from "../objects/NPC/Npc48.js";
import { Npc49 } from "../objects/NPC/Npc49.js";
import { Npc50 } from "../objects/NPC/Npc50.js";
import { Chest } from "../objects/Chest/Chest.js";
import { EmptyPotion } from "../objects/Potion/emptyPotion.js";
import { Sword } from "../objects/Sword/sword.js";
import { Paper } from "../objects/Paper/Paper.js";
import { Ring } from "../objects/Ring/Ring.js";
import { Necklace } from "../objects/Necklace/Necklace.js";
import { Scroll } from "../objects/Scroll/Scroll.js";
import { Mound } from "../objects/Mound/Mound.js";
import { Pouch } from "../objects/Pouch/Pouch.js";
import { Book } from "../objects/Book/Book.js";
import { Key } from "../objects/Key/Key.js";
import { Fireplace } from "../objects/Fireplace/Fireplace.js";
import { Bed } from "../objects/Bed/Bed.js";
import { BluePortal } from "../objects/Door/BluePortal.js";
import { TALKED_TO_A, TALKED_TO_B, TALKED_TO_GIRL, TALKED_TO_HEALER, TALKED_TO_HUNTER, TALKED_TO_KNIGHT, TALKED_TO_NINJA, TALKED_TO_WIZARD } from "../StoryFlags.js";
import { BrownDoor } from "../objects/Door/BrownDoor.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(0), gridCells(7));

export class TestLevel extends Level{
    constructor(params={}){
        super({});
        this.background = new Sprite({
            resource: resources.images.black,
            frameSize: new Vector2(320, 180),
        })

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        const brownDoor_DungeonLevel1 = new BrownDoor(gridCells(0), gridCells(6), {
            location: "DungeonLevel1",
            heroPosition: new Vector2(gridCells(2),gridCells(3)),
        });
        this.addChild(brownDoor_DungeonLevel1);

        const chest = new Chest(gridCells(0),gridCells(-1));
        this.addChild(chest);
        
        const emptyPotion = new EmptyPotion(gridCells(-1),gridCells(-1));
        this.addChild(emptyPotion);

        const sword = new Sword(gridCells(-2),gridCells(-1));
        this.addChild(sword)

        const paper = new Paper(gridCells(-3),gridCells(-1));
        this.addChild(paper)

        const ring = new Ring(gridCells(-4),gridCells(-1));
        this.addChild(ring);

        const necklace = new Necklace(gridCells(-5),gridCells(-1));
        this.addChild(necklace);

        const scroll = new Scroll(gridCells(-6),gridCells(-1));
        this.addChild(scroll);

        const mound = new Mound(gridCells(-7),gridCells(-1))
        this.addChild(mound);

        const pouch = new Pouch(gridCells(-8),gridCells(-1))
        this.addChild(pouch);

        const book = new Book(gridCells(-9),gridCells(-1))
        this.addChild(book);

        const key = new Key(gridCells(-10),gridCells(-1))
        this.addChild(key);

        const fireplace = new Fireplace(gridCells(-11),gridCells(-1));
        this.addChild(fireplace);

        const bed = new Bed(gridCells(1), gridCells(-2));
        this.addChild(bed)

        const bluePortal = new BluePortal(gridCells(5), gridCells(-1));
        this.addChild(bluePortal);

        // const npc_chosen1 = new Npc1(gridCells(1), gridCells(8));
        // this.addChild(npc_chosen1);

        const girl = new Npc1(gridCells(1), gridCells(8),{
            content: [
                {
                    string: "Hey there! I am Lila! If you are new to Midvale, I can show you around. Just be careful, not everyone here is as friendly as they seem! dsajd dsadas dsad dsa",
                    requires: [],
                    bypass: [TALKED_TO_GIRL],
                    addsFlag: TALKED_TO_GIRL,
                },
                {
                    string: "I love this town, but sometimes it feels like everyone has secrets. I just wish people would be honest with each other.",
                    requires: [],
                    bypass: ["TALKED_TO_GIRL2"],
                    addsFlag: "TALKED_TO_GIRL2",
                },
                {
                    string: "33333",
                    requires: ["TALKED_TO_GIRL2"],
                    bypass: [],
                },
            ],
            portraitFrame: 2,
        });
        this.addChild(girl);

        const npc_chosen2 = new Npc10(gridCells(2), gridCells(8));
        this.addChild(npc_chosen2);
        const npc_chosen3 = new Npc11(gridCells(3), gridCells(8));
        this.addChild(npc_chosen3);
        const npc_chosen4 = new Npc20(gridCells(4), gridCells(8));
        this.addChild(npc_chosen4);
        const npc_chosen5 = new Npc26(gridCells(5), gridCells(8));
        this.addChild(npc_chosen5);
        const npc_chosen6 = new Npc19(gridCells(6), gridCells(8));
        this.addChild(npc_chosen6);


        const npc1 = new Npc1(gridCells(1), gridCells(3));
        this.addChild(npc1);

        const npc2 = new Npc2(gridCells(2), gridCells(3));
        this.addChild(npc2);

        const npc3 = new Npc3(gridCells(3), gridCells(3));
        this.addChild(npc3);

        const npc4 = new Npc4(gridCells(4), gridCells(3));
        this.addChild(npc4);

        const npc5 = new Npc5(gridCells(5), gridCells(3));
        this.addChild(npc5);

        const npc6 = new Npc6(gridCells(6), gridCells(3));
        this.addChild(npc6);

        const npc7 = new Npc7(gridCells(7), gridCells(3));
        this.addChild(npc7);

        const npc8 = new Npc8(gridCells(8), gridCells(3));
        this.addChild(npc8);

        const npc9 = new Npc9(gridCells(9), gridCells(3));
        this.addChild(npc9);

        const npc10 = new Npc10(gridCells(10), gridCells(3));
        this.addChild(npc10);

        const npc11 = new Npc11(gridCells(11), gridCells(3));
        this.addChild(npc11);

        const npc12 = new Npc12(gridCells(12), gridCells(3));
        this.addChild(npc12);

        const npc13 = new Npc13(gridCells(13), gridCells(3));
        this.addChild(npc13);

        const npc14 = new Npc14(gridCells(14), gridCells(3));
        this.addChild(npc14);

        const npc15 = new Npc15(gridCells(15), gridCells(3));
        this.addChild(npc15);

        const npc16 = new Npc16(gridCells(16), gridCells(3));
        this.addChild(npc16);

        const npc17 = new Npc17(gridCells(1), gridCells(4));
        this.addChild(npc17);

        const npc18 = new Npc18(gridCells(2), gridCells(4));
        this.addChild(npc18);

        const npc19 = new Npc19(gridCells(3), gridCells(4));
        this.addChild(npc19);

        const npc20 = new Npc20(gridCells(4), gridCells(4));
        this.addChild(npc20);

        const npc21 = new Npc21(gridCells(5), gridCells(4));
        this.addChild(npc21);

        const npc22 = new Npc22(gridCells(6), gridCells(4));
        this.addChild(npc22);

        const npc23 = new Npc23(gridCells(7), gridCells(4));
        this.addChild(npc23);

        const npc24 = new Npc24(gridCells(8), gridCells(4));
        this.addChild(npc24);

        const npc25 = new Npc25(gridCells(9), gridCells(4));
        this.addChild(npc25);

        const npc26 = new Npc26(gridCells(10), gridCells(4));
        this.addChild(npc26);

        const npc27 = new Npc27(gridCells(11), gridCells(4));
        this.addChild(npc27);

        const npc28 = new Npc28(gridCells(12), gridCells(4));
        this.addChild(npc28);

        const npc29 = new Npc29(gridCells(13), gridCells(4));
        this.addChild(npc29);

        const npc30 = new Npc30(gridCells(14), gridCells(4));
        this.addChild(npc30);

        const npc31 = new Npc31(gridCells(15), gridCells(4));
        this.addChild(npc31);

        const npc32 = new Npc32(gridCells(16), gridCells(4));
        this.addChild(npc32);

        const npc33 = new Npc33(gridCells(1), gridCells(5));
        this.addChild(npc33);

        const npc34 = new Npc34(gridCells(2), gridCells(5));
        this.addChild(npc34);

        const npc35 = new Npc35(gridCells(3), gridCells(5));
        this.addChild(npc35);

        const npc36 = new Npc36(gridCells(4), gridCells(5));
        this.addChild(npc36);

        const npc37 = new Npc37(gridCells(5), gridCells(5));
        this.addChild(npc37);

        const npc38 = new Npc38(gridCells(6), gridCells(5));
        this.addChild(npc38);

        const npc39 = new Npc39(gridCells(7), gridCells(5));
        this.addChild(npc39);

        const npc40 = new Npc40(gridCells(8), gridCells(5));
        this.addChild(npc40);

        const npc41 = new Npc41(gridCells(9), gridCells(5));
        this.addChild(npc41);

        const npc42 = new Npc42(gridCells(10), gridCells(5));
        this.addChild(npc42);

        const npc43 = new Npc43(gridCells(11), gridCells(5));
        this.addChild(npc43);

        const npc44 = new Npc44(gridCells(12), gridCells(5));
        this.addChild(npc44);

        const npc45 = new Npc45(gridCells(13), gridCells(5));
        this.addChild(npc45);

        const npc46 = new Npc46(gridCells(14), gridCells(5));
        this.addChild(npc46);

        const npc47 = new Npc47(gridCells(15), gridCells(5));
        this.addChild(npc47);

        const npc48 = new Npc48(gridCells(16), gridCells(5));
        this.addChild(npc48);

        const npc49 = new Npc49(gridCells(1), gridCells(6));
        this.addChild(npc49);

        const npc50 = new Npc50(gridCells(2), gridCells(6));
        this.addChild(npc50);

        this.walls = new Set();
    }
}