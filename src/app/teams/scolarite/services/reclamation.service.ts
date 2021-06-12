import { Injectable } from "@angular/core";
import { Reclamation } from "../models/reclamation.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ReclamationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private baseURL = "http://127.0.0.1:5010";
  constructor(private httpClient: HttpClient) {}

  getReclamations():Observable<Reclamation[]>{
    return this.httpClient.get<Reclamation[]>(this.baseURL+'/getReclamtionAccepter/getAccpeter',this.httpOptions)
  }

  getReclamationsEnAttente():Observable<Reclamation[]>{
    return this.httpClient.get<Reclamation[]>(this.baseURL+'/getReclamtionEnAttente/getEnAttente',this.httpOptions)
  }

  addReclamation(reclamation : Reclamation):Observable<any>{
    return this.httpClient.post<Reclamation[]>(this.baseURL+'/addReclamation/addReclamation',JSON.stringify(reclamation),this.httpOptions)
  }

  acceptReclamation(i: number) {
    // let data = JSON.parse(window.localStorage.getItem("reclamations"));
    // data[i].status = "Accepté - En train de Préparation";
    // localStorage.setItem("reclamations", JSON.stringify(data));
  }

  refuseReclamation(i: number) {
    return this.httpClient.put<Reclamation[]>(this.baseURL+'/updateReclamation/updateReclamationRefuser'+'/'+i,this.httpOptions)
  }

  deleteReclamation(indice: number) {
    if(confirm("Etes-vous sûre de vouloir supprimer cette demande ? ")){
      return this.httpClient.delete<Reclamation[]>(this.baseURL+'/DeleteReclamation/DeleteReclamation'+'/'+indice,this.httpOptions)
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
