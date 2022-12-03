import { clamp } from "lodash";
import { CardType } from "./types";

export class Card { 
    readonly value: number;
    readonly type: CardType;

    constructor(value: number, type: CardType) {
        this.value = value;
        this.type = type;
    }

    compare(other: Card): number {
		const diff = clamp(this.value - other.value, -1, 1);

		if (diff === 0) return clamp(this.type - other.type, -1, 1);

		return diff;
	}

    toString(){
        const typeName = CardType[this.type];
        return `${typeName}(${this.value})`
    }
}