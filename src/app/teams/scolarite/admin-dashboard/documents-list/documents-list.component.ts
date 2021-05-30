import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Document } from "../../models/document.model";
import { DocumentService } from "../../services/document.service";

@Component({
  selector: "app-documents-list",
  templateUrl: "./documents-list.component.html",
  styleUrls: ["./documents-list.component.scss"],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DocumentsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  public search: any = "";
  documents: any =[];
  doc: any;
  DocumentsAccepted: any =[];
  DocumentsEnAttente: any =[];
  currentDocument = null;
  actualId:number;
  constructor(
    private service: DocumentService,
    private modalService: NgbModal
  ) {
    this.actualId=3;
  }

  ngOnInit() {
    this.refreshData(3);
  }
  refreshData(id:number) {
    switch (id) {
      case 1:
        this.service.getAllDocument().subscribe((data) => {
          this.DocumentsAccepted = data;
          const filtredDocs = this.DocumentsAccepted.filter(item => item.id_statut_papier === 1);
          this.DocumentsAccepted = filtredDocs;
        });
        break;
      case 2:
      this.service.getAllDocument().subscribe((data) => {
        this.documents = data;
      });
        break;
      case 3:
        this.service.getAllDocument().subscribe((data) => {
          this.DocumentsEnAttente = data;
          const EnattenteDocs = this.documents.filter(item => item.id_statut_papier === 3 );
          this.DocumentsEnAttente = EnattenteDocs;
        });
        break;

      default:
        break;
    }
    this.service.getAllDocument().subscribe((data) => {
      this.documents = data;
    });
  }


  accept(id,document) {
    this.service.acceptDocumet(id,document).subscribe(response => {
      let index = id;
      console.log(index);
      document.id_statut_papier == 1;
      this.documents[index] = document;
      console.log(document.id_statut_papier);
      this.refreshData(this.actualId);
      console.log(document.id_statut_papier,"after");
      // this.documents.map(x => {
      //   if(x.id == this.doc.id_papier){
      //     x = this.doc;
      //   }
      // });
      // this.doc.id_statut_papier = 1;
      // console.log(this.doc.id_statut_papier);
    },
    error => {
      console.log(error);
    });
    // data =>{
    //   this.refreshData(this.actualId);
    //   console.warn(data);
    //   console.warn(document);
    // });
  }
  refuse(i: number,document:Document) {
    this.service.acceptDocumet(i,document);
    this.refreshData(this.actualId);
    console.log(i);
  }

  openModal(document) {
    const modalRef = this.modalService.open(DocDetailsModal, {
      centered: true,
      backdrop: "static",
    });

    let data = {
      firstName: document.prenom,
      lastName: document.nom,
      cin: document.cin,
      classe: document.libelle,
      description: document.raison,
      date: document.date,
      paperType: document.libelle_type_papier,
      status: document.libelle_statut_papier,
    };

    modalRef.componentInstance.demandDetails = data;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData(this.actualId);
  }

  changePapier(event){
    const id=event.nextId;
    this.actualId=id;
    this.refreshData(id)
  }
}

@Component({
  selector: "details-modal",
  templateUrl: "./details-modal.component.html",
})
export class DocDetailsModal implements OnInit {
  @Input() demandDetails;

  ngOnInit() {}

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
