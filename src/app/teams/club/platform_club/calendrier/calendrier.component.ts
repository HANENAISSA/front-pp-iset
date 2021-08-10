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


@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  constructor(private http: HttpClient,private modal: NgbModal,private modalService: NgbModal,private e_http: EventService,private route: ActivatedRoute,private router: Router) {}

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
  title:""
 };

 date: any;
  idclub: any;
  event: any=[];
  titre:any='hi';
  view: CalendarView = CalendarView.Month;
  locale: string = 'fr';
  viewDate: Date = new Date();


  activeDayIsOpen: boolean = false;
 
  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getClubEvents()
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
      console.log(club)
      this.events= club['data'].map(e=>{
        
        return{
          start:e.date_debut,
          end:new Date(e.date_debut),
          title:e.titre_event,
          description:e.description
        }
      });
      
      console.log(this.events)
   
    },
    error => {
      console.log(error);
    });
  }
  getcal(idclub:any){
    this.e_http.getcalendrier(idclub).subscribe(club => {
      this.tasks= club['data'];
     // console.log(club);
    },
    error => {
      console.log(error);
    });
  }
  addTOcalendrier(){
    this.e_http.addTOcalendrier(this.idclub,this.temps,this.date,this.descriptionCal).subscribe(data => {
      if(data['error']!=true){
       // this.add=!this.add;
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



}

