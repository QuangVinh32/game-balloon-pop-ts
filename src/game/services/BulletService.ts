;
import BulletController from '../controllers/BulletController';
import { BulletDTO } from '../dtos/BulletDTO';
import BulletView from '../views/BulletView';
import BaseService from './BaseService';

export class BulletService extends BaseService<BulletDTO> {

    private controller: BulletController;
    private bulletViews: BulletView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new BulletController();
    }

    private mapBullets(data: any): BulletDTO[] {
        const bullets = Array.isArray(data.bullets) ? data.bullets : [];
        if (!bullets.length) {
            console.error('Invalid or missing bullets data:', data.bullets);
        }

        return bullets.map((bulletData: any) => new BulletDTO(
            bulletData.bulletId,
            bulletData.positionX,
            bulletData.positionY,
            bulletData.width1,
            bulletData.height1,
            bulletData.texture1,
            bulletData.width2,
            bulletData.height2,
            bulletData.texture2,
            bulletData.levelId
        ));
    }

    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        // console.log("Dữ liệu JSON đã tải:", data);
        const bullets = this.mapBullets(data);
        bullets.forEach(bullet => this.controller.addItem(bullet));
        const levelBullets = bullets.filter(bullet => bullet.levelId === levelId);
        if (levelBullets.length === 0) {
            console.warn(`No bullets found for levelId: ${levelId}`);
        } else {
            levelBullets.forEach(bullet => this.createBulletView(bullet));
        }
    }

    public getBulletDTOById(bulletId: number): BulletDTO | undefined {
        return this.controller.getItemByProperty('bulletId', bulletId);
    }

    public getAllBulletDTOs(): BulletDTO[] {
        return this.controller.getAllItems();
    }

    public getBulletsByLevelId(levelId: number): BulletDTO[] {
        return this.controller.getAllItems().filter(bullet => bullet.levelId === levelId);
    }

    public getBulletByLevelId(levelId: number): BulletDTO[] {
        return this.controller.getAllItems().filter(bullet => bullet.levelId === levelId);
    }

    public createBulletView(bulletData: BulletDTO): void {
        const bulletView = new BulletView(this.scene, bulletData);
        this.bulletViews.push(bulletView);
    }

    public getAllBulletViews(): BulletView[] {
        return this.bulletViews;
    }

    public getBulletViewById(bulletId: number): BulletView | undefined {
        const bulletView = this.bulletViews.find(view => view.bulletData.bulletId === bulletId);
        return bulletView || undefined;
    }

    public getBulletViewBylevelId(levelId: number): BulletView | undefined {
        const bulletView = this.bulletViews.find(view => view.bulletData.levelId === levelId);
        return bulletView;
    }
}
