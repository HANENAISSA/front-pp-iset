import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ReclamationService } from "../../services/reclamation.service";
import swal from "sweetalert";

@Component({
  selector: "app-reclamation-detail",
  templateUrl: "./reclamation-detail.component.html",
  styleUrls: ["./reclamation-detail.component.scss"],
})
export class ReclamationDetailComponent implements OnInit {
  id: number;
  response: string;
  reclamation = [];
  hidden;
  btnName;
  btnColor;
  selected;
  options = ["Reponse 1", "Reponse 2", "Reponse 3"];
  constructor(
    private route: ActivatedRoute,
    private service: ReclamationService,
    private router :Router
  ) {}

  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
   });
  }

  goBack(){
    this;this.router.navigate(["/dashboard/admin-reclamations-list"]);
  }

  responseForm = new FormGroup({
    msgResponse: new FormControl("", Validators.required),
  });

  ngOnInit() {
    this.hidden = true;
    this.btnName = "Ajouter Une Reponse";
    this.btnColor = "primary";
    this.selected = false;
    this.id = this.route.snapshot.params["id"];
    this.service.getReclamationById(this.id).subscribe((data) => {
      this.reclamation = data;
    });
  }

  showAddMsg() {
    if (this.hidden) {
      this.hidden = false;
      this.btnName = "Annuler";
      this.btnColor = "danger";
    } else {
      this.hidden = true;
      this.btnName = "Ajouter Une Reponse";
      this.btnColor = "primary";
    }
  }

  add() {
    let msg = (document.getElementById("msg") as HTMLTextAreaElement).value;
    this.options.push(msg);
    this.response = this.options[this.options.length - 1];
    this.hidden = true;
    this.btnName = "Ajouter Une Reponse";
    this.btnColor = "primary";
  }

  msgResponse() {
    const data = {
      message: this.response
    };
    this.service.acceptReclamation(this.id, data).subscribe(
      (data) => {
        swal("Reclamation acceptée!", "", "success");
        this.reloadComponent();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
