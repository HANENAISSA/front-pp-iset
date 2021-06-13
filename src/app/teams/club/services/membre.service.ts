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
  // /updateUserInfo
  UpdateUser(id_membre:any,email:any,motdepasse:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/updateUserInfo",
      {
        id_membre:id_membre,
        email:email,
        motdepasse:motdepasse
      }
    );
  }
  // /user/updateUserImage
  UpdatePic(file:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/updateUserImage",
      {
        file:file

      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
}
