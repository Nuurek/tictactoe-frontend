import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import * as gameActions from "../../actions/game";
import * as fromRoot from "../../reducers";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../page/page.components.scss', './game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  currentGame$ = this.store.select(fromRoot.selectCurrentGame);

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected store: Store<fromRoot.State>
  ) {}

  protected get gameId() {
    return this.activatedRoute.snapshot.params['gameId'];
  }

  ngOnInit() {
    this.store.dispatch(new gameActions.JoinGame({ gameId: this.gameId }));
  }

  ngOnDestroy() {}

  onFieldClicked(field: number) {
    this.store.dispatch(new gameActions.MakeMove({ field }))
  }
}
