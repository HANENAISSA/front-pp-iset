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

  getClubUsers(idclub:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/getClubUsers",
      {
        idclub:idclub
      }
    );
  }
  getMembres(idclub:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/getMembres",
      {
        idclub:idclub
      }
    );
  }
  getResponsables(idclub:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/user/getResponsables",
      {
        idclub:idclub
      }
    );
  }
  getuserClubs() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/club/getuserClubs", ""
      ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  ///club/getClubYouAreAdminIn

  getClubYouAreAdminIn() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/club/getClubYouAreAdminIn", ""
      ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  getadmin(idclub:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/club//isAdmin", {
        id_club:idclub
      }
      ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
}
