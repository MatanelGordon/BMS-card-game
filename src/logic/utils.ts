import { CardType } from './types';

export const isCardTypeKey = (value: string): value is keyof typeof CardType => value in CardType;

export const getCardTypes = () =>
	Object.values(CardType).filter(x => typeof x === 'string') as (keyof typeof CardType)[];
