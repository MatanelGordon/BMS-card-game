export interface ICardPickStrategy<TCard> {
	pick(deck: TCard[]): TCard;
}
