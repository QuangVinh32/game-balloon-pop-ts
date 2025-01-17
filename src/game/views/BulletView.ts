import { BulletDTO } from "../dtos/BulletDTO";
import LevelScene from "../scenes/LevelScene";
import BaseView from "./BaseView";

export default class BulletView extends BaseView {
    public bulletData: BulletDTO;
    private bullet!: Phaser.Physics.Arcade.Sprite;
    private ammoClip: Phaser.GameObjects.Sprite;
    private gunBody: Phaser.GameObjects.Sprite;

    private line: Phaser.GameObjects.Line;
    private line2: Phaser.GameObjects.Line;

    private container1: Phaser.GameObjects.Container;
    private container2: Phaser.GameObjects.Container;
    private containerView: Phaser.GameObjects.Container;

    private originalLine1: { x1: number; y1: number; x2: number; y2: number };
    private originalLine2: { x1: number; y1: number; x2: number; y2: number };


    constructor(scene: Phaser.Scene, bulletData: BulletDTO) {
        super(scene);
        this.bulletData = bulletData;
    
        this.createBullet();
        this.createAmmoClip();
        this.createGunBody();
        this.createLine();
        this.createLine2();
        this.createContainers();
        this.setViewPosition(bulletData.positionX, bulletData.positionY);
        this.updateContainerSize(200,200)
    }

    private createBullet(): void {
        this.bullet = this.scene.physics.add.sprite(
            0,
            15,
            this.bulletData.texture1
        );
        this.bullet.setDisplaySize(this.bulletData.width1, this.bulletData.height1);
        this.bullet.setOrigin(0.5, 0.5);
        this.bullet.setCircle(19)

    }

    private createAmmoClip(): void {
        this.ammoClip = this.scene.add.sprite(
            0,
            30,
            this.bulletData.texture2
        )
        .setDisplaySize(this.bulletData.width2, this.bulletData.height2)
        .setOrigin(0.5, 0.5);
    };

    private createGunBody(): void {
        this.gunBody = this.scene.add.sprite(
            0,
            100,
            "gun_body"
        )
        .setDisplaySize(162, 203)
        .setOrigin(0.5, 0.5);
    }

    private createLine(): void {
        this.line = this.scene.add.line(
            0, 0,
            this.gunBody.x - 65, this.gunBody.y - 65,
            this.ammoClip.x - 30, this.ammoClip.y - 10,
            0x8B4513
        ).setLineWidth(15).setOrigin(0, 0);
    }
    
    private createLine2(): void {
        this.line2 = this.scene.add.line(
            0, 0,
            this.gunBody.x + 60, this.gunBody.y - 70,
            this.ammoClip.x + 20, this.ammoClip.y + 10,
            0x8B4513
        ).setLineWidth(15).setOrigin(0, 0);

    }
    
