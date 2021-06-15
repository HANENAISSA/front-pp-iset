import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Reclamation } from "../../models/reclamation.model";
import { ReclamationService } from "../../services/reclamation.service";
import swal from "sweetalert";

@Component({
  selector: "app-new-reclamation",
  templateUrl: "./new-reclamation.component.html",
  styleUrls: ["./new-reclamation.component.scss"],
})
export class NewReclamationComponent implements OnInit {
  hidden;
  reclamation: Reclamation;
  currentDate = new Date();

  addReclamationForm = new FormGroup({
    type_Reclamation: new FormControl("", Validators.required),
    contenu: new FormControl(""),
    id_statut_reclamation: new FormControl(2),
    date_reclamation: new FormControl(this.currentDate),
    id_user: new FormControl(1),
  });

  constructor(private service: ReclamationService, private router: Router) {}

  ngOnInit() {
    this.hidden = true;
  }

  addReclamation() {
    if (this.addReclamationForm.invalid) {
      this.hidden = false;
    } else {
      const Values = this.addReclamationForm.value;
      this.reclamation = new Reclamation(
        Values.type_Reclamation,
        Values.contenu,
        Values.id_statut_reclamation,
        Values.date_reclamation,
        Values.id_user
      );
      this.service.addReclamation(this.reclamation).subscribe((data) => {
        swal("Ajouté!", "Ajouté avec succès", "success");
        this.router.navigate(["dashboard/reclamations-list"]);
      });
    }
  }
}
