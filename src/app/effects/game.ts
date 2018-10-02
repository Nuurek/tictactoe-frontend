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

  @Effect()
  $joinGame = this.actions$
    .ofType<gameActions.JoinGame>(gameActions.ActionTypes.JOIN_GAME)
    .mergeMap(action => {
      const gameId = action.payload.gameId;
      const playerId = localStorage.getItem(LOCAL_STORAGE_PLAYER_ID_KEY);
      return this.gameService
        .joinGame(gameId, playerId)
        .map(playerId => {
          localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, playerId);
          return new gameActions.JoinGameSuccess({ gameId, playerId });
        })
        .catch(error => of(new gameActions.GameError({ error })));
    });

  // @Effect() $joinGameSuccess = this.actions$
  //   .ofType<gameActions.JoinGameSuccess>(gameActions.ActionTypes.JOIN_GAME_SUCCESS)
  //   .subscribe(action => {
  //     localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, action.payload.playerId);
  //   })

  constructor(private actions$: Actions, private gameService: GameService) {}
}
