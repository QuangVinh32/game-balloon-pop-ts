export default class UIScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private scoreCount: number = 0;
    private levelId: number;

    private readonly SCORE_TEXT_X_POSITION = 10;
    private readonly SCORE_TEXT_Y_POSITION = 10;
    private readonly SCORE_FONT_SIZE = '18px Arial';

    constructor() {
        super("UIScene");
    }

    init() {
        
    }

    preload() {}

    create() {

        this.scoreText = this.add.text(
            this.SCORE_TEXT_X_POSITION, 
            this.SCORE_TEXT_Y_POSITION, 
            `Score: ${this.scoreCount}`, { 
            fontSize: this.SCORE_FONT_SIZE, 
            fontStyle: "italic", 
            color: 'orange' 
        }).setResolution(2);
    } 
}
