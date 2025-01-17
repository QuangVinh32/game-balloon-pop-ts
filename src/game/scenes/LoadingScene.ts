export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.spritesheet('loading', 'assets/images/loader_spritesheet.png', {
            frameWidth: 64,  
            frameHeight: 64,
            endFrame: 9
        });
    }
    
    create() {

        this.add.text(this.scale.width / 2 , this.scale.height / 2 - 80, 'Balloon Pop', {
            fontSize: '30px Arial',
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.add.text(this.scale.width / 2 , this.scale.height / 2 + 65, 'LOADING', {
            fontSize: '15px Arial',
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.anims.create({
            key: 'falling',     
            frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 9 }),
            frameRate: 10,        
            repeat: -1         
        });

        const loading = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'loading');
        loading.play('falling');

        this.cameras.main.once('camerafadeoutcomplete', () => {
            // this.scene.launch('UIScene');
            // this.scene.launch('GamePlayScene');
            this.scene.start('LevelScene')
            // this.scene.start('ResultScene')
            // this.scene.launch('QuestionScene')
            // this.scene.launch('ContinueScene')


            

        });

        this.cameras.main.fadeOut(1000); 
    }

    update() {
    }
}
