import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Game } from "../models/game";
import * as gameActions from "../actions/game";


export interface State extends EntityState<Game> {
  currentGameId: string;
  errors: Object[];
}

export const adapter = createEntityAdapter<Game>();

export const initialState: State = adapter.getInitialState({
  currentGameId: null,
  errors: []
});

export function reducer(state = initialState, action: gameActions.Actions ): State {
  switch (action.type) {
    case gameActions.ActionTypes.CREATE_GAME_SUCCESS: {
      const game = action.payload.game;

      return adapter.addOne(game, state);
    }

    case gameActions.ActionTypes.JOIN_GAME_SUCCESS: {
      const gameId = action.payload.gameId;
      const playerId = action.payload.playerId;
      
      return adapter.updateOne({
        id: gameId,
        changes: {
          playerId
        }
      }, {
        ...state,
        currentGameId: gameId
      })
    }

    case gameActions.ActionTypes.CREATE_GAME_FAILURE:
    case gameActions.ActionTypes.GAME_ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload.error]
      }
    }

    default: {
      return state;
    }
  }
}
