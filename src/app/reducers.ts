import { Params, RouterStateSnapshot } from "@angular/router";
import { routerReducer, RouterReducerState, RouterStateSerializer } from "@ngrx/router-store";
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "../environments/environment";
import { ROUTER_ACTIONS_PREFIX } from "./actions/router";
import * as fromGames from "./reducers/game";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  games: fromGames.State;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}

export function freezer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: Action): any {
    const isBlacklisted = Boolean(
      action.type.startsWith(ROUTER_ACTIONS_PREFIX)
    );

    if (isBlacklisted) {
      return reducer(state, action);
    }

    return storeFreeze(reducer)(state, action);
  };
}
export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  games: fromGames.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, freezer]
  : [];
