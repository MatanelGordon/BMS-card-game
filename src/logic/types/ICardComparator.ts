export interface ICardComparator<TCard> {
	compare(a: TCard, b: TCard): number;
}
