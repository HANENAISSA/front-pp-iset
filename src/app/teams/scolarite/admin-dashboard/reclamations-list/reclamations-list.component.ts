import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reclamation } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrls: ['./reclamations-list.component.scss']
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
