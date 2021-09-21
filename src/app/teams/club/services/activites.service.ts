import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  constructor(private _http:HttpClient) { }
  
  getclubactivites(idclub:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/activites/getactivites",
      {idclub:idclub},
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  addclubactivites(file:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/activites/addactivite",  file ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  deleteactivites(idclub:any,id_activites:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/activites/deleteactivite",
      {
        idclub:idclub,
        id_activites:id_activites
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
  }
}
