import { Card } from './Card';
import { PickStrategy } from './types';

export const pickFirstCard: PickStrategy<Card> = (deck: Card[]): Card => deck[0];
