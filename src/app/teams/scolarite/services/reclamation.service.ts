import { Injectable } from '@angular/core';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  reclamations : Reclamation[] = [];
  constructor() { }

  saveReclamations(){
    window.localStorage.setItem("reclamations", JSON.stringify(this.reclamations));
  }

  getReclamations(){
    if(window.localStorage.getItem("reclamations")){
      this.reclamations = JSON.parse(window.localStorage.getItem("reclamations"));
    }
    else{
      this.reclamations = [];
    }

    return this.reclamations;

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
