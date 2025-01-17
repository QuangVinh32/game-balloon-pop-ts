import { BaseDTO } from "./BaseDTO";

export class BulletDTO extends BaseDTO {
    private _bulletId: number;
    private _width1: number;
    private _height1: number;
    private _texture1: string;
    private _width2: number;
    private _height2: number;
    private _texture2: string;
    private _levelId: number;

    constructor(
        bulleId: number,
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
        this._bulletId = bulleId;
        this._width1 = width1;
        this._height1 = height1;
        this._texture1= texture1;
        this._width2 = width2;
        this._height2 = height2;
        this._texture2= texture2;
        this._levelId = levelId;
        
    }

    /**
     * Getter bulleId
     * @return {number}
     */
	public get bulletId(): number {
		return this._bulletId;
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
     * Setter bulleId
     * @param {number} value
     */
	public set bulletId(value: number) {
		this._bulletId = value;
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