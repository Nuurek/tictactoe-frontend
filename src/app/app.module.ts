import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MdButtonModule, MdChipsModule, MdListModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { GameComponent } from "./components/game/game.component";
import { HomeComponent } from "./components/home/home.component";
import { GameEffects } from "./effects/game";
import { RouterEffects } from "./effects/router";
import { CustomRouterStateSerializer, metaReducers, reducers } from "./reducers";
import { GameService } from "./services/game";

@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 30 })
      : [],
    EffectsModule.forRoot([RouterEffects, GameEffects]),
    HttpClientModule,

    MdButtonModule,
    MdListModule,
    MdChipsModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
