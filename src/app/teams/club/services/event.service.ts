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
  addevent(titre_event:any,description:any,date_debut:any , date_fin:any, heure_debut:any ,heure_fin:any, statut:any,
    url_image:any,url_event,id_membre:any,idclub:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "evenment/addevent",   {
        titre_event:titre_event,
         description:description,
         date_debut:date_debut,
         date_fin:date_fin,
         heure_debut:heure_debut,
         heure_fin:heure_fin,
         url_image:url_image,
         url_event:url_event,
         id_membre:id_membre,
         id_club:idclub,
      },
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
