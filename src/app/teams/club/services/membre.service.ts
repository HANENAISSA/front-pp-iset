import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  constructor(private _http:HttpClient) { }

  getRoles() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/roles_and_teams/getroles",""

    );
  }
  getTeams() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/roles_and_teams/getTeams",""
    );
  }
  getUser(id_membre:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/getOneUser",
      {
        id_membre:id_membre
      }
    );
  }
}
