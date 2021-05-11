import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private _http:HttpClient) { }
  getClubs() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/club/getclubs", ""
    );
  }

  getClubUsers(Idclub:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/getClubUsers",
      {
        Idclub:Idclub
      }
    );
  }

  getuserClubs() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/club/getuserClubs", ""
    );
  }
}
