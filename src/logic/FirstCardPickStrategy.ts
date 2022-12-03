import { Card } from "./Card";
import { ICardPickStrategy } from "./types";

export class FirstCardPickStrategy implements ICardPickStrategy{
    pick(deck: Card[]): Card {
        return deck[0];
    }
}