import { Card } from "../Card";

export interface ICardComparator{
    compare(a: Card, b: Card): number;
}