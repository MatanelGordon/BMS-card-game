import { Card } from "./Card";
import { ICardPickStrategy } from "./types";

export class FirstCardPickStrategy implements ICardPickStrategy<Card>{
    pick(deck: Card[]): Card {
        return deck[0];
    }
}