export class Document {
  firstName: string;
  lastName: string;
  cin: string;
  classe: string;
  paperType: string;
  description: string;
  date: Date;
  status: string;

  constructor(
    firstName: string,
    lastName: string,
    cin: string,
    classe: string,
    paperType: string,
    description: string,
    date: Date,
    status: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cin = cin;
    this.classe = classe;
    this.paperType = paperType;
    this.description = description;
    this.date = date;
    this.status = status;
  }
}
