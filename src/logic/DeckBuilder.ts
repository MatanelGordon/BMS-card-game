import { Card } from './Card';
import { CardType } from './types';
import { getCardTypes, isCardTypeKey } from './utils';

export class DeckBuilder {
	protected cards: Card[] = [];

	addCardsValuesToAllTypes(values: number[]) {
		values.forEach(value => {
			getCardTypes().forEach(type => {
				this.addCard(value, CardType[type]);
			});
		});
		return this;
	}

	addCard(value: number, type: CardType) {
		if (!this.isCardValueValid(value)) return;

		this.cards.push(new Card(value, type));
		return this;
	}

	fromJson(json: { value: number; type: string }[]) {
		json.forEach(({ value, type }) => {
			if (!isCardTypeKey(type)) return;

			this.addCard(value, CardType[type]);
		});
		return this;
	}

	shuffle() {
		this.cards = this.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
		return this;
	}

	getDeck() {
		return this.cards;
	}

	private isCardValueValid(value: number) {
		return 1 <= value && value <= 10;
	}
}
