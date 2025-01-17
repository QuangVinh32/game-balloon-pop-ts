import { BulletService } from "../services/BulletService";
import FishService from "../services/FishService";
import FishView from "../views/FishView";

export default class LevelScene extends Phaser.Scene {
    private fishService: FishService | null;
    private bulletService: any;
    private bulletView: any;
    private levelId: number;
    private score: number;  
    public popSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    public splashSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 

    constructor() {
        super('LevelScene');
        this.levelId = 1;   
        this.score = 0;

    }

    init(data?: any) {
        this.score = 0;
        console.log("LevelScene initialized with score:", this.score);
    }

    preload() {
        // image
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('gun_body', 'assets/images/gun_body.png');
        this.load.image('ammo_clip','assets/images/ammo_clip.png')

        // ball
        this.load.image('ball_blue', 'assets/images/ball_blue.png'); 
        this.load.image('ball_red', 'assets/images/ball_red.png');
        this.load.image('ball_green', 'assets/images/ball_green.png'); 
        this.load.image('ball_yellow', 'assets/images/ball_yellow.png');
        this.load.image('ball_orange', 'assets/images/ball_orange.png'); 
        this.load.image('ball_pink', 'assets/images/ball_pink.png');

        // fish
        this.load.image('cockle', 'assets/images/cockle.png');
        this.load.image('fish1', 'assets/images/fish1.png');
        this.load.image('fish2', 'assets/images/fish2.png');
        this.load.image('fish3', 'assets/images/fish3.png');
        this.load.image('fish4', 'assets/images/fish4.png');

        // audio
        this.load.audio('sound_pop','assets/audio/sound_pop.mp3');
        this.load.audio('sound_splash','assets/audio/sound_splash.mp3')

    }

    async create() {

        this.popSound = this.sound.add('sound_pop', { volume: 1 });
        this.splashSound = this.sound.add('sound_splash', { volume: 1 });

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

        this.physics.world.setBounds(0,0,this.scale.width, this.scale.height);

        this.bulletService = new BulletService(this, 'assets/data/bullet.json');
        await this.bulletService.initialize(this.levelId);

        const bulletDTO = this.bulletService.getBulletByLevelId(this.levelId);
        if (bulletDTO) {
            this.bulletView = this.bulletService.getBulletViewBylevelId(this.levelId);
            if (this.bulletView) {
                this.bulletView.setScale(0.9);
            } else {
                console.error("BulletView not found for levelId:", this.levelId);
            }
        } else {
            console.error("BulletDTO not found for levelId:", this.levelId);
        }


        this.fishService = new FishService(this, 'assets/data/fish.json');
        await this.fishService.initialize(this.levelId);

        const fishViews = this.fishService.getAllFishViews();
        let remainingFishViews = fishViews.length;
        let remainingBalls = 0;
        fishViews.forEach((fishView: FishView) => {
            const fishBall = fishView.getBall();         

            if (fishBall) {
                remainingBalls++;
                this.physics.add.overlap(this.bulletView.bullet, fishBall, () => {
                    console.log('Collision detected!');
                    this.popSound.play();        
                    fishBall.destroy();
                    remainingBalls--;
            
                    const fishLine = fishView.getLine(); 
                    if (fishLine) {
                        fishLine.setVisible(false);
                    }
            
                    fishView.getFish().setRotation(Phaser.Math.DegToRad(90));  
                    fishView.getFish().setVelocityY(1000);
            
                    this.score += 1;
                    console.log('Score: ' + this.score); 
            
                    if (remainingBalls === 0) {
                        console.log('Hoàn thành');
                        this.scene.launch('QuestionScene', { score: this.score });
                        this.scene.start('ResultScene', { score: this.score });
                    }
            
                },);
            } else {
                console.error("FishView does not have a ball property:", fishView);
            }
            
            fishView.setScale(0.8);
            const randomDuration = Phaser.Math.Between(2000, 7000);
            const randomDelay = Phaser.Math.Between(0, 15000);
            this.tweens.add({
                targets: fishView,
                x: this.scale.width + 100,
                duration: randomDuration, 
                delay: randomDelay, 
                ease: 'Linear',
                onComplete: () => {
                    remainingFishViews--;
                    console.log(`Remaining fishViews: ${remainingFishViews}`);
                    if (remainingFishViews === 0) {
                        console.log('Hoàn thành');
                        this.scene.launch('QuestionScene', { score: this.score });
                        this.scene.start('ResultScene', { score: this.score });
                    }
                },
            });
            
        });

        // Thực hiện va chạm giữa bullet trong BulletView với ball trong fishView => mỗi lần va chạm sẽ + 1 điểm , bỏ qua phản lực khi va chạm
        // Nếu va chạm thì ẩn đi ball và line trong fishView và fish thì xoay 1 góc 90 độ và rơi xuống
        // Nêu fish di chuyển hết đến đích thì chuyển sang scene Result 
        // và tạo 1 mảng có kích thước fishView.lenght mỗi lần fishView hoàn thành x: this.scale.width + 100 sẽ - đi một phần tử 
        // nếu va chạm giữa fish và bullet cuối cùng thì start ResultScene
    }
    update() {
        if (this.bulletView && this.bulletView.bullet) {    
            if (this.bulletView.bullet.y >= 120) {
                this.splashSound.play();
                this.bulletView.bullet.setPosition(this.bulletView.container1.x, this.bulletView.container1.y + 15);
                this.bulletView.bullet.setVelocity(0, 0);
                this.bulletView.bullet.body.setGravityY(0);
        console.log('Bullet đã quay về vị trí ban đầu.');
            }
        } else {
            console.warn("BulletView hoặc Bullet không tồn tại.");
        }
    }
    
}

