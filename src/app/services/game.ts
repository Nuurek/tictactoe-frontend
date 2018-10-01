import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Game } from "../models/game";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class GameService {
  GAMES_PATH = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  public createGame() {
    return this.http.post<Game>(this.GAMES_PATH, {});
  }
}