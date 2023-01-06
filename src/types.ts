export enum DeckSource {
	AUTO_GENERATED = 'AUTO_GENERATED',
	CONFIG_FILE = 'CONFIG_FILE',
}

export enum PickStrategy {
	FIRST = 'FIRST',
	RANDOM = 'RANDOM',
}

export enum GameStatus{
    IDLE = 'IDLE',
    WIN = 'WIN',
    LOSE = 'LOSE',
    PLAYING = 'PLAYING',
}

export enum BetType {
    HIGHER = 'HIGHER',
    LOWER = 'LOWER',
}