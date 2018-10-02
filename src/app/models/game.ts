export enum Field {
  X = 'X',
  O = 'O'
}

export interface Game {
  id: string;
  playerId?: string;
  fields: Field[];
  firstPlayer: Field;
  winner: Field;
  currentTurn: Field;
}

export interface APIGame {
  id: string;
  player_id?: string;
  fields: Field[];
  first_player: Field;
  winner: Field;
  current_turn: Field;
}
