import { BaseDTO } from "./BaseDTO";

export class FishDTO extends BaseDTO{
    private _fishId: number;
    private _width1: number;
    private _height1: number;
    private _texture1: string;
    private _width2: number;
    private _height2: number;
    private _texture2: string;
    private _levelId: number;

    constructor(
        fishId: number,
        positionX: number,
        positionY: number,
        width1: number,
        height1: number,
        texture1: string,
        width2: number,
        height2: number,
        texture2: string,
        levelId: number
    ) {
        super(positionX, positionY); 
        this._fishId = fishId;
        this._width1 = width1;
        this._height1 = height1;
        this._texture1 = texture1;
        this._levelId = levelId;
        this._width2 = width2;
        this._height2 = height2;
        this._texture2 = texture2;
    }

    // Chỉnh sửa phương thức để random chỉ texture1 và texture2, dữ liệu khác lấy từ data
    public static createRandomFishFromData(data: any): FishDTO {
        const texture1List = [
            'ball_blue',
            'ball_red',
            'ball_green',
            'ball_yellow',
            'ball_orange',
            'ball_pink',
        ];
    
        const texture2List = [
            'cockle',
            'fish1',
            'fish2',
            'fish3',
            'fish4',
        ];
    
        const randomTexture1 = texture1List[Math.floor(Math.random() * texture1List.length)];
        const randomTexture2 = texture2List[Math.floor(Math.random() * texture2List.length)];
    
        const { fishId, positionX, positionY, width1, height1, levelId } = data;
    
        let width2 = 0;
        let height2 = 0;
    
        // Đặt kích thước dựa trên texture2
        switch (randomTexture2) {
            case 'cockle':
                width2 = 60;
                height2 = 55;
                break;
            case 'fish1':
                width2 = 68;
                height2 = 47;
                break;
            case 'fish2':
                width2 = 69;
                height2 = 63;
                break;
            case 'fish3':
                width2 = 70;
                height2 = 73;
                break;
            case 'fish4':
                width2 = 45;
                height2 = 79;
                break;
            default:
                console.warn(`Unknown texture: ${randomTexture2}`);
                break;
        }
    
        return new FishDTO(
            fishId,
            positionX,
            positionY,
            width1,
            height1,
            randomTexture1,
            width2,
            height2,
            randomTexture2,
            levelId
        );
    }

    /**
     * Getter fishId
     * @return {number}
     */
	public get fishId(): number {
		return this._fishId;
	}

    /**
     * Getter width1
     * @return {number}
     */
	public get width1(): number {
		return this._width1;
	}

    /**
     * Getter height1
     * @return {number}
     */
	public get height1(): number {
		return this._height1;
	}

    /**
     * Getter texture1
     * @return {string}
     */
	public get texture1(): string {
		return this._texture1;
	}

    /**
     * Getter width2
     * @return {number}
     */
	public get width2(): number {
		return this._width2;
	}

    /**
     * Getter height2
     * @return {number}
     */
	public get height2(): number {
		return this._height2;
	}

    /**
     * Getter texture2
     * @return {string}
     */
	public get texture2(): string {
		return this._texture2;
	}

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Setter fishId
     * @param {number} value
     */
	public set fishId(value: number) {
		this._fishId = value;
	}

    /**
     * Setter width1
     * @param {number} value
     */
	public set width1(value: number) {
		this._width1 = value;
	}

    /**
     * Setter height1
     * @param {number} value
     */
	public set height1(value: number) {
		this._height1 = value;
	}

    /**
     * Setter texture1
     * @param {string} value
     */
	public set texture1(value: string) {
		this._texture1 = value;
	}

    /**
     * Setter width2
     * @param {number} value
     */
	public set width2(value: number) {
		this._width2 = value;
	}

    /**
     * Setter height2
     * @param {number} value
     */
	public set height2(value: number) {
		this._height2 = value;
	}

    /**
     * Setter texture2
     * @param {string} value
     */
	public set texture2(value: string) {
		this._texture2 = value;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

    
}