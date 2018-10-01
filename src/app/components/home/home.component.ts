import { Component } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'; 

import * as gameActions from '../../actions/game';
import * as fromRoot from '../../reducers';
import * as routerActions from "../../actions/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../page/page.components.scss', './home.component.scss']
})
export class HomeComponent {
  constructor(
    protected store: Store<fromRoot.State>,
    private actions$: Actions
  ) {}

  private createGame() {
    this.store.dispatch(new gameActions.CreateGame());

    this.actions$
      .ofType<gameActions.CreateGameSuccess | gameActions.CreateGameFailure>(
        gameActions.ActionTypes.CREATE_GAME_SUCCESS,
        gameActions.ActionTypes.CREATE_GAME_FAILURE
      )
      .take(1)
      .subscribe(action => {
        switch(action.type) {
          case gameActions.ActionTypes.CREATE_GAME_SUCCESS: {
            this.store.dispatch(new routerActions.Go({
              path: [`game/${action.payload.game.id}`]
            }))
            break;
          }

          case gameActions.ActionTypes.CREATE_GAME_FAILURE: {
            break;
          }
        }
      });
  }
}
