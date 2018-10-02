import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import * as gameActions from "../actions/game";
import { GameService } from "../services/game";

export const LOCAL_STORAGE_PLAYER_ID_KEY = 'playerId';

@Injectable()
export class GameEffects {
  @Effect()
  $createGame: Observable<Action> = this.actions$
    .ofType<gameActions.CreateGame>(gameActions.ActionTypes.CREATE_GAME)
    .mergeMap(action => {
      return this.gameService
        .createGame()
        .map(game => new gameActions.CreateGameSuccess({ game }))
        .catch(error => of(new gameActions.CreateGameFailure({ error })));
    });

  @Effect({ dispatch: false })
  $joinGame = this.actions$
    .ofType<gameActions.JoinGame>(gameActions.ActionTypes.JOIN_GAME)
    .do(action => {
      const gameId = action.payload.gameId;
      const playerId = sessionStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY);
      this.gameService.joinGame(gameId, playerId);
    });

  @Effect({ dispatch: false })
  $joinGameAccept = this.actions$
    .ofType<gameActions.JoinGameAccept>(gameActions.ActionTypes.JOIN_GAME_ACCEPT)
    .do(action => {
      sessionStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, action.payload.game.playerId);
    })

  @Effect({ dispatch: false })
  $joinGameReject = this.actions$
    .ofType<gameActions.JoinGameReject>(gameActions.ActionTypes.JOIN_GAME_REJECT)
    .do(action => {
      sessionStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY);
    })

  constructor(private actions$: Actions, private gameService: GameService) {}
}
