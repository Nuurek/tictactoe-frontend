export enum Field {
  X = 'X',
  O = 'O'
}

export interface Game {
  id: string;
  playerId?: string;
  firstPlayer: Field;
}

export interface APIGame {
  id: string;
  player_id?: string;
  first_player: Field
}
