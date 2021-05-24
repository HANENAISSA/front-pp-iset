import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reclamation } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrls: ['./reclamations-list.component.scss'],
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
export class ReclamationsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  reclamations: Reclamation[];
  public search:any = '';
  constructor(private service: ReclamationService, private modal: NgbModal) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.reclamations = this.service.getReclamations();
  }

  filterItemsByType(type){
    return this.reclamations.filter(x => x.status == type);
  }

  accept(i: number) {
    this.service.acceptReclamation(i);
    this.refreshData();
  }

  refuse(i:number){
    this.service.refuseReclamation(i);
    this.refreshData();
  }

  openReclamModal(reclam) {
    const modalRef = this.modal.open(reclamationDetailsModal, {
      centered: true,
      backdrop: "static",
    });

    let data = {
      firstName: reclam.firstName,
      lastName: reclam.lastName,
      classe: reclam.classe,
      reclamationContent: reclam.reclamationContent,
      date: reclam.date,
      reclamationType: reclam.reclamationType,
      status: reclam.status,
    };
    modalRef.componentInstance.reclamationDetails = data;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }

}

@Component({
  selector: "reclamation-details",
  templateUrl: "./reclamation-details.component.html",
})
export class reclamationDetailsModal implements OnInit {
  @Input() reclamationDetails;

  ngOnInit() {
  }

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
