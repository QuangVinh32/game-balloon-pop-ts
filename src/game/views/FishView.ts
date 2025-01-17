import { FishDTO } from "../dtos/FishDTO";
import BaseView from "./BaseView";

export default class FishView extends BaseView {
    public fishData: FishDTO;
    private fish: Phaser.Physics.Arcade.Sprite;
    private ball:Phaser.Physics.Arcade.Sprite;
    private line: Phaser.GameObjects.Line;
    fishSprite: any;

    constructor(scene: Phaser.Scene, fishData: FishDTO) {
        super(scene);
        this.fishData = fishData;
        this.createLine();
        this.createFish();
        this.createBall(); 
        this.updateContainerSize(fishData.width1, fishData.height1);
        const randomY = Phaser.Math.Between(50, 400);
        this.setViewPosition(-50, randomY);    
    }

    private createBall(): void {
        this.ball = this.scene.physics.add.sprite(
            0,
            0,
            this.fishData.texture1
        );
        this.ball.setDisplaySize(this.fishData.width1, this.fishData.height1);
        this.ball.setOrigin(0.5, 0.5);
        this.add(this.ball);
    }

    public getBall(): Phaser.Physics.Arcade.Sprite {
        return this.ball;
    }

    private createFish(): void {
        this.fish = this.scene.physics.add.sprite(
            0,
            100,
            this.fishData.texture2
        )
        .setDisplaySize(this.fishData.width2, this.fishData.height2)
        .setOrigin(0.5, 0.5)
        .setFriction(0);
        this.add(this.fish);
    }

    public getFish():Phaser.Physics.Arcade.Sprite {
        return this.fish;
    }

    private createLine(): void {
        const startX = 0; 
        const startY = 0;
        const endX = 0; 
        const endY = 120;
    
        const thickness = 3; 
    
        this.line = this.scene.add.line(
            0, 0,
            startX, startY,
            endX, endY,
            0x000000
        ).setOrigin(0, 0);
    
        this.line.setLineWidth(thickness);
        this.add(this.line);
    }

    public getLine(): Phaser.GameObjects.Line {
        return this.line;
    }

    public setViewPosition(x: number, y: number): void {
        super.setViewPosition(x, y);

        if (this.line) {
            this.line.setTo(
                this.ball.x, this.ball.y,
                this.fish.x, this.fish.y
            );
        }
    }
 
}
