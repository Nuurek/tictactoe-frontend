import { Action } from "@ngrx/store";

import { Game } from "../models/game";

export enum ActionTypes {
  CREATE_GAME = '[Games] Create Game',
  CREATE_GAME_SUCCESS = '[Games] Create Game Success',
  CREATE_GAME_FAILURE = '[Games] Create Game Failure',

  JOIN_GAME = '[Games] Join Game',
  JOIN_GAME_ACCEPT = '[Games] Join Game Accept',
  JOIN_GAME_REJECT = '[Games] Join Game Reject',

  SET_GAME_STATE = '[Games] Set Game State',

  MAKE_MOVE = '[Games] Make Move',

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

export class JoinGameAccept implements Action {
  readonly type = ActionTypes.JOIN_GAME_ACCEPT;

  constructor(public payload: { game: Game }) {}
}

export class JoinGameReject implements Action {
  readonly type = ActionTypes.JOIN_GAME_REJECT;

  constructor(public payload: { game: Game }) {}
}

export class SetGameState implements Action {
  readonly type = ActionTypes.SET_GAME_STATE;

  constructor(public payload: { game: Game }) {}
}

export class MakeMove implements Action {
  readonly type = ActionTypes.MAKE_MOVE;

  constructor(public payload: { field: number }) {}
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
  | JoinGameAccept
  | JoinGameReject
  | SetGameState
  | MakeMove
  | GameError;
