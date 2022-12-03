import { CardType } from "./types";

export class Card { 
    readonly value: number;
    readonly type: CardType;

    constructor(value: number, type: CardType) {
        this.value = value;
        this.type = type;
    }

    toString(){
        const typeName = CardType[this.type];
        return `${typeName}(${this.value})`
    }
}