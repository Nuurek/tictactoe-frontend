import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "../../services/game";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as gameActions from "../../actions/game";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["../page/page.components.scss", "./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
  }
}