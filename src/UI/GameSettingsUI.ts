import {
	GameResetBtn,
	SettingsContainer,
	SettingsDeckSourceSelect,
	SettingsPickStrategySelect,
	SettingsStartButton,
} from './constants';
import { DeckSource, PickType } from './types';
import { toDeckSource } from './utils';

export type SettingsApplyCallback = (deckSource: DeckSource, pickType: PickType) => void;
export class GameSettingsUI {
	protected _deckSource?: DeckSource;
	protected _pickType?: PickType;

	init() {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this._deckSource = toDeckSource(value);
			this.updateStartButton();
		});

		SettingsPickStrategySelect.addEventListener('change', () => {
			const value = SettingsPickStrategySelect.value;
			this._pickType = value as PickType;
			this.updateStartButton();
		});

		SettingsStartButton.addEventListener('click', () => {
			this.show(false);
		})

		GameResetBtn.addEventListener('click', () => {
			this.show(true);
		})

		this.updateStartButton();
		this.show(true);
	}

	show(mode: boolean) {
		SettingsContainer.hidden = !mode;
		if (mode) {
			SettingsContainer.style.display = 'grid';
			SettingsContainer.showModal();
		} else {
			SettingsContainer.style.display = 'none';
			SettingsContainer.close();
		}
	}

	onSettingsApply(cb: SettingsApplyCallback) {
		SettingsStartButton.addEventListener('click', () => {
			if (this.hasEmptyFields()) return;

			cb(this._deckSource as DeckSource, this._pickType as PickType);
		});
	}

	protected hasEmptyFields() {
		return !this._deckSource || !this._pickType;
	}

	private updateStartButton() {
		SettingsStartButton.disabled = this.hasEmptyFields();
	}
}
