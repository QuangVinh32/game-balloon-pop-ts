import { count } from "console";
import FishService from "../services/FishService";

export class ResultScene extends Phaser.Scene {
    private score: number;
    private totalScore: number;
    public successSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    public failureSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    private fishService: FishService;
    private columnXPositions: number[]; // Mảng lưu trữ các vị trí X của các cột đỏ


    constructor() {
        super('ResultScene');
        this.totalScore = 0; 
        this.columnXPositions = [];
    }

    init(data: { score: number }) {
        this.score = data.score;
        console.log("re-score", data.score);
        this.totalScore += this.score;
    }

    preload() {
        // Load audio
        this.load.audio('sound_failure', 'assets/audio/sound_failure.mp3');
        this.load.audio('sound_success', 'assets/audio/sound_success.mp3');
    }

    async create() {
        this.successSound = this.sound.add('sound_success', { volume: 1 });
        this.failureSound = this.sound.add('sound_failure', { volume: 1 });

        this.add.text(this.scale.width / 2, 40, 'Line Plot of Your Scores', {
            fontSize: '20px Arial',
            color: 'black',
            fontStyle: 'bold'
        }).setOrigin(0.5).setResolution(2);

        const startX = 65; 
        const startY = 400; 
        const length = 500; 
        // const maxUnits = 10; 
        this.fishService = new FishService(this, 'assets/data/fish.json');
        await this.fishService.initialize(1);

        const fishsAtLevel = this.fishService.getFishsByLevelId(1);
        const fishCount = fishsAtLevel.length;
        console.log("asdd",fishCount)

        const graphics = this.add.graphics();

        const scoreX = startX + (this.score / fishCount) * length; 

        const drawnPositions = new Map<number, number>(); 
        this.columnXPositions.forEach((x) => {
            const yOffset = drawnPositions.get(x) || 0; 
            const yPosition = startY - 35 * yOffset;

            // Vẽ dấu X bằng text
            this.add.text(x, yPosition - 30, 'X', {
                fontSize: '30px Arial',
                color: 'black',
                fontStyle: 'bold',
            }).setOrigin(0.5).setResolution(2);

            drawnPositions.set(x, (drawnPositions.get(x) || 0) + 1);
        });


        // In ra console để kiểm tra các vị trí X
        console.log('Final Column X Positions with Y-offset:', drawnPositions);

        const columnWidth = 50;
        const columnHeight = 350;

        // Vẽ cột màu đỏ
        const column = graphics.fillStyle(0xff0000, 1)
            .fillRect(scoreX - columnWidth / 2, startY - columnHeight + 55, columnWidth, columnHeight);

        // Vẽ thước (tách thành hàm riêng)
        this.drawScale(graphics, startX, startY, length, fishCount);

        // Xử lý hình vuông di chuyển
        const squareStartX = this.scale.width / 2; 
        const squareStartY = startY + 165;

        const square = this.add.rectangle(squareStartX, squareStartY, 50, 50, 0xff0000);
        square.setInteractive({ draggable: true });

        const squareText = this.add.text(square.x, square.y, 'X', {
            fontSize: '30px Arial',
            color: 'black',
            fontStyle: 'bold'
        }).setOrigin(0.5).setResolution(2);

        this.input.setDraggable(square);

        square.on('drag', (pointer: any, dragX: any, dragY: any) => {
            square.x = dragX;
            square.y = dragY;
            squareText.setPosition(dragX, dragY);
        });

        square.on('dragend', (pointer: any) => {
            const isInsideColumn =
                square.x > scoreX - columnWidth &&
                square.x < scoreX + columnWidth &&
                square.y > startY - columnHeight + 50 &&
                square.y < startY + 50;

            if (isInsideColumn) {
                this.successSound.play();

                graphics.clear(); 
                graphics.fillStyle(0xffffff, 1)
                    .fillRect(scoreX - columnWidth / 2, startY - columnHeight + 55, columnWidth, columnHeight);

                this.drawScale(graphics, startX, startY, length, fishCount);

                this.columnXPositions.push(scoreX); 
                console.log('Column X Positions:', this.columnXPositions);

                square.setVisible(false);
                squareText.setVisible(false);

         
                const drawnPositions = new Map<number, number>(); 
                this.columnXPositions.forEach((x) => {
                    const yOffset = drawnPositions.get(x) || 0; 
                    const yPosition = startY - 35 * yOffset;

                    // Vẽ dấu X bằng text
                    this.add.text(x, yPosition - 30, 'X', {
                        fontSize: '30px Arial',
                        color: 'black',
                        fontStyle: 'bold',
                    }).setOrigin(0.5).setResolution(2);

                    drawnPositions.set(x, (drawnPositions.get(x) || 0) + 1);
                });

                console.log('Correct!');
                this.scene.stop('QuestionScene');
                this.scene.launch('ContinueScene', { totalScore: this.totalScore });
            } else {
                this.failureSound.play();
                square.x = squareStartX;
                square.y = squareStartY;
                squareText.setPosition(squareStartX, squareStartY);
            }
        });
    }

    private drawScale(graphics: Phaser.GameObjects.Graphics, startX: number, startY: number, length: number, fishCount: number) {
        const step = length / fishCount;
    
        const extraLineLength = 50; 
        const arrowHeight = 10;     
        const arrowWidth = 30;      
    
        graphics.lineStyle(2.5, 0x000000); 
        graphics.beginPath();
        graphics.moveTo(startX, startY); 
        graphics.lineTo(startX + length, startY); 
        graphics.strokePath();

        for (let i = 0; i <= fishCount; i++) {
            const x = startX + i * step; 
            const yTop = startY - fishCount; 
            const yBottom = startY + fishCount; 

            graphics.beginPath();
            graphics.moveTo(x, yTop);
            graphics.lineTo(x, yBottom);
            graphics.strokePath();

            this.add.text(x, startY + 20, i.toString(), {
                fontSize: '30px Arial',
                color: 'black',
                fontStyle:"bold"
            }).setOrigin(0.5, 0).setResolution(2);
        }

        graphics.beginPath();
        graphics.moveTo(startX, startY);
        graphics.lineTo(startX - extraLineLength, startY);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(startX + length, startY);
        graphics.lineTo(startX + length + extraLineLength, startY);
        graphics.strokePath();


        graphics.lineStyle(2, 0x000000);
        graphics.beginPath();
        graphics.moveTo(startX - extraLineLength - arrowHeight, startY); 
        graphics.lineTo(startX - extraLineLength, startY - arrowWidth / 2); 
        graphics.lineTo(startX - extraLineLength, startY + arrowWidth / 2); 
        graphics.closePath();
        graphics.fillStyle(0x000000);
        graphics.fillPath();
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(startX + length + extraLineLength + arrowHeight, startY);
        graphics.lineTo(startX + length + extraLineLength, startY - arrowWidth / 2); 
        graphics.lineTo(startX + length + extraLineLength, startY + arrowWidth / 2);
        graphics.closePath();
        graphics.fillStyle(0x000000);
        graphics.fillPath();
        graphics.strokePath();
    }
    
}
