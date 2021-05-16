export class Reclamation {
  firstName: string;
  lastName: string;
  classe: string;
  reclamationType: string;
  reclamationContent: string;
  date: Date;
  status: string;

  constructor(
    firstName: string,
    lastName: string,
    classe: string,
    reclamationType: string,
    reclamationContent: string,
    date: Date,
    status: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.classe = classe;
    this.reclamationType = reclamationType;
    this.reclamationContent = reclamationContent;
    this.date = date;
    this.status = status;
  }
}
