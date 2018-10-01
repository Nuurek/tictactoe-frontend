import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const ROUTER_ACTIONS_PREFIX = '[Router]';

export const GO = `${ROUTER_ACTIONS_PREFIX} Go`;
export const BACK = `${ROUTER_ACTIONS_PREFIX} Back`;
export const FORWARD = `${ROUTER_ACTIONS_PREFIX} Forward`;

export class Go implements Action {
  readonly type = GO;

  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;
