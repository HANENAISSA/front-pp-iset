import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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

import { PopupComponent } from '../../../../popup/popup.component';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  add: boolean=false;
  constructor(private _http:ClubService,public dialog: MatDialog,private http: HttpClient,private modal: NgbModal,private modalService: NgbModal,private e_http: EventService,private route: ActivatedRoute,private router: Router) {}

 //CALENDRIER
 tasks: any=[];
 descriptionCal: any;
 events:any=[]
 temps: any;
 popup:any=false;
 popupData:any={
  description:"",
  end:"",
  start:"",
  title:"",
  heuredebut:"",
  heurefin:"",
  id:''
 };

 date: any;
  idclub: any;
  event: any=[];
  titre:any;
  view: CalendarView = CalendarView.Month;
  locale: string = 'fr';
  viewDate: Date = new Date();
  admin: any;

  activeDayIsOpen: boolean = false;
 
  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getClubEvents()
    this.getcal(this.idclub);
    this.getadmin();
  }

 

  eventClicked(event){
    this.popup=true
    this.popupData={
      ...event.event
    }
  }
  
  
  
  close(){
    this.popup=false

  }
  getClubEvents(){
    this.e_http.getClubEvents(this.idclub).subscribe(club => {
      
      this.events= [...club['data'].map(e=>{
        
        return{
          start:new Date(e.date_debut),
          end:new Date(e.date_debut),
          title:e.titre_event,
          description:e.description,
          heuredebut:e.heure_debut,
          heurefin:e.heure_fin,
          id:e.id_calendrier
        }
      })];
      
     
    },
    error => {
      console.log(error);
    });
  }
getcal(idclub:any){
    this.e_http.getcalendrier(idclub).subscribe(club => {
      
      this.events= [...this.events, ...club['data'].map(e=>{
        console.log(e)
        return{
          start:new Date(e.date),
          end:new Date(e.date),
          title:e.titre,
          description:e.description
        }
      })]
      ;
      
     console.log(this.events)
    },
    error => {
      console.log(error);
    });
  }
  addTOcalendrier(){
    this.e_http.addTOcalendrier(this.idclub,this.titre,this.temps,this.date,this.descriptionCal).subscribe(data => {
      if(data['error']!=true){
        this.add=false;
        this.getcal(this.idclub);
  
        console.log(data)
        //localStorage.setItem("sondages",data["sondages"])
         }else{
        //alert(data['message'])
        const modalRef = this.modalService.open(PopupComponent);
          modalRef.componentInstance.name = data['message'];
          modalRef.componentInstance.message = 'Erreur';
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }

  addEvent(){
    this.add=true
  }
  closevent(){
    this.add=false

  }
  getadmin() {
    this._http.getadmin(this.idclub).subscribe(club => {
      this.admin= club['isAdmin'];



    },
    error => {
      console.log(error);
    });
  }
  //<i *ngIf="admin==true"  (click)="deleteCAL(popupData.id)"  class="icofont icofont-ui-delete st-icon bg-c-blue txt-lite-color"></i>
  deleteCAL(idcalendrier:any){
    this.e_http.deleteTask(idcalendrier).subscribe(club => {
      console.log(club);
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.name = 'vous avez supprimer un evenement de calendrier';
      modalRef.componentInstance.message = 'Supprimer';
      this.popup=false
      this.getcal(this.idclub);
  
    },
    error => {
      console.log(error);
    });
  }
}

