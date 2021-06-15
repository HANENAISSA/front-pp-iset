import { Component, OnInit } from "@angular/core";
import { Reclamation } from "../../models/reclamation.model";
import { ReclamationService } from "../../services/reclamation.service";
import swal from "sweetalert";

@Component({
  selector: "app-student-reclamations-list",
  templateUrl: "./student-reclamations-list.component.html",
  styleUrls: ["./student-reclamations-list.component.scss"],
})
export class StudentReclamationsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  public search: any = "";
  reclamations:any =[];
  constructor(private service: ReclamationService) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.service.getReclamationsEnAttente().subscribe(data => this.reclamations = data);
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
          this.refreshData();
        } else {}
      });
    });
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }
}
