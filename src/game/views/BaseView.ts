export default class BaseView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    // private graphics: Phaser.GameObjects.Graphics; 

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene = scene;
        // this.graphics = this.scene.add.graphics();
        // this.add(this.graphics);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    public updateContainerSize(width: number, height: number, borderRadius: number = 0): void {
        this.setSize(width, height);
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            body.setSize(width, height);
        }
        // this.graphics.clear();
        // this.graphics.fillStyle(0x00000, 1);
        // this.graphics.fillRoundedRect(0, 0, width, height, borderRadius);
    }
    
    public setViewPosition(x: number, y: number): void {
        this.setPosition(x, y);
    }
}