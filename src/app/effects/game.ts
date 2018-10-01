import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import * as gameActions from "../actions/game";
import { GameService } from "../services/game";

@Injectable()
export class GameEffects {
    @Effect() $createGame: Observable<Action> = this.actions$
      .ofType<gameActions.CreateGame>(gameActions.ActionTypes.CREATE_GAME)
      .mergeMap(action => {
          return this.gameService.createGame()
            .map(game => new gameActions.CreateGameSuccess({ game }))
            .catch(error => of(new gameActions.CreateGameFailure({ error })))
      });

    constructor(
        private actions$: Actions,
        private gameService: GameService
    ) {}
}
