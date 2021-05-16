import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Reclamation } from "../../models/reclamation.model";
import { ReclamationService } from "../../services/reclamation.service";

@Component({
  selector: "app-new-reclamation",
  templateUrl: "./new-reclamation.component.html",
  styleUrls: ["./new-reclamation.component.scss"],
})
export class NewReclamationComponent implements OnInit {
  hidden;
  r : Reclamation;
  currentDate = new Date();

  addReclamationForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    class: new FormControl("", Validators.required),
    reclamationType: new FormControl("", Validators.required),
    reclamationContent: new FormControl("", Validators.required),
    date: new FormControl(this.currentDate),
    status: new FormControl("En attente"),
  });
  constructor(private service: ReclamationService, private router: Router) {}

  ngOnInit() {
    this.hidden = true;
  }

  addReclamation() {
    if (this.addReclamationForm.invalid) {
      this.hidden = false;
    } else {
      const formValues = this.addReclamationForm.value;
      this.r = new Reclamation(
        formValues.firstName,
        formValues.lastName,
        formValues.class,
        formValues.reclamationType,
        formValues.reclamationContent,
        formValues.date,
        formValues.status
      );
      this.service.addReclamation(this.r);
      alert("added succesfully!");
    }
  }
}
