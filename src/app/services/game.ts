import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { environment } from "../../environments/environment";
import * as gameActions from "../actions/game";
import { Game } from "../models/game";
import * as fromRoot from "../reducers";

enum MessageType {
  ACCEPTED = 'accepted'
}

@Injectable()
export class GameService {
  GAMES_API_PATH = `${environment.apiUrl}/api/games`;
  GAMES_WS_PATH = `${environment.wsUrl}/ws/games`;
  private socket: WebSocket;
  private gameId: string;
  private joinGameSubject: Subject<string>;

  constructor(
    protected http: HttpClient,
    protected store: Store<fromRoot.State>
  ) {}

  public createGame(): Observable<Game> {
    return this.http.post<Game>(this.GAMES_API_PATH, {});
  }

  public fetchGame(gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.GAMES_API_PATH}/${gameId}`);
  }

  public joinGame(gameId: string, playerId: string): Observable<string> {
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

    this.joinGameSubject = new Subject<string>();
    return this.joinGameSubject.asObservable();
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
    switch (messageType) {
      case MessageType.ACCEPTED: {
        const playerId = content.player_id;
        this.joinGameSubject.next(playerId);
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
}
