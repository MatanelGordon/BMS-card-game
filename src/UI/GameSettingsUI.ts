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
	#deckSource?: DeckSource;
	#pickType?: PickType;

	init() {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this.#deckSource = toDeckSource(value);
			this.updateStartButton();
		});

		SettingsPickStrategySelect.addEventListener('change', () => {
			const value = SettingsPickStrategySelect.value;
			this.#pickType = value as PickType;
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
		if(mode === SettingsContainer.hasAttribute('open')) return;
		if (mode) {
			SettingsContainer.showModal();
		} else {
			SettingsContainer.close();
		}
	}

	onSettingsApply(cb: SettingsApplyCallback) {
		SettingsStartButton.addEventListener('click', () => {
			if (this.hasEmptyFields()) return;

			cb(this.#deckSource as DeckSource, this.#pickType as PickType);
		});
	}

	protected hasEmptyFields() {
		return !this.#deckSource || !this.#pickType;
	}

	private updateStartButton() {
		SettingsStartButton.disabled = this.hasEmptyFields();
	}
}
