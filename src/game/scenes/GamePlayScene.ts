export class GamePlayScene extends Phaser.Scene{
    private buttonSound: Phaser.Sound.BaseSound | null = null;

    constructor(){
        super('GamePlayScene')
    }

    init(){

    }

    preload(){
        this.load.image('button_start','assets/images/button_start.png')
        this.load.audio('sound_initial','assets/audio/sound_initial.mp3')


    }
    
    create() {
        this.buttonSound = this.sound.add('sound_initial', {
            volume: 1,
        });

        this.add.text(
            this.scale.width / 2,
            420,
            'Use the slingshot to pop the ballons.', {
            fontSize: '20px Arial',
            fontStyle: 'bold',
            color: 'black',
        }).setOrigin(0.5, 0).setResolution(2);
        
        this.add.text(
            this.scale.width / 2,
            445,
            "Select 'Start' to play.", {
            fontSize: '13px Arial',
            color: 'black',
        }).setOrigin(0.5, 0).setResolution(2); 
        
        let buttonStart = this.add.image(0, 0, 'button_start').setDisplaySize(
            125,
            125
            );

        let startText = this.add.text(0, 0, 'Start', {
            fontSize: '30px Arial',
            fontStyle: 'bold',
            color: 'black',
        }).setOrigin(0.5, 0.5).setResolution(2); 
    
        let buttonContainer = this.add.container(
            this.scale.width / 2,
            530,
            [buttonStart, startText]);
    
        buttonContainer.setSize(
            100,
            100
            ).setInteractive();
    
        buttonContainer.on('pointerup', () => {
            if (this.buttonSound) {
                this.buttonSound.play();
            }
    
            this.tweens.add({
                targets: buttonContainer,
                scale: { from: 1, to: 1.05 }, 
                duration: 300,
                yoyo: true,                 
                ease: 'Sine.easeInOut',    
                onComplete: () => {
                    this.scene.stop('GamePlayScene');
 
                },
            });
        });
    }   
}