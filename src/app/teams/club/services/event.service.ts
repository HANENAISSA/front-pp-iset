import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http:HttpClient) { }

  getevents(){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/getevents",
      {},
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  //description	date_debut	date_fin	heure_debut	heure_fin	statut
  //	url_image	url_event	id_membre	id_club
  addevent(file:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/addevent",  file ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  ///evenment/getClubEvents
  getClubEvents(id_club:any) {
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/getClubEvents",
      {
        id_club:id_club
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  //calendrier
  // /calander/getcalender id_club
  getcalendrier(id_club:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/calendar/getcalendar",
      {
        id_club:id_club
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  // /calander/addcalender "id_club"temps"date"description"
  addTOcalendrier(id_club:any,temps:any,date:any,description:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/calendar/addcalendar",
      {
        id_club:id_club,
        temps:temps,
        date:date,
        description:description
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
  // 127.0.0.1:5010/evenment/deleteEvent
  deleteEvent(id_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/deleteEvent",
      {
        id_event:id_event
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  //  127.0.0.1:5010/calander/deletecalender id_calendrier ou tooken
  deleteTask(id_calendrier:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/calendar/deletecalendar",
      {
        id_calendrier:id_calendrier
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }

  participer(id_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/addParticipation",
      {
        id_event:id_event
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }

  getallparticipation(id_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/getAllParticipation",
      {
        id_event:id_event
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  confirmer(id_participation:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/updatestatut",
      {
        id_participation:id_participation
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  deleteparticipant(id_participation:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/deleteParticipation",
      {
        id_participation:id_participation
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
}
