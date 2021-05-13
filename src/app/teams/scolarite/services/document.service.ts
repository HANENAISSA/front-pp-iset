import { Injectable } from '@angular/core';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents : Document[] = [];
  constructor() { }

  saveDocuments(){
    window.localStorage.setItem("documents", JSON.stringify(this.documents));
  }

  getDocuments(){
    if(window.localStorage.getItem("documents")){
      this.documents = JSON.parse(window.localStorage.getItem("documents"));
    }
    else{
      this.documents = [];
    }

    return this.documents;

  }

  addDocument(d : Document){
    this.documents.push(d);
    this.saveDocuments();
  }

  changeStatus(i : number){
    let data = JSON.parse(window.localStorage.getItem("documents"));
    data[i].status = "Accepté - En train de Préparation";
    localStorage.setItem('documents', JSON.stringify(data));
  }

  deleteDocument(indice : number){
    if(confirm("Etes-vous sûre de vouloir supprimer cette demande : " + this.documents[indice].paperType)){
      this.documents.splice(indice, 1);
      this.saveDocuments();
    }
  }
}
