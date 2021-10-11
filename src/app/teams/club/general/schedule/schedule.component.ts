import { Component, ChangeDetectionStrategy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
//import swal from 'sweetalert';
import { PopupComponent } from '../../../../popup/popup.component';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClubService } from '../../services/club.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
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
  id_event:"",
  date: "" ,
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
  refresh: Subject<any> = new Subject();
  @ViewChild('prochaine', {static: false}) div; 
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;



  CalendarView = CalendarView;

  ngOnInit() {

   this.getevents();

  }
  
  getevents() {
    this.e_http.getevents()
      .subscribe(
        club => {
      
          this.events= [...club['data'].map(e=>{
            
            return{
              start:new Date(e.date_debut),
              end:new Date(e.date_debut),
              title:e.titre_event,
              description:e.description,
              heuredebut:e.heure_debut,
              heurefin:e.heure_fin,
              id_event:e.id_event,
              date:e.date_debut,
            }
          })];
          
          document.getElementById('prochaine').click();
    
          document.getElementById('precedent').click();
          document.getElementById('aujourdhui').click();
        },
        error => {
          console.log(error);
        });
      }
  
  gotodetails(id_event:any ){
    this.router.navigate(['club/calendrier/details/'+id_event]);
  
    
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
  /*
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
        console.log(club)
        return{
          start:new Date(e.date),
          end:new Date(e.date),
          title:e.titre,
          description:e.description
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
*/
  

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
 
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

}