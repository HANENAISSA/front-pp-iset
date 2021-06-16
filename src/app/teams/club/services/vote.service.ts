import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _http:HttpClient) { }

  addsondage(titre:any, idclub:any){
    return this._http.post<any>(
    "http://127.0.0.1:5010" + "/sondage/addsondage",   {
       titre:titre,
       idclub:idclub
    },
    {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}

  );
  }
  getsondage(idclub:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/sondage/getsondage",   {

         idclub:idclub
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  addVote( statut:any,idsondage:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/sondage/addVote",   {
        statut:statut,
         idsondage:idsondage

      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  getVotes(idsondage:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/sondage/getVotes",   {

         idsondage:idsondage
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  getVote(statut:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/sondage/getVote",   {

         statut:statut
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  // 127.0.0.1:5010/sondage/deletesondage idsondage ou token
  deleteSondage(idsondage:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/sondage/deletesondage",   {

        idsondage:idsondage

      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }

}
