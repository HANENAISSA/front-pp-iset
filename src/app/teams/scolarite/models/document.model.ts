export class Document {
  id_papier: number;
  raison: string;
  date: Date;
  id_type_papier: number;
  id_user : number;
  id_statut_papier: number;
  constructor(raison: string,date: Date,id_type_papier: number,id_user: number,id_statut_papier: number){
    this.raison = raison;
    this.date = date;
    this.id_type_papier = id_type_papier;
    this.id_user = id_user;
    this.id_statut_papier = id_statut_papier;
  }
}
