import { Component } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'; 

import * as gameActions from '../../actions/game';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    protected store: Store<fromRoot.State>,
    private actions$: Actions
  ) {}

  private createGame() {
    this.store.dispatch(new gameActions.CreateGame());

    this.actions$
      .ofType(
        gameActions.ActionTypes.CREATE_GAME_SUCCESS,
        gameActions.ActionTypes.CREATE_GAME_FAILURE
      )
      .take(1)
      .subscribe(action => {
        console.log(action);
      });
  }
}
