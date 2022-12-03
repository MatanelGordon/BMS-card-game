import { Card } from "../Card";

export interface ICardPickStrategy{
    pick(deck: Card[]): Card;
}