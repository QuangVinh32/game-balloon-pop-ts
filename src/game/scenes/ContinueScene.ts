export class ContinueScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private totalScore: number;

    constructor() {
        super('ContinueScene');
        this.totalScore = 0; 
    }

    init(data:{totalScore: number}) {
        this.totalScore = data.totalScore;
        console.log("re-score",data.totalScore)
    }

    preload() {
        this.load.image('button', 'assets/images/button.png');
        this.load.audio('sound_initial','assets/audio/sound_initial.mp3')

    }

    create() {

        this.buttonSound = this.sound.add('sound_initial', {
            volume: 1,
        });
        
        this.add.text(this.scale.width / 2, 470, `Great Job! Your total score is ${this.totalScore}`, {
            fontSize: '20px Arial',
            color: 'black',
            fontStyle:"bold"
        }).setOrigin(0.5).setResolution(2);

        this.add.text(this.scale.width / 2, 490, `Play until one column is full. Select "Start" to continue.`, {
            fontSize: '12px Arial',
            color: 'black',
            fontStyle:"bold"
        }).setOrigin(0.5).setResolution(2);

        const UI_PERCENT = {
            BUTTON_X: 0.5,
            BUTTON_Y: 0.75,
            BUTTON_SCALE: 0.2
        };
    
        let buttonStart = this.add.image(0, 0, "button").setDisplaySize(
            this.scale.width * UI_PERCENT.BUTTON_SCALE, 
            this.scale.width * UI_PERCENT.BUTTON_SCALE
            );

        let startText = this.add.text(0, 0, "Start", {
            fontSize: "33px Arial",
            fontStyle: "bold",
            color: "black",
        }).setOrigin(0.5, 0.5).setResolution(2);
    
        let buttonContainer = this.add.container(
            this.scale.width / 2,
            570,
            [buttonStart, startText]);
    
        buttonContainer.setSize(
            this.scale.width * UI_PERCENT.BUTTON_SCALE, 
            this.scale.width * UI_PERCENT.BUTTON_SCALE
            ).setInteractive();
    
        buttonContainer.on("pointerup", () => {
            this.buttonSound?.play();
            this.tweens.add({
                targets: buttonContainer,
                scale: { from: 1, to: 1.1 }, 
                duration: 300,
                yoyo: true,                 
                ease: "Sine.easeInOut",    
                onComplete: () => {
                    this.scene.stop('ResultScene')
                    this.scene.start('LevelScene')
                  
                },
            });
        });



    }
}