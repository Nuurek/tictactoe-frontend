import { Action } from "@ngrx/store";

import { Game } from "../models/game";

export enum ActionTypes {
  CREATE_GAME = "[Games] Create Game",
  CREATE_GAME_SUCCESS = "[Games] Create Game Success",
  CREATE_GAME_FAILURE = "[Games] Create Game Failure"
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

export type Actions
  = CreateGame
  | CreateGameSuccess
  | CreateGameFailure
