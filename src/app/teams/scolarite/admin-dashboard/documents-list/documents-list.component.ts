import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class DocumentsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  documents: Document[];
  public search:any = '';
  constructor(private service: DocumentService, private modalService: NgbModal) { }

  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.documents = this.service.getDocuments();
  }

  deleteDocument(indice: number) {
    this.service.deleteDocument(indice);
  }

  accept(i: number) {
    this.service.acceptDocumet(i);
    this.refreshData();
    console.log(i);
  }
  refuse(i:number){
    this.service.refuseDocument(i);
    this.refreshData();
  }

  openModal(document) {
    const modalRef = this.modalService.open(DocDetailsModal, {
      centered: true,
      backdrop: "static",
    });

    let data = {
      firstName: document.firstName,
      lastName: document.lastName,
      cin: document.cin,
      classe: document.classe,
      description: document.description,
      date: document.date,
      paperType: document.paperType,
      status: document.status,
    };

    modalRef.componentInstance.demandDetails = data;
  }

  filterItemsByType(type){
    return this.documents.filter(x => x.status == type);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }

}

@Component({
  selector: "details-modal",
  templateUrl: "./details-modal.component.html",
})
export class DocDetailsModal implements OnInit {
  @Input() demandDetails;

  ngOnInit() {
  }

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
