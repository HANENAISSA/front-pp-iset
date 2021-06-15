import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';
import swal from "sweetalert";

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss']
})
export class NewDocumentComponent implements OnInit {
  hidden;
  currentDate = new Date();
  paperTypes:any =[];

  addDocForm = new FormGroup({
    id_type_papier: new FormControl("", Validators.required),
    raison: new FormControl(""),
    date: new FormControl(this.currentDate),
    id_user: new FormControl(1),
    status: new FormControl(3)
  });

  constructor(private service: DocumentService, private router: Router) {}

  ngOnInit() {
    this.hidden = true;
    this.service.getAllPaperTypes().subscribe(data=>{
      this.paperTypes = data;
    });
  }

  addDocument() {
    if (this.addDocForm.invalid) {
      this.hidden = false;
    } else {
      const formValues = this.addDocForm.value;
      const newDoc = new Document(formValues.raison,formValues.date,parseInt(formValues.id_type_papier),formValues.id_user,formValues.status);
      this.service.addDocument(newDoc).subscribe((data)=>{
        swal("Ajouté!", "Ajouté avec succès", "success");
        this.router.navigate(["dashboard/documents-list"]);
      })
    }
  }
}
