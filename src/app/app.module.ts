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
import { HomeComponent } from "./components/home/home.component";
import { RouterEffects } from "./effects/router";
import { CustomRouterStateSerializer, metaReducers, reducers } from "./reducers";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 30 })
      : [],
    EffectsModule.forRoot([RouterEffects]),
    
    MdButtonModule,
    MdListModule,
    MdChipsModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
