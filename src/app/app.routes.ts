import { Routes } from "@angular/router";

import { GameComponent } from "./components/game/game.component";
import { HomeComponent } from "./components/home/home.component";
import { JoinComponent } from "./components/join/join.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'game/:gameId',
    component: GameComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]