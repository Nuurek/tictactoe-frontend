import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import * as gameActions from "../actions/game";
import { APIGame, Game } from "../models/game";
import * as fromRoot from "../reducers";

enum MessageType {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  GAME_STATE = 'game_state'
}

@Injectable()
export class GameService {
  GAMES_API_PATH = `${environment.apiUrl}/api/games`;
  GAMES_WS_PATH = `${environment.wsUrl}/ws/games`;
  private socket: WebSocket;
  private gameId: string;

  constructor(
    protected http: HttpClient,
    protected store: Store<fromRoot.State>
  ) {}

  public createGame(): Observable<Game> {
    return this.http
      .post<APIGame>(this.GAMES_API_PATH, {})
      .map(apiGame => this.mapAPIToLocal(apiGame));
  }

  public joinGame(gameId: string, playerId: string): void {
    this.gameId = gameId;
    let url = `${this.GAMES_WS_PATH}/${this.gameId}`;

    if (playerId) {
      url += `?player_id=${playerId}`;
    }

    this.socket = new WebSocket(url);
    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onclose = this.onClose;
  }

  public exitGame() {
    this.gameId = undefined;
    this.socket.close();
  }

  private onOpen(message) {
    console.log('Open');
  }

  private onMessage(message) {
    const data = JSON.parse(message.data);

    const messageType = data.type;
    const content = data.content;
    const game = this.mapAPIToLocal(content.game);
    switch (messageType) {
      case MessageType.ACCEPTED: {
        this.store.dispatch(new gameActions.JoinGameAccept({ game }));
        break;
      }

      case MessageType.REJECTED: {
        this.store.dispatch(new gameActions.JoinGameReject({ game }));
        break;
      }

      case MessageType.GAME_STATE: {
        this.store.dispatch(new gameActions.SetGameState({ game }));
        break;
      }
    }
  }

  private onError(error) {
    this.store.dispatch(new gameActions.GameError({ error: {} }));
  }

  private onClose(message) {
    console.log('Close');
  }

  private mapAPIToLocal(apiGame: APIGame): Game {
    const game: Game = {
      id: apiGame.id,
      fields: apiGame.fields,
      firstPlayer: apiGame.first_player,
      winner: apiGame.winner,
      currentTurn: apiGame.current_turn
    };
    if (apiGame.player_id) {
      game.playerId = apiGame.player_id;
    }
    return game;
  }

  private mapLocalToAPI(game: Game): APIGame {
    return {
      id: game.id,
      player_id: game.playerId,
      fields: game.fields,
      first_player: game.firstPlayer,
      winner: game.winner,
      current_turn: game.currentTurn
    };
  }
}
