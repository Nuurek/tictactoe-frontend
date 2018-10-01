import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["../page/page.components.scss", "./game.component.scss"]
})
export class GameComponent {
  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  protected get gameId() {
    return this.activatedRoute.snapshot.params['gameId'];
  }
}