import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss']
})
export class NewDocumentComponent implements OnInit {
  hidden;
  d : Document;
  currentDate = new Date();

  addDocForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    cin: new FormControl("", [Validators.required, Validators.minLength(8)]),
    class: new FormControl("", Validators.required),
    paperType: new FormControl("", Validators.required),
    description: new FormControl(""),
    date: new FormControl(this.currentDate),
    status: new FormControl("En attente")
  });

  constructor(private service: DocumentService, private router: Router) {}

  ngOnInit() {
    this.hidden = true;
  }

  addDocument() {
    if (this.addDocForm.invalid) {
      this.hidden = false;
    } else {
      // const formValues = this.addDocForm.value;
      // this.d = new Document(
      //   formValues.firstName,
      //   formValues.lastName,
      //   formValues.cin,
      //   formValues.class,
      //   formValues.paperType,
      //   formValues.description,
      //   formValues.date,
      //   formValues.status
      // );
      // this.service.addDocument(this.d);
      this.router.navigate(["dashboard/documents-list"]);
    }
  }
}
