import { Component, OnInit } from "@angular/core";
import { Reclamation } from "../../models/reclamation.model";
import { ReclamationService } from "../../services/reclamation.service";
import swal from "sweetalert";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-student-reclamations-list",
  templateUrl: "./student-reclamations-list.component.html",
  styleUrls: ["./student-reclamations-list.component.scss"],
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
export class StudentReclamationsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  public search: any = "";
  reclamations:any =[];
  accepted:any =[];
  enAttente:any =[];
  refused:any =[];
  actualId:number;
  constructor(private service: ReclamationService) {
    this.actualId=2;
  }

  ngOnInit() {
    this.refreshData(2);
  }

  refreshData(id :number){
    switch (id) {
      case 1:
        this.service.getReclamations().subscribe((data) => {
          this.accepted = data;
          const acceptedRecs = this.accepted.filter(item => item.id_statut_reclamation === 1);
          this.accepted = acceptedRecs;
        });
        break;
      case 2:
        this.service.getReclamations().subscribe((data) => {
          this.enAttente = data;
          const enAttenteRecs = this.enAttente.filter(item => item.id_statut_reclamation === 2);
          this.enAttente = enAttenteRecs;
        });
        break;
      case 3:
        this.service.getReclamations().subscribe((data) => {
          this.refused = data;
          const refusedRecs = this.refused.filter(item => item.id_statut_reclamation === 3);
          this.refused = refusedRecs;
        });
        break;

      default:
        break;
    }
    this.service.getReclamations().subscribe((data) => {
      this.reclamations = data;
    });
  }

  deleteReclamation(indice: number) {
    this.service.deleteReclamation(indice).subscribe((response) => {
      swal({
        title: "Êtes-vous sûr?",
        text: "Êtes-vous sûr de supprimer cette demande?",
        icon: "warning",
        buttons:[true, true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Le demande a été supprimé avec succès!", {
            icon: "success",
          });
          this.refreshData(this.actualId);
        } else {}
      });
    });
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData(this.actualId);
  }

  changeTab(event){
    const id=event.nextId;
    this.actualId=id;
    this.refreshData(id)
  }
}