    private createContainers(): void {
    
        this.container1 = this.scene.add.container(0, 0, [this.bullet, this.ammoClip]);
        console.log(this.container1.width)
        console.log(this.container1.height)
        const bounds = this.container1.getBounds();

        this.container1.setSize(bounds.width, bounds.height);
        this.container1.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 18, bounds.width , bounds.height + 7),
            
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            draggable: true,
        });
    
        this.container2 = this.scene.add.container(0, 0, [this.line, this.line2, this.container1]);
    
        this.containerView = this.scene.add.container(0, 0, [this.container2, this.gunBody]);
    
        this.add(this.containerView);
    
        this.setupDragEvents();
    }

    private setupDragEvents(): void {
        const centerX = this.bulletData.positionX;
        const centerY = this.bulletData.positionY + 20;
        let startAngle = 0;
        let startX = 0;
        let startY = 0;
        let isDragAllowed = true;
        console.log("Tâm", centerX, centerY);
    
        this.container1.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            
            if (this.bullet.body && this.bullet.body instanceof Phaser.Physics.Arcade.Body) {
                if (this.bullet.body.velocity.length() > 0) {
                    console.log("Bullet is moving, drag not allowed.");
                    isDragAllowed = false;
                    return;
                }
            }
    
            isDragAllowed = true;
            startX = this.container1.x;
            startY = this.container1.y;
            startAngle = Phaser.Math.Angle.Between(centerX, centerY, pointer.x, pointer.y + 200);
        });
    
        
        this.scene.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
            if (!isDragAllowed) {
                return;
            }
    
            if (gameObject === this.container1) {
                gameObject.x = dragX;
                gameObject.y = dragY;
    
                const currentAngle = Phaser.Math.Angle.Between(centerX, centerY, pointer.x, pointer.y);
                const rotationDelta = currentAngle - startAngle;
                this.container1.rotation += rotationDelta;
                startAngle = currentAngle;
    
                const dragDistance = Phaser.Math.Distance.Between(startX, startY, dragX, dragY);
    
                const newLineWidth = Phaser.Math.Clamp(15 - dragDistance / 15, 2, 15);
    
                this.line.setLineWidth(newLineWidth);
                this.line2.setLineWidth(newLineWidth);
    
                if (this.bullet.body && this.bullet.body instanceof Phaser.Physics.Arcade.Body) {
                    this.bullet.body.setCollideWorldBounds(false);
                    this.bullet.body.enable = false;
                }
    
                const rotation = this.container1.rotation;
                const offsetX = dragX - startX;
                const offsetY = dragY - startY;
    
                const ammoClipOffsetX = -30 * Math.cos(rotation) - 15 * Math.sin(rotation) + offsetX;
                const ammoClipOffsetY = -30 * Math.sin(rotation) + 15 * Math.cos(rotation) + offsetY;
    
                const ammoClipOffsetX2 = 30 * Math.cos(rotation) - 15 * Math.sin(rotation) + offsetX;
                const ammoClipOffsetY2 = 30 * Math.sin(rotation) + 15 * Math.cos(rotation) + offsetY;
    
                this.line.setTo(
                    this.gunBody.x - 65, this.gunBody.y - 65,
                    ammoClipOffsetX, ammoClipOffsetY
                );
    
                this.line2.setTo(
                    this.gunBody.x + 60, this.gunBody.y - 70,
                    ammoClipOffsetX2, ammoClipOffsetY2
                );
            }
        });
    
        this.scene.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
            if (!isDragAllowed) {
                return;
            }
    
            if (gameObject === this.container1) {
                console.log('Drag ended');
    
                const angle = Phaser.Math.Angle.Between(centerX, centerY, pointer.x, pointer.y);
                const oppositeAngle = angle + Math.PI;
    
                const dragDistance = Phaser.Math.Distance.Between(centerX, centerY, pointer.x, pointer.y);

                const baseSpeed = 800;   
                const maxSpeed = 2500; 
                const speed = Phaser.Math.Clamp(dragDistance * 20, baseSpeed, maxSpeed);

                console.log(`Drag Distance: ${dragDistance}, Speed: ${speed}`);

    
                const velocityX = Math.cos(oppositeAngle) * speed;
                const velocityY = Math.sin(oppositeAngle) * speed;
    
                if (this.bullet.body && this.bullet.body instanceof Phaser.Physics.Arcade.Body) {
                    this.bullet.setVelocity(velocityX, velocityY);
                    this.bullet.body.setGravityY(1000);
                    this.bullet.body.setBounce(0.4);
                    this.bullet.body.setCollideWorldBounds(true);
                    this.bullet.body.enable = true;

                } else {
                    console.error('Bullet does not have a valid dynamic physics body');
                }
    
                this.container1.setPosition(startX, startY);
                this.container1.rotation = 0;
    
                this.line.setTo(
                    this.originalLine1.x1, this.originalLine1.y1,
                    this.originalLine1.x2, this.originalLine1.y2
                );
    
                this.line2.setTo(
                    this.originalLine2.x1, this.originalLine2.y1,
                    this.originalLine2.x2, this.originalLine2.y2
                );
    
                this.line.setLineWidth(15);
                this.line2.setLineWidth(15);
            }
        });
    

    }

    public setViewPosition(x: number, y: number): void {
        super.setViewPosition(x, y);
    
        this.line.setTo(
            this.gunBody.x - 65, this.gunBody.y - 65,
            this.ammoClip.x - 30, this.ammoClip.y - 10
        );
    
        this.line2.setTo(
            this.gunBody.x + 60, this.gunBody.y - 70,
            this.ammoClip.x + 20, this.ammoClip.y + 10
        );
    
        this.originalLine1 = {
            x1: this.gunBody.x - 65,
            y1: this.gunBody.y - 65,
            x2: this.ammoClip.x - 30,
            y2: this.ammoClip.y - 10,
        };
    
        this.originalLine2 = {
            x1: this.gunBody.x + 60,
            y1: this.gunBody.y - 70,
            x2: this.ammoClip.x + 20,
            y2: this.ammoClip.y + 10,
        };
    }    
    
}
