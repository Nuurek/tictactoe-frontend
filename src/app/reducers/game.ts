import { createEntityAdapter, EntityState } from "@ngrx/entity";

import * as gameActions from "../actions/game";
import { Game } from "../models/game";

export interface State extends EntityState<Game> {
  currentGameId: string;
  errors: Object[];
}

export const adapter = createEntityAdapter<Game>();

export const initialState: State = adapter.getInitialState({
  currentGameId: null,
  errors: []
});

export function reducer(
  state = initialState,
  action: gameActions.Actions
): State {
  switch (action.type) {
    case gameActions.ActionTypes.CREATE_GAME_SUCCESS: {
      const game = action.payload.game;

      return adapter.addOne(game, state);
    }

    case gameActions.ActionTypes.JOIN_GAME_ACCEPT:
    case gameActions.ActionTypes.JOIN_GAME_REJECT: {
      const game = action.payload.game;

      const updatedState = {
        ...state,
        currentGameId: game.id
      };

      if (state.entities[game.id]) {
        return adapter.updateOne(
          {
            id: game.id,
            changes: game
          },
          updatedState
        );
      } else {
        return adapter.addOne(game, updatedState);
      }
    }

    case gameActions.ActionTypes.SET_GAME_STATE: {
      const game = action.payload.game;

      if (state.entities[game.id]) {
        return adapter.updateOne(
          {
            id: game.id,
            changes: game
          },
          state
        );
      } else {
        return adapter.addOne(game, state);
      }
    }

    case gameActions.ActionTypes.CREATE_GAME_FAILURE:
    case gameActions.ActionTypes.GAME_ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload.error]
      };
    }

    default: {
      return state;
    }
  }
}

export const selectCurrentGame = (state: State) => state.entities[state.currentGameId];
