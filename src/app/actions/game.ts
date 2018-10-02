import { Action } from "@ngrx/store";

import { Game } from "../models/game";

export enum ActionTypes {
  CREATE_GAME = '[Games] Create Game',
  CREATE_GAME_SUCCESS = '[Games] Create Game Success',
  CREATE_GAME_FAILURE = '[Games] Create Game Failure',

  JOIN_GAME = '[Games] Join Game',
  JOIN_GAME_SUCCESS = '[Games] Join Game Success',

  GAME_ERROR = '[Games] Game Error'
}

export class CreateGame implements Action {
  readonly type = ActionTypes.CREATE_GAME;

  constructor() {}
}

export class CreateGameSuccess implements Action {
  readonly type = ActionTypes.CREATE_GAME_SUCCESS;

  constructor(public payload: { game: Game }) {}
}

export class CreateGameFailure implements Action {
  readonly type = ActionTypes.CREATE_GAME_FAILURE;

  constructor(public payload: { error: Object }) {}
}

export class JoinGame implements Action {
  readonly type = ActionTypes.JOIN_GAME;

  constructor(public payload: { gameId: string }) {}
}

export class JoinGameSuccess implements Action {
  readonly type = ActionTypes.JOIN_GAME_SUCCESS;

  constructor(public payload: { gameId: string; playerId: string }) {}
}

export class GameError implements Action {
  readonly type = ActionTypes.GAME_ERROR;

  constructor(public payload: { error: Object }) {}
}

export type Actions =
  | CreateGame
  | CreateGameSuccess
  | CreateGameFailure
  | JoinGame
  | JoinGameSuccess
  | GameError;
