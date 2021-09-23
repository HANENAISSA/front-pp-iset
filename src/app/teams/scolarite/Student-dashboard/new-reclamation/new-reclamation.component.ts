import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
  // ************ GET HTML ELEMENTS ************
    // DropDowns HTML Elements
  @ViewChild('oldSpecialty',{static: false}) oldSpecialty: ElementRef;
  @ViewChild('newSpecialty',{static: false}) newSpecialty: ElementRef;
  @ViewChild('oldClass',{static: false}) oldClass: ElementRef;
  @ViewChild('newClass',{static: false}) newClass: ElementRef;
  @ViewChild('oldSection',{static: false}) oldSection: ElementRef;
  @ViewChild('newSection',{static: false}) newSection: ElementRef;
  @ViewChild('class_note',{static: false}) class_note: ElementRef;
  @ViewChild('sem_note',{static: false}) sem_note: ElementRef;
  @ViewChild('mat_note',{static: false}) mat_note: ElementRef;
  @ViewChild('class_exam',{static: false}) class_exam: ElementRef;
  @ViewChild('sem_exam',{static: false}) sem_exam: ElementRef;
  @ViewChild('mat_exam',{static: false}) mat_exam: ElementRef;
  @ViewChild('class_inscr',{static: false}) class_inscr: ElementRef;
  @ViewChild('sem_inscr',{static: false}) sem_inscr: ElementRef;
  @ViewChild('mat_inscr',{static: false}) mat_inscr: ElementRef;
  // ************ GET HTML ELEMENTS ************

  hidden;
  currentDate = new Date();
  reclamation: Reclamation;
  reclamationTypes:any =[];
  specialiteDiv;
  specialite:any =['Specialite1','Specialite2','Specialite3'];
  classDiv;
  class:any =['class1','class2','class3'];
  sectionDiv;
  section:any =['Section1','Section2','Section3'];
  noteDiv;
  examenDiv;
  inscriptionDiv;
  semestres:any =['S1','S2'];
  matieres:any =['matiere1','matiere2','matiere3'];

  constructor(private service: ReclamationService, private router: Router) {}

  ngOnInit() {
    this.hidden = true;
    this.specialiteDiv = true;
    this.classDiv = true;
    this.sectionDiv = true;
    this.noteDiv = true;
    this.examenDiv = true;
    this.inscriptionDiv = true;
    this.service.getAllReclamTypes().subscribe(data=>{
      this.reclamationTypes = data;
    });
  }

  // Add New Reclamation
  addReclamationForm = new FormGroup({
    id_type_Reclamation: new FormControl("", Validators.required),
    // contenu: new FormControl(""),
    id_statut_reclamation: new FormControl(2),
    date_reclamation: new FormControl(this.currentDate),
    id_user: new FormControl(1),
  });
  addReclamation() {
    if (this.addReclamationForm.invalid) {
      this.hidden = false;
    } else {
      const Values = this.addReclamationForm.value;
      this.reclamation = new Reclamation(
        Values.id_type_Reclamation,
        // Values.contenu,
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

  // Show the Options of every Reclamation Type
  showOptions(idType){
    switch (idType){
      case '1':
        this.specialiteDiv = false;
        this.sectionDiv = true;
        this.classDiv = true;
        this.noteDiv = true;
        this.examenDiv = true;
        this.inscriptionDiv = true;
        break;
      case '2':
        this.specialiteDiv = true;
        this.sectionDiv = true;
        this.classDiv = false;
        this.noteDiv = true;
        this.examenDiv = true;
        this.inscriptionDiv = true;
        break;
      case '3':
        this.specialiteDiv = true;
        this.sectionDiv = false;
        this.classDiv = true;
        this.noteDiv = true;
        this.examenDiv = true;
        this.inscriptionDiv = true;
        break;
      case '4':
        this.specialiteDiv = true;
        this.sectionDiv = true;
        this.classDiv = true;
        this.noteDiv = false;
        this.examenDiv = true;
        this.inscriptionDiv = true;
        break;
      case '5':
        this.specialiteDiv = true;
        this.sectionDiv = true;
        this.classDiv = true;
        this.noteDiv = true;
        this.examenDiv = false;
        this.inscriptionDiv = true;
        break;
      case '6':
        this.specialiteDiv = true;
        this.sectionDiv = true;
        this.classDiv = true;
        this.noteDiv = true;
        this.examenDiv = true;
        this.inscriptionDiv = false;
        break;
      default:
        // idType = '';
        break;
    }
  }

  // Reset all DropDowns when change the type of the Reclamation
  ResetDropdownValues() {
    this.oldSpecialty.nativeElement.selectedIndex = 0;
    this.newSpecialty.nativeElement.selectedIndex = 0;
    this.oldClass.nativeElement.selectedIndex = 0;
    this.newClass.nativeElement.selectedIndex = 0;
    this.oldSection.nativeElement.selectedIndex = 0;
    this.newSection.nativeElement.selectedIndex = 0;
    this.class_note.nativeElement.selectedIndex = 0;
    this.sem_note.nativeElement.selectedIndex = 0;
    this.mat_note.nativeElement.selectedIndex = 0;
    this.class_exam.nativeElement.selectedIndex = 0;
    this.sem_exam.nativeElement.selectedIndex = 0;
    this.mat_exam.nativeElement.selectedIndex = 0;
    this.class_inscr.nativeElement.selectedIndex = 0;
    this.sem_inscr.nativeElement.selectedIndex = 0;
    this.mat_inscr.nativeElement.selectedIndex = 0;
  }
}
