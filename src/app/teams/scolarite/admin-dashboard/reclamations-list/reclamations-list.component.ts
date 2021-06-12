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
  reclamations = [];
  reclamationsEnAttente = [];
  public search:any = '';
  actualId:number;

  constructor(private service: ReclamationService, private modal: NgbModal) {
    this.actualId=1;
  }

  ngOnInit() {
    this.refreshData(1);
  }


  refreshData(id :number){
    switch (id) {
      case 1:
        this.service.getReclamationsEnAttente().subscribe((data) => {
          this.reclamationsEnAttente = data;
        });
        break;
      case 2:
      this.service.getReclamations().subscribe((data) => {
        this.reclamations = data;
        const filtredRecs = this.reclamations.filter(item => item.id_statut_reclamation === 1);
        this.reclamations = filtredRecs;
      });
        break;

      default:
        break;
    }
    this.service.getReclamations().subscribe((data) => {
      this.reclamations = data;
    });
  }

  accept(i: number) {
    // this.service.acceptReclamation(i);
    // this.refreshData();
  }

  refuse(i:number){
    this.service.refuseReclamation(i).subscribe((data) => {
      alert("Reclamation Refused");
      this.refreshData(this.actualId);
    })
  }

  openReclamModal(reclam) {
    const modalRef = this.modal.open(reclamationDetailsModal, {
      centered: true,
      backdrop: "static",
    });

    let data = {
      firstName: reclam.nom,
      lastName: reclam.prenom,
      classe: reclam.id_classe,
      reclamationContent: reclam.contenu,
      date: reclam.date_reclamation,
      reclamationType: reclam.type_reclamation,
      status: reclam.libelle_statut_reclamation,
    };
    modalRef.componentInstance.reclamationDetails = data;
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