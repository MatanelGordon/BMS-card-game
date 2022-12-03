import {
	SettingsDeckSourceSelect,
	SettingsStartButton
} from './constants';
import { DeckSource } from './types';
import { toDeckSource } from './utils';

export class GameSettingsUI {
	protected _deckSource?: DeckSource;

	get deckSource() {
		return this._deckSource;
	}

	init() {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this._deckSource = toDeckSource(value);
		});
	}

	onSettingsApply(cb: (deckSource: DeckSource) => void) {
		SettingsStartButton.addEventListener('click', () => {
			if (!this._deckSource) return;

			cb(this.deckSource as DeckSource);
		});
	}
}
