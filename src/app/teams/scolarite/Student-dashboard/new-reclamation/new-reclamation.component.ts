import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-new-reclamation",
  templateUrl: "./new-reclamation.component.html",
  styleUrls: ["./new-reclamation.component.scss"],
})
export class NewReclamationComponent implements OnInit {
  hidden;
  // d : Document;
  currentDate = new Date();

  addReclamationForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    cin: new FormControl("", [Validators.required, Validators.minLength(8)]),
    class: new FormControl("", Validators.required),
    reclamationType: new FormControl("", Validators.required),
    reclamationContent: new FormControl("", Validators.required),
    date: new FormControl(this.currentDate),
    status: new FormControl("En attente"),
  });
  constructor() {}

  ngOnInit() {
    this.hidden = true;
  }

  addReclamation() {
    if (this.addReclamationForm.invalid) {
      this.hidden = false;
    } else {
      alert(JSON.stringify(this.addReclamationForm.value));
    }
  }
}
