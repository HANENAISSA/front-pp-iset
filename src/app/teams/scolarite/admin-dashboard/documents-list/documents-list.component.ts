import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert";
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
    this.actualId=2;
  }

  ngOnInit() {
    this.refreshData(2);
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
          this.DocumentsEnAttente = data;
          const EnattenteDocs = this.DocumentsEnAttente.filter(item => item.id_statut_papier === 3 );
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


  accept(id) {
    // let index = id;
    // document.id_statut_papier = 1;
    // this.documents[index] = document;
    // this.service.acceptDocumet(id).subscribe(response => {
    //   this.refreshData(this.actualId);
    // },
    // error => {
    //   console.log(error);
    // });
    this.service.acceptDocumet(id).subscribe(
      (Response)=>{
        swal("Document administratif accepté!", "", "success");
        this.refreshData(this.actualId);
      },(error)=>{
        console.log(error);
      }
    )
  }
  refuse(id) {
    this.service.refuseDocument(id).subscribe(
      (Response)=>{
        swal("Document administratif rejeté!", "", "success");
        this.refreshData(this.actualId);
      },(error)=>{
        console.log(error);
      }
    )
    // let index = id;
    // document.id_statut_papier = 2;
    // this.documents[index] = document;
    // this.service.refuseDocument(id).subscribe(response => {
    //   swal("Document administratif rejeté!", "", "success");
    //   this.refreshData(this.actualId);
    // },
    // error => {
    //   console.log(error);
    // });
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