export interface IPickStrategy<T> {
	pick(deck: T[]): T;
}
