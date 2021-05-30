import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private _http:HttpClient) { }

sendRequest(cin:any,equipe:any,club:any,motivation:any,email: any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/demande_event/sendRequest",
      {  cin: cin,
        equipe: equipe,
        club:club,
        motivation:motivation,
        email:email,

      }
    );
}
  getRequests() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/demande_event/getRequests",
      {},
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}

    );
  }
  acceptRequests(id_demande:any,email:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/demande_event/acceptOrDeleteRequests",
      {
        id_demande:id_demande,
        option:"accept",
        email:email
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  DeleteRequests(idDemande:any,email:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/demande_event/acceptOrDeleteRequests",
      {
        idDemande:idDemande,
        option:"delete",
        email:email
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }

  getTeams() {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/roles_and_teams/getTeams",""
    );
  }
}
