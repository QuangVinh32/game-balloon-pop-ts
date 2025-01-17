export class QuestionScene extends Phaser.Scene {
    private score: number;
    private totalScore: number;
    public successSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    public failureSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    constructor() {
        super('QuestionScene');
        this.totalScore = 0; 
    }

    init(data:{score: number}) {
        this.score = data.score;
        console.log("ques-score",data.score)
        this.totalScore += this.score;
    }

    preload() {

        // audio
        this.load.audio('sound_failure','assets/audio/sound_failure.mp3');
        this.load.audio('sound_success','assets/audio/sound_success.mp3')

    }

    create() {

        this.add.text(this.scale.width / 2, 470, `Your score is ${this.totalScore}. Drag the X to the red column.`, {
            fontSize: '20px Arial',
            color: 'black',
            fontStyle:"bold"
        }).setOrigin(0.5).setResolution(2);

    }
}