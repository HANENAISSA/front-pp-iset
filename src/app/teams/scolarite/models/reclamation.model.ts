export class Reclamation {
  constructor(
   private type_reclamation: any,
   private contenu: any,
   private id_statut_reclamation:any,
   private date_reclamation: any,
   private id_user: any
  ){}

public get id_statut_reclamations(): any {
    return this.id_statut_reclamation;
  }
  public set id_statut_reclamations(value: any) {
    this.id_statut_reclamation = value;
  }
  public get contenus(): any {
    return this.contenu;
  }
  public set contenus(value: any) {
    this.contenu = value;
  }
  public get Type_Reclamations(): any {
    return this.type_reclamation;
  }
  public set id_Type_Reclamations(value: any) {
    this.type_reclamation = value;
  }
  public get date_reclamtions(): any {
    return this.date_reclamation;
  }
  public set date_reclamtions(value: any) {
    this.date_reclamation = value;
  }
  public get id_users(): any {
    return this.id_user;
  }
  public set id_users(value: any) {
    this.id_user = value;
  }
}
