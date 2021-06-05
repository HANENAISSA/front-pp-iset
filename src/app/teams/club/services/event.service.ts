import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http:HttpClient) { }

  getevents(){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/evenment/getevents",
      {},
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  //description	date_debut	date_fin	heure_debut	heure_fin	statut
  //	url_image	url_event	id_membre	id_club
  addevent(file:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/evenment/addevent",  file ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  ///evenment/getClubEvents
  getClubEvents(id_club:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/evenment/getClubEvents",
      {
        id_club:id_club
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
}
