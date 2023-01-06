import {
	GameResetBtn,
	SettingsContainer,
	SettingsDeckSourceSelect,
	SettingsPickStrategySelect,
	SettingsStartButton,
} from './constants';
import { toDeckSource } from './utils';
import { DeckSource, PickStrategy } from '../types';

export type SettingsApplyCallback = (deckSource: DeckSource, pickStrategy: PickStrategy) => void;
export class GameSettingsUI {
	private static LOCKED_ATTR = "data-locked";
	#deckSource?: DeckSource;
	#pickStrategy?: PickStrategy;

	init() {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this.#deckSource = toDeckSource(value);
			this.updateStartButton();
		});

		SettingsPickStrategySelect.addEventListener('change', () => {
			const value = SettingsPickStrategySelect.value;
			this.#pickStrategy = value as PickStrategy;
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
		
		if(this.isLocked){
			SettingsContainer.close();
			return;
		}

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

			cb(this.#deckSource as DeckSource, this.#pickStrategy as PickStrategy);
		});
	}

	lock(mode: boolean) {
		if(mode){
			SettingsContainer.setAttribute(GameSettingsUI.LOCKED_ATTR, "true");
			this.show(false);
		}
		else{
			SettingsContainer.removeAttribute(GameSettingsUI.LOCKED_ATTR);
		}		
	}

	private get isLocked(){
		return SettingsContainer.hasAttribute(GameSettingsUI.LOCKED_ATTR);
	}

	protected hasEmptyFields() {
		return !this.#deckSource || !this.#pickStrategy;
	}

	private updateStartButton() {
		SettingsStartButton.disabled = this.hasEmptyFields();
	}
}
