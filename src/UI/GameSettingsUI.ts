import { DeckSource } from './types';
import { toDeckSource } from './utils';
import {
    ResetButton,
	SettingsContainer,
	SettingsDeckSourceSelect,
	SettingsStartButton,
} from './constants';
import { Game } from '../logic/Game';

export class GameSettingsUI {
	protected _deckSource?: DeckSource;

	get deckSource() {
		return this._deckSource;
	}

	init(game: Game) {
		SettingsDeckSourceSelect.addEventListener('change', () => {
			const value = SettingsDeckSourceSelect.value;
			this._deckSource = toDeckSource(value);
		});

		ResetButton.addEventListener('click', () => {
			this.show(true);
		});

		SettingsStartButton.addEventListener('click', () => {
			if (!this._deckSource) return;

			this.show(false);
			game.startGame();
		});
	}

	onSettingsApply(cb: (deckSource: DeckSource) => void) {
		SettingsStartButton.addEventListener('click', () => {
			if (!this._deckSource) return;

			cb(this.deckSource as DeckSource);
		});
	}

	show(mode: boolean) {
		SettingsContainer.hidden = !mode;
	}
}
