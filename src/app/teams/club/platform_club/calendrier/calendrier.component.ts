import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { PopupComponent } from '../../../../popup/popup.component';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClubService } from '../../services/club.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  addtask: boolean=false;
  addevent: boolean=false;
  constructor(private _http:ClubService,public dialog: MatDialog,private http: HttpClient,private modal: NgbModal,private modalService: NgbModal,private e_http: EventService,private route: ActivatedRoute,private router: Router) {}
//event
titre_event: any;
description:any;
date_debut: any;
date_fin: any;
url_image: any;
statut: any;
id_membre: any;
url_event: any;
heure_debut: any;
heure_fin: any;

 //CALENDRIER
 tasks: any=[];
 descriptionCal: any;
 events:any=[]
 temps: any;
 popup:any=false;
 //popup data
 popupData:any={
  description:"",
  end:"",
  start:"",
  title:"",
  heuredebut:"",
  heurefin:"",
  id_calendrier:"",
  id_event:"",
  date: "" ,
  date_debut:"",
  temps:"",
 };

  date: any;
  idclub: any;
  event: any=[];
  titre:any;
  admin: any;
  //configration de calendrier
  view: CalendarView = CalendarView.Month;
  locale: string = 'fr';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  @ViewChild('prochaine', {static: false}) div;

  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getClubEvents()
    this.getcal(this.idclub);
    this.getadmin();

  }
  //button to open event popup
  eventClicked(event){
    this.popup=true
    this.popupData={
      ...event.event
    }
  }
  //close popup
  close(){
    this.popup=false
  }
  //get events of club
  getClubEvents(){
    this.e_http.getClubEvents(this.idclub).subscribe(club => {

      this.events= [...club['data'].map(e=>{

        return{
          start:new Date(e.date_debut),
          end:new Date(e.date_fin),
          title:e.titre_event,
          description:e.description,
          heuredebut:e.heure_debut,
          heurefin:e.heure_fin,
          id_event:e.id_event,
          date:e.date_debut
        }
      })];


    },
    error => {
      console.log(error);
    });
  }
  //pour acceder a page details
  gotodetails(id_event:any ){
    this.router.navigate(['dashboard_club/details/'+this.idclub+'/'+id_event]);
  }
  //get calendrier tasks
  getcal(idclub:any){
    this.e_http.getcalendrier(idclub).subscribe(club => {

      this.events= [...this.events, ...club['data'].map(e=>{
        console.log(club)
        return{
          start:new Date(e.date),
          end:new Date(e.date),
          title:e.titre,
          description:e.description,
          id_calendrier:e.id_calendrier,
          date:e.date,
          temps:e.temps,
        }
      })]
      ;
    document.getElementById('prochaine').click();
    document.getElementById('precedent').click();
    document.getElementById('aujourdhui').click();
    },
    error => {
      console.log(error);
    });
  }
//ajouter un tache dans calendrier
  addTOcalendrier(){
    this.e_http.addTOcalendrier(this.idclub,this.titre,this.temps,this.date,this.descriptionCal).subscribe(data => {

      if(data['error']!=true){
        this.addtask=false;
        window.location.reload();


         }else{
         swal("Erreur!", data['message'], "error");
      }
    },
      err => {

    console.log(err);
      }
    );
  }
  //popup for tasks
  addtache(){
    this.addtask=true
  }
  closetache(){
    this.addtask=false

  }
  //pour verifier le role admin de club
  getadmin() {
    this._http.getadmin(this.idclub).subscribe(club => {
      this.admin= club['isAdmin'];
    },
    error => {
      console.log(error);
    });
  }
//supprimer taches dans calendrier
 deleteCAL(idcalendrier:any){
   swal({
    title: "Es-tu sûr?",
    text: "Une fois supprimé, vous ne pourrez plus récupérer ce fichier!",
    icon: "warning",
    buttons: {
      cancel: true,
      confirm: true,
    },
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

  this.e_http.deleteTask(idcalendrier).subscribe(club => {
    if(club['error']!=true){
      this.addtask=false;
      window.location.reload();
      this.getcal(this.idclub);
       }else{
        swal("Erreur!", club['message'], "error");
    }
    this.addtask=false

  },
  error => {
    console.log(error);
  });
      swal("Votre evenement a été supprimer!", {
        icon: "success",
      });
      this.addtask=false
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });
  }
  //angular calendrier : close l'affichage de mois
  closeOpenMonthViewDay() {
  this.activeDayIsOpen = false;
  }
   //popup for event
   addeventpopup(){
    this.addevent=true
  }
  closevent(){
    this.addevent=false

  }
 //add event
  image(e:any){
  this.url_image=e.target.files[0];
  }
  addevents(){
    const formData = new FormData();
      formData.append('titre_event', this.titre_event);
      formData.append('description', this.description);
      formData.append('date_debut', this.date_debut);
      formData.append('date_fin', this.date_fin);
      formData.append('heure_debut', this.heure_debut);
      formData.append('heure_fin', this.heure_fin);
      formData.append('statut', this.statut);
      formData.append('file', this.url_image);
      formData.append('url_event', this.url_event);
      formData.append('id_membre', this.id_membre);
      formData.append('id_club', this.idclub);

    this.e_http.addevent(formData).subscribe(data => {

      if(data['error']!=true){
        swal("Succès!", "votre event a été enregistré avec succès", "success");

        //this.editProfile = !this.editProfile;
        this.getClubEvents();
        this.titre_event="";
        this.description="";
        this.date_debut="";
        this.date_fin="";
        this.heure_debut="";
        this.heure_fin="";
        this.statut="";
        this.url_image="";
        this.url_event="";
         }else{
          swal("Erreur!", data['message'], "error");
      }
    },
      err => {

     console.log(err);
      }
    );
   }
   //supprimer event
   deleteEVENT(idevent:any){
    swal({
      title: "Es-tu sûr?",
      text: "Une fois supprimé, vous ne pourrez plus récupérer ce fichier!",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

    this.e_http.deleteEvent(idevent).subscribe(club => {
      if(club['error']!=true){
        this.getClubEvents();

       }else{
         swal("Erreur!", club['message'], "error");
       }

    },
    error => {
      console.log(error);
    });
        swal("Votre evenement a été supprimer!", {
          icon: "success",
        });
      } else {
        swal("Votre fichier est en sécurité !");
      }
    });


  }
}

