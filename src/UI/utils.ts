import { DeckSource } from "./types";

const isDeckSourceKey = (value:string): value is keyof typeof DeckSource => 
    Object.keys(DeckSource).includes(value);

export const toDeckSource = (value: string): DeckSource | undefined => {
    if(isDeckSourceKey(value)){
        return DeckSource[value];
    }
    return undefined;
}