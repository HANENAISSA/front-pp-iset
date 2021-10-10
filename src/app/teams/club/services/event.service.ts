import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnonymousSubject } from 'rxjs/internal/Subject';

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
  addTOcalendrier(id_club:any,titre:any,temps:any,date:any,description:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/calendar/addcalendar",
      {
        id_club:id_club,
        temps:temps,
        date:date,
        titre :titre,
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
  confirmer(id_participation:any,event_name:any,email:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/updatestatut",
      {
        id_participation:id_participation,
        event_name:event_name,
        email:email
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
 
  getOneUser(){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/participation/getOneUserParti",
      {},
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  
  getOneEvent(id_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/getOneEvent",
      {
        id_event:id_event
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  //updateEvent
  /*  updateEvent(file:any,id_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/updateEvent",
      file , 
        
      
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  */
  updateEvent(id_event:any,titre_event:any,description:any, date_debut:any,date_fin:any,heure_debut:any,heure_fin:any,statut:any,url_event:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/event/updateEvent",
      {
        id_event:id_event,
        titre_event: titre_event,
        description:description,
        date_debut:date_debut,
        date_fin:date_fin,
        heure_debut:heure_debut,
        heure_fin:heure_fin,
        statut:statut,
        url_event:url_event
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
}
