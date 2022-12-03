import {
	SettingsDeckSourceSelect,
	SettingsPickStrategySelect,
	SettingsStartButton
} from './constants';
import { DeckSource, PickType } from './types';
import { toDeckSource } from './utils';

export class GameSettingsUI {
	protected _deckSource?: DeckSource;
	protected _pickType?: PickType;

	init() {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this._deckSource = toDeckSource(value);
		});

		SettingsPickStrategySelect.addEventListener('change', () => {
			const value = SettingsPickStrategySelect.value;
			this._pickType = value as PickType;
		})
	}

	onSettingsApply(cb: (deckSource: DeckSource, pickType: PickType) => void) {
		SettingsStartButton.addEventListener('click', () => {
			if (this.hasEmptyFields()) return;

			cb(this._deckSource as DeckSource, this._pickType as PickType);
		});
	}

	hasEmptyFields(){
		return !this._deckSource || !this._pickType;
	}
}
