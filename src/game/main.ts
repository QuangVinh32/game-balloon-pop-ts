//  Find out more information about the Game Config at:

import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import LoadingScene from "./scenes/LoadingScene";
import LevelScene from "./scenes/LevelScene";
import { ResultScene } from "./scenes/ResultScene";
import { GamePlayScene } from "./scenes/GamePlayScene";
import UIScene from "./scenes/UIScene";
import { QuestionScene } from "./scenes/QuestionScene";
import { ContinueScene } from "./scenes/ContinueScene";


//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 630,
    height: 650,
    parent: 'phaser-example',
    backgroundColor: '#FFFFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
            width: 630, 
            height: 650, 
        },
        min: {
            width: 230, 
            height: 240,
        }
    },

    pixelArt: false, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            // debug: true,
            // debugShowVelocity: false
        }
    },
    scene: [
        Boot,
        LoadingScene,
        LevelScene,
        GamePlayScene,
        UIScene,
        QuestionScene,
        ResultScene,
        ContinueScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
