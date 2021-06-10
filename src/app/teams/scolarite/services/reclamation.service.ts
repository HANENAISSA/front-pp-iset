import { Injectable } from '@angular/core';
import { Reclamation } from '../models/reclamation.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  reclamations : Reclamation[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient:HttpClient) { }

  saveReclamations(){
    window.localStorage.setItem("reclamations", JSON.stringify(this.reclamations));
  }

  getReclamations():Observable<Reclamation[]>{
      return this.httpClient.get<Reclamation[]>(' http://127.0.0.1:5010/getAllReclamtion/getAllReclamtion',this.httpOptions)

    }

  addReclamation(r : Reclamation){
    this.reclamations.push(r);
    this.saveReclamations();
  }

  acceptReclamation(i: number){
    let data = JSON.parse(window.localStorage.getItem("reclamations"));
    data[i].status = "Accepté - En train de Préparation";
    localStorage.setItem("reclamations", JSON.stringify(data));
  }

  refuseReclamation(i: number){
    let data = JSON.parse(window.localStorage.getItem("reclamations"));
    data[i].status = "Refuser";
    localStorage.setItem("reclamations", JSON.stringify(data));
  }

  deleteReclamation(indice : number){
    if(confirm("Etes-vous sûre de vouloir supprimer cette demande : " + this.reclamations[indice].reclamationType)){
      this.reclamations.splice(indice, 1);
      this.saveReclamations();
    }
  }
}
