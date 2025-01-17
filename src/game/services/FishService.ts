import FishController from "../controllers/FishController";
import { FishDTO } from "../dtos/FishDTO";
import FishView from "../views/FishView";
import BaseService from "./BaseService";

export default class FishService extends BaseService<FishDTO> {
    private controller: FishController;
    private fishViews: FishView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new FishController();
    }
    
    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        
        const fishes = data.fishes || [];
    
        const randomFishes = fishes.map((fishData: any) => FishDTO.createRandomFishFromData(fishData));
    
        randomFishes.forEach((fish: FishDTO) => this.controller.addItem(fish));
    
        randomFishes.forEach((fish: FishDTO) => this.createFishView(fish));
    }


    public getFishDTOById(fishId: number): FishDTO | undefined {
        return this.controller.getItemByProperty("fishId", fishId);
    }

    public getAllFishDTOs(): FishDTO[] {
        return this.controller.getAllItems();
    }

    public createFishView(fishData: FishDTO): void {
        const fishView = new FishView(this.scene, fishData);
        this.fishViews.push(fishView);
    }

    public getAllFishViews(): FishView[] {
        return this.fishViews;
    }

    public getFishViewById(fishId: number): FishView | undefined {
        return this.fishViews.find(view => view.fishData.fishId === fishId);
    }

    public getFishsByLevelId(levelId: number): FishDTO[] {
        return this.controller.getAllItems().filter(fish => fish.levelId === levelId);
    }

    public getFishViewBylevelId(levelId: number): FishView | undefined {
            const bulletView = this.fishViews.find(view => view.fishData.levelId === levelId);
            return bulletView;
    }

    // public getUniqueLevelIds(): number[] {
    //     const fishs = this.controller.getAllItems();
    //     const levelIds: number[] = [];
    //     fishs.forEach(fish => {
    //         if (!levelIds.includes(fish.levelId)) {
    //             levelIds.push(fish.levelId);
    //         }
    //     });
    //     return levelIds;
    // }
    
    
}
