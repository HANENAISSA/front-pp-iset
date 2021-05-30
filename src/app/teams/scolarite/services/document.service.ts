import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseURL="http://127.0.0.1:5010";
  constructor(private httpClient: HttpClient) { }

  // Get Administratif Papers Filtred By Status
  DocumentEnAttente(){
    return this.httpClient.get<Document[]>(this.baseURL+'/getFileEnAttente/getEnAttente')
      .pipe( catchError(this.handleError) );
  }
  DocumentAccepted(){
    return this.httpClient.get<Document[]>(this.baseURL+'/getFileAccepter/getAccpeter')
      .pipe( catchError(this.handleError) );
  }
  DocumentRefused(){
    return this.httpClient.get<Document[]>(this.baseURL+'/getFileRefuser/getRefuser')
      .pipe( catchError(this.handleError) );
  }
  getAllDocument(){
    return this.httpClient.get<Document[]>(this.baseURL+'/getAllFile/getAll')
      .pipe( catchError(this.handleError) );
  }
  // GetAll Paper Types
  getAllPaperTypes(){
    return this.httpClient.get(this.baseURL+'/getPaperTypes/getAllPaperTypes')
      .pipe( catchError(this.handleError) );
  }
  // Delete Administratif Paper
  deleteDocument(indice : number){
    return this.httpClient.delete(this.baseURL+'/DeleteFile/delete/'+indice);
  }
  // Creat new Paper
  addDocument(document: Document){
    return this.httpClient.post<Document[]>(this.baseURL+'/addfile/add',document);
  }

  acceptDocumet(i: number){
    let data = JSON.parse(window.localStorage.getItem("documents"));
    data[i].status = "Accepté - En train de Préparation";
    localStorage.setItem("documents", JSON.stringify(data));
  }

  refuseDocument(i: number){
    // let data = JSON.parse(window.localStorage.getItem("documents"));
    // data[i].status = "Refuser";
    // localStorage.setItem("documents", JSON.stringify(data));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
